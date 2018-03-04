import React from 'react';
import { Tabs, Form, Input, Select } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import './modify.less';
const TabPane = Tabs.TabPane;

@inject('policyStore') @observer
class PolicyModify extends React.Component {

  constructor(props) {
    super(props);
    let { policyStore } = this.props;
    let PolicyDataobj = policyStore.PolicyDataobj; 
    this.state = {
      accPolicyName: PolicyDataobj.accPolicyName, //名称
      currencyID: PolicyDataobj.currencyID + "", //主币别
      exchangeTypeID: PolicyDataobj.exchangeTypeID + "", //默认汇率类型
      elementTableID: PolicyDataobj.accElementTableID + "", //会计要素表
      accPolicyID: PolicyDataobj.accPolicyID, //id
      policyDesc: PolicyDataobj.description, //描述 
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
  handleSubmit = (e) => {
    let { policyStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) { 
        const values = {
          ...fieldsValue,
        }; 

        policyStore.modAccountingPolicy({
          accPolicyID: this.state.accPolicyID,
          accPolicyName: values.accPolicyName,
          currencyID: values.currencyID,
          exchangeTypeID: values.exchangeTypeID,
          elementTableID: values.elementTableID,
          policyDesc:values.policyDesc,
          success: () => {
            policyStore.changePageControl("PolicyMain");
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
      <div id='policy-modify'>
        <div className="add-top">
          <WhiteButton onClick={this.policyBack}>返回</WhiteButton>
          <PurpleButton onClick={this.handleSubmit}>保存</PurpleButton>
        </div>

        <div className="add-main">
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <div className="modify-form">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item {...formItemLayout} label="名称" >
                    {getFieldDecorator('accPolicyName', {
                      initialValue: this.state.accPolicyName || '',
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
                      initialValue: this.state.currencyID || '',
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
                      initialValue: this.state.exchangeTypeID || '',
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
                      initialValue: this.state.elementTableID || '',
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
                      initialValue: this.state.policyDesc || '',
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

const WrappedRegistrationForm = Form.create()(PolicyModify);
export default WrappedRegistrationForm;  