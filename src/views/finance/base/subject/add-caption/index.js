import React from 'react';
import { Modal, Table, Input } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message } from 'antd';


import './add-organization.less';
message.config({
  top: 200,
  duration: 2,
});

@inject('subjectStore') @observer
class AddCaption extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: '',
      selectedRows: [],
      accountingCaptionTypeName: '',
      pageNum: '',
      pageSize: '',
      status: '1003',
    }

    let { subjectStore } = this.props;

    subjectStore.queryAccountingCaptionType({ accountingCaptionTypeName: '', pageNum: '', pageSize: '', status: '1003' });

  }

  render() {
    let { onCancel, onOk, subjectStore } = this.props;

    let accCaptionTypes = subjectStore.accCaptionTypes.map((item) => {
      let { key, accCaptionTypeID, accCaptionTypeName, status, accCaptionTypeDirectName, accCaptionTypeDirect } = item
      return { key, accCaptionTypeID, accCaptionTypeName, status, accCaptionTypeDirectName, accCaptionTypeDirect }
    })


    const columns = [

      {
        title: '科目类别',
        dataIndex: 'accCaptionTypeName',
        key: 'accCaptionTypeName',
      }];
    return (
      <Modal
        title="选择科目类别"
        visible={true}
        width={550}
        height={400}
        footer={null}
        maskClosable={false}
        wrapClassName='organization-add-modal'
        onCancel={() => {
          onCancel && onCancel();
        }}
      >
        <div className="search-name">
          <Input
            size="large"
            placeholder="请输入名称查询"
            onChange={(e) => {
              this.setState({ accountingCaptionTypeName: e.target.value.trim() })
            }}
            onPressEnter={(e) => {
              let accountingCaptionTypeName = this.state.accountingCaptionTypeName.trim();
              let pageNum = this.state.pageNum;
              let pageSize = this.state.pageSize;
              let status = this.state.status;
              subjectStore.queryAccountingCaptionType({ accountingCaptionTypeName, pageNum, pageSize, status });
            }}
          />
          <PurpleButton height={'32px'} onClick={() => {
            let accountingCaptionTypeName = this.state.accountingCaptionTypeName;
            let pageNum = this.state.pageNum;
            let pageSize = this.state.pageSize;
            let status = this.state.status;
            subjectStore.queryAccountingCaptionType({ accountingCaptionTypeName, pageNum, pageSize, status });
          }}>查询</PurpleButton>
        </div>
        <div className="add-table">
          <Table
            bordered
            size='middle'
            dataSource={accCaptionTypes}
            columns={columns}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                // console.log(selectedRows);
                this.setState({ selectedRowKeys, selectedRows });
              }
            }}
            scroll={{ y: 200 }}
            pagination={false}
          />
        </div>
        <div className="add-buttons">
          <WhiteButton onClick={() => {
            onCancel && onCancel();
          }}>取消</WhiteButton>
          <PurpleButton onClick={() => {
            let selectedRows = this.state.selectedRows;

            if (selectedRows.length > 0) {
              let { accCaptionTypeID, accCaptionTypeName, status, accCaptionTypeDirectName, accCaptionTypeDirect } = selectedRows[0];
              onOk && onOk({ accCaptionTypeID, accCaptionTypeName, status, accCaptionTypeDirectName, accCaptionTypeDirect });
            } else {
              message.destroy();
              message.info("请选择数据");
            }
          }}>确定</PurpleButton>
        </div>
        {this.state.loading}
      </Modal>
    )
  }
}

export default AddCaption;