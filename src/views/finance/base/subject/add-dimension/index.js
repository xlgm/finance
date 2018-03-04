import React from 'react';
import { Modal, Table, Input } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { isInArray } from 'common/utils'

import './add-organization.less';
message.config({
  top: 200,
  duration: 2,
});

@inject('subjectStore') @observer
class AddDimension extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: '',
      selectedRows: [],
      accountLatitudeName: ''
    }

    let { subjectStore } = this.props;

    subjectStore.queryAccountLatitude({
      accountLatitudeName: '',
      status: 1005,
      pageNum: 1,
      pageSize: 1000000
    });

  }

  render() {
    let { onCancel, onOk, subjectStore, latitudeIDs } = this.props;

    let accountLatitudeList = subjectStore.accountLatitudeList.map((item) => {
      let { key, accountLatitudeID, accountLatitudeName } = item
      return { key, accountLatitudeID, accountLatitudeName }
    })
    accountLatitudeList = accountLatitudeList.filter((item) => {
      return !isInArray(latitudeIDs, item.accountLatitudeID)
    })

    const columns = [

      {
        title: '核算维度',
        dataIndex: 'accountLatitudeName',
        key: 'accountLatitudeName',
      }];
    return (
      <Modal
        title="添加核算维度"
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
              this.setState({ accountLatitudeName: e.target.value.trim() })
            }}
            onPressEnter={(e) => {
              let accountLatitudeName = this.state.accountLatitudeName.trim();
              subjectStore.queryAccountLatitude({
                accountLatitudeName: accountLatitudeName,
                status: 1005,
                pageNum: 1,
                pageSize: 10000000
              });
            }}
          />
          <PurpleButton height={'32px'} onClick={() => {
            let accountLatitudeName = this.state.accountLatitudeName;
            subjectStore.queryAccountLatitude({
              accountLatitudeName: accountLatitudeName,
              status: 1005,
              pageNum: 1,
              pageSize: 10000000
            });
          }}>查询</PurpleButton>
        </div>
        <div className="add-table">
          <Table
            bordered
            size='middle'
            dataSource={accountLatitudeList}
            columns={columns}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
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
            let accountLatitudeIDs = selectedRows.map((item) => {
              return item.accountLatitudeID;
            })
            let accountLatitudeNames = selectedRows.map((item) => {
              return item.accountLatitudeName;
            })

            if (selectedRows.length > 0) {
              onOk && onOk(accountLatitudeIDs, accountLatitudeNames);
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

export default AddDimension;