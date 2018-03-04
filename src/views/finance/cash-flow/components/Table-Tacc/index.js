import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Icon} from 'antd';
import './index.less';



@inject('tAccountStore') @observer
class T_AccMain extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillUnmount() {
  }

  render() {
    let {tAccountStore} = this.props;
  
    return (
      <div className="T_AccMain">
        
      </div>
    )
  }
}

export default T_AccMain;