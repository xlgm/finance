import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'

import { message, Table, Input } from 'antd';

import Modal from 'components/modal';
import './main.less'

@inject('dimensionStore') @observer
class DimensionMain extends React.Component {

  constructor() {
    super();
    this.state = {
      accountLatitudeName: '',
      pageNum: 1,
      pageSize: 10,
      selectedRowKeys: [],
      statusid: [],
      status: '',
      selectedRows: [],
    }
  }

  componentDidMount() {

    let { dimensionStore } = this.props;
    let currentPage = dimensionStore.currentPage;

    this.setState({
      accountLatitudeName: currentPage.accountLatitudeName,
      pageNum: currentPage.pageNum,
      pageSize: currentPage.pageSize
    });
    dimensionStore.account({
      accountLatitudeName: currentPage.accountLatitudeName,
      pageNum: currentPage.pageNum,
      pageSize: currentPage.pageSize
    });

    dimensionStore.clearCurrentPage();

  }
  handleCurrSelectedRowsKey = () => {
    let recArr = []
    for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
      recArr.push({ accountLatitudeID: this.state.selectedRowKeys[i] })
    }
    return recArr
  }
  alertMsg = (text) => {
    message.destroy()
    message.info(text)
  }
  deleteOpr = () => {
    let { dimensionStore } = this.props
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({
        stateDialog: <Modal
          title="删除"
          toast="确定要删除选中的记录吗？"
          onCancel={() => {
            this.setState({ stateDialog: '' });
          }}
          onOk={() => {
            let accountLatitudes = this.handleCurrSelectedRowsKey()
            dimensionStore.accountdelete({
              accountLatitudes,
              success: () => {
                dimensionStore.account(
                  {
                    accountLatitudeName: this.state.accountLatitudeName,
                    pageNum: this.state.pageNum,
                    pageSize: this.state.pageSize,
                  },
                  (data) => {
                    if (this.state.pageNum > 1 && data.length === 0) {
                      let pageNum = this.state.pageNum - 1;
                      this.setState({ pageNum });
                      dimensionStore.account({
                        accountLatitudeName: this.state.accountLatitudeName,
                        pageNum: pageNum,
                        pageSize: this.state.pageSize,
                      })
                    }
                  }
                )
              }
            })
            this.setState({
              selectedRowKeys: [],
              stateDialog: '',
              selectedRows: [],
            })
          }
          } />
      })
    } else {
      this.alertMsg('请选择数据')
    }
  }
  ableOpr = (title, status) => {
    let { dimensionStore } = this.props
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({
        stateDialog: <Modal
          title={title}
          toast={`确定要${title}选中的记录吗？`}
          onCancel={() => {
            this.setState({ stateDialog: '' });
          }}
          onOk={() => {
            dimensionStore.modifystatus({
              accLatitudeIDs: this.state.selectedRowKeys.toString(),
              status: status,
              success: () => {
                dimensionStore.account({
                  accountLatitudeName: this.state.accountLatitudeName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize
                })
                this.setState({
                  stateDialog: '',
                  selectedRowKeys: [],
                })
              }
            })
            this.setState({selectedRows: []})
          }}
        />
      })
    } else {
      this.alertMsg('请选择数据');
    }
  }
  render() {

    let { dimensionStore } = this.props;
    let { selectedRowKeys } = this.state;
    let tableData = dimensionStore.allList.map((item, index) => {
      return item
    })
    const columns = [
      {
        title: "名称",
        dataIndex: "accountLatitudeName",
        key: "accountLatitudeName",
        width: '31.5%',
        render: (text, record, index) => {
          return <div className="currency-name" onClick={() => {
            dimensionStore.changePageControl('DimensionDetail');
            dimensionStore.getDetail(record);
            let currentPage = {
              accountLatitudeName: this.state.accountLatitudeName,
              pageNum: this.state.pageNum,
              pageSize: this.state.pageSize
            }
            dimensionStore.changeCurrentPage(currentPage)
          }}> {text}</div>
        }
      },
      {
        title: "描述",
        dataIndex: "accountLatitudeDescr",
        key: "accountLatitudeDescr",
        width: '31.5%'
      },
      {
        title: "启用/禁用",
        dataIndex: "status",
        key: "status",
        render: (text) => {
          let name = "";
          switch (text) {
            case 1005: name = '启用'
              break;
            case 1006: name = '禁用'
              break;
            default: return ''
          }

          return <div>{name}</div>
        }
      }
    ]
    let pageCount = dimensionStore.pageCount

    return (
      <div className='dimension-main'>
        <div className="dimension-top">
          <PurpleButton onClick={() => {
            dimensionStore.changePageControl('DimensionAdd')
            let currentPage = {
              accountLatitudeName: this.state.accountLatitudeName,
              pageNum: this.state.pageNum,
              pageSize: this.state.pageSize
            }
            dimensionStore.changeCurrentPage(currentPage)
          }}>新增</PurpleButton>
          <WhiteButton onClick={() => {
            let len = this.state.selectedRows.length
            if (len == 1) {
              dimensionStore.findAccountLatitudeByID(this.state.selectedRows[0].accountLatitudeID, () => {
                dimensionStore.changePageControl('DimensionModify')
                let currentPage = {
                  accountLatitudeName: this.state.accountLatitudeName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize
                }
                dimensionStore.changeCurrentPage(currentPage)
              })
            }
            if (len < 1) {
              this.alertMsg('请选择一条数据')
            }
            if (len > 1) {
              this.alertMsg('请选择一条数据')
            }
          }}>修改</WhiteButton>
          <WhiteButton onClick={() => { this.deleteOpr() }}>删除</WhiteButton>
          <GreenButton onClick={() => {
            this.ableOpr('启用', 1005)
          }}>启用</GreenButton>
          <RedButton onClick={() => {
            this.ableOpr('禁用', 1006)
          }}>禁用</RedButton>
        
          <Input
            size='large'
            style={{ width: 270, marginRight: 20, height: 37 }}
            placeholder="请输入名称或描述查询"
            value={this.state.accountLatitudeName}
            onChange={(event) => { this.setState({ accountLatitudeName: event.target.value.trim() }) }}
            onPressEnter={(e) => {
              let value = e.target.value.trim();
              dimensionStore.account({
                accountLatitudeName: value,
                pageNum: 1,
                pageSize: this.state.pageSize
              })
              if (value == '') {
                this.setState({ pageNum: 1, })
              }
            }}
          />
          <PurpleButton onClick={() => {
            this.setState({ pageNum: 1, selectedRowKeys: [] })
            dimensionStore.account({
              accountLatitudeName: this.state.accountLatitudeName,
              pageNum: 1,
              pageSize: this.state.pageSize
            })
          }}>查询</PurpleButton>
        </div>
        <div className="dimension-table">
          <Table
            columns={columns}
            dataSource={tableData}
            bordered
            scroll={{ y: 400 }}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                  selectedRows: selectedRows,
                  selectedRowKeys
                })
              },

            }}

            pagination={{  //分页
              total: dimensionStore.total,
              pageSize: this.state.pageSize,
              current: this.state.pageNum,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onShowSizeChange: (current, pageSize) => {
                this.setState({
                  pageSize,
                  pageNum: 1,
                  selectedRowKeys: [],
                  selectedRows: []
                });
                dimensionStore.account({
                  accountLatitudeName: '',
                  pageNum: 1,
                  pageSize: pageSize
                })
              },
              onChange: (pageNum) => {
                this.setState({
                  pageNum,
                  selectedRowKeys: [],
                  selectedRows: []
                });
                dimensionStore.account({
                  accountLatitudeName: this.state.accountLatitudeName,
                  pageNum,
                  pageSize: this.state.pageSize
                })
              },
              showTotal: () => { //设置显示一共几条数据
                return `从1至${pageCount}页 共${dimensionStore.total}条数据`
              }
            }}

          />

        </div>
        {this.state.stateDialog}
      </div>
    )
  }

}

export default DimensionMain