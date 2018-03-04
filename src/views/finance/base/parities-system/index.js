import React from 'react';
import { inject, observer } from 'mobx-react';
import ParitiesMain from './main';
import ParitiesAdd from './add';
import ParitiesModify from './modify';
import ParitiesDetails from './details';
import Loading from 'components/loading';


@inject('paritiesStore') @observer
class ParitiesContainer extends React.Component {

  componentWillUnmount() {
    let { paritiesStore } = this.props;
    paritiesStore.changePageControl('ParitiesMain');
  }

  render() {
    let { paritiesStore } = this.props;
    let pageControl = paritiesStore.pageControl;
    let paritiesPage;
    switch (pageControl) {
      case "ParitiesMain": //列表页 
        paritiesPage = <ParitiesMain />;
        break;
      case "ParitiesDetails": //详情页面 
        paritiesPage = <ParitiesDetails />;
        break;
      case 'ParitiesAdd'://添加页面
        paritiesPage = <ParitiesAdd />;
        break;
      case 'ParitiesModify'://修改页面
        paritiesPage = <ParitiesModify />;
        break;
      default:
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {paritiesPage}
        {paritiesStore.isShowLoading && <Loading />}
      </div>
    )
  }
}

export default ParitiesContainer;