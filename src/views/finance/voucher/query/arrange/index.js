import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import { Steps, Row, Col, Select, Cascader, InputNumber, Checkbox, Table } from 'antd';

import './arrange.less';

const Step = Steps.Step;
const Option = Select.Option;

@inject('voQueryStore')@observer
class Arrange extends Component {

  constructor(props) {
    super(props);

  }

 
  render() {
    let { voQueryStore } = this.props;
    
    //选择日期
    const date = [];
    const dateChildren = [];
    let dateNow = new Date;
    let year = dateNow.getFullYear();

    const colums = [
      {
        title: '日期',
        dataIndex: 'date',
        width: '30%',
      },
      {
        title: '原有凭证号',
        dataIndex: 'origin',
        width: '30%',
      },
      {
        title: '整理后凭证字号',
        dataIndex: 'voucher',
        width: '30%',
      }
    ]

    const datas = [
      {
        key: 1,
        date: '2017/10/12',
        origin: '记-32',
        voucher: '记-67'
      },
      {
        key: 2,
        date: '2017/10/12',
        origin: '记-32',
        voucher: '记-67'
      },
      {
        key: 3,
        date: '2017/10/12',
        origin: '记-32',
        voucher: '记-67'
      },
      {
        key: 4,
        date: '2017/10/12',
        origin: '记-32',
        voucher: '记-67'
      }
    ]

    return <div className='arrange_break_number'>

      <div className="btn_group">
        <WhiteButton onClick={()=>{
          voQueryStore.changePageControl('QueryMain');
        }}>返回</WhiteButton>
      </div>
      <Steps  className="steps" current={2}>
        <Step title="快速预览" />
        <Step title="提交整理" />
        <Step title="完成" />
      </Steps>
      <div className="search_block">
        <div className="title">整理筛选条件</div>
        
          <Row className="search_row">
            <Col span={4}>
              <span className="lable">整理账簿</span>
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">现金</Option>
                <Option value="lucy">现金日记账</Option>
              </Select>
            </Col>
            <Col span={4}>
              <span className="lable">会计期间</span>
              <Cascader
                options={date}
                style={{ width: 120, fontSize: 14, }}              
                defaultValue={["2008年", "1期"]} />
            </Col>
            <Col span={4}>
              <span className="lable">凭证字</span>
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">记</Option>
                <Option value="lucy">转</Option>
              </Select>
            </Col>
            <Col span={4}>
              <span className="lable">起始凭证号</span>
              <InputNumber min={1} defaultValue={1} style={{ width: 70 }}/>
            </Col>
           
          </Row>
          <Row className="search_row">
            <Col span={5}>
              <Checkbox>按凭证号顺次前移补齐断号</Checkbox>            
            </Col>
            <Col span={5}>
              <Checkbox>按凭证日期重新顺次编号</Checkbox>
            </Col>
            <Col span={4}>
              <PurpleButton>确定</PurpleButton>
            </Col>
          </Row>
       
      </div>
      <div className="table">
        <div className="title">整理信息</div>
        <Row>
          <Col span={20}>
            <Table
              columns={colums}
              dataSource={datas}
              bordered
              scroll={{ y: 220 }}
              pagination={false}
            />
          </Col>
          <Col span={4} className="btn">
            <PurpleButton>开始整理</PurpleButton>
          </Col>
        </Row>
       
      </div>
    </div>

  }
}

export default Arrange;