import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import CurrencyMain from './main';
import CurrencyDetail from './detail';
import Loading from 'components/loading';

@inject('currencyStore')@observer
class Currency extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    let {currencyStore} = this.props;
    currencyStore.changePageControl('CurrencyMain');
  }

  render() {
    let {currencyStore} = this.props;
    let pageControl = currencyStore.pageControl;
    let currencyPage
    switch (pageControl) {
      case "CurrencyMain":
        currencyPage = <CurrencyMain />;
        break;
      case "CurrencyDetail":
        currencyPage = <CurrencyDetail />;
        break;
      default:
    }
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      {currencyPage}
      {currencyStore.isShowLoading && <Loading />}
    </div>

  }
}

export default Currency;