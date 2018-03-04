import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon, Tabs, Checkbox, Popover, Menu, Dropdown, Button, Cascader, Row, Col } from 'antd';
import AdvancedQuery from 'components/advanced-query';
import ChoiceSubjectModal from 'components/choice-subject-modal';

import './multi.less'

@inject('multiAccountStore') @observer
class MultiAccountContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      stateDialog: '',
      selectedRowKeys: [],
      currencyValue: '1',//币别
    }
  }

  componentWillUnmount() {
    // let {multiAccountStore} = this.props;
    // multiAccountStore.changePageControl('');
  }


  render() {
    let { multiAccountStore } = this.props;
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


    const dataSource = ['001032 农业银行', '001402  库存现金', '0101451102 应付账款_黎广森'];
    const colligateMoney = [{//综合本位币
      title: '日期',
      dataIndex: 'name',
      width: '10%',
    }, {
      title: '凭证字号',
      dataIndex: 'age',
      width: '5%',
      render: (text) => {
        return <div className="certificate-size">{text}</div>
      }
    }, {
      title: '摘要',
      dataIndex: 'tel',
      width: '15%',
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
      width: '5%',
    }, {
      title: '余额',
      dataIndex: 'address3',
      width: '10%',
    }, {
      title: "借方",
      children: [{
        title: '工资',
        dataIndex: 'dforiginals1',
        key: 'dforiginals1',
        width: '5%',

      }, {
        title: '福利费用',
        dataIndex: 'dfstandards2',
        key: 'dfstandards2',
        width: '5%',
      }, {
        title: '办公费用',
        dataIndex: 'dfstandards3',
        key: 'dfstandards3',
        width: '5%',
      }, {
        title: '交通费',
        dataIndex: 'dfstandards4',
        key: 'dfstandards4',
        width: '5%',
      }],

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
      dforiginals1: '100.00',
      dforiginals2: '100.00',
      dforiginals3: '100.00',
      dforiginals4: '100.00',
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
      dforiginals1: '100.00',
      dforiginals2: '100.00',
      dforiginals3: '100.00',
      dforiginals4: '100.00',
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
      dforiginals1: '100.00',
      dforiginals2: '100.00',
      dforiginals3: '100.00',
      dforiginals4: '100.00',

    }];


    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div className="multi-account-top">
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
            </Select>
          </Col>
          <Col span={7}>
            <span style={{ marginRight: 10 }}>会计期间</span>
            <Cascader
              options={date}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.dateChange}
              defaultValue={["2008年", "1期"]} />
            <span className="multi-account-top-and">至</span>
            <Cascader
              options={date}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.dateChange}
              defaultValue={["2008年", "1期"]} />
          </Col>
          <Col span={5}>
            <Row>
              <Col span={3}>
                <span>科目</span>
              </Col>
              <Col span={12}>
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
          </Col>
          <Col span={2} style={{ marginTop: 3 }}>
            <AdvancedQuery
              width={500}
              height={250}
              onCancel={() => { }}
              onOk={() => { }}
            >
              <div className="multi-account-contentDiv-nav">
                <Row>
                  <Col span={4}>
                    <span>核算维度</span>
                  </Col>
                  <Col span={4}>
                    <Select
                      defaultValue="综合本位币"
                      style={{ width: 163, fontSize: 14, }}
                      onChange={(key) => {

                      }} >
                      <Option value={'综合本位币'}>综合本位币</Option>
                      <Option value={'人民币'}>人民币</Option>
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <span>核算明细</span>
                  </Col>
                  <Col span={12}>
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
                  <Col span={12}><Checkbox>显示禁用核算维度</Checkbox></Col>
                  <Col span={12}><Checkbox>只显示最明细科目</Checkbox></Col>
                </Row>
                <Row>
                  <Col span={12}><Checkbox>无发生额不显示</Checkbox></Col>
                  <Col span={12}><Checkbox>余额为0不显示</Checkbox></Col>
                </Row>
              </div>
            </AdvancedQuery>
          </Col>
          <Col span={2}>
            <Button style={{}}>
              刷新
            </Button>
          </Col>
          <Col span={2}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button>
                更多
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div className="multi-table">
        <Table
          columns={colligateMoney}
          dataSource={colligateMoneyData}
          bordered
          scroll={{ x: 1300, y: 330 }}
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
        />
      </div>
      {this.state.stateDialog}
    </div>

  }
}

export default MultiAccountContainer;