import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Loading from 'components/loading';
import TellerMain from './main';

@inject('voTellerStore')@observer
class VoTellerContainer extends Component {

  constructor(props) {
    super(props);

  }

  componentWillUnmount() {
    let {voTellerStore} = this.props;
    voTellerStore.changePageControl('TellerMain');
  }

  render() {
    let { voTellerStore } = this.props;
    let pageControl = voTellerStore.pageControl;
    let queryPage;

    switch (pageControl) {
      case "TellerMain": 
      queryPage = <TellerMain />;
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

export default VoTellerContainer;