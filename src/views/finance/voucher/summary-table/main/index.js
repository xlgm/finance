import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton } from 'components/Button.js';
import { Row, Col, Select, Cascader, Input, AutoComplete, Icon, Table, InputNumber, Checkbox  } from 'antd';
import AdvancedQuery from 'components/advanced-query';

import './summary_table_main.less';
const Option = Select.Option;

@inject('voSummaryStore')@observer
class SummaryMain extends React.Component {

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
   
    return <div className="summary_table_main">
        <div className="search_block">
        <Row>
          <Col span={4}>
            <span className="lable">账簿</span>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">现金</Option>
              <Option value="lucy">现金日记账</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span className="lable">币别</span>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">美元</Option>
              <Option value="lucy">日元</Option>
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
          
          <Col span={4} style={{paddingTop: 2}}>
            <AdvancedQuery
              height={250} 
              onCancel={()=>{

              }} 
              onOk={()=>{
                
              }}>
              <div className="row_item">
                <span>凭证字：</span>
                <Select defaultValue="lucy" style={{ width: 180 }}>
                  <Option value="jack">现金</Option>
                  <Option value="lucy">现金日记账</Option>
                </Select>
              </div>

              <Row className="row_item">
                <Col span={3}>
                凭证号：
                </Col>
                <Col span={3}>
                  <InputNumber min={1} defaultValue={1} style={{ width: 70 }}/>
                </Col>
                <Col span={1}>至</Col>
                <Col span={3}>
                  <InputNumber min={1} defaultValue={1} style={{ width: 70 }}/>
                </Col>
              </Row>

              <Row className="row_item">
                <Col span={3}>
                科目级别：
                </Col>
                <Col span={8}>
                  <Select defaultValue="lucy" style={{ width: 180 }}>
                    <Option value="jack">现金</Option>
                    <Option value="lucy">现金日记账</Option>
                  </Select>
                </Col>
                <Col span={1}>至</Col>
                <Col span={8}>
                  <Select defaultValue="lucy" style={{ width: 180 }}>
                    <Option value="jack">现金</Option>
                    <Option value="lucy">现金日记账</Option>
                  </Select>
                </Col>
              </Row>

              <Row className="row_item">
                <Col span={6}>
                  <Checkbox>显示禁用科目</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox>包含未过账凭证</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox>显示科目全名</Checkbox>
                </Col>
              </Row>
                
            </AdvancedQuery>
          </Col>
        </Row>
      </div>
    </div>
  }

}

export default SummaryMain;