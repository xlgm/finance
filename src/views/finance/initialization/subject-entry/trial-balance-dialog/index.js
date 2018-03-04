import React from 'react';
import { Modal, Table, Tag } from 'antd';
import { inject, observer } from 'mobx-react';

import './trial.less';

@inject('subjectEntryStore') @observer
class TrialBalanceDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }



  render() {
    let { onCancel } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '10%'
      },
      {
        title: '试算项',
        dataIndex: 'trialTerms',
        key: 'trialTerms',
        width: '36%'
      },
      {
        title: '借方金额',
        dataIndex: 'debitAmount',
        key: 'debitAmount',
        width: '20%'
      },
      {
        title: '贷方金额',
        dataIndex: 'creditAmount',
        key: 'creditAmount',
        width: '20%'
      },
      {
        title: '差额',
        dataIndex: 'difference',
        key: 'difference',
      }
    ];

    let currencyAddList = [//这两条数据是固定的，只是金额字段由后端提供
      {
        key: '1',
        serialNumber: '1',
        trialTerms: '期初余额（综合本位币）',
        debitAmount: '1000',
        creditAmount: '1000',
        difference: '1000',
      }, {
        key: '2',
        serialNumber: '2',
        trialTerms: '累计发生额（综合本位币）',
        debitAmount: '1000',
        creditAmount: '1000',
        difference: '1000',
      }
    ];
    /**
     * 两条数据差额都是0就提示【试算结果平衡】green
     * 两条数据差额只要有一个不是0就提示【试算结果不平衡】red
    */
    return <Modal
      title="试算借贷平衡"
      visible={true}
      width={600}
      height={400}
      maskClosable={false}
      footer={null}
      wrapClassName='trial-balance-dialog'
      onCancel={() => {
        onCancel && onCancel();
      }}>
      <div className="trial-content">
        <Tag color="green">试算结果平衡</Tag>
        <Tag color="red">试算结果不平衡</Tag>
        <Table
          bordered
          size='middle'
          dataSource={currencyAddList}
          columns={columns}
          rowSelection={null}
          scroll={{ y: 200 }}
          pagination={false}
        />
      </div>
    </Modal>
  }
}


export default TrialBalanceDialog; 