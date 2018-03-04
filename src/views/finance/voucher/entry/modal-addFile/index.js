import React, { Component } from 'react';
import { PurpleButton } from 'components/Button.js';
import { Upload } from 'antd';
import ModalWrap from '../modal-wrap';
import './index.less';

class Modal2AddFile extends Component {
  render() {
    let {onOk, onCancel} = this.props;
    return (
      <ModalWrap
        title="添加附件"
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div className="vt-modal2addFile">
          <Upload multiple={true}>
            <PurpleButton className="vt-modal2addFile-btn">添加文件</PurpleButton>
          </Upload>
        </div>
      </ModalWrap>
    )
  }
}

export default Modal2AddFile;