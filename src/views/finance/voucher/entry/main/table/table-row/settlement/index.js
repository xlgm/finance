import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';
import SettlementModal from './settlement-modal';

import './settlement.less';

@inject('voEntryStore') @observer
class Settlement extends Component {

    constructor(props){
      super(props);

      this.state={
        stateDialog: ''
      }
    }

    render(){
      let { hasSettlement } = this.props;
      return <div className="entry_col_settlement">
        {hasSettlement && <div className="label">结算方式结算方式结算方式结算方式结算方式结算方式</div>}
        {hasSettlement &&
        <Icon type="search" onClick={()=>{
          this.setState({
            stateDialog: <SettlementModal
            onOk={()=>{
              this.setState({stateDialog: ''});
            }}
            onCancel={()=>{
              this.setState({stateDialog: ''});
            }}
            />
          })
        }}/>}
        {this.state.stateDialog}
      </div>
    }
}

export default Settlement;