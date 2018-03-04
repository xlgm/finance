import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from 'components/loading';
import CashFlowTableMain from './main';

@inject('queryCashFlowStore') @observer
class TableCashContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    // let {tableCashStore} = this.props;
    // tableCashStore.changePageControl('');
  }

  render() {
    let {queryCashFlowStore} = this.props;
    let currPage = queryCashFlowStore.currPage;
    let showPage;
    switch (currPage) {
      case 'main' : showPage = <CashFlowTableMain/>;
        break;
      default: showPage = <CashFlowTableMain/>;
    }
   
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      {showPage}
    </div>

  }
}

export default TableCashContainer;