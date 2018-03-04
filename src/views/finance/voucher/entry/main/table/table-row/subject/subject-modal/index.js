import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Tabs, Tree  } from 'antd';

import './subject-modal.less';
const TabPane = Tabs.TabPane;

@inject('voEntryStore') @observer
class SubjectModal extends Component {

    constructor(props){
      super(props);

    }

    render(){
      let { onOk, onCancel } = this.props;

      return <Modal
        maskClosable={false}
        title="选择科目"
        wrapClassName="entry_subject_modal"
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
      >
      <Tabs defaultActiveKey="1">
        <TabPane tab="资产" key="1">资产</TabPane>
        <TabPane tab="负债" key="2">负债</TabPane>
        <TabPane tab="权益" key="3">权益</TabPane>
        <TabPane tab="成本" key="4">成本</TabPane>
        <TabPane tab="损益" key="5">损益</TabPane>
      </Tabs>
       
      </Modal>
    }
}

export default SubjectModal;