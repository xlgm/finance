import React from 'react';
import { Form, Input, Select } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import './add.less';

@inject('policyStore') @observer
class PolicyAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.policyStore.getAccPolicyMessage(); //新增页面需要的三个下拉 
  }

  policyBack = () => {
    let { policyStore } = this.props;
    policyStore.changePageControl("PolicyMain");
  }


  //提交
  handleSubmit = (e, param) => {
    let { policyStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {

        const values = {
          ...fieldsValue,
        };

        policyStore.addAccountingPolicy({
          accPolicyName: values.accPolicyName,
          currencyID: values.currencyID,
          exchangeTypeID: values.exchangeTypeID,
          elementTableID: values.elementTableID,
          policyDesc: values.policyDesc,
          success: () => {
            if (param === 1) {
              this.props.form.resetFields();
            } else {
              policyStore.changePageControl("PolicyMain");
            }

          },
          showLoading: () => {
            policyStore.showLoading();
          },
          closeLoading: () => {
            policyStore.closeLoading();
          }
        })

      }
    });
  }


  //判断名称长度不能超过20个字符
  changeName = (rule, value, callback) => {

    if (value && value.length > 20) {
      callback('名称不能超过20字符!');
    } if (!(/^[A-Za-z0-9\u4e00-\u9fa5]*$/.test(value))) {
      callback('只能含有(汉字、英文、数字)!');
    } else {
      callback();
    }
  }

  //判断描述长度不能超过200个字符
  changeTextarea = (rule, value, callback) => {
    if (value && value.length > 200) {
      callback('描述不能超过200个字符!');
    } else {
      callback();
    }
  }

  //根据币别刷新下拉列表
  changeFocus = () => {
    let { policyStore } = this.props;
    policyStore.getAccPolicyMessage();
  }

  render() {
    let { policyStore } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    return (
      <div id='policy-add'>
        <div className="add-top">
          <WhiteButton onClick={this.policyBack}>返回</WhiteButton>
          <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 1) }}>保存并新增</PurpleButton>
          <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 2) }}>保存</PurpleButton>
        </div>
        <div className="add-main-from">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="名称" >
              {getFieldDecorator('accPolicyName', {
                validateTrigger: ['onBlur', 'onChange'],
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                  { validator: this.changeName, }
                ],
              })(
                <Input
                  placeholder="请输入名称"
                />
                )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="主币别">
              {getFieldDecorator('currencyID', {
                rules: [{ required: true, message: '请选择主币别!' }],
              })(
                <Select placeholder="选择一个选项" onFocus={this.changeFocus}>
                  {policyStore.currencyInfoList.length > 0 &&
                    policyStore.currencyInfoList.map((obj, index) => {
                      return <Select.Option value={obj.currencyID + ""} key={index}>{obj.currencyName + ""} </Select.Option>
                    })
                  }
                </Select>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="汇率类型">
              {getFieldDecorator('exchangeTypeID', {
                rules: [{ required: true, message: '请选择汇率类型!' }],
              })(
                <Select placeholder="选择一个选项">
                  {policyStore.rateTypeList.length > 0 &&
                    policyStore.rateTypeList.map((obj, index) => {
                      return <Select.Option value={obj.value + ""} key={index}> {obj.description + ""}</Select.Option>
                    })
                  }
                </Select>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="会计要素表">
              {getFieldDecorator('elementTableID', {
                rules: [{ required: true, message: '请选择会计要素表!' }],
              })(
                <Select placeholder="选择一个选项">
                  {policyStore.acctElementTableInfoList.length > 0 &&
                    policyStore.acctElementTableInfoList.map((obj, index) => {
                      return <Select.Option value={obj.acctElementTableID + ""} key={index}>{obj.accElementTableName + ""}</Select.Option>
                    })
                  }
                </Select>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="描述" >
              {getFieldDecorator('policyDesc', {
                initialValue: '',
                validateTrigger: ['onBlur', 'onChange'],
                rules: [
                  { validator: this.changeTextarea, }
                ],
              })(
                <Input type="textarea" rows={4} />
                )}
            </Form.Item>
          </Form>
        </div>

      </div>
    )
  }
}


const WrappedRegistrationForm = Form.create()(PolicyAdd);
export default WrappedRegistrationForm;  