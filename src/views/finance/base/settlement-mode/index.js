import React from 'react';
import { inject, observer } from 'mobx-react';
import SettlementMain from './main';
import SettlementAdd from './add';
import SettlementModify from './modify';
import SettlementDetails from './details';
import Loading from 'components/loading';

@inject('settlementStore') @observer
class SettlementContainer extends React.Component {

  componentWillUnmount() {
    let { settlementStore } = this.props;
    settlementStore.changePageControl('SettlementMain');
  }

  render() {
    let { settlementStore } = this.props;

    let pageControl = settlementStore.pageControl;
    let settlementPage

    switch (pageControl) {
      case "SettlementMain":
        settlementPage = <SettlementMain></SettlementMain>;
        break;
      case "SettlementAdd":
        settlementPage = <SettlementAdd></SettlementAdd>;
        break;
      case "SettlementDetails":
        settlementPage = <SettlementDetails></SettlementDetails>;
        break;
      case "SettlementModify":
        settlementPage = <SettlementModify></SettlementModify>;
        break;
      default:
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {settlementPage}
        {settlementStore.isShowLoading && <Loading />}
      </div>
    )
  }

}

export default SettlementContainer;