import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import { WhiteButton } from 'components/Button.js';
import './index.less'


@inject('genLedgerStore') @observer
class GenLedgerContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      datalist: [],
      dataResultlist: [
        {
          key: '1',
          operationResult: '账簿[现金日记帐]初始化失败！',
          detailedDescription: '账簿初始化工作已经结束！'
        }
      ]
    }
  }

  componentWillUnmount() {
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    let { genLedgerStore } = this.props;
    let { selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    let column = [
      {
        title: '账簿',
        dataIndex: 'books',
        key: "books",
        width: '20%',
      }, {
        title: '账簿类型',
        dataIndex: 'booksType',
        key: "booksType",
        width: '20%'
      }, {
        title: '核算组织',
        dataIndex: 'accountingOrganization',
        key: "accountingOrganization",
        width: '20%'
      }, {
        title: '启用期间',
        dataIndex: 'openingPeriod',
        key: "openingPeriod",
        width: '20%'
      }, {
        title: '初始化状态',
        dataIndex: 'initializationState',
        key: "Initialization state",
      }
    ];


    let columnResult = [
      {
        title: '操作结果',
        dataIndex: 'operationResult',
        key: "operationResult",
        width: '50%',
      }, {
        title: '详细描述',
        dataIndex: 'detailedDescription',
        key: "detailedDescription",
      }
    ];




    return (
      <div className="GenLedgerContainer">
        <div className="button-top">
          <WhiteButton>刷新</WhiteButton>
          <WhiteButton>结束初始化</WhiteButton>
          <WhiteButton>反初始化</WhiteButton>
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
          />
        </div>

      </div>
    )
  }
}

export default GenLedgerContainer;