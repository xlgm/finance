import React from 'react';
import { Modal, Table, Input } from 'antd'
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'

import './add.less'
message.config({
  top: 200,
  duration: 2,
})

@inject('ledgerStore') @observer
class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: '',
      accSystemName: '',
      selectedItem: '',
      selectedRowKeys: []
    }
  }
  // lifecycle
  componentWillMount() {
    this.handleFetchAccountingSystemData(this.state.accSystemName)
  }

  // custom
  handleFetchAccountingSystemData = (accSystemName) => {
    let { ledgerStore } = this.props
    ledgerStore.QueryAccountingSystem({
      accSystemName: accSystemName,
      pageNum: '1',
      pageSize: '100'
    })
  }
  onChangeForSearch = (value) => {
    this.setState({ accSystemName: value })
  }
  render() {
    let { ledgerStore } = this.props;
    const columns = [
      {
        title: '核算体系',
        dataIndex: 'accSystemName',
        key: 'accSystemName',
      }
    ]
    let tableData = []
    tableData = ledgerStore.accSystemNameTableDataSource.map((item, index) => {
      return item
    })
    return <Modal
      title={this.props.title}
      visible={true}
      width={600}
      height={400}
      footer={null}
      wrapClassName='currency-add-modal'
      maskClosable={false}
      onCancel={() => {
        if (this.props.onCancel) {
          this.props.onCancel()
        }
      }}>
      <div className="searchBox" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <div>
          <Input
            style={{ width: 270, height: 36 }}
            type="text"
            placeholder="请输入名称查询"
            icon="search"
            value={this.state.accSystemName}
            onPressEnter={() => {
              this.handleFetchAccountingSystemData(this.state.accSystemName)
            }}
            onChange={(e, value) => {
              this.setState({
                accSystemName: e.target.value.replace(/(^\s*)|(\s*$)/g, '')
              })
            }} />
          <PurpleButton style={{ marginLeft: '1rem' }} onClick={() => {
            this.handleFetchAccountingSystemData(this.state.accSystemName)
          }}>查询</PurpleButton>
        </div>
      </div>
      <div className="add-table">
        <Table
          size='middle'
          dataSource={tableData}
          columns={columns}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onSelect: (currItem, selected, selectedRows) => {
              this.setState({
                selectedItem: {
                  accSystemName: currItem.accSystemName,
                  accSystemID: currItem.accSystemID
                }
              })
            },
            onChange: (selectedRowKeys) => {
              this.setState({ selectedRowKeys: selectedRowKeys })
            }
          }}
          scroll={{ y: 200 }}
          pagination={false} />
      </div>
      <div className="add-buttons">
        <WhiteButton onClick={() => {
          if (this.props.onCancel) {
            this.props.onCancel();
          }
        }}>取消</WhiteButton>
        <PurpleButton onClick={() => {
          ledgerStore.getSelectedAccSystem(this.state.selectedItem)
          if (this.props.onOk) {
            this.props.onOk(this.state.selectedItem)
          }
        }}>确定</PurpleButton>
      </div>
      {this.state.loading}
    </Modal>
  }
}

export default AddDialog