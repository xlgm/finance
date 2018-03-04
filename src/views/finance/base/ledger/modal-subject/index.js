import React from 'react'
import { Modal, Table, Input } from 'antd'
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import Loading from 'components/loading'

message.config({
  top: 200,
  duration: 2,
})

@inject('ledgerStore') @observer
class SubjectModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: '',
      accCaptionTableName: '',
      selectedItem: {},
      selectedRowKeys: []
    }
  }
  componentWillMount() {
    let { ledgerStore } = this.props
    ledgerStore.GetSubjectData('')
  }

  onChangeForSearch = (value) => {
    this.setState({ accCaptionTableName: value })
  }
  render() {
    let { ledgerStore } = this.props;
    const columns = [
      {
        title: '核算组织',
        dataIndex: 'accCaptionTableName',
        key: 'accCaptionTableName',
      }
    ]
    let tableData = []
    tableData = ledgerStore.subjectTableData.map((item, index) => {
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
            value={this.state.accCaptionTableName}
            onPressEnter={() => {
              ledgerStore.GetSubjectData(this.state.accCaptionTableName)
            }}
            onChange={(e, value) => {
              this.setState({
                accCaptionTableName: e.target.value.replace(/(^\s*)|(\s*$)/g, '')
              })
            }} />
          <PurpleButton style={{ marginLeft: '1rem' }} onClick={() => {
            ledgerStore.GetSubjectData(this.state.accCaptionTableName)
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
                  accCaptionTableName: currItem.accCaptionTableName,
                  accCaptionTableID: currItem.accCaptionTableID,
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
          if (this.props.onOk) {
            let accCaptionTableID = this.state.selectedItem.accCaptionTableID ? this.state.selectedItem.accCaptionTableID : ''
            ledgerStore.QueryValidateCertificateWord({ accCaptionTableID: accCaptionTableID })
            this.props.onOk(this.state.selectedItem)
          }
        }}>确定</PurpleButton>
      </div>
      {this.state.loading}
    </Modal>
  }
}

export default SubjectModal;