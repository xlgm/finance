import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import { Select, Cascader, Icon, Table, Modal, Input, AutoComplete, Checkbox } from 'antd';
import ModalSubject from '../../components/modal-subject';
import './index.less';

const Option = Select.Option;
const Search = Input.Search;
const AtmOption = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const CheckboxGroup = Checkbox.Group;

@inject('queryCashFlowStore') @observer
class CashFlowTableMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPop: false,
      showMoreOprItems: false,
      showMoreOprItemValue: '',
      showModal: '',
      subjectOfAtmDataSource: [],
      subjectOfValue: '',
      AtmDataSourceOfMainTable: [],
      AtmDataSourceOfLlsts: [],
      checkedList: [],
      currPage: 1,
      pageSize: 5,
      canQuickJump: false,
      pageTotal: 10,
      dataCount: 100
    }
  }
  componentDidMoun() {
    this.setState({
      showModal: (
        <Modal
          title='123'
        />
      )
    });
  }
  render() {
    let { queryCashFlowStore } = this.props;
    let columns = [
      {
        title: '日期',
        dataIndex: 'date',
        index: 'date'
      }, {
        title: '凭证字号',
        dataIndex: 'certifyNO',
        index: 'certifyNO'
      }, {
        title: '摘要',
        dataIndex: 'abstract',
        index: 'abstract'
      }, {
        title: '科目编码',
        dataIndex: 'subjectCode',
        index: 'subjectCode'
      }, {
        title: '科目名称',
        dataIndex: 'subjectName',
        index: 'subjectName'
      }, {
        title: '币别',
        dataIndex: 'currency',
        index: 'currency'
      }, {
        title: '原币金额',
        dataIndex: 'originalCurrency',
        index: 'originalCurrency'
      }, {
        title: '借方',
        dataIndex: 'credit',
        index: 'credit'
      }, {
        title: '贷方',
        dataIndex: 'debit',
        index: 'debit'
      }, {
        title: '流量金额',
        dataIndex: 'flowAcc',
        index: 'flowAcc'
      }, {
        title: '主表项目名称',
        dataIndex: 'masterList',
        index: 'masterList'
      }, {
        title: '附表项目名称',
        dataIndex: 'Llsts',
        index: 'Llsts'
      }
    ]
    return (
      <div className="query-cashFlow-main">
        <div className="query-cashFlow-main-header">
          <div className="header-container">
            <div className="header-item">
              <h3>账簿</h3>
              <Select
                defaultValue='拓润'
              >
                {
                  [{ key: 1, val: '拓润' }, { key: 2, val: '不用等' }].map(item => {
                    return <Option key={item.key} val={item.val}>{item.val}</Option>
                  })
                }
              </Select>
            </div>
            <div className="header-item">
              <h3>币别</h3>
              <Select
                defaultValue="人民币"
              >
                {
                  [{ key: 1, val: '人民币' }, { key: 2, val: '综合本位币' }].map(item => {
                    return <Option key={item.key}>{item.val}</Option>
                  })
                }
              </Select>
            </div>
            <div className="header-item">
              <h3>会计期间</h3>
              <Cascader
                className="issues"
                options={[{
                  value: '2008年',
                  label: '2008年',
                  children: [{
                    value: '1期',
                    label: '1期'
                  }]
                }]}
                onChange={(value, selectedOptions) => {
                  console.log(value, selectedOptions);
                }}
                placeholder="请选择年份/期数"
              />
              <h3>至</h3>
              <Cascader
                className="issues"
                options={[{
                  value: '2008年',
                  label: '2008年',
                  children: [{
                    value: '1期',
                    label: '1期'
                  }]
                }]}
                onChange={(value, selectedOptions) => {
                  console.log(value, selectedOptions);
                }}
                placeholder="请选择年份/期数"
              />
            </div>
            <WhiteButton
              className="advanced-search"
              onMouseOver={() => {
                this.setState({
                  showPop: true
                });
              }}
            >
              高级查询
            <Icon type="caret-down" />
              {this.state.showPop ? (
                <div className="clearLine"></div>
              ) : null}
              {this.state.showPop ? (
                <div className="advanced-search-pop">
                  <div className="pop-content">
                    <div className="subject pop-content-item">
                      <h3 className="title">科目</h3>
                      <AutoComplete
                        placeholder="请输入科目名称/编码查询"
                        dataSource={this.state.subjectOfAtmDataSource}
                        onFocus={(value) => {
                          console.log(value, '1221111');
                          if (!this.state.subjectOfValue) {
                            this.setState({
                              subjectOfAtmDataSource: ['a', 'b', 'c']
                            });
                          }
                          
                        }}
                        onSearch={(value) => {
                          console.log(value);
                          if (value - 1 === 0) {
                            this.setState({
                              subjectOfValue: value,
                              subjectOfAtmDataSource: ['1', '1+1', '1+1+1']
                            });
                          }
                          if (value - 2 === 0) {
                            this.setState({
                              subjectOfAtmDataSource: ['1', '1+1', '1+1+1']
                            });
                          } 
                          // if (!value) {
                          //   this.setState({
                          //     subjectOfAtmDataSource: ['a', 'b', 'c']
                          //   });
                          // }
                        }}
                      >
                        
                      </AutoComplete>
                    </div>
                    <div className="cashFlowItem pop-content-item">
                      <div className="cashItem">
                        <h3 className="title">现金科目</h3>
                        <Select>
                          {
                            [{ k: 1, v: 'aaaaaaa' }, { k: 2, v: 'bbbbbbb' }].map(item => {
                              return <Option key={item.k} value={item.v}>{item.v}</Option>
                            })
                          }
                        </Select>
                      </div>
                      <div className="flowItem">
                        <h3 className="title">流量科目</h3>
                        <Select>
                          {
                            [{ k: 1, v: 'aaaaaaa' }, { k: 2, v: 'bbbbbbb' }].map(item => {
                              return <Option key={item.k} value={item.v}>{item.v}</Option>
                            })
                          }
                        </Select>
                      </div>
                    </div>
                    <div className="mainTableItem pop-content-item">
                      <div className="cashItem">
                        <h3 className="title">主表项目</h3>
                        <AutoComplete
                          dataSource={this.state.AtmDataSourceOfMainTable}
                          onSearch={(value) => {
                            console.log(value);
                            if (value - 1 === 0) {
                              this.setState({
                                AtmDataSourceOfMainTable: ['1', '1+1', '1+1+1']
                              });
                            }
                            if (value - 2 === 0) {
                              this.setState({
                                AtmDataSourceOfMainTable: ['1', '1+1', '1+1+1']
                              });
                            } 
                            if (!value) {
                              this.setState({
                                AtmDataSourceOfMainTable: ['a', 'b', 'c']
                              });
                            }
                          }}
                        >
                          <Search 
                            onSearch={() => {
                              this.setState({
                                showModal: (
                                  <ModalSubject
                                    title="现金流量项目表"
                                    onOk={() => {
                                      this.setState({
                                        showModal: ''
                                      })
                                    }}
                                    onCancel={() => {
                                      this.setState({
                                        showModal: ''
                                      })
                                    }} 
                                  />
                                ),
                                AtmDataSourceOfMainTable: []
                              });
                            }}
                          />
                        </AutoComplete>
                      </div>
                      <div className="flowItem">
                        <h3 className="title">至</h3>
                        <AutoComplete
                          dataSource={this.state.AtmDataSourceOfMainTable}
                          onSearch={(value) => {
                            console.log(value);
                            if (value - 1 === 0) {
                              this.setState({
                                AtmDataSourceOfMainTable: ['1', '1+1', '1+1+1']
                              });
                            } else {
                              this.setState({
                                AtmDataSourceOfMainTable: ['2', '2+1', '3+1+1']
                              });
                            }
                          }}
                        >
                          <Search
                            onSearch={() => {
                              this.setState({
                                showModal: (
                                  <Modal 
                                    title="123"
                                    visible={true}
                                  />
                                )
                              });
                            }}
                          />
                        </AutoComplete>
                      </div>
                    </div>
                    <div className="Llsts-container pop-content-item">
                      <div className="cashItem">
                        <h3 className="title">附表项目</h3>
                        <AutoComplete
                          dataSource={this.state.AtmDataSourceOfLlsts}
                          onSearch={(value) => {
                            console.log(value);
                            if (value - 1 === 0) {
                              this.setState({
                                AtmDataSourceOfLlsts: ['1', '1+1', '1+1+1']
                              });
                            } else {
                              this.setState({
                                AtmDataSourceOfLlsts: ['2', '2+1', '3+1+1']
                              });
                            }
                          }}
                        >
                          <Search />
                        </AutoComplete>
                      </div>
                      <div className="flowItem">
                        <h3 className="title">至</h3>
                        <AutoComplete
                          dataSource={this.state.atmDataSource}
                          onSearch={(value) => {
                            console.log(value);
                            if (value - 1 === 0) {
                              this.setState({
                                AtmDataSourceOfLlsts: ['1', '1+1', '1+1+1']
                              });
                            } else {
                              this.setState({
                                AtmDataSourceOfLlsts: ['2', '2+1', '3+1+1']
                              });
                            }
                          }}
                        >
                          <Search />
                        </AutoComplete>
                      </div>
                    </div>
                    <div className="checkbox-container pop-content-item">
                      <CheckboxGroup
                        options={['包含未过帐凭证', '显示禁用科目', '显示科目全名']}
                        value={this.state.checkedList}
                        onChange={(checkedList) => {
                          this.setState({
                            checkedList: checkedList
                          });
                        }} />
                    </div>
                  </div>
                  <div className="btns-confirm">
                    <WhiteButton
                      onClick={() => {
                        this.setState({
                          showPop: false
                        });
                      }}
                    >
                      取消
                  </WhiteButton>
                    <PurpleButton
                      onClick={() => {
                        this.setState({
                          showPop: false
                        });
                      }}
                    >
                      确定
                  </PurpleButton>
                  </div>
                </div>
              ) : null}
            </WhiteButton>
          </div>
          <div className="btns-group">
            <WhiteButton>刷新</WhiteButton>
            <WhiteButton className="moreOpr"
              onClick={() => {
                this.setState({
                  showMoreOprItems: !this.state.showMoreOprItems
                });
                console.log();
              }}
            >
              更多
              <ul style={{ display: this.state.showMoreOprItems ? 'block' : 'none' }}>
                <li
                  value="1"
                  onClick={(e) => {
                    this.setState({
                      showMoreOprItemValue: e.target
                    });
                  }}
                >打印</li>
                <li
                  value="2"
                  onClick={(e) => {
                    this.setState({
                      showMoreOprItemValue: e.target
                    });
                  }}
                >导出</li>
              </ul>
            </WhiteButton>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={[]}
          pagination={{
            current: this.state.currPage,
            pageSize: this.state.pageSize,
            pageSizeOptions: ['5', '10', '15'],
            onChange: (currPage, pageSize) => {
              console.log(currPage, pageSize);
              this.setState({
                currPage: currPage,
                pageSize: pageSize
              });
            },
            onShowSizeChange: (currPage, pageSize) => {
              console.log(currPage, pageSize);
              this.setState({
                currPage: currPage,
                pageSize: pageSize
              });
            },
            showTotal: (total, range) => {
              console.log(total, range);
              return `从 1 到 ${this.state.pageTotal} 共${this.state.dataCount} 条数据`
            },
            scroll: {x: true, y: 400},
            showQuickJumper: this.state.canQuickJump,
            showSizeChanger: true,
            defaultCurrent: 1,
            defaultPageSize: 5,
            total: this.state.dataCount
          }}
          bordered
        />
        {this.state.showModal}
      </div>
    )
  }
}

export default CashFlowTableMain;