import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Tooltip } from 'antd';
import EditDialog from '../edit-popups';
import './index.less'


@inject('assetReportStore') @observer
class LiabilitiesContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editpop: '',
      dataList: [
        {
          key: '1',
          liabilities: '流动资金',
          linec: 1,
          finalNumberc: 1000.09,
          yearBeginningc: 34.678
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
        title: '负债和所有者（或股东）权益',
        dataIndex: 'liabilities',
        key: "liabilities",
        width: '50%',
        render: (text, record) => {
          if (typeof (record.liabilities) === "object") {
            return <span>{text}</span>
          } else if (record.liabilities !== "") {
            return <div className="edit-div" onClick={(e) => { this.editPopups.call(this, text) }}>
              <span className="edit-name">{text}  </span>
              <i className="iconfont icon-list_bianjieps" ></i>
            </div>
          } 
        }
      }, {
        title: '行次',
        dataIndex: 'linec',
        key: "linec",
        width: '10%'
      }, {
        title: '期末数',
        dataIndex: 'finalNumberc',
        key: "finalNumberc",
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
        dataIndex: 'yearBeginningc',
        key: "yearBeginningc",
        render: (text, record) => {
          return <div className="formula">
            <span className="formula-text">{text}  </span>
            <Tooltip placement="topLeft" title="这里是一个公式的提示喔喔">
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
          className="liabilities-layout"
        >
        </Table>
        {this.state.editpop}
      </div>

    )
  }
}

export default LiabilitiesContainer;