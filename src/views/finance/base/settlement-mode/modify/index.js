import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Checkbox, Input, Tabs } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import './modify.less';
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
@inject('settlementStore') @observer
class SettlementModify extends React.Component {

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

  //验证序号
  changeSortno = (rule, value, callback) => {
    if (value && !(/^\d*$/.test(value))) {
      callback('序号只能输入整数!');
    } else if (value && value.length > 2) {
      callback('序号位数不能超过2位!');
    } else {
      callback();
    }
  }

  //提交
  handleSubmit = (e, param) => {
    let { settlementStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
        };
        let apptype = '';
        if (values.apptype.length === 2) {
          apptype = '1360,1361';
        } else if (values.apptype[0] === "收银机") {
          apptype = '1360';
        } else if (values.apptype[0] === "供应链财务") {
          apptype = '1361';
        }
        settlementStore.paymentmethodinfoUpdate({
          sortNo: values.sortno,
          paymentName: values.paymentname,
          appType: apptype,
          isOnline: this.state.isonline,
          mappingID: this.state.mappingID,
          success: () => {
            settlementStore.changePageControl("SettlementMain");
          }, showLoading: () => {
            settlementStore.showLoading();
          },
          closeLoading: () => {
            settlementStore.closeLoading();
          }
        })
      }
    });
  }

  render() {
    let { settlementStore } = this.props;
    const { getFieldDecorator } = this.props.form;
    const plainOptions = ['收银机', '供应链财务'];
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    return (
      <div className='settlement-modify'>
        <div className="add-top">
          <WhiteButton onClick={() => {
            settlementStore.changePageControl('SettlementMain');
          }}>返回</WhiteButton>
          <PurpleButton onClick={this.handleSubmit.bind(this)}>保存</PurpleButton>
        </div>
        <div className="add-main">
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <div className="modify-form">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item {...formItemLayout}
                    label="序号">
                    {getFieldDecorator('sortno', {
                      initialValue: this.state.sortno || '',
                      validateTrigger: ['onBlur', 'onChange'],
                      rules: [{ required: true, message: '请输入序号!' }, { validator: this.changeSortno }],
                    })(
                      <Input
                      />
                      )}
                  </Form.Item>
                  <Form.Item
                    label="名称" {...formItemLayout} >
                    {getFieldDecorator('paymentname', {
                      initialValue: this.state.paymentname || '',
                      rules: [{ required: true, message: '请输入名称!' }],
                    })(
                      <Input disabled
                      />
                      )}
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="应用端" >
                    {getFieldDecorator('apptype', { initialValue: this.state.apptype || '', rules: [{ required: true, message: '请选择应用端!' }], })(
                      <CheckboxGroup options={plainOptions} />
                    )}
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
const WrappedRegistrationForm = Form.create()(SettlementModify);
export default WrappedRegistrationForm;    