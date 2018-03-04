//只是一个容器组件 用来处理要加载的模块

import React from 'react';
import {inject, observer} from 'mobx-react';
import SystemMain from './mian';
import SystemAdd from './add';
import SystemModify from './modify';
import SystemDetail from './detail';
import Loading from 'components/loading';

@inject('systemStore')@observer
class SystemContainer extends React.Component {

  componentWillUnmount() {
    let {systemStore} = this.props;
    systemStore.changePageControl('SystemMain');
  }

  render() {
    let {systemStore} = this.props;
    let pageControl = systemStore.pageControl;
    let systemPage;
    switch (pageControl) {
      case "SystemMain": //列表页
        systemPage = <SystemMain />;
        break;
      case "SystemAdd": //添加的页面
        systemPage = <SystemAdd />;
        break;
      case "SystemModify": //修改的页面
        systemPage = <SystemModify />;
        break;
      case "SystemDetail": //修改的页面
        systemPage = <SystemDetail />;
        break;
      default:
    }
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      {systemPage}
      {systemStore.isShowLoading && <Loading />}
    </div>
  }

}

export default SystemContainer;