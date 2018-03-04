import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Select, Checkbox, Icon, DatePicker, Radio, AutoComplete, Tooltip } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import moment from 'moment';
import './index.less';
const RadioGroup = Radio.Group;
const Option = AutoComplete.Option;
const text = <span>改科目必须是最明细科目且不能核算外币,可在账簿总账参数设置(汇总损益科目)</span>;
const textmode = <span>
  选择该项后，按科目属性中定义额度科目方向结转；没选中时，按待调整金额所属的借贷方向调整。
                      例：银行存款(科目属性定义为借方科目)，期末调汇时需调减  10000(即：贷方10000)
                      如未选择“按科目方向调汇”时，结转分录为贷：银行存款 10000选择时，结转分录为借：银行存款 -10000.
                  </span>;


@inject('exchangeEndStore') @observer
class ParameterSetting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [],
      datePicker: moment(Date.now()),
      promptBox: '',
    }
  }


  /**
   *  填写完成询问框 进入下一步
  */
  nextStep = (e) => {
    let { exchangeEndStore } = this.props;
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
            title="期末调汇"
            cancelButton
            promptLanguage="确定进行期末处理?" 
            onCancel={() => {
              this.setState({ promptBox: '' })
            }}
            onOK={() => {
              exchangeEndStore.currentNext();
            }}>
          </PromptBox>
        })

       
      }
    });
  }


  //上一步
  prevStep = () => {
    let { exchangeEndStore } = this.props;
    exchangeEndStore.currentPrev();
  }

  handleChange = (value) => {
    let result;
    result = ['哈哈哈', '啦啦啦啦', '嘻嘻嘻'];
    this.setState({ result });
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
    let { exchangeEndStore } = this.props;
    const { result } = this.state;
    const { getFieldDecorator } = this.props.form;
    const children = result.map((email) => {
      return <Option key={email}>{email}</Option>;
    });
    let formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 6 },
    };
    return (
      <div className="parameter-setting-main">
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
                <Radio className="radioStyle" value={1}>收益和损失同时结转(生成一张凭证)</Radio>
                <Radio className="radioStyle" value={2}>收益和损失分开结转(分别生成收益凭证和损失凭证)</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="汇兑损益科目" >
            {
              getFieldDecorator('exchangeAccount', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入科目名称/编码查询',
                  },
                ],
              })(
                <AutoComplete
                  onChange={this.handleChange}
                  placeholder="请输入科目名称/编码查询"
                  dataSource={children}>
                  <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }} />} />
                </AutoComplete>
                )

            }
            <Tooltip placement="rightTop" title={text}>
              <i className="anticon anticon-question-circle"></i>
            </Tooltip>
          </Form.Item>
          <Form.Item {...formItemLayout} label="结转方式" >
            <Checkbox defaultChecked={true}>按科目方向调汇</Checkbox>
            <Tooltip placement="rightTop" title={textmode}>
              <i className="anticon anticon-question-circle"></i>
            </Tooltip>
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
const WrappedRegistrationForm = Form.create()(ParameterSetting);
export default WrappedRegistrationForm; 