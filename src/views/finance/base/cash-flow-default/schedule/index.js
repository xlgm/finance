import React from 'react';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message, Table, Modal, Input, Icon, Button, Popconfirm, AutoComplete } from 'antd';
import { isInArray } from 'common/utils'

import "./schedule.less"
message.config({
  top: 200,
  duration: 2,
});

@inject('cashFlowDefaultStore') @observer
class Schedule extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [{
        title: '代码',
        children: [
          {
            title: 'CI02.02.03',
            count: '投资支付的现金',
          }, {
            title: 'CI02.02.06',
            count: '资产减值准备',
          },
          {
            title: 'CI02.02.09',
            count: '偿还债务支付的现金',
          },
        ],
      }]
    }

  }
  


  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;

    function renderTitle(title) {
      return (
        <span style={{ marginLeft: 10 }}>
          {title}
          <span style={{ position: 'absolute', right: 15 }}>名称</span>
        </span>
      );
    }

    const options = dataSource.map(group =>
      <OptGroup
        key={group.title}
        label={renderTitle(group.title)}
      >
        {group.children.map((opt, index) =>
          <Option key={index} value={opt.count}>
            {opt.title}
            <span className="certain-search-item-count">{opt.count} </span>
          </Option>)
        }
      </OptGroup>);

    return (
      <div>
        <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
          <AutoComplete
            className="certain-category-search"
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 300 }}
            size="large"
            style={{ width: '100%' }}
            dataSource={options}
            placeholder=""
            optionLabelProp="value"
            onChange={(value) => {

            }}
          >
            <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();

            }} />} />
          </AutoComplete>
        </div>
      </div>
    );
  }

}

export default Schedule;