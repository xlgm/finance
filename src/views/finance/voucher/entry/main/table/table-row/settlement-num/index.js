import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Input } from 'antd';
import './settlement-num.less';

@inject('voEntryStore') @observer
class SettlementNum extends Component {

    constructor(props){
      super(props);
      this.state = {
        number: ''
      }
    }

    render(){
      let { hasNum } = this.props;
      return <div className="entry_col_settlement_num">
       
        <Input 
          style={{width: 90, height: 80}} 
          value={this.state.number}
          onChange={(e)=>{
            let value=e.target.value;

            if(/^\d{0,20}$/.test(value)){
              this.setState({number: value})
            }
          }}/>
      </div>
    }
}

export default SettlementNum;