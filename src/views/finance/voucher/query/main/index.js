import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import { Dropdown, Menu, Row, Col, Select, Cascader, Input, AutoComplete, Icon, Table } from 'antd';
import AdvancedQuery from 'components/advanced-query';
import './main.less';

const Option = Select.Option;

@inject('voQueryStore') @observer
class QueryMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      stateDialog: '',
      selectedRowKeys: [],
    }
  }

  handleChange = (value) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  onSelect=(value)=> {
    console.log('onSelect', value);
  }

  render() {
    const { voQueryStore } = this.props;
    const menu = (
      <Menu onClick={({ item, key, keyPath })=>{
        if(key==='3'){
          voQueryStore.changePageControl('Arrange');
        }
      }}>
        <Menu.Item key="1">作废</Menu.Item>
        <Menu.Item key="2">反作废</Menu.Item>
        <Menu.Item key="3">整理断号</Menu.Item>
        <Menu.Item key="4">冲销</Menu.Item>
        <Menu.Item key="5">打印</Menu.Item>
        <Menu.Item key="6">导出</Menu.Item>
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
       const { dataSource } = this.state;


       const voucherColums = [
        {
          title: '账簿',
          dataIndex: 'ledger',
          width: '5%',
        }, 
        {
          title: '日期',
          dataIndex: 'date', 
          width: '5%',
        },
        {
          title: '凭证字号',
          dataIndex: 'voucher_num',
          width: '5%',
        }, 
        {
          title: '摘要',
          dataIndex: 'proof',
          width: '10%',
        }, 
        {
          title: '科目',
          dataIndex: 'subject',
          width: '10%',
        }, 
        {
          title: '币别',
          dataIndex: 'currency',
          width: '5%',
        },
        {
          title: '原币金额',
          dataIndex: 'origin_currency',
          width: '5%',
        }, 
        {
          title: '借方金额',
          dataIndex: 'jie',
          width: '5%',
        }, 
        {
          title: '贷方金额',
          dataIndex: 'dai',
          width: '5%',
        }, 
        {
          title: '附件数',
          dataIndex: 'files',
          width: '5%',
        },
        {
          title: '来源',
          dataIndex: 'source',
          width: '5%',
        }, 
        {
          title: '已指定现金流量项目',
          dataIndex: 'cash_flow',
          width: '5%',
        }, 
        {
          title: '状态',
          dataIndex: 'status',
          width: '5%',
        },
        {
          title: '制单人',
          dataIndex: 'maker',
          width: '5%',
        }, 
        {
          title: '审核人',
          dataIndex: 'he',
          width: '5%',
        },
        {
          title: '主管',
          dataIndex: 'zhuguan',
          width: '5%',
        }, 
        {
          title: '过帐人',
          dataIndex: 'guozhang',
          width: '5%',
        },
        {
          title: '出纳',
          dataIndex: 'chuna',
          width: '5%',
        }
       ]

       const voucherData = [
        {
          key:1,
          ledger:'账簿',
          date:'2017-02-18',
          voucher_num:'记—1',
          proof:'新浦销货',
          subject:'405现金_0203小刘_01小黄',
          currency:'人民币',
          origin_currency:'￥22',
          jie:'￥23',
          dai:'￥34',
          files:'4',
          source:'总账',
          cash_flow:'是',
          status:'已审核',
          maker:'张三',
          he:'张三',
          zhuguan:'张三',
          guozhang:'张三',
          chuna:'张三'
        },
        {
          key:2,
          ledger:'账簿11',
          date:'2017-03-18',
          voucher_num:'记—1',
          proof:'新浦销货',
          subject:'405现金_0203小刘_01小黄',
          currency:'人民币',
          origin_currency:'￥22',
          jie:'￥23',
          dai:'￥34',
          files:'4',
          source:'总账',
          cash_flow:'是',
          status:'已审核',
          maker:'张三',
          he:'张三',
          zhuguan:'张三',
          guozhang:'张三',
          chuna:'张三'
        }
       ]

    return (
     
      <div className="entry_query_main">
        <div className="btn_group">
          <PurpleButton>新增</PurpleButton>
          <WhiteButton>修改</WhiteButton>
          <WhiteButton>删除</WhiteButton>
          <WhiteButton>提交</WhiteButton>
          <WhiteButton>撤回</WhiteButton>
          <WhiteButton>审核通过</WhiteButton>
          <WhiteButton>审核不通过</WhiteButton>
          <WhiteButton>反审核</WhiteButton>
          <WhiteButton>现金流量</WhiteButton>
          <Dropdown overlay={menu}>
            <WhiteButton width={'100px'}>更多</WhiteButton>
          </Dropdown>
        </div>
        <div className="search_block">
          <Row>
            <Col span={4}>
              <span className="lable">账簿</span>
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">现金</Option>
                <Option value="lucy">现金日记账</Option>
              </Select>
            </Col>
            <Col span={8}>
              <span className="lable">会计期间</span>
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
            <Col span={4}>
              <span className="lable">状态</span>
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">新建</Option>
                <Option value="lucy">已审核</Option>
              </Select>
            </Col>
            <Col span={4} style={{paddingTop: 2}}>
              <AdvancedQuery
                height={360} 
                onCancel={()=>{

                }} 
                onOk={()=>{
                  
                }}>
              
                  <Row className="row_item">
                    <Col span={10}>
                      <span>凭证字：</span>
                      <Select defaultValue="lucy" style={{ width: 180 }}>
                        <Option value="jack">现金</Option>
                        <Option value="lucy">现金日记账</Option>
                      </Select>
                    </Col>
                    <Col span={14}>
                      <span>凭证号：</span>
                      <Input style={{ width: 150 }}/>
                      <span>例如：1，3，5-7</span>
                    </Col>
                  </Row>
               
                  <div className="row_item">
                    <span>摘要：</span>
                    <Input style={{ width: 320 }}/>
                  </div>
              
                  <Row className="row_item">
                    <Col span={10} className="subject_col">
                      <span>科目：</span>
                      <AutoComplete
                        dataSource={dataSource}
                        style={{ width: 200}}
                        onSelect={this.onSelect}
                        onChange={this.handleChange}
                      />
                      <Icon type="search" />
                    </Col>
                    <Col span={14}>
                      <span>核算维度：</span>
                      <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="jack">现金</Option>
                        <Option value="lucy">现金日记账</Option>
                      </Select>
                      <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="jack">现金</Option>
                        <Option value="lucy">现金日记账</Option>
                      </Select>
                    </Col>
                  </Row>
               
                  <Row className="row_item">
                    <Col span={12}>
                      <span>金额：</span>
                      <Input style={{ width: 80 }}/>
                      <span className="zhi">至</span>
                      <Input style={{ width: 80 }}/>
                    </Col>
                    <Col span={12}>
                     <span>币别：</span>
                     <Select defaultValue="lucy" style={{ width: 200 }}>
                        <Option value="jack">现金</Option>
                        <Option value="lucy">现金日记账</Option>
                      </Select>
                    </Col>
                  </Row>

                  <Row className="row_item">
                    <Col span={12}>
                      <span>制单人：</span>
                      <Input style={{ width: 180 }}/>
                    </Col>
                    <Col span={12}>
                      <span>审核：</span>
                      <Input style={{ width: 180 }}/>
                    </Col>
                  </Row>

                  <Row className="row_item">
                    <Col span={12}>
                      <span>过账人：</span>
                      <Input style={{ width: 180 }}/>
                    </Col>
                    <Col span={12}>
                      <span>出纳：</span>
                      <Input style={{ width: 180 }}/>
                    </Col>
                  </Row>
                  <div className="row_item">
                    <span>复核主管：</span>
                    <Input style={{ width: 180 }}/>
                  </div>
              </AdvancedQuery>
            </Col>
          </Row>
        </div>

        <div className="table_block">
          <Table
            rowSelection={{
              
              onChange: (selectedRowKeys)=>{
                this.setState({ selectedRowKeys });
              }
            }} 
            columns={voucherColums}
            dataSource={voucherData}
            bordered
            scroll={{ x: 2000, y: 330 }}
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
      </div>
    )
  }
}

export default QueryMain;