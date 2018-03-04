import React from 'react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message, Table, Input } from 'antd';
import Modal from 'components/modal/index.js';//删除 
import AddMethodDialog from '../add-method';//添加平台结算方式 
import './main.less';

@inject('settlementStore','appStore') @observer
class SettlementMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stateDialog: "",
      selectedRowKeys: [],
      pageSize: 10,
      pageNum: 1, 
      paymentname: '',
      selectedRows: null,
      addMethod: '',
    }
  }

  componentWillMount() {
    let { settlementStore } = this.props;
    let currentPage = settlementStore.currentPage;
    
    this.setState({
      pageNum: currentPage.pageNum,
      paymentname: currentPage.paymentname,
      pageSize: currentPage.pageSize
    });
    settlementStore.paymentmethodinfo({
      paymentname: currentPage.paymentname,
      pageSize: currentPage.pageSize,
      pageNum: currentPage.pageNum,
      showLoading: () => {
        settlementStore.showLoading();
      },
      closeLoading: () => {
        settlementStore.closeLoading();
      },
      error: (pageNum) => { 
        if (currentPage.pageNum > 1 && pageNum) {
          let pageNum = currentPage.pageNum - 1;
          this.setState({ pageNum })
          settlementStore.queryAccountingPolicyList(
            {
              paymentname: currentPage.paymentname,
              pageNum: pageNum,
              pageSize: currentPage.pageSize,
            }
          );
        }
      },
    });
    settlementStore.clearCurrentPage();
  }

  // 提示信息
  alertInfo = (text) => {
    message.destroy()
    message.info(text)
  }


  //查询
  queryClick = () => {
    this.props.settlementStore.paymentmethodinfo({
      paymentName: this.state.paymentname.trim(),
      showLoading: () => {
        this.props.settlementStore.showLoading();
      },
      closeLoading: () => {
        this.props.settlementStore.closeLoading();
      }
    });
    this.setState({
      pageNum: 1,
      selectedRowKeys: [],
    })
  }

  //修改
  updateClick = () => {
    let { settlementStore } = this.props;
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else if (this.state.selectedRowKeys.length > 1) {
      this.alertInfo("请选择一条数据");
    } else {  
      let currentPage = {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        paymentname: this.state.paymentname
      }

      settlementStore.changeCurrentPage(currentPage);

      settlementStore.SavedetailsObj(this.state.selectedRows);
      settlementStore.changePageControl("SettlementModify"); 
    }

  }


  //删除
  delClcik = () => {
    //判断选中的数据是否包含平台结算方式/有的话就提示不能删除
    let settlementStore = this.props.settlementStore;
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else { 
      this.setState({
        stateDialog:
        <Modal
          onCancel={() => {
            this.setState({ stateDialog: '' })
          }}
          onOk={() => {
            settlementStore.paymentmethodinfoDel({
              id: this.state.selectedRowKeys,
              success: () => {
                settlementStore.paymentmethodinfo({
                  paymentname: this.state.paymentname,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  success:(data)=>{
                    if(this.state.pageNum>1 && data.length===0){
                      let pageNum = this.state.pageNum-1;
                      this.setState({pageNum})
                      settlementStore.paymentmethodinfo(
                        {
                          paymentname: this.state.paymentname,
                          pageNum: pageNum,
                          pageSize: this.state.pageSize,
                        }
                      );
                    }
                  }
                });
                this.setState({ stateDialog: '',  selectedRowKeys: []})
              }, showLoading: () => {
                settlementStore.showLoading();
              },
              closeLoading: () => {
                settlementStore.closeLoading();
              }
            })
          }}>
        </Modal>
      })

    }
  }


  //启用
  EnableClcik = () => {
    let settlementStore = this.props.settlementStore;
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else {
      this.setState({
        stateDialog: <Modal
          title="启用"
          toast="确定要启用选中的记录吗？"
          onCancel={() => {
            this.setState({ stateDialog: '' });
          }}
          onOk={() => {
            let lempList = [];
            this.state.selectedRowKeys.forEach(function (obj, i) {
              lempList.push({
                id: obj,
                status: 1005
              })
            });
            settlementStore.paymentmethodinfoEnable({
              obj: lempList,
              success: () => {
                this.alertInfo("启用成功!");
                this.setState({
                  selectedRowKeys: [],
                  stateDialog: ''
                })
                settlementStore.paymentmethodinfo({
                  paymentName: this.state.paymentname,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                });

              }, showLoading: () => {
                settlementStore.showLoading();
              },
              closeLoading: () => {
                settlementStore.closeLoading();
              }
            })
          }}

        />
      });
    }

  }


  //禁用
  DisableClick = () => {
    let settlementStore = this.props.settlementStore;
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else {
      this.setState({
        stateDialog:
        <Modal
          title="禁用"
          toast="确定要禁用选中的记录吗？"
          onCancel={() => {
            this.setState({ stateDialog: '' });
          }}
          onOk={() => {
            let lempList = [];
            this.state.selectedRowKeys.forEach(function (obj, i) {
              lempList.push({
                id: obj,
                status: 1006
              })
            });
            settlementStore.paymentmethodinfoEnable({
              obj: lempList,
              success: () => {
                this.alertInfo("禁用成功!");
                settlementStore.paymentmethodinfo({
                  paymentName: this.state.paymentname,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                });
                this.setState({
                  selectedRowKeys: [],
                  stateDialog: ''
                })
              }, showLoading: () => {
                settlementStore.showLoading();
              },
              closeLoading: () => {
                settlementStore.closeLoading();
              }
            })
          }}

        />
      });
    }

  }


  //添加平台结算方式
  addSettlement = () => {
    let { settlementStore } = this.props;
    settlementStore.paymentnameListAction({});
    settlementStore.paymentmethodinfoPlatform({})
    this.setState({
      addMethod:
      <AddMethodDialog
        onCancel={() => {
          this.setState({
            addMethod: '',
          })
        }}
        clickdetermine={() => {
          settlementStore.paymentmethodinfo({});
          this.setState({
            addMethod: '',
          })
        }}>
      </AddMethodDialog>
    })


  }


  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }

  render() {
    let { settlementStore,appStore } = this.props;
    let temporaryPaging = settlementStore.temporaryPaging;
    let { selectedRowKeys } = this.state;
    let datalist = [];
    let column = [
      {
        title: '序号',
        dataIndex: 'sortno',
        key: "sortno",
        width: '20%',

      },
      {
        title: '名称',
        dataIndex: 'paymentname',
        key: "paymentname",
        width: '20%',
        render: (text, record) => (
          <span onClick={() => {
            let datalist = [];
            datalist.push(record)
            let currentPage = {
              pageNum: this.state.pageNum,
              pageSize: this.state.pageSize,
              paymentname: this.state.paymentname
            }
            settlementStore.changeCurrentPage(currentPage);
            settlementStore.SavedetailsObj(datalist); 
            settlementStore.changePageControl("SettlementDetails");

          }}>{text}
          </span>
        )
      },
      {
        title: '线上/线下',
        dataIndex: 'isonlinetext',
        key: "isonlinetext",
        width: '20%'
      }, {
        title: '应用端',
        dataIndex: 'apptypetext',
        key: "apptypetext",
        width: '20%'
      },
      {
        title: '启用/禁用',
        dataIndex: 'mappingstatustext',
        key: "mappingstatustext",
        width: '20%'
      }
    ]

    let methodinfoList = settlementStore.methodinfoList
    let EntityStatus = appStore.dictionarys.EntityStatus; // 枚举 EntityStatus
    methodinfoList.forEach(function (obj, i) {
      let lempmap = {};
      EntityStatus.forEach(function (item, i) { 
        lempmap[item.value] = item.description;
      });  
      datalist.push({
        key: obj.mappingID,
        sortno: obj.sortNo,
        paymentname: obj.paymentName,
        isonlinetext: obj.isOnline === 0 ? '线下' : '线上',
        isonline: obj.isOnline, 
        apptypetext: obj.newappType,
        apptype: obj.appType,
        mappingstatustext: lempmap[obj.mappingStatus], 
        mappingID: obj.mappingID
      });
    });

    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
 
    return (
      <div className='settlement-main'>
        <div className="settlement-input">
          <Input
            style={{ width: 270, height: 36 }}
            type="text"
            placeholder="请输入名称查询"
            onChange={(e) => {
              this.setState({ paymentname: e.target.value });
            }}
            onPressEnter={(e) => {
              this.queryClick();
            }}
          />
          <PurpleButton onClick={this.queryClick}>查询</PurpleButton>
        </div>
        <div className="settlement-top">
          <PurpleButton onClick={this.addSettlement} style={{ "width": 200 }}>添加平台结算方式</PurpleButton>
          <PurpleButton onClick={() => {
            settlementStore.paymentnameListAction({
              success: () => {
                settlementStore.changePageControl('SettlementAdd');
              }
            });

          }}>新增</PurpleButton>
          <WhiteButton onClick={this.updateClick}>修改</WhiteButton>
          <WhiteButton onClick={this.delClcik}>删除</WhiteButton>
          <GreenButton onClick={this.EnableClcik}>启用</GreenButton>
          <RedButton onClick={this.DisableClick}>禁用</RedButton> 
        </div>
        <div className="settlement-table">
          <Table
            rowSelection={rowSelection}
            columns={column}
            dataSource={datalist}
            bordered
            scroll={{ y: 350 }}
            onRowClick={(record, index) => {

            }}
            rowClassName={(record, index) => {

            }}
            pagination={{  //分页
              total: temporaryPaging.total, //数据总数量
              pageSize: this.state.pageSize,  //显示几条一页 
              current: this.state.pageNum,//默认当前页数
              showSizeChanger: true,  //是否显示可以设置几条一页的选项
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onShowSizeChange: (current, pageSize) => {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                this.setState({
                  pageSize: pageSize,
                  pageNum: 1,
                  selectedRowKeys: []
                });
                settlementStore.paymentmethodinfo({
                  pageSize: pageSize,
                  paymentName: this.state.paymentname,
                  showLoading: () => {
                    settlementStore.showLoading();
                  },
                  closeLoading: () => {
                    settlementStore.closeLoading();
                  }
                });

              },
              onChange: (current) => {  //点击改变页数的选项时调用函数，current:将要跳转的页数

                this.setState({ 
                  pageNum: current,
                  selectedRowKeys: []
                });
                settlementStore.paymentmethodinfo({
                  pageNum: current,
                  pageSize: this.state.pageSize,
                  paymentName: this.state.paymentname,
                  showLoading: () => {
                    settlementStore.showLoading();
                  },
                  closeLoading: () => {
                    settlementStore.closeLoading();
                  }
                });
              },
              showTotal: function () {  //设置显示一共几条数据
                return '从 1 到 ' + temporaryPaging.pages + ' 页 共 ' + temporaryPaging.total + ' 条数据';
              }
            }}

          />
        </div>

        {this.state.stateDialog}
        {this.state.addMethod}
      </div>
    )
  }
}

export default SettlementMain;