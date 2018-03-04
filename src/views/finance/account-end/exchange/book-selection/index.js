import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Select } from 'antd';
import { PurpleButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import './index.less';


@inject('exchangeEndStore') @observer
class BookSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      promptBox: '',
    }
  }

  /**
   * 1:系统未设置外币（系统未设置外币,不需要进行调汇）
   * 2：没有期末调汇科目(系统中不存在需要期末调汇的科目。请确认需要调汇的相关科目属性中是否已勾选“期末调汇”选项。)
   * 3：账簿无外币业务(账簿当前期间不存在外币业务，不需要调整。)
   * 4:有未过账的凭证(当期存在未过账的外币业务凭证，请先到<凭证过账>进行过账处理。)
   * 5:检查通过则进入下一步
  */
  nextStep = () => {

    let { exchangeEndStore } = this.props;
    let parameter = 5;
    let textPrompt = "";
    switch (parameter) {
      case 1:
        textPrompt = "系统未设置外币，不需要进行调汇。";
        break;
      case 2:
        textPrompt = "系统中不存在需要期末调汇的科目。请确认需要调汇的相关科目属性中是否已勾选“期末调汇”选项。";
        break;
      case 3:
        textPrompt = "账簿当前期间不存在外币业务，不需要调整。";
        break;
      case 4:
        textPrompt = "当期存在未过账的外币业务凭证，请先到(凭证过账)进行过账处理。";
        break;
      default:
        break;
    }

    if (parameter === 5) {
      exchangeEndStore.currentNext();
    } else {
      this.setState({
        promptBox:
        <PromptBox
          title="期末调汇"
          promptLanguage={textPrompt}
          onCancel={() => {
            this.setState({ promptBox: '' })
          }}
          onOK={() => {
            this.setState({ promptBox: '' })
          }}>
        </PromptBox>
      })
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
            <p>请选择需要进行期未调汇的账薄</p>
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