import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon, Tabs, Checkbox, Popover, Menu, Dropdown, Button, Cascader, Row, Col } from 'antd';
import AdvancedQuery from 'components/advanced-query';
import ChoiceSubjectModal from 'components/choice-subject-modal';

import './total.less'
@inject('totalAccountStore', 'appStore') @observer
class TotalAccountContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stateDialog: '',
      pageNum: 1,
      pageSize: 10,
      selectedRowKeys: [],

      subjectLevelEnd: '1',
      subjectLevelStart: '1',
    }
  }

  componentWillUnmount() {
    // let {totalAccountStore} = this.props;
    // totalAccountStore.changePageControl('');
  }

  dateChange(value) {
    console.log(value);
  }



  render() {
    let { totalAccountStore, appStore } = this.props;
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


    const columns = [{
      title: '科目编码',
      dataIndex: 'name',
      width: '15%',
      render: (value, row, index) => {

        const obj = {
          children: value,
          props: {},
        };
        //索引为1合并三单元格
        if (index === 0) {
          obj.props.rowSpan = 3;
        }
        //合并后索引为1和2的单元格rowSpan = 0干掉！
        if (index === 1) {
          obj.props.rowSpan = 0;
        }
        if (index === 2) {
          obj.props.rowSpan = 0;
        }
        //索引为3合并三单元格
        if (index === 3) {
          obj.props.rowSpan = 3;
        }
        if (index === 4) {
          obj.props.rowSpan = 0;
        }
        if (index === 5) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    }, {
      title: '科目名称',
      dataIndex: 'age',
      width: '15%',
      render: (value, row, index) => {

        const obj = {
          children: value,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = 3;
        }
        if (index === 1) {
          obj.props.rowSpan = 0;
        }
        if (index === 2) {
          obj.props.rowSpan = 0;
        }
        if (index === 3) {
          obj.props.rowSpan = 3;
        }
        if (index === 4) {
          obj.props.rowSpan = 0;
        }
        if (index === 5) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },

    }, {
      title: '会计期间',
      // colSpan: 2,
      dataIndex: 'tel',
      width: '10%',
    }, {
      title: '摘要',
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

    const data = [{
      key: '1',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '2',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '3',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '4',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '5',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '6',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '7',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '8',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',
    }, {
      key: '9',
      name: '1001',
      age: '库存现金',
      tel: '2017年1期',
      phone: '期初余额',
      address: '200.00',
      address1: '500.00',
      address2: '借',
      address3: '100.00',

    }];

    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div className="total-top">
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
              defaultValue="综合本位币"
              style={{ width: 120, fontSize: 14, }}
              onChange={(key) => {

              }} >
              <Option value={'综合本位币'}>综合本位币</Option>
              <Option value={'人民币'}>人民币</Option>
            </Select>
          </Col>
          <Col span={7}>
            <span style={{ marginRight: 10 }}>会计期间</span>
            <Cascader
              options={date}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.dateChange}
              defaultValue={["2008年", "1期"]} />
            <span className="total-top-and">至</span>
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
              <div className="total-contentDiv-nav">
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
                  <Col span={8}><Checkbox>包含未过账凭证</Checkbox></Col>
                  <Col span={8}><Checkbox>显示核算维度明细</Checkbox></Col>
                  <Col span={8}><Checkbox>显示科目全名</Checkbox></Col>
                </Row>
                <Row>
                  <Col span={8}><Checkbox>无发生额不显示</Checkbox></Col>
                  <Col span={8}><Checkbox>余额为0不显示</Checkbox></Col>
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
            <Button>
              刷新
            </Button>
          </Col>
          <Col span={3}>
            <Button  style={{marginRight: 15}}>
              打印
            </Button>
            <Button>
              导出
            </Button>
          </Col>
        </Row>
      </div>
      <div className="total-table">
        <Table
          columns={columns}
          dataSource={data}
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

export default TotalAccountContainer;