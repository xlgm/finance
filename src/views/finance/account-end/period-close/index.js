import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, message } from 'antd';
import { WhiteButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import './index.less'


@inject('periodEndStore') @observer
class PeriodEndContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      promptBox: '',
      datalist: [
        {
          key: '1',
          accountCode: '001',
          accountName: '拓润',
          accountType: '主账簿',
          openingPeriod: '2017年9期',
          currentPeriod: '2017年9期',
        },
        {
          key: '2',
          accountCode: '002',
          accountName: '拓润2',
          accountType: '主账簿2',
          openingPeriod: '2017年9期2',
          currentPeriod: '2017年9期2',
        }
      ],
      dataResultlist: [
        {
          key: '1',
          accountName: '拓润',
          checkoutCheck: '结账检查',
          examinationResults: '通过',
          detailedInformation: '成功结账到2017年第10期。',
          associationOperation: '凭证过账',
        },
        {
          key: '2',
          accountName: '拓润2',
          checkoutCheck: '结账检查2',
          examinationResults: '不通过2',
          detailedInformation: '成功结账到2017年第10期。2',
          associationOperation: '凭证过账2',
        }
      ]
    }


  }

  componentWillUnmount() {
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }

  /**
   * 结账/反结账
   * param [1:结账 2:反结账]
  */
  checkOut = (param) => {
    let selectedRows = this.state.selectedRows;
    if (selectedRows.length === 0) {
      message.destroy();
      message.warn("请选择账簿进行操作!");
    } else {
      let selectedText = "";
      selectedRows.forEach(function (item, i) {
        selectedText += `(${item.accountName})、`
      });
      this.setState({
        promptBox:
        <PromptBox
          title={param === 1 ? '结账' : '反结账'}
          promptLanguage={param === 1 ? `确定对账簿${selectedText}进行结账操作？` : `确定对账簿${selectedText}进行反结账操作？`}
          onCancel={() => {
            this.setState({ promptBox: '' })
          }}
          cancelButton
          onOK={() => {
            if (param === 1) {
              //结账action
              this.setState({ promptBox: '', selectedRowKeys: [] });
            } else {
              //反结账action
              this.setState({ promptBox: '', selectedRowKeys: [] })
            }

          }}>
        </PromptBox>
      })
    }

  }

  //刷新
  Refresh = () => {

  }

  render() {
    let { periodEndStore } = this.props;
    let { selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    let column = [
      {
        title: '账簿编码',
        dataIndex: 'accountCode',
        key: "accountCode",
        width: '20%',
      }, {
        title: '账簿名称',
        dataIndex: 'accountName',
        key: "accountName",
        width: '20%'
      }, {
        title: '账簿类型',
        dataIndex: 'accountType',
        key: "accountType",
        width: '20%'
      }, {
        title: '启用会计期间',
        dataIndex: 'openingPeriod',
        key: "openingPeriod",
        width: '20%'
      }, {
        title: '当前会计期间',
        dataIndex: 'currentPeriod',
        key: "currentPeriod",
      }
    ];

    let columnResult = [
      {
        title: '账簿名称',
        dataIndex: 'accountName',
        key: "accountName",
        width: '20%',
      }, {
        title: '结账检查',
        dataIndex: 'checkoutCheck',
        key: "checkoutCheck",
        width: '20%',
      }, {
        title: '检查结果',
        dataIndex: 'examinationResults',
        key: "examinationResults",
        width: '20%',
        render: (text, record) => {
          if (record.key * 1 === 1) {
            return <span className="pass-class">{text}</span>
          } else {
            return <span className="nopass-class">{text}</span>
          }
        }
      }, {
        title: '详细信息',
        dataIndex: 'detailedInformation',
        key: "detailedInformation",
        width: '20%',
      }, {
        title: '关联操作',
        dataIndex: 'associationOperation',
        key: "associationOperation",
      }
    ];

    return (
      <div className="period-end-container">
        <div className="button-top">
          <WhiteButton onClick={this.Refresh}>刷新</WhiteButton>
          <WhiteButton onClick={() => { this.checkOut(1) }}>结账</WhiteButton>
          <WhiteButton onClick={() => { this.checkOut(2) }}>反结账</WhiteButton>
        </div>
        <div className="table-layout">
          <Table
            rowSelection={rowSelection}
            columns={column}
            dataSource={this.state.datalist}
            scroll={{
              y: 300
            }}
            bordered
            onRowClick={(record, index) => { }}
            rowClassName={(record, index) => { }}
            pagination={false}
          />
          <Table
            rowSelection={null}
            columns={columnResult}
            dataSource={this.state.dataResultlist}
            scroll={{
              y: 100
            }}
            bordered
            pagination={false}
            locale={{
              emptyText: '暂无结果，请选择账簿进行操作。'
            }}
          />
        </div>
        {this.state.promptBox}
      </div>
    )
  }
}

export default PeriodEndContainer;