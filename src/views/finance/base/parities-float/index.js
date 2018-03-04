import React from 'react';
import { inject, observer } from 'mobx-react';
import ParitiesFloatMain from './main';
import ParitiesFloatDetails from './details';
import Loading from 'components/loading';


@inject('paritiesFloatStore') @observer
class ParitiesFloatContainer extends React.Component {

  componentWillUnmount() {
    let { paritiesFloatStore } = this.props;
    paritiesFloatStore.changePageControl('ParitiesFloatMain');
  }

  render() {
    let { paritiesFloatStore } = this.props;
    let pageControl = paritiesFloatStore.pageControl;
    let paritiesPage;
    switch (pageControl) {
      case "ParitiesFloatMain": //列表页 
        paritiesPage = <ParitiesFloatMain />;
        break;
      case "ParitiesFloatDetails": //详情页面  
        paritiesPage = <ParitiesFloatDetails />;
        break; 
      default:
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {paritiesPage}
        {paritiesFloatStore.isShowLoading && <Loading />}
      </div>
    )
  }
}

export default ParitiesFloatContainer;