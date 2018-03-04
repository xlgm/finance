import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon, Tabs, Checkbox, Popover, Menu, Dropdown, Button, Cascader, Row, Col } from 'antd';
import AdvancedQuery from 'components/advanced-query';
import ChoiceSubjectModal from 'components/choice-subject-modal';

import './dimension-detail.less'

@inject('dimDetailAccountStore') @observer
class DimDetailAccountContainer extends Component {

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
    // let {dimDetailAccountStore} = this.props;
    // dimDetailAccountStore.changePageControl('');
  }

  // 币别选择
  currencyHandleChange = (value) => {
    let commonVal = value;
    if (value === '1' || value === '3') {
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
    let { dimDetailAccountStore } = this.props;
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;


  

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

    let allCurrency = [//所有币别
      {
        title: '日期',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '10%',
      },
      {
        title: "凭证字号",
        dataIndex: "subjectCode",
        key: 'subjectCode',
        width: '5%',
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
        title: '币别',
        dataIndex: "currey",
        key: 'currey',
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
    const allCurrencyData = [//所有币别
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

    const TreeNode = Tree.TreeNode;

    const treeData = (dimDetailAccountStore.treeData && dimDetailAccountStore.treeData.data.map((item) => {
      item.key = item.id
      return item
    }))

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.id} title={item.name}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.id} title={item.name} />;
    });

    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div className="dimession-detail-top">
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
              style={{ width: 100, fontSize: 14, }}
            >
              <Select.Option value="1">综合本币位</Select.Option>
              <Select.Option value="2">所有币别</Select.Option>
              <Select.Option value="3">人民币</Select.Option>
              <Select.Option value="4">美元</Select.Option>
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
            <span className="dimession-detail-and">至</span>
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
              <div className="dimession-detail-contentDiv-nav">
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
      <div className="dimession-detail-middle">
        <span>核算维度明细：不用等餐饮集团</span>
      </div>
      <div className="dimession-detail-table">
        <div className="dimession-detail-table-table">
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
          {this.state.currencyValue * 1 === 2 &&//所有币别
            <Table
              rowSelection={null}
              scroll={{ x: 1300, y: 330 }}
              columns={allCurrency}
              bordered
              pagination={false}
              dataSource={allCurrencyData}
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
          {this.state.currencyValue * 1 === 4 &&//美元
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
        <div className="dimession-detail-table-tree">
          <div className="certain-category-search-wrapper">
            <AutoComplete
              className="certain-category-search"
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth={false}
              dropdownStyle={{ width: 100 }}
              size="large"
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
            <Tree
              className="draggable-tree"
              showLine
            >
              {loop(treeData)}
            </Tree>
          </div>
          <div>

          </div>
        </div>
      </div>
      {this.state.stateDialog}
    </div>

  }
}

export default DimDetailAccountContainer;