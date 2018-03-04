import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from 'components/loading';
import MainTacc from './main';

@inject('tAccountStore') @observer
class TAccountContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
  }

  render() {
    let {tAccountStore} = this.props;
    let currPage = tAccountStore.currPage;
    let showPage;
    switch (currPage) {
      case 'Main': showPage = <MainTacc />;
        break;
      default: showPage = <MainTacc />;
    }
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      {showPage}
    </div>
  }
}

export default TAccountContainer;