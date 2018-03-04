import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from 'components/loading';
import QueryMain from './main';
import Arrange from './arrange';

@inject('voQueryStore')@observer
class VoQueryContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    let {voQueryStore} = this.props;
    voQueryStore.changePageControl('QueryMain');
  }

  render() {
    let { voQueryStore } = this.props;
    let pageControl = voQueryStore.pageControl;
    let queryPage;

    switch (pageControl) {
      case "QueryMain": //凭证查询主页
      queryPage = <QueryMain />;
        break;
      case "Arrange":
      queryPage = <Arrange />;//整理断号
        break;
      default:
    }
   
    return <div style={{
      width: '100%',
      height: '100%'
    }}>
    {queryPage}
    </div>

  }
}

export default VoQueryContainer;