import React from 'react';
import { Input, Table, } from 'antd';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import Modal from 'components/modal';//删除
import './mian.less';
import { message } from 'antd';
message.config({
  top: 200,
  duration: 2,
});

@inject('systemStore') @observer
class SystemMain extends React.Component {


  constructor(props) {
    super(props);

    this.state = {

      stateModal: '',
      accSystemName: '',
      pageSize: 10,
      pageNum: 1,
      selectedRowKeys: []

    }
  }

  refreshData = () => {
    let { systemStore } = this.props;
    systemStore.queryAccountingSystemList({
      accSystemName: this.state.accSystemName,
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    });
  }

  search = () => {
    this.setState({ pageNum: 1, selectedRowKeys: [] })
    let { systemStore } = this.props;
    systemStore.queryAccountingSystemList({
      accSystemName: this.state.accSystemName,
      pageSize: this.state.pageSize,
      pageNum: 1
    });
  }

  componentWillMount() {
    let { systemStore } = this.props;
    let currentPage = systemStore.currentPage;
    
    this.setState({
      pageNum: currentPage.pageNum,
      accSystemName: currentPage.accSystemName,
      pageSize: currentPage.pageSize
    })

    systemStore.queryAccountingSystemList({
      accSystemName:currentPage.accSystemName,
      pageSize: currentPage.pageSize,
      pageNum: currentPage.pageNum
    },
    (data)=>{
        if(this.state.pageNum>1 && data.length===0){
          let pageNum = this.state.pageNum-1;
          this.setState({pageNum})
          systemStore.queryAccountingSystemList(
            {
              accSystemName: this.state.accSystemName,
              pageNum: pageNum,
              pageSize: this.state.pageSize
            }
          );
        }
    });

    systemStore.clearCurrentPage();

  }

  render() {

    let { systemStore } = this.props;
    let { selectedRowKeys } = this.state;
    let columns = [
      
      {
        title: '名称',
        dataIndex: 'accSystemName',
        key: 'accSystemName',
        width: '50%',
        render: (text, record) => {
          return <div className='accSystem-name' onClick={() => {
            systemStore.queryDetail({
              accSystemID: record.accSystemID,
              success: () => {
                let currentPage = {
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  accSystemName: this.state.accSystemName
                }
                systemStore.changeCurrentPage(currentPage);
                systemStore.changePageControl("SystemDetail");
              }
            })

          }}>{text}</div>
        }
      },
      {
        title: '默认核算体系',
        dataIndex: 'defaultAccSystem',
        key: 'defaultAccSystem',
        width: '15%',
        render: (text, record) => {

          let value;
          if (text) {
            value = '是';
          } else {
            value = "否";
          }
          return <div>{value}</div>
        }
      },
      {
        title: '法人核算体系',
        dataIndex: 'legalPersonAccSystem',
        key: 'legalPersonAccSystem',
        width: '15%',
        render: (text, record) => {
          let value;
          if (text) {
            value = '是';
          } else {
            value = "否";
          }
          return <div>{value}</div>
        }
      },
      {
        title: '启用/禁用',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
          let name = "";
          switch (text) {
            case 1005:
              name = '启用';
              break;
            case 1006:
              name = '禁用';
              break;
            default:
          }
          return <div>{name}</div>
        }
      }
    ]


    let systemList
    if (systemStore.systemList) {
      systemList = systemStore.systemList.map((item) => {
        let { key, accSystemID, accSystemCode, accSystemName, defaultAccSystem, legalPersonAccSystem, status } = item;
        return { key, accSystemID, accSystemCode, accSystemName, defaultAccSystem, legalPersonAccSystem, status }
      })
    } else {
      systemList = [];
    }


