import React from 'react';
import { inject, observer } from 'mobx-react';
import {Tabs, Form, Checkbox, Input } from 'antd';
import {  WhiteButton } from 'components/Button.js' 
import './details.less';
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
@inject('settlementStore') @observer
class SettlementDetails extends React.Component {

  constructor(props) {
    super(props);
    let { settlementStore } = this.props;
    let leapApptype = [];
    if (settlementStore.detailsObj[0].apptype) {
      let arr = settlementStore.detailsObj[0].apptype.split(",");
      if (arr.length === 2) {
        leapApptype.push("收银机", "供应链财务");
      } else if (arr[0] * 1 === 1360) {
        leapApptype.push("收银机");
      } else if (arr[0] * 1 === 1361) {
        leapApptype.push("供应链财务");
      }
    }

    this.state = {
      isonline: settlementStore.detailsObj[0].isonline,
      mappingID: settlementStore.detailsObj[0].mappingID,
      sortno: settlementStore.detailsObj[0].sortno,
      paymentname: settlementStore.detailsObj[0].paymentname,
      apptype: leapApptype
    };

  }



  render() {
    let { settlementStore } = this.props; 
    const plainOptions = ['收银机', '供应链财务'];
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    return (
      <div className='settlement-details'>
        <div className="add-top">
          <WhiteButton onClick={() => {
            settlementStore.changePageControl('SettlementMain');
          }}>返回</WhiteButton>
        </div>
        <div className="add-main">
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <div className="modify-form">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item {...formItemLayout}
                    label="序号">
                    <Input value={this.state.sortno} disabled
                    />
                  </Form.Item>
                  <Form.Item
                    label="名称" {...formItemLayout} >
                    <Input disabled value={this.state.paymentname}
                    />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="应用端" > 
                      <CheckboxGroup options={plainOptions} value={this.state.apptype} disabled/> 
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="操作纪录" key="2">
              <div className="records">

              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
export default SettlementDetails;    