import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton } from 'components/Button.js'
import { Form, Input, Tabs } from 'antd';
import moment from 'moment';
import './details.less';
const TabPane = Tabs.TabPane;



@inject('paritiesStore') @observer
class ParitiesDetails extends React.Component {
  constructor(props) {
    super(props);
    let SystemDetailObj = this.props.paritiesStore.SystemDetailObj;
    this.state = {
      sourceCurrencyName: SystemDetailObj.sourceCurrencyName,
      targetCurrencyName: SystemDetailObj.targetCurrencyName,
      fixedExchangeRateString: SystemDetailObj.fixedExchangeRateString,
      effectiveTime: moment(SystemDetailObj.effectiveTime * 1).format("YYYY-MM-DD"),
      expiryTime: moment(SystemDetailObj.expiryTime * 1).format("YYYY-MM-DD"),
    };
  }


  render() {
    let { paritiesStore } = this.props;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };

    return (
      <div className='parities-details'>
        <div className='btns'>
          <WhiteButton
            onClick={() => {
              paritiesStore.changePageControl('ParitiesMain');
            }}>
            返回
          </WhiteButton>
        </div>
        <div className="add-main">
          <Tabs defaultActiveKey="1" >
            <TabPane tab="基本信息" key="1">
              <Form.Item {...formItemLayout}
                label="原币">
                <Input disabled value={this.state.sourceCurrencyName} />
              </Form.Item>
              <Form.Item
                label="目标币" {...formItemLayout} >
                <Input disabled value={this.state.targetCurrencyName} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="汇率" >
                <Input disabled value={this.state.fixedExchangeRateString} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="生效日期" >
                <Input disabled value={this.state.effectiveTime} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="失效日期" >
                <Input disabled value={this.state.expiryTime}/>
              </Form.Item>
            </TabPane>
            <TabPane tab="操作记录" key="2">操作记录</TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
export default ParitiesDetails;  