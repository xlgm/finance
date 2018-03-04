import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { Form, InputNumber, Input, DatePicker, Tabs } from 'antd';
import moment from 'moment';
import './modify.less';
const TabPane = Tabs.TabPane;



@inject('paritiesStore') @observer
class ParitiesModify extends React.Component {
  constructor(props) {
    super(props);
    let SystemDetailObj = this.props.paritiesStore.SystemDetailObj;
    this.state = {
      exchangeRateID: SystemDetailObj.exchangeRateID,
      sourceCurrencyID: SystemDetailObj.sourceCurrencyID,
      targetCurrencyID: SystemDetailObj.targetCurrencyID,
      sourceCurrencyName: SystemDetailObj.sourceCurrencyName,
      targetCurrencyName: SystemDetailObj.targetCurrencyName,
      fixedExchangeRate: SystemDetailObj.fixedExchangeRate,
      effectiveTime: moment(SystemDetailObj.effectiveTime * 1),
      expiryTime: moment(SystemDetailObj.expiryTime * 1),
    };

  }


  disabledStartDate = (effectiveTime) => {
    const expiryTime = this.state.expiryTime;
    if (!effectiveTime || !expiryTime) {
      return false;
    }
    return effectiveTime.valueOf() > expiryTime.valueOf();
  }

  disabledEndDate = (expiryTime) => {
    const effectiveTime = this.state.effectiveTime;
    if (!expiryTime || !effectiveTime) {
      return false;
    }
    return expiryTime.valueOf() <= effectiveTime.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('effectiveTime', value);
  }

  onEndChange = (value) => {
    this.onChange('expiryTime', value);
  }


  //提交
  handleSubmit = (e) => {
    let { paritiesStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
        }; 
        let parameter = {
          exchangeRateID: this.state.exchangeRateID,
          sourceCurrencyID: this.state.sourceCurrencyID,
          targetCurrencyID: this.state.targetCurrencyID,
          fixedExchangeRate: values.fixedExchangeRate,
          effectiveTime: this.state.effectiveTime.format('YYYY-MM-DD HH:mm:ss'),
          expiryTime: this.state.expiryTime.format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(parameter);
        paritiesStore.SystemUpdate({
          parameter: parameter,
          success: () => {
            paritiesStore.changePageControl("ParitiesMain");
          },
          showLoading: () => {
            paritiesStore.showLoading();
          },
          closeLoading: () => {
            paritiesStore.closeLoading();
          }
        })
      }
    });
  }




  render() {
    let { paritiesStore } = this.props;
    let ylimitDecimals = (value) => {
      const reg = /^(\-)*(\d+)\.(\d\d\d\d).*$/;
      if (typeof (value) === 'string') {
        return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
      } else if (typeof (value) === 'number') {
        return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
      } else {
        return ''
      }
    };
    const { effectiveTime, expiryTime } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };

    return (
      <div className='parities-modify'>
        <div className='btns'>
          <WhiteButton
            onClick={() => {
              paritiesStore.changePageControl('ParitiesMain');
            }}>
            返回
          </WhiteButton>
          <PurpleButton onClick={this.handleSubmit}>保存</PurpleButton>
        </div>
        <div className="add-main">
          <Tabs defaultActiveKey="1" >
            <TabPane tab="基本信息" key="1">
              <Form onSubmit={this.handleSubmit}>
                <Form.Item {...formItemLayout}
                  label="原币">
                  {getFieldDecorator('sourceCurrencyID', {
                    initialValue: this.state.sourceCurrencyName || '',
                  })(
                    <Input disabled />
                    )}
                </Form.Item>
                <Form.Item
                  label="目标币" {...formItemLayout} >
                  {getFieldDecorator('targetCurrencyID', {
                    initialValue: this.state.targetCurrencyName || '',
                  })(
                    <Input disabled />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="汇率" >
                  {getFieldDecorator('fixedExchangeRate', {
                    initialValue: this.state.fixedExchangeRate || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入汇率！',
                      },
                    ],
                  })(
                    <InputNumber
                      min={0.0001}
                      max={999999.9999}
                      formatter={ylimitDecimals}
                      parser={ylimitDecimals}
                    />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="生效日期" >
                  <DatePicker
                    disabledDate={this.disabledStartDate}
                    value={effectiveTime}
                    placeholder="生效日期"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="失效日期" >
                  <DatePicker
                    disabledDate={this.disabledEndDate}
                    value={expiryTime}
                    placeholder="失效日期"
                    onChange={this.onEndChange}
                    onOpenChange={this.handleEndOpenChange}
                  />
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="操作记录" key="2">操作记录</TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(ParitiesModify);
export default WrappedRegistrationForm;  