import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Select, Input } from 'antd';

import './currency.less';
const Option = Select.Option;

@inject('voEntryStore') @observer
class Currency extends Component {
  
    constructor(props){
      super(props);

    }

    render(){
      let { hasCurrency } = this.props;
      return <div className="entry_col_currency">
        { hasCurrency && 
        <div className="curr_row" >
          <Select defaultValue="rmb" size="small" style={{ width: 60, marginLeft: 4 }}>
            <Option value="rmb">rmb</Option>
            <Option value="usb">usb</Option>
          </Select>
          <Input size="small" style={{ width: 60, marginLeft: 4 }}/>
        </div>
        }
        { hasCurrency && 
        <div style={{marginLeft: 4 }}>
          <span>原币</span>
          <Input  size="small" style={{ width: 80, marginLeft: 8 }}/>
        </div>
       }
        
      </div>
    }
}

export default Currency;