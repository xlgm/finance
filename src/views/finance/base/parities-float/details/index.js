import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton } from 'components/Button.js'
import { Form, Input, } from 'antd';
import './details.less';

@inject('paritiesFloatStore') @observer
class ParitiesFloatDetails extends React.Component {

  constructor(props) {
    super(props);
    let { paritiesFloatStore } = this.props;

    this.state = {
      textDate: '',
      originalCurrency: '',
      targetCurrency: '',
      floatingRate: '',
    };
  }

  render() {
    let { paritiesFloatStore } = this.props;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    return (
      <div className="parities-details">
        <div className="add-top">
          <WhiteButton
            onClick={() => {
              paritiesFloatStore.changePageControl('ParitiesFloatMain');
            }}>
            返回
        </WhiteButton>
        </div>
        <div className="add-main">
          <div className="add-main-from">
            <div className="modify-form">
              <Form.Item {...formItemLayout}
                label="日期">
                <Input
                  type="text"
                  value={this.state.textDate}
                  disabled
                />
              </Form.Item>
              <Form.Item {...formItemLayout}
                label="原币">
                <Input
                  type="text"
                  value={this.state.originalCurrency}
                  disabled
                />
              </Form.Item>
              <Form.Item {...formItemLayout}
                label="目标币">
                <Input
                  type="text"
                  value={this.state.targetCurrency}
                  disabled
                />
              </Form.Item>
              <Form.Item {...formItemLayout}
                label="浮动汇率">
                <Input
                  type="text"
                  value={this.state.floatingRate}
                  disabled
                />
              </Form.Item>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default ParitiesFloatDetails;