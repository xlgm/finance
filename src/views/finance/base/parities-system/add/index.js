import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { Form, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';
import './add.less';
 
@inject('paritiesStore') @observer
class ParitiesAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: moment().date(1),
      endValue: moment().date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()),
    };

  }

  componentWillMount() {
    let { paritiesStore } = this.props; 
    paritiesStore.queryCurrencyAll();
  }


  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }


  //提交
  handleSubmit = (e,param) => {
    let { paritiesStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let lempmap = {};
        paritiesStore.CurrencyNameList.forEach(function (item, i) {
          lempmap[item.currencyID] = item.currencyName;
        });
        const values = {
          ...fieldsValue,
        };
        let parameter = {
          sourceCurrencyID: values.sourceCurrencyID,
          sourceCurrencyName: lempmap[values.sourceCurrencyID],
          targetCurrencyName: lempmap[values.targetCurrencyID],
          targetCurrencyID: values.targetCurrencyID,
          fixedExchangeRate: values.fixedExchangeRate, 
          effectiveTime:this.state.startValue.format('YYYY-MM-DD HH:mm:ss'),
          expiryTime:this.state.endValue.format('YYYY-MM-DD HH:mm:ss'),
        } 
        paritiesStore.SystemSave({
          parameter: parameter,
          success: () => {
            if (param === 1) {
               //清空内容
               this.props.form.resetFields();
            } else {
              paritiesStore.changePageControl("ParitiesMain");
            }
          },
          showLoading: () => {
            paritiesStore.showLoading();
          },
          closeLoading: () => {
            paritiesStore.closeLoading();
          }
        }); 
      }
    });
  }

  //根据币别刷新下拉列表
  changeFocus = () => {
    let { paritiesStore } = this.props; 
     paritiesStore.queryCurrencyAll(); 
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
    const { startValue, endValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    let currencyNameList = paritiesStore.CurrencyNameList;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    let currencyName = currencyNameList.map((currenyName, i) => {
      return <Select.Option value={currenyName.currencyID + ""} key={i}>{currenyName.currencyName + ""}</Select.Option>
    })
    return (
      <div className='parities-add'>
        <div className='btns'>
          <WhiteButton
            onClick={() => {
              paritiesStore.changePageControl('ParitiesMain');
            }}>
            返回
          </WhiteButton>
          <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 1) }}>保存并新增</PurpleButton>
          <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 2) }}>保存</PurpleButton>
        </div>
        <div className="add-main">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout}
              label="原币">
              {getFieldDecorator('sourceCurrencyID', {
                rules: [{ required: true, message: '请选择原币别!' }],
              })(
                <Select placeholder="选择一个选项" onFocus={this.changeFocus}>
                  {currencyName}
                </Select>
                )}
            </Form.Item>
            <Form.Item
              label="目标币" {...formItemLayout} >
              {getFieldDecorator('targetCurrencyID', {
                rules: [{ required: true, message: '请选择目标币别!' }],
              })(
                <Select placeholder="选择一个选项" onFocus={this.changeFocus}>
                  {currencyName}
                </Select>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="汇率" >
              {getFieldDecorator('fixedExchangeRate', {
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
                value={startValue}
                placeholder="生效日期"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="失效日期" >
              <DatePicker
                disabledDate={this.disabledEndDate}
                value={endValue}
                placeholder="失效日期"
                onChange={this.onEndChange}
                onOpenChange={this.handleEndOpenChange}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(ParitiesAdd);
export default WrappedRegistrationForm;  