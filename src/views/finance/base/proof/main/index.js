import React from 'react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message, Table, Input } from 'antd';
import Modal from 'components/modal/index.js';//删除 
import './main.less';


@inject('proofStore', 'appStore') @observer
class ProofMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: '',//删除 
      certificateWord: '', //查询的名称
      pageSize: 10,
      pageNum: 1,
      selectedRows: null,
      selectedRowKeys: [],
    }

  }

  componentWillMount() { 
    let { proofStore } = this.props;
    let currentPage = proofStore.currentPage;

    this.setState({
      pageNum: currentPage.pageNum,
      certificateWord: currentPage.certificateWord,
      pageSize: currentPage.pageSize
    });
    proofStore.queryCertificateWordList({
      pageNum: currentPage.pageNum,
      certificateWord: currentPage.certificateWord,
      pageSize: currentPage.pageSize,
      error: (pageNum) => { 
        if (currentPage.pageNum > 1 && pageNum) {
          let pageNum = currentPage.pageNum - 1;
          this.setState({ pageNum })
          proofStore.queryCertificateWordList(
            {
              certificateWord: currentPage.certificateWord,
              pageNum: pageNum,
              pageSize: currentPage.pageSize,
            }
          );
        }
      },
      showLoading: () => {
        proofStore.showLoading();
      },
      closeLoading: () => {
        proofStore.closeLoading();
      },

    });
    proofStore.clearCurrentPage();
    proofStore.getAccountCaptionTableList();
  }


  // 提示信息
  alertInfo = (text) => {
    message.destroy()
    message.info(text)
  }

  policyAddClick = () => {
    let { proofStore } = this.props;
    proofStore.changePageControl("ProofAdd");

  }

  policyModifyClick = () => {
    let { proofStore } = this.props
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else if (this.state.selectedRowKeys.length > 1) {
      this.alertInfo("请选择一条数据");
    } else {
      if (this.state.selectedRows[0].isPreData === 1) {
        proofStore.changedefaultData(true);
      } else {
        proofStore.changedefaultData(false);
      }
      proofStore.getCertificateWord({
        certificateWordID: this.state.selectedRowKeys.toString(),
        success: () => {
          let currentPage = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            certificateWord: this.state.certificateWord
          }

          proofStore.changeCurrentPage(currentPage);

          proofStore.pifModifyDetails("");
          proofStore.changePageControl("ProofModify");
        }, showLoading: () => {
          proofStore.showLoading();
        },
        closeLoading: () => {
          proofStore.closeLoading();
        }
      });
    }

  }

  //删除
  policyDeleteClick = () => {
    let { proofStore } = this.props;
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else {
      let flagt = true;
      this.state.selectedRows.forEach(function (obj, i) {
        if (obj.isPreData === 1) {
          flagt = false;
        }
      })

      if (flagt === true) {
        this.setState({
          modal:
          <Modal
            onCancel={() => {
              this.setState({ modal: '' });
            }}
            onOk={() => {
              proofStore.delCertificateWord({
                certificateWordID: this.state.selectedRowKeys,
                success: () => {
                  this.setState({
                    modal: '',
                    selectedRowKeys: []
                  })
                  
                  proofStore.queryCertificateWordList({
                    certificateWord: this.state.certificateWord,
                    pageNum: this.state.pageNum,
                    pageSize: this.state.pageSize,
                    success: (data) => { 
                      if (this.state.pageNum > 1 && data.length === 0) { 
                        let pageNum = this.state.pageNum - 1;
                        this.setState({ pageNum })
                        proofStore.queryCertificateWordList(
                          {
                            certificateWord: this.state.certificateWord,
                            pageNum: pageNum,
                            pageSize: this.state.pageSize,
                          }
                        );
                      }
                    }
                  })

                },
                showLoading: () => {
                  proofStore.showLoading();
                },
                closeLoading: () => {
                  proofStore.closeLoading();
                }
              })
            }}>
          </Modal>
        })
      } else {
        this.alertInfo("数据含预设数据不能删除");
      }

    }

  }

  //启用/禁用
  policyEnableClick = (title, status) => {
    let { proofStore } = this.props;
    if (this.state.selectedRowKeys.length === 0) {
      this.alertInfo("请选择数据");
    } else {
      this.setState({
        modal:
        <Modal
          title={title}
          toast={`确定要${title}选中的记录吗？`}
          onCancel={() => {
            this.setState({ modal: '' });
          }}
          onOk={() => {

            proofStore.modCertificateWordStatus({
              certificateWordID: this.state.selectedRowKeys,
              status: status,
              success: () => {
                message.destroy();
                message.warn(`${title}成功!`);
                proofStore.queryCertificateWordList({
                  certificateWord: this.state.certificateWord,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                })
                this.setState({
                  modal: '',
                  selectedRowKeys: [],
                })
              },
              showLoading: () => {
                proofStore.showLoading();
              },
              closeLoading: () => {
                proofStore.closeLoading();
              }
            })
          }}>
        </Modal>
      })
    }

  }

 

 

  queryClick = () => {
    let { proofStore } = this.props;
    this.setState({
      pageNum: 1,
      selectedRowKeys: [],
    })
    proofStore.queryCertificateWordList({
      certificateWord: this.state.certificateWord.trim(),
      showLoading: () => {
        proofStore.showLoading();
      },
      closeLoading: () => {
        proofStore.closeLoading();
      }
    })
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }


  render() {
    let datalist = [];
    let { proofStore, appStore } = this.props;
    let { selectedRowKeys } = this.state;
    let wordList = proofStore.wordList;
    let EntityStatus = appStore.dictionarys.EntityStatus;
    let temporaryPaging = proofStore.temporaryPaging;

    wordList.forEach(function (obj, i) {
      var map = {};
      EntityStatus.forEach(function (item, i) {
        map[item.value] = item.description;
      });
      var value = map[obj.wordStatus];
      datalist.push({
        key: obj.certificateWordID,
        certificateWord: obj.certificateWord,
        accCaptionTableName: obj.accCaptionTableName,
        isOnlyOne: obj.isOnlyOne === 0 ? '否' : '是',
        wordStatus: value,
        PaymentAddChannel: obj.PaymentAddChannel,
        isPreData: obj.isPreData
      });
    });

    let column = [
      {
        title: '凭证字',
        dataIndex: 'certificateWord',
        key: "certificateWord",
        width: '35%',
        render: (text, record) => (
          <span className="span-name" onClick={() => {
            proofStore.getCertificateWord({
              certificateWordID: record.key,
              success: () => {
                let currentPage = {
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  certificateWord: this.state.certificateWord
                }

                proofStore.changeCurrentPage(currentPage);
                proofStore.pifModifyDetails("detailsState");
                proofStore.changePageControl("ProofModify");
              }, showLoading: () => {
                proofStore.showLoading();
              },
              closeLoading: () => {
                proofStore.closeLoading();
              }
            });
          }}>{text}
          </span>
        )
      },
      {
        title: '科目表',
        dataIndex: 'accCaptionTableName',
        key: "accCaptionTableName",
        width: '35%'
      },
      {
        title: '是否多借多贷',
        dataIndex: 'isOnlyOne',
        key: "isOnlyOne",
        width: '15%'
      },
      {
        title: '启用/禁用',
        dataIndex: 'wordStatus',
        key: "wordStatus" 
      }
    ]

    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return <div id='proof-main'>
      <div className="policy-top">
        <PurpleButton onClick={this.policyAddClick}>新增</PurpleButton>
        <WhiteButton onClick={this.policyModifyClick}>修改</WhiteButton>
        <WhiteButton onClick={this.policyDeleteClick}>删除</WhiteButton>
        <GreenButton onClick={() => { this.policyEnableClick('启用', 1) }}>启用</GreenButton>
        <RedButton onClick={() => { this.policyEnableClick('禁用', 2) }}>禁用 </RedButton>  
        <Input style={{ width: 270, height: 36 }}
          type="text"
          value={this.state.certificateWord}
          placeholder="请输入名称查询"
          onChange={(e) => {
            this.setState({ certificateWord: e.target.value });
          }}
          onPressEnter={(e) => {
            this.queryClick();
          }}
        />
        <PurpleButton onClick={this.queryClick}>查询</PurpleButton>

      </div>
      <div className="policy-table">
        <Table
          rowSelection={rowSelection}
          columns={column}
          dataSource={datalist}
          bordered
          scroll={{ y: 400 }}
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
              proofStore.queryCertificateWordList({
                certificateWord: this.state.certificateWord,
                pageSize: pageSize,
                showLoading: () => {
                  proofStore.showLoading();
                },
                closeLoading: () => {
                  proofStore.closeLoading();
                }
              });
            },
            onChange: (current) => {  //点击改变页数的选项时调用函数，current:将要跳转的页数 
              this.setState({
                pageNum: current,
                selectedRowKeys: []
              });
              proofStore.queryCertificateWordList({
                certificateWord: this.state.certificateWord,
                pageNum: current,
                pageSize: this.state.pageSize,
                showLoading: () => {
                  proofStore.showLoading();
                },
                closeLoading: () => {
                  proofStore.closeLoading();
                }
              });
            },
            showTotal: function () {  //设置显示一共几条数据
              return '从 1 到 ' + temporaryPaging.pages + ' 页 共 ' + temporaryPaging.total + ' 条数据';
            }
          }}

        />
      </div>
      {this.state.modal} 
    </div>
  }
}

export default ProofMain;