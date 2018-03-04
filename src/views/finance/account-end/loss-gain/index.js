import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Steps } from 'antd';
import { WhiteButton } from 'components/Button.js';
import CarryoverDetection from './carryover-detection';
import BookSelection from './book-selection';
import CheckoutSetting from './checkout-setting';
import './index.less';
const Step = Steps.Step;

@inject('lossGainEndStore') @observer
class LossGainEndContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    let { lossGainEndStore } = this.props;
    lossGainEndStore.currentInitial();
  }

  render() {
    let { lossGainEndStore } = this.props;
    let steps = [{
      title: '账簿选择',
      content: <BookSelection />,
    }, {
      title: '结转检查',
      content: <CarryoverDetection />,
    }, {
      title: '结帐选项设置',
      content: <CheckoutSetting />
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
      <div className="loss-gain-end-container">
        <div className="icon-top">
          <div>
            <Steps current={lossGainEndStore.current} >
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">
              {steps[lossGainEndStore.current].content}
            </div>
          </div>
        </div>
      </div>
    )


  }
}

export default LossGainEndContainer;