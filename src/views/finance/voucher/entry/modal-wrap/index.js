import React, { Component } from 'react';
import { Modal} from 'antd';
import './index.less';

class ModalWrap extends Component {
  render() {
    let {onOk, onCancel, title, width} = this.props;
    return (
      <Modal
        width={width}
        wrapClassName="vt-modalWrap"
        title={title}
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
      >
        {this.props.children}
      </Modal>
    )
  }
}

export default ModalWrap;