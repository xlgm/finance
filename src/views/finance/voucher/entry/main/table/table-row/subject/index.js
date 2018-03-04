import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { AutoComplete } from 'antd';
import SubjectModal from './subject-modal'

import './subject.less';

@inject('voEntryStore') @observer
class Subject extends Component {
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

      return <div className="entry_col_subject">
        <AutoComplete
          dataSource={dataSource}
          style={{ width: '100%', height: 80}}
          onSelect={this.onSelect}
          onChange={this.handleChange}
        />

        <div className="subject_name" onClick={()=>{
          this.setState({
            stateDialog: <SubjectModal
              onOk={()=>{
                this.setState({
                  stateDialog: ''
                })
              }}
              onCancel={()=>{
                this.setState({
                  stateDialog: ''
                })
              }}
            />
          })

        }}>科目</div>
        <div className="subject_money">
          余额:100000000
        </div>

        {this.state.stateDialog}
      </div>
    }
}

export default Subject;