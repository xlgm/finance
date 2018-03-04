import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Tooltip } from 'antd';
import EditDialog from '../edit-popups';
import './index.less'


@inject('assetReportStore') @observer
class AssetLayoutContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editpop: '',
      dataList: [
        {
          key: '1',
          assets: ['流动资金'],
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '2',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '3',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '4',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '5',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '6',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '7',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '8',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '9',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '10',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '11',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        },
        {
          key: '12',
          assets: '流动资金',
          line: 1,
          finalNumber: 1000.09,
          yearBeginning: 34.678
        }
      ]
    }

  }

  componentWillUnmount() {
  }

  //编辑
  editPopups = (param) => {
    this.setState({
      editpop:
      <EditDialog
        paramText={param}
        onCancel={() => {
          this.setState({
            editpop: ''
          })
        }}>
      </EditDialog>

    })
  }


  render() {
    let { assetReportStore } = this.props;
    let column = [
      {
        title: '资产',
        dataIndex: 'assets',
        key: "assets",
        width: '50%',
        render: (text, record) => {
          if (typeof (record.assets) === "object") {
            return <span>{text}</span>
          } else if (record.assets !== "") {
            return <div className="edit-div" onClick={(e) => { this.editPopups.call(this, text) }}>
              <span className="edit-name">{text}  </span>
              <i className="iconfont icon-list_bianjieps" ></i>
            </div>
          }
        }
      }, {
        title: '行次',
        dataIndex: 'line',
        key: "line",
        width: '10%'
      }, {
        title: '期末数',
        dataIndex: 'finalNumber',
        key: "finalNumber",
        width: '20%',
        render: (text, record) => {
          return <div className="formula">
            <span className="formula-text">{text}  </span>
            <Tooltip placement="bottom" title="这里是一个公式的提示喔喔">
              <i className="iconfont icon-chakan"></i>
            </Tooltip>
          </div>
        }
      }, {
        title: '年初数',
        dataIndex: 'yearBeginning',
        key: "yearBeginning",
        render: (text, record) => {
          return <div className="formula">
            <span className="formula-text">{text}  </span>
            <Tooltip placement="bottom" title="这里是一个公式的提示喔喔">
              <i className="iconfont icon-chakan"></i>
            </Tooltip>
          </div>
        }
      },
    ];

    return (
      <div>
        <Table
          rowSelection={null}
          columns={column}
          bordered
          dataSource={this.state.dataList}
          pagination={false}
          className="asset-layout"
        >
        </Table>
        {this.state.editpop}
      </div>

    )
  }
}

export default AssetLayoutContainer;