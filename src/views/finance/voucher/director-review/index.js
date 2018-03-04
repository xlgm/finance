import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from 'components/loading';
import DirectorMain from './main';

@inject('voDirectorStore')@observer
class VoDirectorContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    let {voDirectorStore} = this.props;
    voDirectorStore.changePageControl('DirectorMain');
  }

  render() {
    let { voDirectorStore } = this.props;
    let pageControl = voDirectorStore.pageControl;
    let queryPage;

    switch (pageControl) {
      case "DirectorMain": 
      queryPage = <DirectorMain />;
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

export default VoDirectorContainer;