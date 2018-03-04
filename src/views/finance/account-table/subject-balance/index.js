import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon, Tabs, Checkbox, Popover, Menu, Dropdown, Button, Cascader, Row, Col } from 'antd';
import AdvancedQuery from 'components/advanced-query';
import ChoiceSubjectModal from 'components/choice-subject-modal';

import './balance.less';

@inject('subjectAccountStore', 'appStore') @observer
class SubjectAccountContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stateDialog: '',
      pageNum: 1,
      pageSize: 10,
      selectedRowKeys: [],
      currencyValue: '1',//币别

      subjectLevelEnd: '1',
      subjectLevelStart: '1',
    }
  }

  componentWillUnmount() {
    // let {subjectAccountStore} = this.props;
    // subjectAccountStore.changePageControl('');
  }

  // 币别选择
  currencyHandleChange = (value) => {
    let commonVal = value;
    if (value === '1' || value === '2') {
      commonVal = '1';
    }
    this.setState({
      currencyValue: commonVal,

    });
  }



  render() {
    let { subjectAccountStore, appStore } = this.props;
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;

    const dataSource = ['001032 农业银行', '001402  库存现金', '0101451102 应付账款_黎广森'];

    
    //选择日期
    const date = [];
    const dateChildren = [];
    let dateNow = new Date;
    let year = dateNow.getFullYear();

    for (let i = 1; i <= 12; i++) {
      dateChildren.push({
        value: `${i}期`,
        label: `${i}期`,
      })
    }
    for (let i = 2008; i <= year; i++) {
      date.push({
        value: `${i}年`,
        label: `${i}年`,
        children: dateChildren,
      })
    }

    const colligateMoney = [{//综合本位币
      title: '科目编码',
      dataIndex: 'name',
      width: '10%',
    }, {
      title: '科目名称',
      dataIndex: 'age',
      width: '10%',

    }, {
      title: '期初余额',
      children: [{
        title: '借方',
        dataIndex: 'address',
        key: 'address',
        width: '5%',

      }, {
        title: '贷方',
        dataIndex: 'address1',
        key: 'address1',
        width: '5%',
      }],
    }, {
      title: '本期发生额',
      children: [{
        title: '借方',
        dataIndex: 'address2',
        key: 'address2',
        width: '5%',

      }, {
        title: '贷方',
        dataIndex: 'address3',
        key: 'address3',
        width: '5%',
      }],
    }, {
      title: '本年累计发生额',
      children: [{
        title: '借方',
        dataIndex: 'address4',
        key: 'address4',
        width: '5%',

      }, {
        title: '贷方',
        dataIndex: 'address5',
        key: 'address5',
        width: '5%',
      }],
    }, {
      title: '期未余额',
      children: [{
        title: '借方',
        dataIndex: 'address6',
        key: 'address6',
        width: '5%',

      }, {
        title: '贷方',
        dataIndex: 'address7',
        key: 'address7',
        width: '5%',
      }],
    }];



    const colligateMoneyData = [{//综合本位币
      key: '1',
      name: '1001',
      age: '库存现金',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
      address4: '110.00',
      address5: '120.00',
      address6: '110.00',
      address7: '120.00',
      children: [{
        key: '11',
        name: '1002',
        age: '库存现金001',
        address: '20.00',
        address1: '50.00',
        address2: '借',
        address3: '10.00',
        address4: '10.00',
        address5: '10.00',
        address6: '11.00',
        address7: '10.00',
        children: [{
          key: '110',
          name: '102',
          age: '库存现金003',
          address: '2.00',
          address1: '5.00',
          address2: '借',
          address3: '1.00',
          address4: '1.00',
          address5: '1.00',
          address6: '1.00',
          address7: '1.00',
        }]
      }]
    }, {
      key: '2',
      name: '1001',
      age: '库存现金',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
      address4: '110.00',
      address5: '120.00',
      address6: '110.00',
      address7: '120.00',
    }, {
      key: '3',
      name: '1001',
      age: '库存现金',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
      address4: '110.00',
      address5: '120.00',
      address6: '110.00',
      address7: '120.00',
    }, {
      key: '4',
      name: '1001',
      age: '库存现金',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
      address4: '110.00',
      address5: '120.00',
      address6: '110.00',
      address7: '120.00',
    }, {
      key: '5',
      name: '1001',
      age: '库存现金',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
      address4: '110.00',
      address5: '120.00',
      address6: '110.00',
      address7: '120.00',
    }, {
      key: '6',
      name: '1001',
      age: '库存现金',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
      address4: '110.00',
      address5: '120.00',
      address6: '110.00',
      address7: '120.00',
    }];

    let dollar = [//美元
      {
        title: '科目编码',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '5%',
      },
      {
        title: "科目名称",
        dataIndex: "subjectCode",
        key: 'subjectCode',
        width: '5%',
      },
      {
        title: "期初余额",
        children: [{
          title: '借方(原币)',
          dataIndex: 'address',
          key: 'address',
          width: '5%',

        }, {
          title: '借方(本位币)',
          dataIndex: 'address1',
          key: 'address1',
          width: '5%',
        }, {
          title: '贷方(原币)',
          dataIndex: 'address2',
          key: 'address2',
          width: '5%',
        }, {
          title: '贷方(本位币)',
          dataIndex: 'address3',
          key: 'address3',
          width: '5%',
        }],

      },
      {
        title: "本期发生额",
        children: [{
          title: '借方(原币)',
          dataIndex: 'address4',
          key: 'address4',
          width: '5%',

        }, {
          title: '借方(本位币)',
          dataIndex: 'address5',
          key: 'address5',
          width: '5%',
        }, {
          title: '贷方(原币)',
          dataIndex: 'address6',
          key: 'address6',
          width: '5%',
        }, {
          title: '贷方(本位币)',
          dataIndex: 'address7',
          key: 'address7',
          width: '5%',
        }],
      },
      {
        title: "本年累计发生额",
        children: [{
          title: '借方(原币)',
          dataIndex: 'address8',
          key: 'address8',
          width: '5%',

        }, {
          title: '借方(本位币)',
          dataIndex: 'address9',
          key: 'address9',
          width: '5%',
        }, {
          title: '贷方(原币)',
          dataIndex: 'address10',
          key: 'address10',
          width: '5%',
        }, {
          title: '贷方(本位币)',
          dataIndex: 'address11',
          key: 'address11',
          width: '5%',
        }],
      },
      {
        title: "期未余额",
        children: [{
          title: '借方(原币)',
          dataIndex: 'address12',
          key: 'address12',
          width: '5%',

        }, {
          title: '借方(本位币)',
          dataIndex: 'address13',
          key: 'address13',
          width: '5%',
        }, {
          title: '贷方(原币)',
          dataIndex: 'address14',
          key: 'address14',
          width: '5%',
        }, {
          title: '贷方(本位币)',
          dataIndex: 'address15',
          key: 'address15',
          width: '5%',
        }],
      },
    ];
    const dollarData = [//美元
      {
        key: '1',
        serialNumber: '1001',
        subjectCode: '库存现金',
        address: '200.00',
        address1: '500.00',
        address2: '100.00',
        address3: '200.00',
        address4: '500.00',
        address5: '100.00',
        address6: '200.00',
        address7: '500.00',
        address8: '100.00',
        address9: '200.00',
        address10: '500.00',
        address11: '100.00',
        address12: '200.00',
        address13: '500.00',
        address14: '100.00',
      }, {
        key: '2',
        serialNumber: '1001',
        subjectCode: '库存现金',
        address: '200.00',
        address1: '500.00',
        address2: '100.00',
        address3: '200.00',
        address4: '500.00',
        address5: '100.00',
        address6: '200.00',
        address7: '500.00',
        address8: '100.00',
        address9: '200.00',
        address10: '500.00',
        address11: '100.00',
        address12: '200.00',
        address13: '500.00',
        address14: '100.00',
      }
    ]
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div className="subject-balance-top">
        <Row>
          <Col span={4}>
            <span style={{ marginRight: 10 }}>账簿</span>
            <Select
              defaultValue="拓润"
              style={{ width: 120, fontSize: 14, }}
              onChange={(key) => {

              }} >
              <Option value={'拓润'}>拓润</Option>
              <Option value={'不用等'}>不用等</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span style={{ marginRight: 10 }}>币别</span>
            <Select
              defaultValue={this.state.currencyValue}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.currencyHandleChange} >
              <Select.Option value="1">综合本币位</Select.Option>
              <Select.Option value="2">人民币</Select.Option>
              <Select.Option value="3">美元</Select.Option>
            </Select>
          </Col>
          <Col span={7}>
            <span style={{ marginRight: 10 }}>会计期间</span>
            <Cascader
              options={date}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.dateChange}
              defaultValue={["2008年", "1期"]} />
            <span className="subject-balance-top-and">至</span>
            <Cascader
              options={date}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.dateChange}
              defaultValue={["2008年", "1期"]} />
          </Col>
          <Col span={2} style={{ marginTop: 3 }}>
            <AdvancedQuery
              width={710}
              height={300}
              onCancel={() => { }}
              onOk={() => { }}
            >
              <div className="subject-balance-contentDiv-nav">
                <Row>
                  <Col span={3}>
                    <span>核算组织</span>
                  </Col>
                  <Col span={3}>
                    <Input
                      disabled
                      value={'研发中心'}
                      style={{ width: 165 }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={3}>
                    <span>科目</span>
                  </Col>
                  <Col span={6}>
                    <div className="certain-category-search-wrapper">
                      <AutoComplete
                        className="certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        style={{ width: '100%' }}
                        dataSource={dataSource}
                        placeholder="请输入科目名称/编码查询"
                        optionLabelProp="value"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => {

                        }}
                      >
                        <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.setState({
                            stateDialog: <ChoiceSubjectModal
                              onCancel={() => {
                                this.setState({ stateDialog: '' });
                              }}
                              onOk={() => {
          
          
                              }}
                            />
                          })
                        }} />} />
                      </AutoComplete>
                    </div>
                  </Col>
                  <Col span={3}>
                    <span style={{ marginLeft: 35 }}>至</span>
                  </Col>
                  <Col span={6}>
                    <div className="certain-category-search-wrapper">
                      <AutoComplete
                        className="certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        style={{ width: '100%' }}
                        dataSource={dataSource}
                        placeholder="请输入科目名称/编码查询"
                        optionLabelProp="value"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => {

                        }}
                      >
                        <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.setState({
                            stateDialog: <ChoiceSubjectModal
                              onCancel={() => {
                                this.setState({ stateDialog: '' });
                              }}
                              onOk={() => {
          
          
                              }}
                            />
                          })
                        }} />} />
                      </AutoComplete>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={3}>
                    <span>科目级别</span>
                  </Col>
                  <Col span={6}>
                    <Select
                      value={this.state.subjectLevelStart}
                      style={{ width: 163, fontSize: 14, }}
                      onChange={(value) => {
                        this.setState({ subjectLevelStart: value })
                      }} >
                      <Option value='1'>1</Option>
                      <Option value='2'>2</Option>
                      <Option value='3'>3</Option>
                      <Option value='4'>4</Option>
                      <Option value='5'>5</Option>
                    </Select>
                    {this.state.subjectLevelStart > this.state.subjectLevelEnd ?
                      <div style={{ position: 'absolute', top: 21, color: 'red', height: 0 }}>开始级别大于结束级别</div> : ''
                    }
                  </Col>
                  <Col span={3}>
                    <span style={{ marginLeft: 35 }}>至</span>
                  </Col>
                  <Col span={6}>
                    <Select
                      value={this.state.subjectLevelEnd}
                      style={{ width: 163, fontSize: 14, }}
                      onChange={(value) => {
                        this.setState({ subjectLevelEnd: value })
                      }} >
                      <Option value='1'>1</Option>
                      <Option value='2'>2</Option>
                      <Option value='3'>3</Option>
                      <Option value='4'>4</Option>
                      <Option value='5'>5</Option>
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}><Checkbox>显示禁用科目</Checkbox></Col>
                  <Col span={8}><Checkbox>包含未过账凭证</Checkbox></Col>
                  <Col span={8}><Checkbox>显示核算维度明细</Checkbox></Col>
                </Row>
                <Row>
                  <Col span={8}><Checkbox>无发生额不显示</Checkbox></Col>
                  <Col span={8}><Checkbox>余额为0不显示</Checkbox></Col>
                  <Col span={8}><Checkbox>显示科目全名</Checkbox></Col>
                </Row>
              </div>
            </AdvancedQuery>
          </Col>
          <Col span={2}>
            <Button onClick={() => {
              appStore.openNewTab(appStore.ALL_MENU.account_table_detail_key);
            }} style={{}}>
              查看明细帐
            </Button>
          </Col>
          <Col span={2}>
            <Button style={{}}>
              刷新
          </Button>
          </Col>
          <Col span={3}>
            <Button style={{ marginRight: 15 }}>
              打印
            </Button>
            <Button>
              导出
            </Button>
          </Col>
        </Row>
      </div>
      <div className="subject-balance-table">
        <div className="subject-balance-table-table">
          {this.state.currencyValue * 1 === 1 &&//综合本位币
            <Table
              columns={colligateMoney}
              dataSource={colligateMoneyData}
              bordered
              scroll={{ y: 330 }}
              pagination={{  //分页
                // total: dimensionStore.total,
                pageSize: this.state.pageSize,
                current: this.state.pageNum,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                onShowSizeChange: (current, pageSize) => {
                  this.setState({

                  });

                },
                onChange: (pageNum) => {
                  this.setState({

                  });

                },
                showTotal: () => { //设置显示一共几条数据
                  return `从1至100页 共100条数据`
                }
              }}
            />}

          {this.state.currencyValue * 1 === 3 &&//美元
            <Table
              rowSelection={null}
              scroll={{ x: 1800, y: 330, }}
              columns={dollar}
              bordered
              pagination={false}
              dataSource={dollarData}
              pagination={{  //分页
                // total: dimensionStore.total,
                pageSize: this.state.pageSize,
                current: this.state.pageNum,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                onShowSizeChange: (current, pageSize) => {
                  this.setState({

                  });

                },
                onChange: (pageNum) => {
                  this.setState({

                  });

                },
                showTotal: () => { //设置显示一共几条数据
                  return `从1至100页 共100条数据`
                }
              }}
            />}
        </div>
        {this.state.stateDialog}
      </div>
    </div>

  }
}

export default SubjectAccountContainer;