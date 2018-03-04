import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import HeaderTAcc from './header-TAcc';
import TreeTAcc from './tree-TAcc';
import './index.less';

@inject('tAccountStore') @observer
class MainTacc extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    let {tAccountStore} = this.props;
   
    return (
      <div className="mainTacc-container-tacc">
        <HeaderTAcc/>
        <div className="tree-container">
          <TreeTAcc />
          <TreeTAcc />
        </div>        
      </div>
    )
  }
}

export default MainTacc;