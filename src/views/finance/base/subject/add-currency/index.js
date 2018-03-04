import React from 'react';
import { Modal, Table } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { isInArray } from 'common/utils'

import './add-currency.less';
message.config({
  top: 200,
  duration: 2,
});

@inject('subjectStore') @observer
class AddCurrency extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: '',
      selectedRows: []
    }
    let { subjectStore } = this.props;

    subjectStore.queryCurrency({
      pageNum: 1,
      pageSize: 1000,
      status: 1005,
    })

  }

  render() {
    let { onCancel, onOk, subjectStore, currencyIDs } = this.props;

    const columns = [{
      title: '名称',
      dataIndex: 'currencyName',
      key: 'currencyName',
    }];

    let currencyList = subjectStore.currencyList.map((item) => {

      let { key, businessCurrencyID, currencyName } = item
      return { key, businessCurrencyID, currencyName }
    })

    currencyList = currencyList.filter((item) => {
      return !isInArray(currencyIDs, item.businessCurrencyID);
    })

    return (
      <Modal
        title="添加币别"
        visible={true}
        width={550}
        height={400}
        footer={null}
        maskClosable={false}
        wrapClassName='currency-add-modal'
        onCancel={() => {
          onCancel && onCancel();
        }}
      >
        <div className="add-table">
          <Table
            bordered
            size='middle'
            dataSource={currencyList}
            columns={columns}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows });
              },

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
              let businessCurrencyIDs = selectedRows.map((item) => {
                return item.businessCurrencyID;
              })
              let currencyNames = selectedRows.map((item) => {
                return item.currencyName;
              })
              onOk && onOk(businessCurrencyIDs, currencyNames)
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

export default AddCurrency;