import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Select } from 'antd';
import { PurpleButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import './index.less';


@inject('lossGainEndStore') @observer
class BookSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      promptBox: '',
    }
  }

  /**
   * 1:未设置(本年利润科目)、（利润分配科目）....->提示【账簿总账参数未设置<本年利润科目>、<利润分配科目>】
   * 2:凭证未调汇，弹窗【继续执行】.....->直接去到结账选项设置页面
   * 3:有未过账的结账损益凭证....->结转检查页面
   * 4:已过账凭证中，损益科目余额为0....->提示【已过账凭证中所有损益科目余额为零，不需要结转损益。请检查当期是否存在未过账凭证，是否已经结转过损益】
   * 5：检查通过，进入下一步
  */
  nextStep = () => {
    let { lossGainEndStore } = this.props;
    let parameter = 3;
    switch (parameter) {
      case 1:
        this.setState({
          promptBox:
          <PromptBox
            title="结账损益"
            promptLanguage="账簿总账参数未设置(本年利润科目)、(利润分配科目)"
            onCancel={() => {
              this.setState({ promptBox: '' })
            }}
            onOK={() => { 
              this.setState({ promptBox: '' })
            }}>
          </PromptBox>
        });
        break;

      case 2:
        this.setState({
          promptBox:
          <PromptBox
            title="结账损益"
            promptLanguage="有符合期末调汇的凭证没调汇，是否继续执行？如需调汇，请前往(期末调汇)处理。"
            cancelButton
            onCancel={() => {
              this.setState({ promptBox: '' })
            }}
            definiteButton="继续执行"
            onOK={() => {
              lossGainEndStore.currentTwoNext();
              this.setState({ promptBox: '' })
            }}>
          </PromptBox>
        });
        break;
      case 3:
        lossGainEndStore.currentNext();
        break;
      case 4:
        this.setState({
          promptBox:
          <PromptBox
            title="结账损益"
            promptLanguage="已过账凭证中所有损益科目余额为零，不需要结转损益。请检查当期是否存在未过账凭证，是否已经结转过损益。"
            onCancel={() => {
              this.setState({ promptBox: '' })
            }}
            onOK={() => { 
              this.setState({ promptBox: '' })
            }}>
          </PromptBox>
        });
        break;
      case 5:
        lossGainEndStore.currentTwoNext();
        break;
      default:
        break;
    } 
  }


  render() {

    let formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
    };
    return (
      <div className="book-selection-main">
        <div className="choose-divmain">
          <div className="choose-div">
            <p>在开始结转本期损益之前，应当将所有凭证过帐。</p>
            <Form.Item {...formItemLayout} label="账簿" >
              <Select placeholder="选择一  个选项" defaultValue="1">
                <Select.Option value="1">拓润</Select.Option>
                <Select.Option value="2">不用等</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item {...formItemLayout} label="核算组织" >
              <Input
                value="研发中心"
                disabled
              />
            </Form.Item>
          </div>
        </div>
        <div className="step-button">
          <PurpleButton onClick={this.nextStep}>下一步</PurpleButton>
        </div>
        {this.state.promptBox}
      </div>
    )

  }
}
export default BookSelection; 