import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Input, Table } from 'antd';
import {PurpleButton} from 'components/Button.js';
import './index.less';

@inject('tAccountStore') @observer
class ModalCashFlowProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 5,
      selectedRowKeys: []
    }
  }
  
  render() {
    let { tAccountStore, onOk, onCancel} = this.props;
    let columns = [
      {
        title: '序号',
        dataIndex: 'number',
        index: 'number'
      }, {
        title: '编码',
        dataIndex: 'code',
        index: 'code'
      }, {
        title: '名称',
        dataIndex: 'name',
        index: 'name'
      }, {
        title: '现金流量项目全名',
        dataIndex: 'fullName',
        index: 'fullName'
      }, {
        title: '类型',
        dataIndex: 'type',
        index: 'type'
      }, {
        title: '方向',
        dataIndex: 'direction',
        index: 'direction'
      }, {
        title: '数据状态',
        dataIndex: 'dataStatu',
        index: 'dataStatu'
      }, {
        title: '禁用状态',
        dataIndex: 'fobiddenStatu',
        index: 'fobiddenStatu'
      }
    ]
    return (
      <Modal
        wrapClassName="modal-cashFlowProject-treeTacc"
        visible={true}
        title="现金流量项目表"
        onOk={onOk}
        onCancel={onCancel}
      >
        <div className="cashFlowProject-content">
          <div className="searchContainer">
            <Input placeholder="请输入关键字" />
            <PurpleButton>查询</PurpleButton>
          </div>
          <Table 
            rowSelection={{
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (currItem, selected, selectedRows) => {
                this.setState({ selectedArray: selectedRows })
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                this.setState({ selectedArray: selectedRows })
              },
              onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys: selectedRowKeys })
              }
            }}
            pagination={{
              current: this.state.pageNum,
              defaultCurrent: 1,
              total: 100,
              defaultPageSize: 5,
              pageSize: this.state.pageSize,
              onChange: (page, pageSize) => {
                this.setState({
                  pageNum: page,
                  pageSize: pageSize,
                  selectedRowKeys: []
                })
              },
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '15'],
              onShowSizeChange: (current, size) => {
                this.setState({
                  pageSize: size,
                  pageNum: 1
                })
              },
              showQuickJumper: true,
              size: '',
              simple: '',
              showTotal: function () {
                return '从1到' + 1 + '页  共 ' + 2 + ' 条数据'
              }
            }}
            bordered={true}
            scroll={{ y: 400 }}
            rowKey={(record) => {
              return record.abstractID
            }}
            columns={columns}
            dataSource={[]}
          />
        </div>
      </Modal>
    )
  }
}

export default ModalCashFlowProject;