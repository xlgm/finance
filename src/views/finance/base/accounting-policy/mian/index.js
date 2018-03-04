import React from 'react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message, Table, Input } from 'antd';
import Modal from 'components/modal/index.js'; //删除 
import './main.less';

@inject('policyStore', 'appStore') @observer
class PolicyMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: '', //删除 
      accPolicyName: '',
      selectedRowKeys: [],
      pageSize: 10,
      pageNum: 1
    }
  }

  componentWillMount() {
    let { policyStore } = this.props;
  
    let currentPage = policyStore.currentPage;

    this.setState({
      pageNum: currentPage.pageNum,
      accPolicyName: currentPage.accPolicyName,
      pageSize: currentPage.pageSize
    });
    policyStore.queryAccountingPolicyList({
      accPolicyName: currentPage.accPolicyName,
      pageSize: currentPage.pageSize,
      pageNum: currentPage.pageNum,
      showLoading: () => {
        policyStore.showLoading();
      },
      closeLoading: () => {
        policyStore.closeLoading();
      },
      error: (pageNum) => { 
        if (currentPage.pageNum > 1 && pageNum) {
          let pageNum = currentPage.pageNum - 1;
          this.setState({ pageNum })
          policyStore.queryAccountingPolicyList(
            {
              accPolicyName: currentPage.accPolicyName,
              pageNum: pageNum,
              pageSize: currentPage.pageSize,
            }
          );
        }
      },
    });
    policyStore.clearCurrentPage();
  }

  // 提示信息
  alertInfo = (text) => {
    message.destroy();
    message.info(text);
  }

  policyAddClick = () => {
    let { policyStore } = this.props;
    policyStore.changePageControl("PolicyAdd");
  }

  policyModifyClick = () => {
    let { policyStore } = this.props;
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else if (this.state.selectedRowKeys.length > 1) {
      this.alertInfo("请选择一条数据");
    } else {
      policyStore.queryAccountingPolicyByID({
        accPolicyID: this.state.selectedRowKeys,
        success: () => {
          let currentPage = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            accPolicyName: this.state.accPolicyName
          }
  
          policyStore.changeCurrentPage(currentPage); 
          policyStore.changePageControl("PolicyModify");
        },
        showLoading: () => {
          policyStore.showLoading();
        },
        closeLoading: () => {
          policyStore.closeLoading();
        }

      })
    }
  }

  //删除
  policyDeleteClick = () => {
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else {
      this.setState({
        modal:
        <Modal
          onCancel={() => {
            this.setState({ modal: '' });
          }}
          onOk={() => {
            this.props.policyStore.batchDeleteAccountingPolicy({
              accPolicyIDs: this.state.selectedRowKeys,
              success: (data) => {
                this.props.policyStore.queryAccountingPolicyList({
                  accPolicyName: this.state.accPolicyName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  success:(data)=>{
                    if(this.state.pageNum>1 && data.length===0){
                      let pageNum = this.state.pageNum-1;
                      this.setState({pageNum})
                      this.props.policyStore.queryAccountingPolicyList(
                        {
                          accPolicyName: this.state.accPolicyName,
                          pageNum: pageNum,
                          pageSize: this.state.pageSize,
                        }
                      );
                    }
                  }
                });
                this.setState({ modal: '', selectedRowKeys: [] });
              },
              showLoading: () => {
                this.props.policyStore.showLoading();
              },
              closeLoading: () => {
                this.props.policyStore.closeLoading();
              }
            });
          }}>
        </Modal>
      });
    }

  }

  //启用
  policyEnableClick = () => {
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else {
      this.setState({
        modal:
        <Modal
          title="启用"
          toast="确定要启用选中的记录吗？"
          onCancel={() => {
            this.setState({ modal: '' });
          }}
          onOk={() => {
            this.props.policyStore.batchEnableAccountingPolicy({
              accPolicyIDs: this.state.selectedRowKeys,
              success: () => {
                this.props.policyStore.queryAccountingPolicyList({
                  accPolicyName: this.state.accPolicyName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize
                });
                this.setState({ selectedRowKeys: [], modal: '' });
              },
              showLoading: () => {
                this.props.policyStore.showLoading();
              },
              closeLoading: () => {
                this.props.policyStore.closeLoading();
              }
            });
          }}>
        </Modal>
      });
    }

  }

  //禁用
  policyDisableClick = () => {
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else {
      this.setState({
        modal:
        <Modal
          title="禁用"
          toast="确定要禁用选中的记录吗？"
          onCancel={() => {
            this.setState({ modal: '' });
          }}
          onOk={() => {
            this.props.policyStore.batchDisableAccountingPolicy({
              accPolicyIDs: this.state.selectedRowKeys,
              success: () => {
                this.props.policyStore.queryAccountingPolicyList({
                  accPolicyName: this.state.accPolicyName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize
                });
                this.setState({ selectedRowKeys: [], modal: '' })
              },
              showLoading: () => {
                this.props.policyStore.showLoading();
              },
              closeLoading: () => {
                this.props.policyStore.closeLoading();
              }
            });
          }}>
        </Modal>
      })
    }

  }
 
 

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  //查询
  queryClick = () => {
    this.props.policyStore.queryAccountingPolicyList({
      accPolicyName: this.state.accPolicyName.trim()
    });
    this.setState({ selectedRowKeys: [], pageNum: 1 })
  }

  render() {
    let datalist = [];
    let { policyStore, appStore } = this.props;
    let { selectedRowKeys } = this.state;
    let PolicyDatalist = policyStore.PolicyDatalist;
    let ExchangeType = appStore.dictionarys.ExchangeRateType; // 枚举 ExchangeType
    let EntityStatus = appStore.dictionarys.EntityStatus; // 枚举 EntityStatus
    let temporaryPaging = policyStore.temporaryPaging;

    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    let column = [
      {
        title: '名称',
        dataIndex: 'accPolicyName',
        key: "accPolicyName",
        width: '30%',
        render: (text, record) => (
          <span className="span-name"
            onClick={() => {
              policyStore.queryAccountingPolicyByID({
                accPolicyID: record.key,
                success: () => {
                  let currentPage = {
                    pageNum: this.state.pageNum,
                    pageSize: this.state.pageSize,
                    accPolicyName: this.state.accPolicyName
                  }
                  policyStore.changeCurrentPage(currentPage); 
                  policyStore.changePageControl("PolicyDetails");
                },
                showLoading: () => {
                  policyStore.showLoading();
                },
                closeLoading: () => {
                  policyStore.closeLoading();
                }
              });
            }}>{text}
          </span>
        )
      }, {
        title: '主币别',
        dataIndex: 'currencyName',
        key: "currencyName",
        width: '10%'
      }, {
        title: '汇率类型',
        dataIndex: 'exchangeTypeID',
        key: "exchangeTypeID",
        width: '10%'
      }, {
        title: '会计要素表',
        dataIndex: 'accElementTableName',
        key: "accElementTableName",
        width: '30%'
      }, {
        title: '启用/禁用',
        dataIndex: 'status',
        key: "status", 
      }
    ]

    PolicyDatalist.forEach(function (obj, i) {
      let map = {};
      let lempmap = {};
      ExchangeType.forEach(function (item, i) {
        map[item.value] = item.description;
      });

      EntityStatus.forEach(function (item, i) { 
        lempmap[item.value] = item.description;
      });
 
      datalist.push({
        key: obj.accPolicyID,
        accPolicyName: obj.accPolicyName,
        currencyName: obj.currencyName,
        exchangeTypeID: map[obj.exchangeTypeID],
        accElementTableName: obj.accElementTableName,
        status: lempmap[obj.status]
      });
    });

    return (
      <div id='policy-main'>
        <div className="policy-top">
          <PurpleButton onClick={this.policyAddClick}>新增</PurpleButton>
          <WhiteButton onClick={this.policyModifyClick}>修改</WhiteButton>
          <WhiteButton onClick={this.policyDeleteClick}>删除</WhiteButton>
          <GreenButton onClick={this.policyEnableClick}>启用</GreenButton>
          <RedButton onClick={this.policyDisableClick}>禁用</RedButton>  
          <Input
            style={{
              width: 270,
              height: 36
            }}
            type="text"
            placeholder="请输入名称查询"
            value={this.state.accPolicyName}
            onChange={(e) => {
              this.setState({ accPolicyName: e.target.value });
            }}
            onPressEnter={(e) => {
              this.queryClick();
            }} />
          <PurpleButton onClick={this.queryClick}>查询</PurpleButton>
        </div>
        <div className="policy-table">

          <Table
            rowSelection={rowSelection}
            columns={column}
            dataSource={datalist}
            scroll={{
              y: 400
            }}
            bordered
            onRowClick={(record, index) => { }}
            rowClassName={(record, index) => { }}
            pagination={{
              total: temporaryPaging.total,
              pageSize: this.state.pageSize,
              current: this.state.pageNum,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: [
                '10', '20', '50', '100'
              ],
              onShowSizeChange: (current, pageSize) => {
                this.setState({ pageSize: pageSize, pageNum: 1, selectedRowKeys: [] });
                policyStore.queryAccountingPolicyList({
                  accPolicyName: this.state.accPolicyName,
                  pageSize: pageSize,
                  showLoading: () => {
                    policyStore.showLoading();
                  },
                  closeLoading: () => {
                    policyStore.closeLoading();
                  }
                });
              },
              onChange: (current) => {
                this.setState({ pageNum: current, pageNum: current, selectedRowKeys: [] });
                policyStore.queryAccountingPolicyList({
                  accPolicyName: this.state.accPolicyName,
                  pageNum: current,
                  pageSize: this.state.pageSize,
                  showLoading: () => {
                    policyStore.showLoading();
                  },
                  closeLoading: () => {
                    policyStore.closeLoading();
                  }
                });
              },
              showTotal: function () {
                return '从 1 到 ' + temporaryPaging.pages + ' 页 共 ' + temporaryPaging.total + ' 条数据';
              }
            }} />
        </div>

        {this.state.modal} 
      </div>
    )
  }
}

export default PolicyMain;