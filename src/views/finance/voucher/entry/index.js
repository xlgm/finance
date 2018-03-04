import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import VoucherEntryMain from './main';

@inject('voEntryStore') @observer
class VoEntryContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { voEntryStore } = this.props;

    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'realtive'
      }}>
        <VoucherEntryMain/>
      </div>
    )
  }
}
export default VoEntryContainer;