import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from 'components/loading';
import MainAdjust from './main';

@inject('adjustMainCashStore')@observer
class AdjustMainCashContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    // let {adjustMainCashStore} = this.props;
    // adjustMainCashStore.changePageControl('');
  }

  render() {
    let {adjustMainCashStore} = this.props;
    let currPage = adjustMainCashStore.currPage;
    let showPage;
    switch (currPage) {
      case 'main' : showPage = <MainAdjust />;
        break;
      default: showPage = <MainAdjust />;
    }
   
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      {showPage}
    </div>

  }
}

export default AdjustMainCashContainer;