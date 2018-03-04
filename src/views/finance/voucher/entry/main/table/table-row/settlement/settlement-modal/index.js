import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {  PurpleButton } from 'components/Button.js';
import { Modal, Table, Input } from 'antd';

import './settlement-modal.less';

@inject('voEntryStore') @observer
class SettlementModal extends Component {

    constructor(props){
      super(props);

    }

    render(){
      let { onOk, onCancel } = this.props;
      const columns=[
        {
          title: '结算方式名称',
          dataIndex: 'summaryName',
          key: 'summaryName',
        }
      ]

      return <Modal
        maskClosable={false}
        title="结算方式"
        wrapClassName="entry_settlement_modal"
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div className="search-name">
          <Input
            size="large"
            placeholder="请输入结算方式名称查询"
            onChange={(e) => {
              this.setState({ accountingCaptionTypeName: e.target.value.trim() })
            }}
            onPressEnter={(e) => {
            
            }}
          />
          <PurpleButton height={'36px'} onClick={() => {
          
          }}>查询</PurpleButton>
        </div>
        <div className="add-table">
        <Table
          bordered
          size='middle'
          dataSource={[]}
          columns={columns}
          rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
             
            }
          }}
          scroll={{ y: 200 }}
          pagination={false}
        />

        </div>
       
      </Modal>
    }
}

export default SettlementModal;