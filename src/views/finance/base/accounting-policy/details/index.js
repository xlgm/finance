import React from 'react';
import { Tabs, Form, Input } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import './details.less';
const TabPane = Tabs.TabPane;

@inject('policyStore', 'appStore') @observer
class PolicyDetails extends React.Component {

  constructor(props) {
    super(props);
    let map = {}; 
    let ExchangeType = this.props.appStore.dictionarys.ExchangeRateType; // 枚举 ExchangeType
    ExchangeType.forEach(function (item, i) {
      map[item.value] = item.description;
    });
   
    let { policyStore } = this.props;
    let PolicyDataobj = policyStore.PolicyDataobj;
    this.state = {
      accPolicyName: PolicyDataobj.accPolicyName, //名称 
      currencyName: PolicyDataobj.currencyName,//币别名称
      accElementTableName: PolicyDataobj.accElementTableName,//会计要素表
      description: PolicyDataobj.description, //描述 
      exchangeTypeName: map[PolicyDataobj.exchangeTypeID]
    };
  }

  componentWillMount() {
  }

  policyBack = () => {
    let { policyStore } = this.props;
    policyStore.changePageControl("PolicyMain");
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    return (
      <div id='policy-details'>
        <div className="add-top">
          <WhiteButton onClick={this.policyBack}>返回</WhiteButton>
          <PurpleButton onClick={this.handleSubmits}>保存</PurpleButton>
        </div>

        <div className="add-main">
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <div className="modify-form">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item {...formItemLayout} label="名称" >
                    <Input disabled value={this.state.accPolicyName} />
                  </Form.Item>
                  <Form.Item {...formItemLayout}
                    label="主币别">
                    <Input disabled value={this.state.currencyName} />
                  </Form.Item>
                  <Form.Item {...formItemLayout}
                    label="汇率类型">
                    <Input disabled value={this.state.exchangeTypeName} />
                  </Form.Item>
                  <Form.Item {...formItemLayout}
                    label="会计要素表">
                    <Input disabled value={this.state.accElementTableName} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="描述" >
                    <Input type="textarea" rows={4} disabled value={this.state.description} />
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

export default PolicyDetails;  