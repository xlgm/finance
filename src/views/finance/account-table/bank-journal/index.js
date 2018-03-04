import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon, Tabs, Checkbox, Popover, Menu, Dropdown, Button, Cascader, DatePicker, Radio, Row, Col } from 'antd';
import AdvancedQuery from 'components/advanced-query';

import './bank-joumal.less'

const { MonthPicker, RangePicker } = DatePicker;
@inject('bankAccountStore') @observer
class BankAccountContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      stateDialog: '',
      size: 'default',
      selectedRowKeys: [],
      currencyValue: '1',//币别

      subjectLevelEnd: '1',
      subjectLevelStart: '1',
    }
  }

  componentWillUnmount() {
    // let {bankAccountStore} = this.props;
    // bankAccountStore.changePageControl('');
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

  dateChange(value) {
    console.log(value);
  }



  render() {
    let { bankAccountStore } = this.props;
    const { size } = this.state;
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;



    function handleMenuClick(e) {

      // console.log('click', e);
    }
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">打印</Menu.Item>
        <Menu.Item key="2">导出</Menu.Item>

      </Menu>
    );

    const dataSource = ['001032 农业银行', '001402  库存现金', '0101451102 应付账款_黎广森'];
    const colligateMoney = [{//综合本位币
      title: '日期',
      dataIndex: 'name',
      width: '15%',
    }, {
      title: '凭证字号',
      dataIndex: 'age',
      width: '10%',
      render: (text) => {
        return <div className="certificate-size">{text}</div>
      }
    }, {
      title: '摘要',
      // colSpan: 2,
      dataIndex: 'tel',
      width: '20%',
    }, {
      title: '对方科目',
      // colSpan: 0,
      dataIndex: 'phone',
      width: '10%',
    }, {
      title: '借方金额',
      dataIndex: 'address',
      width: '10%',
    }, {
      title: '贷方金额',
      dataIndex: 'address1',
      width: '10%',
    }, {
      title: '方向',
      dataIndex: 'address2',
      width: '10%',
    }, {
      title: '余额',
      dataIndex: 'address3',

    }];



    const colligateMoneyData = [{//综合本位币
      key: '1',
      name: '2017-01-01',
      age: '记2',
      tel: '期初余额',
      phone: '',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '2',
      name: '2017-01-01',
      age: '记2',
      tel: '期初余额',
      phone: '',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '3',
      name: '2017-01-01',
      age: '记2',
      tel: '期初余额',
      phone: '',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '4',
      name: '2017-01-01',
      age: '记2',
      tel: '期初余额',
      phone: '',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '5',
      name: '2017-01-01',
      age: '记2',
      tel: '期初余额',
      phone: '',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '6',
      name: '2017-01-01',
      age: '记2',
      tel: '期初余额',
      phone: '',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }];

    let dollar = [//美元
      {
        title: '日期',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '5%',
      },
      {
        title: "凭证字号",
        dataIndex: "subjectCode",
        key: 'subjectCode',
        width: '5%',
        render: (text) => {
          return <div className="certificate-size">{text}</div>
        }
      },
      {
        title: "摘要",
        dataIndex: "subjectName",
        key: 'subjectName',
        width: '10%',

      },
      {
        title: "对方科目",
        dataIndex: "direction",
        key: 'direction',
        width: '10%',
      },
      {
        title: "借方金额",
        children: [{
          title: '原币',
          dataIndex: 'jforiginal',
          key: 'jforiginal',
          width: '5%',

        }, {
          title: '本位币',
          dataIndex: 'jfstandard',
          key: 'jfstandard',
          width: '5%',

        }],
      },
      {
        title: "贷方金额",
        children: [{
          title: '原币',
          dataIndex: 'dforiginal',
          key: 'dforiginal',
          width: '5%',

        }, {
          title: '本位币',
          dataIndex: 'dfstandard',
          key: 'dfstandard',
          width: '5%',

        }],
      },
      {
        title: '方向',
        dataIndex: "directions",
        key: 'directions',
        width: '5%',
      },
      {
        title: "贷方金额",
        children: [{
          title: '原币',
          dataIndex: 'dforiginals',
          key: 'dforiginals',
          width: '5%',

        }, {
          title: '本位币',
          dataIndex: 'dfstandards',
          key: 'dfstandards',
          width: '5%',

        }],
      },
    ];
    const dollarData = [//美元
      {
        key: '1',
        serialNumber: '2017-01-31',
        subjectCode: '1001',
        subjectName: '银行存款',
        direction: '1001 库存现金',
        currey: 'USD/14.9160',
        jforiginal: '335.21',
        jfstandard: '5000.00',
        dforiginal: '335.21',
        dfstandard: '5000.00',
        directions: '贷',
        dforiginals: '5000.00',
        dfstandards: '5000.00',
      }, {
        key: '2',
        serialNumber: '2017-01-31',
        subjectCode: '记9',
        subjectName: '本期合计',
        direction: '1001 库存现金',
        currey: 'USD/14.9160',
        jforiginal: '335.21',
        jfstandard: '5000.00',
        dforiginal: '335.21',
        dfstandard: '5000.00',
        directions: '贷',
        dforiginals: '5000.00',
        dfstandards: '5000.00',
      }
    ]

    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div className="bank-joumal-top">
        <Row>
          <Col span={3}>
            <span style={{ marginRight: 10 }}>账簿</span>
            <Select
              defaultValue="拓润"
              style={{ width: 110, fontSize: 14, }}
              onChange={(key) => {

              }} >
              <Option value={'拓润'}>拓润</Option>
              <Option value={'不用等'}>不用等</Option>
            </Select>
          </Col>
          <Col span={3}>
            <span style={{ marginRight: 10 }}>币别</span>
            <Select placeholder="选择一个选项"
              defaultValue={this.state.currencyValue}
              onChange={this.currencyHandleChange}
              style={{ width: 110, fontSize: 14, }}
            >
              <Select.Option value="1">综合本币位</Select.Option>
              <Select.Option value="2">人民币</Select.Option>
              <Select.Option value="3">美元</Select.Option>
            </Select>
          </Col>
          <Col span={7}>
            <span style={{ marginRight: 10 }}>会计期间</span>
            <DatePicker size={size} style={{ width: 120 }} />
            <span className="bank-joumal-top-and">至</span>
            <DatePicker size={size} style={{ width: 120 }} />
          </Col>
          <Col span={6}>
            <Row>
              <Col span={5}>
                <span>现金科目</span>
              </Col>
              <Col span={10}>
                <div className="certain-category-search-wrapper" style={{ width: 200 }}>
                  <AutoComplete
                    className="certain-category-search"
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={false}
                    dropdownStyle={{ width: 100 }}
                    style={{ width: '100%' }}
                    dataSource={dataSource}
                    placeholder="请输入科目名称/编码查询"
                    optionLabelProp="value"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onChange={(value) => {

                    }}
                  >
                    <Input suffix={<Icon type="" className="certain-category-icon" />} />
                  </AutoComplete>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={2} style={{ marginTop: 3 }}>
            <AdvancedQuery
              width={600}
              height={250}
              onCancel={() => { }}
              onOk={() => { }}
            >
              <div className="bank-joumal-contentDiv-nav">
                <Row>
                  <Col span={4}>
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
                  <Col span={4}>
                    <span>科目级别</span>
                  </Col>
                  <Col span={8}>
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
                  <Col span={2}>
                    <span style={{ marginLeft: 10 }}>至</span>
                  </Col>
                  <Col span={8}>
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
                  <Col span={12}><Checkbox>按对方科目展开</Checkbox></Col>
                  <Col span={12}><Checkbox>包含未过账凭证</Checkbox></Col>
                </Row>
              </div>
            </AdvancedQuery>
          </Col>
          <Col span={2}>
            <Button>
              刷新
            </Button>
          </Col>
          <Col span={1} style={{ marginLeft: -30 }}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button>
                更多
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div className="bank-joumal-table">
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
            scroll={{ x: 1500, y: 330 }}
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
    </div>

  }
}

export default BankAccountContainer;