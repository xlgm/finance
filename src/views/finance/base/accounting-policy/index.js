//只是一个容器组件 用来处理要加载的模块
import React from 'react';
import AccountingPolicyMain from './mian';
import AccountingPolicyAdd from './add';
import AccountingPolicyModify from './modify';
import PolicyDetails from './details';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';

@inject('policyStore')
@observer
class PolicyContainer extends React.Component {

  componentWillUnmount() {
    let { policyStore } = this.props;
    policyStore.changePageControl('PolicyMain');
  }

  render() {
    let { policyStore } = this.props;
    let pageControl = policyStore.pageControl;
    let policyPage;
    switch (pageControl) {
      case 'PolicyMain': //列表页
        policyPage = <AccountingPolicyMain />;
        break;
      case 'PolicyAdd': //添加的页面
        policyPage = <AccountingPolicyAdd />;
        break;
      case 'PolicyModify': //修改的页面
        policyPage = <AccountingPolicyModify />;
        break;
      case 'PolicyDetails': //详情页面
        policyPage = <PolicyDetails />;
        break;
      default:
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {policyPage}
        {policyStore.isShowLoading && <Loading />}
      </div>
    );
  }
}

export default PolicyContainer;
