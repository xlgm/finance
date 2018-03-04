import React, { Component } from 'react';
import { Modal } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import './modal.less';

/*
    可传参数 
    title:输入头内容
    promptLanguage:输入的提示语
    cancelButton:是否需要取消按钮
    definiteButton：默认 '确定'  可以设置
    onCancel: 取消回掉事件
    onOk： 确定回掉事件
*/
class PromptBox extends Component {

  render() {

    let { title, promptLanguage, onCancel, onOK, cancelButton,definiteButton } = this.props;
    return (
      <Modal
        title={<span><i className="anticon anticon-question-circle"></i>{title}</span>}
        visible={true}
        width={400}
        maskClosable={false}
        footer={null}
        wrapClassName='prompt-box'
        onCancel={() => {
          onCancel && onCancel();
        }}>
        <div className="prompt-content">
          <p className="text-content">{promptLanguage}</p>
        </div>
        <div className="prompt-buttons">
          {cancelButton && <WhiteButton onClick={() => { onCancel && onCancel(); }}>取消</WhiteButton>}
          <PurpleButton onClick={() => { onOK && onOK(); }}>{ definiteButton ? definiteButton : "确定" }</PurpleButton>
        </div>
      </Modal>
    )
  }
}

export default PromptBox