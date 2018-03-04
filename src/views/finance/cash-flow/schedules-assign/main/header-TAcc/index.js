import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Select, DatePicker, Radio, Checkbox, Switch, Message, Modal } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import AdvancedQuery from 'components/advanced-query';
import moment from 'moment';
import './index.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD hh:mm:ss';

@inject('assignCashStore') @observer
class HeaderTacc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accRecords: ['不用等', '易酷', '拓润'],
      currencyTypes: ['人民币', '综合本位币'],
      startValue: moment(),
      endValue: moment().add(30, 'days'),
      endOpen: false,
      currencyType: ''
    }
  }
  onMsgInfo = (info) => {
    Message.destroy();
    Message.info(info);
  }
  handleReSplit = () => {
    this.setState({
      showModal: (
        <Modal
          title="拆分凭证"
          wrapClassName="reSplitModal"
          visible={true}
          onOk={() => {
            this.setState({
              showModal: ''
            });
          }}
          onCancel={() => {
            this.setState({
              showModal: ''
            });
          }}
        >
          <div>
            <h3 className="title">多借多贷凭证</h3>
            <RadioGroup
              onChange={(e) => {
                this.setState({
                  radioValue: e.target.value
                });
              }}
              value={this.state.radioValue}
            >
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </RadioGroup>
            <div className="tipText">系统将重新拆分过滤条件范围内的凭证，已指定的现金流量信息将被清除</div>
          </div>
        </Modal>
      )
    });
  }

  render() {
    let { assignCashStore } = this.props;

    return (
      <div className="header-schedulesAssign">
        <div className="btnGroup-container">
          <WhiteButton>刷新</WhiteButton>
          <WhiteButton className="reSplit" onClick={this.handleReSplit}>重新拆分凭证</WhiteButton>
          <WhiteButton>查看凭证</WhiteButton>
          <WhiteButton>取消项目</WhiteButton>
          <WhiteButton>应用预设</WhiteButton>
          <PurpleButton>保存</PurpleButton>
          {this.state.showModal}
        </div>
        <div className="search-container">
          <div className="search-item">
            <h3>账簿</h3>
            <Select>
              {this.state.accRecords.map((accRecord, index) => {
                return <Option key={index} value={accRecord}>{accRecord}</Option>
              })}
            </Select>
          </div>
          <div className="search-item">
            <h3>币别</h3>
            <Select
              onChange={(value) => {
                this.onChange('currencyType', value);
              }}
            >
              {this.state.currencyTypes.map((currencyType, index) => {
                return <Option key={index} value={currencyType}>{currencyType}</Option>
              })}
            </Select>
          </div>
          <div className="search-item">
            <h3>起止日期</h3>
            <RangePicker
              defaultValue={[moment(new Date(), dateFormat), moment(moment().add(30, 'days'), dateFormat)]}
              onChange={(dates, datesString) => {
                // dates.map(date => {
                //   moment(date).format('YYYY-MM-DD HH:mm:ss');

                // });
                console.log(moment(dates[0]).format('YYYY-MM-DD HH:mm:ss'));
                console.log(moment(dates[1]).format('YYYY-MM-DD HH:mm:ss'));
              }}
            />
          </div>
          <div className="search-item advanced-query-tacc">
            <AdvancedQuery
              width="576px"
              height="562px"
              onOk={() => {
                console.log('ok')
              }}
              onCancel={() => {
                console.log('cancel')
              }}
            >
              <ul className="topSearch-aq-content">
                <li>
                  <h3>对方科目汇总方式</h3>
                  <RadioGroup className="advancedQuery-item">
                    <Radio className="noPaddingTop" value="a">对方科目按一级科目汇总</Radio>
                    <Radio value="b">对方科目按现金类、非现金类汇总</Radio>
                  </RadioGroup>
                </li>
                <li>
                  <h3>展开方式</h3>
                  <div className="advancedQuery-item expand">
                    <p>
                      <span>是否展开</span>
                      <Switch
                        defaultChecked={this.state.expandable}
                        unCheckedChildren="否"
                        checkedChildren="是"
                        onChange={(checked) => {
                          this.setState({
                            expandable: checked
                          })
                        }}
                      />
                    </p>
                    {
                      this.state.expandable ? (
                        <RadioGroup>
                          <Radio value="a">按下级科目展开</Radio>
                          <Radio value="b">按流量项目展开</Radio>
                          <Radio disabled={!(this.state.currencyType === '综合本位币')} value="c">按币别展开</Radio>
                        </RadioGroup>
                      ) : null
                    }

                  </div>
                </li>
                <li className="noBorderBottom">
                  <h3>其他选项</h3>
                  <CheckboxGroup
                    className="advancedQuery-item"
                    options={[{
                      label: '显示禁用科目',
                      value: 1
                    }, {
                      label: '包含未过账凭证',
                      value: 2,
                    }, {
                      label: '显示科目全名',
                      value: 3
                    }]}
                    defaultValue={this.state.checkedValue}
                    onChange={this.handleCheckbox}
                  />
                </li>
              </ul>
            </AdvancedQuery>
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderTacc;