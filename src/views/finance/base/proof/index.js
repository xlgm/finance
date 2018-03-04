//只是一个容器组件 用来处理要加载的模块
import React from 'react';
import { inject, observer } from 'mobx-react';
import ProofMain from './main';
import ProofAdd from './add';
import ProofModify from './modify';
import Loading from 'components/loading';

@inject('proofStore') @observer
class ProofContainer extends React.Component {


  componentWillUnmount() {
    let { proofStore } = this.props;
    proofStore.changePageControl('ProofMain');

  }

  render() {
    let { proofStore } = this.props;
    let pageControl = proofStore.pageControl;
    let paritiesPage;
    switch (pageControl) {
      case "ProofMain": //列表页 
        paritiesPage = <ProofMain></ProofMain>;
        break;
      case "ProofDetail": //详情页面 
        paritiesPage = <ProofAdd></ProofAdd>;
        break;
      case 'ProofAdd'://添加页面
        paritiesPage = <ProofAdd></ProofAdd>
        break;
      case 'ProofModify'://修改页面
        paritiesPage = <ProofModify></ProofModify>
        break;
      default:
    }

    return <div style={{ width: '100%', height: '100%' }}>
      {paritiesPage}
      {proofStore.isShowLoading && <Loading />}

    </div>
  }
}

export default ProofContainer;