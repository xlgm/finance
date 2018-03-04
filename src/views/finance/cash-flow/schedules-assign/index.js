import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import MainTacc from './main';

@inject('assignCashStore') @observer
class SchedulesContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    // let {tableCashStore} = this.props;
    // tableCashStore.changePageControl('');
  }

  render() {
    let { assignCashStore } = this.props;
    let currPage = assignCashStore.currPage;
    let showPage;
    switch (currPage) {
      case 'Main': showPage = <MainTacc />;
        break;
      default: showPage = <MainTacc />;
    }
    return (
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        {showPage} 
      </div>
    )
  }
}

export default SchedulesContainer;