import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import { Select, Radio, Table,Dropdown, Menu, message, Form, InputNumber } from 'antd';
import AddDetailsDialog from './add-details-dialog';
import TrialBalanceDialog from './trial-balance-dialog';
import './index.less';

@inject('subjectEntryStore') @observer
class SubjectEntryContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currencyValue: '1',//币别
      booksValue: '1',//账簿
      radioValue: '1',//单选
      addDetailsDialog: '',//添加明细
      trialBalanceDialog: '',//试算平衡
      exchangeValue:'1',//汇率
      standardMoneyData: [//本位币数据集
        {
          key: '1',
          serialNumber: '1',
          subjectCode: '1001',
          subjectName: '银行存款',
          direction: '借',
          initialBalance: 1,
          debitCumulative: 1,
          creditCumulative: 1,
          earlyBalance: 1
        }, {
          key: '2',
          serialNumber: '2',
          subjectCode: '10010001',
          subjectName: '现金',
          direction: '借',
          initialBalance: 556,
          debitCumulative: 1,
          creditCumulative: 1,
          earlyBalance: 1
        }
      ],
      colligateMoneyData: [//综合本位币数据集
        {
          key: '1',
          serialNumber: '1',
          subjectCode: '1001',
          subjectName: '银行存款',
          direction: '借',
          initialBalance: 1,
          debitCumulative: 1,
          creditCumulative: 1,
          earlyBalance: 1
        }, {
          key: '2',
          serialNumber: '2',
          subjectCode: '10010001',
          subjectName: '现金',
          direction: '借',
          initialBalance: 1,
          debitCumulative: 1,
          creditCumulative: 1,
          earlyBalance: 1,
        }
      ],
      originalCurrencyData: [//原币数据集
        {
          key: '1',
          serialNumber: '1',
          subjectCode: '1001',
          subjectName: '银行存款',
          direction: '借',
          qcoriginal: 1,
          qcstandard: 1,
          jforiginal: 1,
          jfstandard: 1,
          dforiginal: 1,
          dfstandard: 1,
          ncoriginal: 1,
          ncstandard: 1,
        }, {
          key: '2',
          serialNumber: '1',
          subjectCode: '1001',
          subjectName: '现金',
          direction: '借',
          qcoriginal: 1,
          qcstandard: 1,
          jforiginal: 1,
          jfstandard: 1,
          dforiginal: 1,
          dfstandard: 1,
          ncoriginal: 1,
          ncstandard: 1,
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
   * 单选筛选 
  */
  changeRadio = (e) => {
    let value = e.target.value;
    this.setState({
      radioValue: value,
    })
  }


  /**
   *添加明细 
  */
  addDetails = () => {
    this.setState({
      addDetailsDialog:
      <AddDetailsDialog
        onCancel={() => {
          this.setState({
            addDetailsDialog: '',
          });
        }}
        onOK={() => {
          this.setState({
            addDetailsDialog: '',
          });
        }}>
      </AddDetailsDialog>
    })
  }

  /**
   * 删除
   * 【删除成功和失败都需要message提示】,不需要二次确认弹窗
  */
  delDetails = () => {
    message.destroy();
    message.warn("执行删除action,不是虚拟删除");
  }

  /**
   * 试算平衡【1：没有外币 2：试算不平衡】
  */
  handleCommand = ({ key }) => {
    this.setState({
      trialBalanceDialog:
      <TrialBalanceDialog
        onCancel={() => {
          this.setState({
            trialBalanceDialog: ''
          });
        }}>
      </TrialBalanceDialog>
    })

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

    
    let { subjectEntryStore } = this.props;
    let booksValue = this.state.booksValue * 1 === 2;
    const { getFieldDecorator } = this.props.form;
    let standardMoney = [//本位币
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '6%'
      },
      {
        title: "科目编码",
        dataIndex: "subjectCode",
        key: 'subjectCode',
        width: '10%',
      },
      {
        title: "科目名称",
        dataIndex: "subjectName",
        key: 'subjectName',
        width: '15%',
        render: (text, record) => {
          if (record.key * 1 === 1) {
            return (
              <div className="subjectDiv">
                <span className="subjectName">{text} </span>
                <i className="anticon anticon-plus-circle" onClick={this.addDetails}></i>
              </div>
            )
          } else if (record.key * 1 === 2) {
            return (
              <div className="subjectDiv">
                <span className="subjectName">{text}  </span>
                <i className="iconfont icon-tubiaoguanbishanchu" onClick={this.delDetails}></i>
              </div>
            )
          }

        }
      },
      {
        title: "方向",
        dataIndex: "direction",
        key: 'direction',
        width: '5%',
      },
      {
        title: "期初余额",
        dataIndex: "initialBalance",
        key: 'initialBalance',
        width: '16%',
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
                defaultValue={record.initialBalance}
                onChange={(value) => { this.onChangeInput.call(this, value, record.key, 'initialBalance', ) }}
                formatter={limitDecimals}
                parser={limitDecimals}
              />
            )
          }
        }
      },
      {
        title: "本年借方累计",
        dataIndex: "debitCumulative",
        key: 'debitCumulative',
        width: '16%',
        className: booksValue && 'column-hide',
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
                defaultValue={record.debitCumulative}
                onChange={(value) => { this.onChangeInput.call(this, value, record.key, 'debitCumulative', ) }}
                formatter={limitDecimals}
                parser={limitDecimals}
              />
            )
          }
        }
      },
      {
        title: "本年贷方累计",
        dataIndex: "creditCumulative",
        key: 'creditCumulative',
        width: '16%',
        className: booksValue && 'column-hide',
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
                defaultValue={record.creditCumulative}
                onChange={(value) => { this.onChangeInput.call(this, value, record.key, 'creditCumulative', ) }}
                formatter={limitDecimals}
                parser={limitDecimals}
              />
            )
          }
        }
      },
      {
        title: "年初余额",
        dataIndex: "earlyBalance",
        key: 'earlyBalance',
        className: booksValue && 'column-hide',
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
                defaultValue={record.earlyBalance}
                onChange={(value) => { this.onChangeInput.call(this, value, record.key, 'earlyBalance', ) }}
                formatter={limitDecimals}
                parser={limitDecimals}
              />
            )

          }
        }
      }
    ];

    let colligateMoney = [//综合本位币
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '6%'
      },
      {
        title: "科目编码",
        dataIndex: "subjectCode",
        key: 'subjectCode',
        width: '10%',
      },
      {
        title: "科目名称",
        dataIndex: "subjectName",
        key: 'subjectName',
        width: '15%',
      },
      {
        title: "方向",
        dataIndex: "direction",
        key: 'direction',
        width: '5%',
      },
      {
        title: "期初余额",
        dataIndex: "initialBalance",
        key: 'initialBalance',
        width: '16%',
      },
      {
        title: "本年借方累计",
        dataIndex: "debitCumulative",
        key: 'debitCumulative',
        width: '16%',
        className: booksValue && 'column-hide'
      },
      {
        title: "本年贷方累计",
        dataIndex: "creditCumulative",
        key: 'creditCumulative',
        width: '16%',
        className: booksValue && 'column-hide'
      },
      {
        title: "年初余额",
        dataIndex: "earlyBalance",
        key: 'earlyBalance',
        className: booksValue && 'column-hide'
      }
    ];

    let originalCurrency = [//原币
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '4%',
      },
      {
        title: "科目编码",
        dataIndex: "subjectCode",
        key: 'subjectCode',
        width: '10%',
      },
      {
        title: "科目名称",
        dataIndex: "subjectName",
        key: 'subjectName',
        width: '10%',
        render: (text, record) => {
          if (record.key * 1 === 1) {
            return (
              <div className="subjectDiv">
                <span className="subjectName">{text} </span>
                <i className="anticon anticon-plus-circle" onClick={this.addDetails}></i>
              </div>
            )
          } else if (record.key * 1 === 2) {
            return (
              <div className="subjectDiv">
                <span className="subjectName">{text}  </span>
                <i className="iconfont icon-tubiaoguanbishanchu" onClick={this.delDetails}></i>
              </div>
            )
          }
        }
      },
      {
        title: "方向",
        dataIndex: "direction",
        key: 'direction',
        width: '4%',
      },
      {
        title: '期初余额',
        children: [{
          title: '原币',
          dataIndex: 'qcoriginal',
          key: 'qcoriginal',
          width: '9%',
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
          width: '9%',
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
      {
        title: "本年借方累计",
        className: booksValue && 'column-hide',
        children: [{
          title: '原币',
          dataIndex: 'jforiginal',
          key: 'jforiginal',
          width: '9%',
          className: booksValue && 'column-hide',
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
                  defaultValue={record.jforiginal}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'jforiginal', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                />  
              )
            }
          }
        }, {
          title: '本位币',
          dataIndex: 'jfstandard',
          key: 'jfstandard',
          width: '9%',
          className: booksValue && 'column-hide',
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
                  defaultValue={record.jfstandard}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'jfstandard', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                />   
              )
            }
          }
        }],
      },
      {
        title: "本年贷方累计",
        className: booksValue && 'column-hide',
        children: [{
          title: '原币',
          dataIndex: 'dforiginal',
          key: 'dforiginal',
          width: '9%',
          className: booksValue && 'column-hide',
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
                  defaultValue={record.dforiginal}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'dforiginal', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                />    
              )
            }
          }
        }, {
          title: '本位币',
          dataIndex: 'dfstandard',
          key: 'dfstandard',
          width: '9%',
          className: booksValue && 'column-hide',
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
                  defaultValue={record.dfstandard}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'dfstandard', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                />     
              )
            }
          }
        }],
      },
      {
        title: "年初余额",
        className: booksValue && 'column-hide',
        children: [{
          title: '原币',
          dataIndex: 'ncoriginal',
          key: 'ncoriginal',
          className: booksValue && 'column-hide',
          width: '9%',
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
                  defaultValue={record.ncoriginal}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'ncoriginal', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                />      
              )

            }
          }
        }, {
          title: '本位币',
          dataIndex: 'ncstandard',
          key: 'ncstandard',
          className: booksValue && 'column-hide',
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
                  defaultValue={record.ncstandard}
                  onChange={(value) => { this.onChangeInputYb.call(this, value, record.key, 'ncstandard', ) }}
                  formatter={limitDecimals}
                  parser={limitDecimals}
                />     
              )
            }
          }
        }],
      }
    ];



    const menu = (
      <Menu onClick={this.handleCommand}>
        <Menu.Item key="1">没有外币</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">试算不平衡</Menu.Item>
      </Menu>
    );

    /**
     * 账簿/币别/类别 数据由后端返回
     * 账簿只有类型为第一期的时候，table只显示【序号、科目编码、科目名称、方向、期初余额】 隐藏其它列className="column-hide"
     * 币别类型是【本位币、综合本位币】table显示是一样的不会显示【原币、本位币】，【综合本位币】table只显示不会有input框
     * 币别类型是【原币】table会显示出【原币、本位币】
     * 汇率是【本位币、综合本位币】input禁用 ，是【原币】input启用
    */
    return (
      <div className="subjectEntryStore">
        <div className="button-top">
          <PurpleButton onClick={this.handleSubmit}>保存</PurpleButton>
          <Dropdown overlay={menu} trigger={['click']}>
            <WhiteButton >试算平衡</WhiteButton>
          </Dropdown>
        </div>
        <div className="search-criteria">
          <span>账簿</span>
          <Select placeholder="选择一个选项" defaultValue={this.state.booksValue} onChange={this.booksHandleChange}>
            <Select.Option value="1">正常情况</Select.Option>
            <Select.Option value="2">第一期</Select.Option>
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
        <div className="radio-layout">
          <Radio.Group size="large" defaultValue="1" onChange={this.changeRadio}>
            <Radio.Button value="1">资产</Radio.Button>
            <Radio.Button value="2">负债</Radio.Button>
            <Radio.Button value="3">权益</Radio.Button>
            <Radio.Button value="4">成本</Radio.Button>
            <Radio.Button value="5">损益</Radio.Button>
          </Radio.Group>
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
        {this.state.addDetailsDialog}
        {this.state.trialBalanceDialog}
      </div>
    );

  }
}

const WrappedRegistrationForm = Form.create()(SubjectEntryContainer);
export default WrappedRegistrationForm;