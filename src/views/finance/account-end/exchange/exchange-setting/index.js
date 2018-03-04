import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Table, InputNumber } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import './index.less';


@inject('exchangeEndStore') @observer
class ExchangeSetting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      promptBox: '',
      datalist: [
        {
          key: '1',
          currency: '美元',
          exchangeRate: 1
        },
        {
          key: '2',
          currency: '人名币',
          exchangeRate: ''
        },
      ]
    };
  }

  onChangeInput = (rule, value, callback, key, objKey) => {
    let datalist = this.state.datalist;
    datalist[key - 1][objKey] = value;
    this.setState({
      datalist: datalist
    });

    if (value !== "") {
      callback();
    } else {
      callback();
    }

  }

  /**
   * 1：所有汇率一致([币别]的调整汇率与期间凭证的汇率一致，不需要调汇。)
  */
  nextStep = (e) => {
    let { exchangeEndStore } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let parameter = 2;
        if (parameter === 1) {
          this.setState({
            promptBox:
            <PromptBox
              title="汇率设置"
              promptLanguage="[币别]的调整汇率与期间凭证的汇率一致，不需要调汇。"
              onCancel={() => {
                this.setState({ promptBox: '' })
              }}
              onOK={() => {
                this.setState({ promptBox: '' })
              }}>
            </PromptBox>
          })
        }else{
          exchangeEndStore.currentNext();
        } 
      }
    });
  }


  //上一步
  prevStep = () => {
    let { exchangeEndStore } = this.props;
    exchangeEndStore.currentPrev();
  }

  render() {
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
    const { getFieldDecorator } = this.props.form;
    let column = [
      {
        title: '币别',
        dataIndex: 'currency',
        key: "currency",
        width: '50%',
      },
      {
        title: '调整汇率',
        dataIndex: 'exchangeRate',
        key: "exchangeRate",
        render: (text, record) => {
          let objKey = `exchangeRate${record.key}`;
          let thisValue = record.exchangeRate;
          return (
            <Form.Item >
              {getFieldDecorator(objKey, {
                initialValue: thisValue || '',
                validateTrigger: ['onBlur', 'onChange'],
                rules: [
                  { required: true, message: '请输入汇率!' },
                  { validator: (rule, value, callback) => { this.onChangeInput.call(this, rule, value, callback, record.key, 'exchangeRate', ) } }
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
          )
        }
      }
    ];
    let formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
    };
    return (
      <div className="exchange-setting-main">
        <div className="exchange-setting">
          <div className="exchange-title">
            <Form.Item {...formItemLayout} label="账簿" >
              <Input
                value="研发中心"
                disabled
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="核算组织" >
              <Input
                value="研发中心"
                disabled
              />
            </Form.Item>
          </div>
          <Table
            rowSelection={null}
            columns={column}
            size='middle'
            dataSource={this.state.datalist}
            scroll={{
              y: 300
            }}
            bordered
            pagination={false}
          />
        </div>
        <div className="steps-action">
          <WhiteButton onClick={this.prevStep}>上一步</WhiteButton>
          <PurpleButton onClick={this.nextStep}>下一步</PurpleButton>
        </div>
        {this.state.promptBox}
      </div>

    )

  }
}
const WrappedRegistrationForm = Form.create()(ExchangeSetting);
export default WrappedRegistrationForm; 