import React from 'react'
import { Modal, Table, Input } from 'antd'
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import Loading from 'components/loading'

import './add.less'
message.config({
  top: 200,
  duration: 2,
});

@inject('ledgerStore') @observer
class OrgModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: '',
      accSystemName: '',
      selectedItem: '',
      orgName: '',
      selectedRowKeys: []
    }
  }
  componentWillMount() {
    this.handleFetchTableData()
  }
  handleFetchTableData = () => {
    let { ledgerStore } = this.props
    ledgerStore.QueryAccountingSystemOrgBySystemID({
      accSystemID: ledgerStore.selectedAccSystem.accSystemID,
      orgName: this.state.orgName
    })
  }
  onChangeForSearch = (value) => {
    this.setState({ orgName: value })
  }
  onMessage = (text) => {
    message.destroy()
    message.info(text)
  }
  render() {
    let { ledgerStore } = this.props
    const columns = [
      {
        title: '核算组织',
        dataIndex: 'orgName',
        key: 'orgName',
      }
    ]
    let tableData = []
    tableData = ledgerStore.accOrg.map((item, index) => {
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
            value={this.state.orgName}
            onPressEnter={() => {
              this.handleFetchTableData(this.state.orgName)
            }}
            onChange={(e, value) => {
              this.setState({
                orgName: e.target.value.replace(/(^\s*)|(\s*$)/g, '')
              })
            }} />
          <PurpleButton style={{ marginLeft: '1rem' }} onClick={() => {
            this.handleFetchTableData(this.state.orgName)
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
            onSelect: (currItem, selected, selectedRows) => {
              this.setState({
                selectedItem: selectedRows[0]
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
          if (this.state.selectedRowKeys.length === 1) {
            if (this.state.selectedItem.accOrgID) {
              ledgerStore.getSelectedAccOrg(this.state.selectedItem)
            }
            if (this.props.onOk) {
              this.props.onOk(this.state.selectedItem)
            }
          }
          if (this.state.selectedRowKeys.length < 1) {
            this.onMessage('请选择一条数据')
          }
          if (this.state.selectedRowKeys.length > 1) {
            this.onMessage('只能选择一条数据')
          }
        }}>确定</PurpleButton>
      </div>
      {this.state.loading}
    </Modal>
  }
}

export default OrgModal