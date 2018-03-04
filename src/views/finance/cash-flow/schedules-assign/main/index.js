import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import HeaderTAcc from './header-TAcc';
import TreeTAcc from './tree-TAcc';

@inject('tAccountStore') @observer
class MainTacc extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    let {tAccountStore} = this.props;
   
    return (
      <div>
        <HeaderTAcc/>
        <TreeTAcc />
      </div>
    )
  }
}

export default MainTacc;