import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import Modal from 'components/modal';
import { Table, message, Input } from 'antd';
import moment from 'moment';
import './main.less';
 

@inject('paritiesStore', 'appStore') @observer
class ParitiesMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stateDialog: '',
      pageSize: 10,
      pageNum: 1,
      pages: 1,
      searchName: '',
      selectedRowKeys: [], 
    }
  }

  componentWillMount() {
    this.refreshData();  
  }

 

  refreshData = () => {
    let { paritiesStore } = this.props; 
    let currentPage = paritiesStore.currentPage;   
    this.setState({
      pageNum: currentPage.pageNum,
      searchName: currentPage.searchName,
      pageSize: currentPage.pageSize
    });
    paritiesStore.getParitiesList({
      data: {
        pageNum: currentPage.pageNum,
        pageSize: currentPage.pageSize,
        searchName: currentPage.searchName,
      },
      showLoading: () => {
        paritiesStore.showLoading();
      },
      closeLoading: () => {
        paritiesStore.closeLoading();
      }
    });
    paritiesStore.clearCurrentPage();
     
  }


  //修改
  ParitiesUpdate = () => {
    let { paritiesStore } = this.props;
    if (this.state.selectedRowKeys.length === 0) {
      message.destroy();
      message.warn("请选择数据");
    } else if (this.state.selectedRowKeys.length > 1) {
      message.destroy();
      message.warn("请选择一条数据");
    } else {
      //查看详情的action
      paritiesStore.SystemDetail({
        exchangeRateID: this.state.selectedRowKeys,
        success: () => {
          let currentPage = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            searchName: this.state.searchName
          }

          paritiesStore.changeCurrentPage(currentPage);
          paritiesStore.changePageControl('ParitiesModify');
        },
        showLoading: () => {
          paritiesStore.showLoading();
        },
        closeLoading: () => {
          paritiesStore.closeLoading();
        }
      }); 
    }
  }


  //删除
  ParitiesDel = () => {
    let { paritiesStore } = this.props;
    if (this.state.selectedRowKeys.length === 0) {
      message.destroy();
      message.warn("请选择数据");
    } else {
      this.setState({
        stateDialog: <Modal
          onCancel={() => {
            this.setState({ stateDialog: '' });
          }}
          onOk={() => {
            paritiesStore.SystemDelete({
              exchangeRateIDs: this.state.selectedRowKeys,
              success: () => {

                paritiesStore.getParitiesList({
                  data: {
                    pageNum: this.state.pageNum,
                    pageSize: this.state.pageSize,
                    searchName: this.state.searchName,
                  },
                  success: (data) => {
                    if (this.state.pageNum > 1 && data.length === 0) {
                      let pageNum = this.state.pageNum - 1;
                      this.setState({ pageNum });
                      paritiesStore.getParitiesList({
                        data: {
                          searchName: this.state.searchName,
                          pageNum: pageNum,
                          pageSize: this.state.pageSize,
                        }
                      });
                    }
                  },
                  showLoading: () => {
                    paritiesStore.showLoading();
                  },
                  closeLoading: () => {
                    paritiesStore.closeLoading();
                  }
                });
                this.setState({ stateDialog: '', selectedRowKeys: [] });
              }
            })
          }}
        />
      });
    }

  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  selectClick = () => {
    let { pageSize } = this.state;
    let { paritiesStore } = this.props;
    paritiesStore.getParitiesList({
      data: {
        searchName: this.state.searchName.trim(),
        pageNum: 1,
        pageSize
      },
      showLoading: () => {
        paritiesStore.showLoading();
      },
      closeLoading: () => {
        paritiesStore.closeLoading();
      }
    });
    this.setState({
      selectedRowKeys: [],
      pageNum: 1
    })
  }

  render() {
    let { paritiesStore } = this.props;
    let { selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let datalist = [];
    let columns = [
      {
        title: '原币',
        dataIndex: 'sourceCurrencyName',
        key: 'sourceCurrencyName',
        width: '20%',
        render: (text, record) => {
          return <div className="currency-name" onClick={() => { 
            paritiesStore.SystemDetail({
              exchangeRateID: record.exchangeRateID,
              success: () => {
                let currentPage = {
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  searchName: this.state.searchName
                }

                paritiesStore.changeCurrentPage(currentPage);
                paritiesStore.changePageControl('ParitiesDetails');
              },
              showLoading: () => {
                paritiesStore.showLoading();
              },
              closeLoading: () => {
                paritiesStore.closeLoading();
              }
            });
          }}>{text}</div>
        }
      },
      {
        title: "目标币",
        dataIndex: "targetCurrencyName",
        key: "targetCurrencyName",
        width: '20%',
        render: (text, record) => {
          return <div className="currency-name" onClick={() => { 
            paritiesStore.SystemDetail({
              exchangeRateID: record.exchangeRateID,
              success: () => {
                let currentPage = {
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  searchName: this.state.searchName
                }

                paritiesStore.changeCurrentPage(currentPage);
                paritiesStore.changePageControl('ParitiesDetails');
              },
              showLoading: () => {
                paritiesStore.showLoading();
              },
              closeLoading: () => {
                paritiesStore.closeLoading();
              }
            });
          }}>{text}</div>
        }
      },
      {
        title: "固定汇率",
        dataIndex: "fixedExchangeRate",
        key: 'fixedExchangeRate',
        width: '20%',
      },
      {
        title: "生效日期",
        dataIndex: "effectiveTime",
        key: 'effectiveTime',
        width: '20%',
      },
      {
        title: "失效日期",
        dataIndex: "expiryTime",
        key: 'expiryTime',
      }
    ];

    if (paritiesStore.paritiesList && paritiesStore.paritiesList.length > 0) {
      paritiesStore.paritiesList.forEach(function (obj, i) { 
        datalist.push({
          key: obj.exchangeRateID,
          exchangeRateID: obj.exchangeRateID,
          sourceCurrencyName: obj.sourceCurrencyName,
          targetCurrencyName: obj.targetCurrencyName,
          fixedExchangeRate: obj.fixedExchangeRate,
          effectiveTime: moment(obj.effectiveTime*1).format('YYYY-MM-DD'),
          expiryTime: moment(obj.expiryTime*1).format('YYYY-MM-DD'),
        });
      });
    }

    return (
      <div id="parit_main">
        <div className="parities-top">
          <PurpleButton
            onClick={() => {
              paritiesStore.changePageControl('ParitiesAdd');
            }}>新增
          </PurpleButton>
          <WhiteButton onClick={this.ParitiesUpdate}>修改</WhiteButton>
          <WhiteButton onClick={this.ParitiesDel}>删除</WhiteButton> 
          <Input
            style={{ width: 270, height: 36 }}
            type="text"
            placeholder="请输入币别名称查询"
            value={this.state.searchName}
            onChange={(e) => {
              this.setState({ searchName: e.target.value });
            }}
            onPressEnter={(e) => {
              this.selectClick();
            }}
          />
          <PurpleButton onClick={this.selectClick}>查询</PurpleButton>
        </div>
        <div className="parities-table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            bordered
            scroll={{ y: 400 }}
            dataSource={datalist}
            onRowClick={(record, index) => {
            }}
            pagination={{  //分页
              total: paritiesStore.paritiesMain.total,
              pageSize: this.state.pageSize,
              current: this.state.pageNum,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              showQuickJumper: true,
              onShowSizeChange: (current, pageSize) => {
                this.setState({
                  pageSize,
                  pageNum: 1,
                  selectedRowKeys: []
                });
                paritiesStore.getParitiesList({
                  data: {
                    searchName: this.state.searchName,
                    pageNum: 1,
                    pageSize: pageSize
                  },
                  showLoading: () => {
                    paritiesStore.showLoading();
                  },
                  closeLoading: () => {
                    paritiesStore.closeLoading();
                  }
                });
              },
              onChange: (pageNum) => {
                this.setState({
                  pageNum,
                  selectedRowKeys: []
                });
                paritiesStore.getParitiesList({
                  data: {
                    searchName: this.state.searchName,
                    pageNum,
                    pageSize: this.state.pageSize,
                  },
                  showLoading: () => {
                    paritiesStore.showLoading();
                  },
                  closeLoading: () => {
                    paritiesStore.closeLoading();
                  }
                });
              },
              showTotal: function () {  //设置显示一共几条数据
                return '从 1 到 ' + paritiesStore.paritiesMain.pages + ' 页 共 ' + paritiesStore.paritiesMain.total + ' 条数据';
              }
            }}
          />
        </div>
        {this.state.stateDialog}
      </div>
    )
  }
}

export default ParitiesMain;