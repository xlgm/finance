import React, { Component } from 'react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import { Modal, Input, Table, Select } from 'antd';
import ModalWrap from '../../modal-wrap';
import './index.less';

class Modal4MainSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: '',
      defaultCurrent: 1,
      defaultPageSize: 10,
      total: '',
      current: 1,
      pageSize: 10
    }
  }

  handleTableChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys: selectedRowKeys
    });
    console.log(selectedRowKeys, selectedRows);
  }

  render() {
    const {onOk, onCancel} = this.props
    let columns=[{
      title: '序号',
      dataIndex: 'number',
      width: '10%'
    }, {
      title: '编码',
      dataIndex: 'code'
    }, {
      title: '名称',
      dataIndex: 'name',
      width: '10%'
    }, {
      title: '现金流量项目全名',
      dataIndex: 'fullName',
      width: '10%'
    }, {
      title: '类型',
      dataIndex: 'type',
      width: '10%'
    }, {
      title: '方向',
      dataIndex: 'direction',
      width: '10%'
    }, {
      title: '数据方向',
      dataIndex: 'dataOrginal',
      width: '10%'
    }, {
      title: '禁用状态',
      dataIndex: 'statu',
      width: '10%'
    }]
    return(
      <ModalWrap
        title="现金流量项目表"
        width={'60%'}
        visible={true}
        onOk={() => {
          onOk(this.state.selectedRowKeys, this.state.selectedRows)
        }}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="vt-modal2CashFlow-projectTable">
          <div className="wrap-search">
            <Input placeholder="请输入编码/名称进行查询"/>
            <PurpleButton>查询</PurpleButton>
          </div>
          <Table
            rowSelection={{
              selectedRowKeys: this.state.selectedRowKeys,
              onChange: this.handleTableChange
            }}
            className="table-projectTable"
            columns={columns}
            dataSource={[{code: 1, name: 'a'
              }, {code: 2, name: 'b'
            }]}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 10,
              current: 1,
              pageSize: 10,
              total: 99,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              pageSizeOptions: ['10', '20', '50'],
              onChange: (page, pageSize) => {
                console.log(page, pageSize);
              }
            }}
            showQuickJumper
            bordered
          />
        </div>
      </ModalWrap>
    )
  }
}

export default Modal4MainSubject;