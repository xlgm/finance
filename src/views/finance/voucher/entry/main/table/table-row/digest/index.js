import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { AutoComplete } from 'antd';
import DigestModal from './digest-modal';

import './summary.less';

@inject('voEntryStore') @observer
class Digest extends Component {
    constructor(props){
      super(props);

      this.state = {
        stateDialog: '',
        dataSource: [],
      }
    }

    handleChange = (value) => {
      this.setState({
        dataSource: !value ? [] : [
          value,
          value + value,
          value + value + value,
        ],
      });
    }

    onSelect=(value)=> {
      console.log('onSelect', value);
    }

    render(){
      const { dataSource } = this.state;

      return <div className="entry_col_summary">
        <AutoComplete
          dataSource={dataSource}
          style={{ width: '100%', height: 80}}
          onSelect={this.onSelect}
          onChange={this.handleChange}
        />

        <div className="summary_name" onClick={()=>{
            this.setState({
              stateDialog: <DigestModal
                onOk={()=>{
                  this.setState({stateDialog: ''})
                }}
                onCancel={()=>{
                  this.setState({stateDialog: ''})
                }}
              />
            })


        }}>摘要</div>

        {this.state.stateDialog}
      </div>
    }
}

export default Digest;