import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Steps } from 'antd';
import {  WhiteButton } from 'components/Button.js';
import ExchangeSetting from './exchange-setting';
import BookSelection from './book-selection';
import ParameterSetting from './parameter-setting';
import './index.less';
const Step = Steps.Step;



@inject('exchangeEndStore') @observer
class ExchangeEndContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    let { exchangeEndStore } = this.props;
    exchangeEndStore.currentInitial();
  }


  render() {
    let { exchangeEndStore } = this.props;
    let steps = [{
      title: '账簿选择',
      content: <BookSelection />,
    }, {
      title: '汇率设置',
      content: <ExchangeSetting />,
    }, {
      title: '参数设置',
      content: <ParameterSetting />
      ,
    }, {
      title: '凭证生成',
      content: (
        <div className="certificate-generation">
          <div className="generation-div">
            <i className="anticon anticon-check-circle"></i>
            <p>已生成凭证:<span>记-5</span></p>
            <WhiteButton>查询凭证</WhiteButton>
          </div>
        </div>
      ),
    }];
    return (
      <div className="exchangeEndContainer">
        <div className="icon-top">
          <div>
            <Steps current={exchangeEndStore.current} >
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">
              {steps[exchangeEndStore.current].content}
            </div>
          </div>
        </div>
      </div>
    )

  }
}
export default ExchangeEndContainer; 