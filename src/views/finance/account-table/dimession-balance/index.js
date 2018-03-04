import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon, Tabs, Checkbox, Popover, Menu, Dropdown, Button, Cascader, Row, Col } from 'antd';
import AdvancedQuery from 'components/advanced-query';
import ChoiceSubjectModal from 'components/choice-subject-modal';

import './dimession-balance.less'

@inject('dimBalanceAccountStore','appStore') @observer
class DimBalanceAccountContainer extends Component {

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
    // let {dimBalanceAccountStore} = this.props;
    // dimBalanceAccountStore.changePageControl('');
  }

  dateChange(value) {
    console.log(value);
  }



  render() {
    let { dimBalanceAccountStore,appStore } = this.props;
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;

    const dataSource = ['001032 农业银行', '001402  库存现金', '0101451102 应付账款_黎广森'];

    //更多
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

    const colligateMoney = [{//综合本位币
      title: '核算明细编码',
      dataIndex: 'name',
      width: '10%',
    }, {
      title: '核算名称',
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

    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div className="dimession-balance-top">
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
            <Select
              defaultValue="综合本位币"
              style={{ width: 110, fontSize: 14, }}
              onChange={(key) => {

              }} >
              <Option value={'综合本位币'}>综合本位币</Option>
              <Option value={'人民币'}>人民币</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span style={{ marginRight: 10 }}>核算维度</span>
            <Select
              defaultValue="供应商"
              style={{ width: 110, fontSize: 14, }}
              onChange={(key) => {

              }} >
              <Option value={'供应商'}>供应商</Option>
              <Option value={'部门'}>部门</Option>
            </Select>
          </Col>
          <Col span={7}>
            <span style={{ marginRight: 10 }}>会计期间</span>
            <Cascader
              options={date}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.dateChange}
              defaultValue={["2008年", "1期"]} />
            <span className="dimession-balance-and">至</span>
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
              <div className="dimession-balance-contentDiv-nav">
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
                    <span>核算明细</span>
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
                        <Input suffix={<Icon type="" className="certain-category-icon" />} />
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
                        <Input suffix={<Icon type="" className="certain-category-icon" />} />
                      </AutoComplete>
                    </div>
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
                  <Col span={12}><Checkbox>包含未过账凭证</Checkbox></Col>
                  <Col span={12}><Checkbox>显示禁用核算维度</Checkbox></Col>
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
          <Col span={2} style={{ marginLeft: -30 }} onClick={()=>{
            appStore.openNewTab(appStore.ALL_MENU.account_table_detail_key);
          }}>
            <Button>
              查看明细帐
            </Button>
          </Col>
          <Col span={1}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button>
                更多
            </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div className="dimession-balance-table">
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
        />
      </div>
      {this.state.stateDialog}
    </div>
  }
}

export default DimBalanceAccountContainer;