import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Select, Checkbox, DatePicker, Radio, Tooltip } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import moment from 'moment';
import './index.less';
const RadioGroup = Radio.Group;
const textmode = <span>选择该项后,按科目余额的相反方向结转,没选中时,按科目属性中定义的科目方向结账. </span>;


@inject('lossGainEndStore') @observer
class CheckoutSetting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datePicker: moment(Date.now()),
      promptBox: '',
    }
  }


  /**
   *  填写完成询问框 进入下一步
  */
  nextStep = (e) => {
    let { lossGainEndStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          'datePicker': fieldsValue['datePicker'].format('YYYY-MM-DD'),
        };

        this.setState({
          promptBox:
          <PromptBox
            title="结转损益"
            cancelButton
            promptLanguage="确定进行结转损益？"
            onCancel={() => {
              this.setState({ promptBox: '' })
            }}
            onOK={() => {
              lossGainEndStore.currentNext();
            }}>
          </PromptBox>
        })


      }
    });
  }


  /**
   * 1:无结转检查 
   * 2：有结转检查 
  */
  prevStep = () => {
    let { lossGainEndStore } = this.props;
    let parameter = 2;
    if (parameter === 1) {
      lossGainEndStore.currentTwoPrev();
    } else {
      lossGainEndStore.currentPrev();
    }

  }

   //验证不能超过20个字符
   voucherDigest = (rule, value, callback) => {
    
    if (value && value.length >20) {
      callback('不能超过20个字符!');
    } else {
      callback();
    }
  }

  render() {
    let { lossGainEndStore } = this.props;
    const { getFieldDecorator } = this.props.form;
    let formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 6 },
    };
    return (
      <div className="checkout-setting-main">
        <div className="parameter-setting">
          <Form.Item {...formItemLayout} label="凭证日期" >
            {getFieldDecorator('datePicker', { initialValue: this.state.datePicker || '', rules: [{ type: 'object', required: true, message: '请选择凭证日期!' }], })(
              <DatePicker />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="凭证字" >
            <Select placeholder="选择一个选项" defaultValue="1" style={{ width: '80px' }}>
              <Select.Option value="1">记</Select.Option>
              <Select.Option value="2">转</Select.Option>
              <Select.Option value="3">收款</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...formItemLayout} label="凭证摘要" >
            {getFieldDecorator('voucherDigest', {
              validateTrigger: ['onBlur', 'onChange'],
              rules: [
                {
                  required: true,
                  message: '请输入凭证摘要！',
                },
                { validator: this.voucherDigest, }
              ],
            })(
              <Input
                placeholder="请输入凭证摘要"
              />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="凭证分类" >
            {getFieldDecorator('classification', { initialValue: 1 || '', })(
              <RadioGroup >
                <Radio className="radioStyle" value={1}>收益和损失同时结转（生成一张凭证）</Radio>
                <Radio className="radioStyle" value={2}>按损益科目类别结转（生成多张凭证）</Radio>
              </RadioGroup>
            )}
            <p>
              <Checkbox defaultChecked={true}>按余额反向结转</Checkbox>
              <Tooltip placement="rightTop" title={textmode}>
                <i className="anticon anticon-question-circle"></i>
              </Tooltip>
            </p>
          </Form.Item> 

        </div>
        <div className="steps-action">
          <WhiteButton onClick={this.prevStep}>上一步</WhiteButton>
          <PurpleButton style={{ width: '145px' }} onClick={this.nextStep}>保存并进入下一步</PurpleButton>
        </div>
        {this.state.promptBox}
      </div>
    )

  }
}
const WrappedRegistrationForm = Form.create()(CheckoutSetting);
export default WrappedRegistrationForm; 