    return (
      <div id='system-main'>
        <div className="policy-top">
          <PurpleButton onClick={() => {
            systemStore.changePageControl("SystemAdd");

          }}>新增</PurpleButton>
          <WhiteButton onClick={() => {
            let selectedRowKeys = this.state.selectedRowKeys;
            if (selectedRowKeys.length === 1) {
              let selectedRowKeys = this.state.selectedRowKeys;
             
              systemStore.modQueryDetail({
                accSystemID: selectedRowKeys[0],
                success: () => {

                  systemStore.changePageControl("SystemModify");
                  let currentPage = {
                    pageNum: this.state.pageNum,
                    pageSize: this.state.pageSize,
                    accSystemName: this.state.accSystemName
                  }
                  systemStore.changeCurrentPage(currentPage);
                }
              })

            } else {
              message.destroy();
              message.info('请选择一条数据');
            }
          }}>修改</WhiteButton>
          <WhiteButton onClick={() => {

            let accSystemIDs = this.state.selectedRowKeys;
            if (accSystemIDs.length > 0) {
              this.setState({
                stateModal: <Modal
                  onCancel={() => {
                    this.setState({ stateModal: '' });
                  }}
                  onOk={() => {
                    this.setState({ stateModal: '', selectedRowKeys: [] });
                    systemStore.delete({
                      accSystemIDs,
                      success: () => {
                        systemStore.queryAccountingSystemList(
                          {
                            accSystemName: this.state.accSystemName,
                            pageNum: this.state.pageNum,
                            pageSize: this.state.pageSize
                          },
                          (data)=>{
                              if(this.state.pageNum>1 && data.length===0){
                                let pageNum = this.state.pageNum-1;
                                this.setState({pageNum})
                                systemStore.queryAccountingSystemList(
                                  {
                                    accSystemName: this.state.accSystemName,
                                    pageNum: pageNum,
                                    pageSize: this.state.pageSize
                                  }
                                );
                              }
                          }
                        );
                      }
                    })
                  }}
                />
              })
            } else {
              message.destroy();
              message.info("请选择数据");
            }

          }}>删除</WhiteButton>
          <GreenButton onClick={() => {
            let accSystemIDs = this.state.selectedRowKeys;
            if (accSystemIDs.length > 0) {
              this.setState({
                stateModal: <Modal
                  title="启用"
                  toast="确定要启用选中的记录吗？"
                  onCancel={() => {
                    this.setState({ stateModal: '' });
                  }}
                  onOk={() => {
                    this.setState({ stateModal: '', selectedRowKeys: [] });
                    systemStore.enable({
                      accSystemIDs,
                      success: () => {
                        systemStore.queryAccountingSystemList(
                          {
                            accSystemName: this.state.accSystemName,
                            pageNum: this.state.pageNum,
                            pageSize: this.state.pageSize
                          }
                        );
                      }
                    });
                  }}
                />
              })
            } else {
              message.destroy();
              message.info("请选择数据");
            }

          }}>启用</GreenButton>
          <RedButton onClick={() => {
            let accSystemIDs = this.state.selectedRowKeys;
            if (accSystemIDs.length > 0) {
              this.setState({
                stateModal: <Modal
                  title="禁用"
                  toast="确定要禁用选中的记录吗？"
                  onCancel={() => {
                    this.setState({ stateModal: '' });
                  }}
                  onOk={() => {
                    this.setState({ stateModal: '', selectedRowKeys: [] });
                    systemStore.disable({
                      accSystemIDs,
                      success: () => {
                        systemStore.queryAccountingSystemList(
                          {
                            accSystemName: this.state.accSystemName,
                            pageNum: this.state.pageNum,
                            pageSize: this.state.pageSize
                          }
                        );
                      }
                    })
                  }}
                />
              })
            } else {
              message.destroy();
              message.info("请选择数据");
            }

          }}>禁用 </RedButton>
          <Input style={{ width: 270, height: 36 }}
            type="text"
            placeholder="请输入名称查询"
            icon="search"
            value={this.state.accSystemName}
            onChange={(e) => {
              this.setState({ accSystemName: e.target.value.trim() })
            }}
            onPressEnter={(e) => {
              this.search();
            }}
          />
          <PurpleButton
            width='86px'
            color="#e5282f"
            onClick={() => {
              this.search();
            }}

          >查询</PurpleButton>

        </div>
        <div className="policy-table">
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys });
              }
            }}
            scroll={{ y: 400 }}
            columns={columns}
            bordered
            dataSource={systemList}
            pagination={{  //分页
              total: systemStore.systemMain ? systemStore.systemMain.total : 0,
              pageSize: this.state.pageSize,
              current: this.state.pageNum,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onShowSizeChange: (current, pageSize) => {

                this.setState({
                  pageSize,
                  pageNum: 1,
                  selectedRowKeys: []
                });
                systemStore.queryAccountingSystemList(
                  {
                    accSystemName: this.state.accSystemName,
                    pageNum: 1,
                    pageSize: pageSize
                  }
                );
              },
              onChange: (page) => {
                this.setState({
                  pageNum: page,
                  selectedRowKeys: []
                });
                systemStore.queryAccountingSystemList(
                  {
                    accSystemName: this.state.accSystemName,
                    pageNum: page,
                    pageSize: this.state.pageSize
                  });
              },
              showTotal: function () {  //设置显示一共几条数据
                return '从 1 到 ' + systemStore.systemMain.pages + ' 页 共 ' + systemStore.systemMain.total + ' 条数据';
              }
            }}
          />
        </div>
        {this.state.stateModal}
      </div>
    )
  }
}

export default SystemMain;