import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from 'components/loading';
import SummaryMain from './main';

@inject('voSummaryStore')@observer
class VoSummaryContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    let {voSummaryStore} = this.props;
    voSummaryStore.changePageControl('SummaryMain');
  }

  render() {
    let { voSummaryStore } = this.props;
    let pageControl = voSummaryStore.pageControl;
    let queryPage;

    switch (pageControl) {
      case "SummaryMain": 
      queryPage = <SummaryMain />;
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

export default VoSummaryContainer;