import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { Form, Checkbox, Input } from 'antd';
import './add.less';
const CheckboxGroup = Checkbox.Group;


@inject('settlementStore') @observer
class SettlementAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

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
        settlementStore.paymentmethodinfoAdd({
          sortNo: values.sortno,
          paymentName: values.paymentname,
          appType: apptype,
          success: () => {
            if (param === 1) {
              this.props.form.resetFields();
            } else {
              settlementStore.changePageControl("SettlementMain");
            }

          }, showLoading: () => {
            settlementStore.showLoading();
          },
          closeLoading: () => {
            settlementStore.closeLoading();
          }
        });
      }
    });
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

  //验证名称
  changePaymentName = (rule, value, callback) => {

    if (value && value.length > 20) {
      callback('名称不超过20字符!');
    } if (value && !(/^[A-Za-z0-9\u4e00-\u9fa5]*$/.test(value))) {
      callback('只能含有(汉字、英文、数字)!');
    } else {
      callback();
    }

  }


  render() {
    let { settlementStore } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    const plainOptions = ['收银机', '供应链财务'];
    return (
      <div className='settlement-add'>
        <div className="add-top">
          <WhiteButton onClick={() => {
            settlementStore.changePageControl('SettlementMain');

          }}>返回</WhiteButton>
          <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 1) }}>保存并新增</PurpleButton>
          <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 2) }}>保存</PurpleButton>
        </div>
        <div className="add-main">
          <div className="add-main-from">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item {...formItemLayout}
                label="序号">
                {getFieldDecorator('sortno', {
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
                  validateTrigger: ['onBlur', 'onChange'],
                  rules: [{ required: true, message: '请输入名称!' }, { validator: this.changePaymentName, }],
                })(
                  <Input
                  />
                  )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="应用端" >
                {getFieldDecorator('apptype', { rules: [{ required: true, message: '请选择应用端!' }], })(
                  <CheckboxGroup options={plainOptions} />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(SettlementAdd);
export default WrappedRegistrationForm;   