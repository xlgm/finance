import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Radio } from 'antd';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import './index.less';

const RadioGroup = Radio.Group;

@inject('lossGainEndStore') @observer
class CarryoverDetection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      promptBox: '',
      radioValue: 1,
      datalist: [
        {
          key: '1',
          books: '账簿',
          currentPeriod: '1111',
          afterLoss: '111'
        }
      ]
    };
  }


  onChange = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
  }


  /**
   * 1：损益科目余额为0....->（已过账凭证中所有损益科目余额为零，不需要结转损益。请检查当期是否存在未过账凭证，是否已经结转过损益）
   * 2：检查通过....->进入下一步
  */
  nextStep = () => {
    let { lossGainEndStore } = this.props;
    let parameter = 2;
    switch (parameter) {
      case 1:
        this.setState({
          promptBox:
          <PromptBox
            title="结转损益"
            promptLanguage="已过账凭证中所有损益科目余额为零，不需要结转损益。请检查当期是否存在未过账凭证，是否已经结转过损益"
            onCancel={() => {
              this.setState({ promptBox: '' })
            }}
            onOK={() => {
              this.setState({ promptBox: '' })
            }}>
          </PromptBox>
        })
        break;
      case 2:
        lossGainEndStore.currentNext();
        break;
      default:
        break;
    }



  }


  //上一步
  prevStep = () => {
    let { lossGainEndStore } = this.props;
    lossGainEndStore.currentPrev();
  }

  render() {
    let column = [
      {
        title: '账簿',
        dataIndex: 'books',
        key: "books",
        width: '30%',
      },
      {
        title: '当前会计期间',
        dataIndex: 'currentPeriod',
        key: "currentPeriod",
        width: '30%',
      },
      {
        title: '待过账结转损益',
        dataIndex: 'afterLoss',
        key: "afterLoss",
      }
    ];
    return (
      <div className="carryover-setting-main">
        <div className="exchange-setting">
          <div className="exchange-title">
            本期存在结转损益的凭证。进行下一步前，您需要对结转凭证进行过账或者删除处理。
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
          <div className="steps-div">
            <span className="span-title">请选择处理方式:</span>
            <RadioGroup onChange={this.onChange} value={this.state.radioValue}>
              <Radio value={1}>过账已结转凭证</Radio>
              <Radio value={2}>删除已结转凭证</Radio>
            </RadioGroup>
          </div>
          <div className="button-div">
            <WhiteButton onClick={this.prevStep}>上一步</WhiteButton>
            <PurpleButton onClick={this.nextStep}>下一步</PurpleButton>
          </div>
        </div>
        {this.state.promptBox}
      </div>

    )

  }
}
export default CarryoverDetection; 