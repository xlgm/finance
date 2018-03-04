import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import { Input, Select, Radio, Table, Modal, Dropdown, Menu, message, Form, InputNumber } from 'antd';  
import './index.less';

@inject('cashEntryStore') @observer
class CashEntryContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencyValue: '1',//币别
      booksValue: '1',//账簿
      radioValue: '1',//单选  
      exchangeValue:'1',//汇率
      standardMoneyData: [//本位币数据集
        {
          key: '1',
          serialNumber: '1',
          ProjectCategory: '1001',
          cashFlowproject: '银行存款',
          balance: 1, 
        }, {
          key: '2',
          serialNumber: '2',
          ProjectCategory: '10010001',
          cashFlowproject: '现金',
          balance: 2, 
        }
      ],
      colligateMoneyData: [//综合本位币数据集
        {
          key: '1',
          serialNumber: '1',
          ProjectCategory: '1001',
          cashFlowproject: '银行存款',
          balance: 1, 
        }, {
          key: '2',
          serialNumber: '2',
          ProjectCategory: '10010001',
          cashFlowproject: '现金',
          balance: 2, 
        }
      ],
      originalCurrencyData: [//原币数据集
        {
          key: '1',
          serialNumber: '1',
          ProjectCategory: '1001',
          cashFlowproject: '银行存款', 
          qcoriginal: 1,
          qcstandard: 1, 
        }, {
          key: '2',
          serialNumber: '1',
          ProjectCategory: '1001',
          cashFlowproject: '现金', 
          qcoriginal: 1,
          qcstandard: 1, 
        }
      ]

    } 

  }

  componentWillUnmount() {

  }

  /**
   * 账簿
   *如果切换了账簿，判断数据是否有更改，【有】则增加个二次确认是否保存 。
  */
  booksHandleChange = (value) => {
    // Modal.confirm({
    //   content: '内容已经修改，是否先保存',
    //   okText: '是',
    //   cancelText: '否',
    //   onOk: () => {//是回掉
    //     console.log("==================是");

    //   },
    //   onCancel: () => {//否回掉
    //     console.log("==================否");
    //   }
    // });
    this.setState({
      booksValue: value
    })

  }

  /**
   * 币别
   * 如果切换了币别，判断数据是否有更改，【有】则增加个二次确认是否保存 。 
   * 根据类型控制表格显示
  */
  currencyHandleChange = (value) => {
    // Modal.confirm({
    //   content: '内容已经修改，是否先保存',
    //   okText: '是',
    //   cancelText: '否',
    //   onOk: () => {//是回掉
    //     console.log("==================是");
    //   },
    //   onCancel: () => {//否回掉
    //     console.log("==================否");
    //   }
    // });
    this.setState({
      currencyValue: value,
      radioValue: '1'
    });


  }
 

  /**
   * 原币tableinput改变事件
  */
  onChangeInputYb = (value, key, objKey) => {
    let originalCurrencyData = this.state.originalCurrencyData;
    originalCurrencyData[key - 1][objKey] = value;
    this.setState({
      originalCurrencyData: originalCurrencyData
    });
  }


  /**
   * 本位币tableinput改变事件
  */
  onChangeInput = (value, key, objKey) => {
    let standardMoneyData = this.state.standardMoneyData;
    standardMoneyData[key - 1][objKey] = value;
    this.setState({
      standardMoneyData: standardMoneyData
    });
  }

   /**
   * onChangecurrencyValue 验证汇率(6位整数，4位小数。)
  */
  onChangecurrencyValue = (rule, value, callback) => {    
    if (value && value !== "") {
      this.setState({
        exchangeValue:value
      }); 
      callback();
    } else {
      callback();
    }

  }

   

  //保存按钮
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) { 
        const values = {
          ...fieldsValue, 
        };

        console.log('Received values of form: ', values);
      }
    });
  }



  render() {
    let limitDecimals = (value) => {
      const reg = /^(\-)*(\d+)\.(\d\d).*$/;
      if (typeof (value) === 'string') {
        return value.replace(reg, '$1$2.$3')
      } else {
        return ''
      }
    };

    let ylimitDecimals = (value) => { 
      const reg = /^(\-)*(\d+)\.(\d\d\d\d).*$/; 
      if(typeof(value)  === 'string') {
          return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : ''
      } else if (typeof(value)  === 'number') {
          return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : ''
      } else {
          return ''
      }
    };

    
    let { cashEntryStore } = this.props; 
    const { getFieldDecorator } = this.props.form;
    let standardMoney = [//本位币
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '10%'
      },
      {
        title: "项目类别",
        dataIndex: "ProjectCategory",
        key: 'ProjectCategory',
        width: '20%',
      },
      {
        title: "现金流量项目",
        dataIndex: "cashFlowproject",
        key: 'cashFlowproject',
        width: '20%', 
      }, 
      {
        title: "余额",
        dataIndex: "balance",
        key: 'balance', 
        render: (text, record) => {
          if (record.key * 1 === 1) {
            return (
              { text }
            )
          } else if (record.key * 1 === 2) {
            return (
              <InputNumber
                min={-999999999.99}
                max={999999999.99}
                defaultValue={record.balance}
                onChange={(value) => { this.onChangeInput.call(this, value, record.key, 'balance', ) }}
                formatter={limitDecimals}
                parser={limitDecimals}
              />
            )
          }
        }
      },
    ];

    let colligateMoney = [//综合本位币
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '10%'
      },
      {
        title: "项目类别",
        dataIndex: "ProjectCategory",
        key: 'ProjectCategory',
        width: '20%',
      },
      {
        title: "现金流量项目",
        dataIndex: "cashFlowproject",
        key: 'cashFlowproject',
        width: '20%',
      }, 
      {
        title: "余额",
        dataIndex: "balance",
        key: 'balance', 
      } 
    ];

    let originalCurrency = [//原币
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '10%',
      },
      {
        title: "项目类别",
        dataIndex: "ProjectCategory",
        key: 'ProjectCategory',
        width: '20%',
      },
      {
        title: "现金流量项目",
        dataIndex: "cashFlowproject",
        key: 'cashFlowproject',
        width: '20%', 
      }, 
      {
        title: '期初余额',
        children: [{
          title: '原币',
          dataIndex: 'qcoriginal',
          key: 'qcoriginal', 
          width: '25%', 
          render: (text, record) => {
            if (record.key * 1 === 1) {
              return (
                { text }
              )
            } else if (record.key * 1 === 2) { 
              return (
                <InputNumber
                  min={-999999999.99}
                  max={999999999.99}
                  defaultValue={record.qcoriginal}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'qcoriginal', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                /> 
              )
            }
          }
        }, {
          title: '本位币',
          dataIndex: 'qcstandard',
          key: 'qcstandard', 
          render: (text, record) => {
            if (record.key * 1 === 1) {
              return (
                { text }
              )
            } else if (record.key * 1 === 2) { 
              return (
                <InputNumber
                  min={-999999999.99}
                  max={999999999.99}
                  defaultValue={record.qcstandard}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'qcstandard', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                /> 
              )

            }
          }
        }],
      }, 
    ];
 
    /**
     * 账簿/币别/类别 数据由后端返回 
     * 币别类型是【本位币、综合本位币】table显示是一样的不会显示【原币、本位币】，【综合本位币】table只显示不会有input框
     * 币别类型是【原币】table会显示出【原币、本位币】
     * 汇率是【本位币、综合本位币】input禁用 ，是【原币】input启用
    */
    return (
      <div className="CashEntryContainer">
        <div className="button-top">
          <div className="div-button"><PurpleButton onClick={this.handleSubmit}>保存</PurpleButton></div>
          <span>2017年第12期</span>
        </div>
        <div className="search-criteria">
          <span>账簿</span>
          <Select placeholder="选择一个选项" defaultValue={this.state.booksValue} onChange={this.booksHandleChange}>
            <Select.Option value="1">拓润</Select.Option>
            <Select.Option value="2">白影天下</Select.Option>
          </Select>
          <span>币别</span>
          <Select placeholder="选择一个选项" defaultValue={this.state.currencyValue} onChange={this.currencyHandleChange}>
            <Select.Option value="1">本位币</Select.Option>
            <Select.Option value="2">原币</Select.Option>
            <Select.Option value="3">综合本币位</Select.Option>
          </Select>
          {/**
           * 汇率最多6位整数，最多4位小数。
           */}
          <span>汇率</span>
          <Form.Item className="lineDiv">
            {getFieldDecorator("exchangeValue", {
              initialValue: this.state.exchangeValue || '',
              validateTrigger: ['onBlur', 'onChange'],
              rules: [
                {
                  required: true,
                  message: '请输入汇率！',
                }, {
                  validator: this.onChangecurrencyValue,
                }
              ],
            })(
              <InputNumber
                min={0.0001}
                max={999999.9999} 
                formatter={ylimitDecimals}
                parser={ylimitDecimals}
                disabled={this.state.currencyValue * 1 === 1 || this.state.currencyValue * 1 === 3}
              />  
              )}
          </Form.Item>
          <i className="iconfont icon-yijieshuchushihua"></i>
        </div> 
        <div className="table-layout">
          {this.state.currencyValue * 1 === 1 &&//本位币
            <Table
              rowSelection={null}
              scroll={{ y: 400 }}
              size='middle'
              columns={standardMoney}
              bordered
              pagination={false}
              dataSource={this.state.standardMoneyData}
            />
          }
          {this.state.currencyValue * 1 === 3 && //综合本位币
            <Table
              rowSelection={null}
              scroll={{ y: 400 }}
              size='middle'
              columns={colligateMoney}
              bordered
              pagination={false}
              dataSource={this.state.colligateMoneyData}
            />
          }
          {this.state.currencyValue * 1 === 2 &&//原币
            <Table
              rowSelection={null}
              scroll={{ y: 400 }}
              columns={originalCurrency}
              bordered
              size='middle'
              pagination={false}
              dataSource={this.state.originalCurrencyData}
            />
          }
        </div> 
      </div>
    );

  }
}

const WrappedRegistrationForm = Form.create()(CashEntryContainer);
export default WrappedRegistrationForm;