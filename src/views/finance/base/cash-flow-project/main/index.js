import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js';
import { Tree, Input, Table, message } from 'antd';
import Modal from 'components/modal';

import './main.less';

@inject('cashFlowProjectStore') @observer
class CashFlowProjectMain extends React.Component {
  // 初始化组件
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      pageSize: 10,
      selectedRows: [],
      dialog: '',
      haveSelectedTreeNodeExcludeLv1: false
    }
  }
  componentWillMount() {
    // let { cashFlowProjectStore } = this.props
    // cashFlowProjectStore.fetchMainTblData()
  }
  onMessageInfo = (text) => {
    message.destroy();
    message.info(text);
  }
  onMessageError = (text) => {
    message.destroy();
    message.error(text);
  }
  canOpr = (oprFun = () => {
    // console.error('don`t forget the param of function')
  }) => {
    if (this.state.selectedRows.length > 0) {
      oprFun()
    } else {
      this.onMessageInfo('请选择数据')
      return false;
    }
  }
  handleAddOpr = () => {
    let { cashFlowProjectStore } = this.props;
    if (this.state.haveSelectedTreeNodeExcludeLv1) {
      cashFlowProjectStore.switchPage('CashFlowProjectAdd');
    } else {
      this.onMessageError('请先选择对应的项目类别或现金流量项目');
    }
  }
  handleModifyOpr = () => {
    let { cashFlowProjectStore } = this.props;
    if (this.state.selectedRows.length === 1) {
      cashFlowProjectStore.switchPage('CashFlowProjectModify');
    } else {
      this.onMessageInfo('请选择一条数据');
    }
  }
  handleDeleteOpr = (oprFun) => {
    this.setState({
      dialog: <Modal
        title={'删除'}
        toast={'确定要删除选中的记录吗？'}
        onCancel={() => {
          this.setState({
            dialog: ''
          })
        }}
        onOk={() => {
          this.setState({
            dialog: ''
          })
        }}
      />
    })
  }
  handleAbleOpr = (title, statu) => {
    this.setState({
      dialog: <Modal
        title={title}
        toast={`确定要${title}选中的记录吗？`}
        onCancel={() => {
          this.setState({
            dialog: ''
          })
        }}
        onOk={() => {
          this.setState({
            dialog: ''
          })
        }}
      />
    })
  }
  handleSelectedBytree = (selectedKeys, e) => {
    let { cashFlowProjectStore } = this.props;
    if (e.selected && selectedKeys - 0 !== 0) {

      cashFlowProjectStore.treeDataChildren = e.selectedNodes.map((k) => {
        return k.props.title
      })
      this.setState({
        haveSelectedTreeNodeExcludeLv1: true
      });
    } else {
      this.setState({
        haveSelectedTreeNodeExcludeLv1: false
      });
    }
  }
  render() {
    let { cashFlowProjectStore } = this.props
    let columns = [
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
        width: '20%'
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (text, record) => {
          return <span style={{ cursor: "pointer", color: "#800080" }} onClick={() => {
            cashFlowProjectStore.switchPage('CashFlowProjectDetail')
          }
          }>{text}</span>
        }
      }, {
        title: '项目类别',
        dataIndex: 'type',
        key: 'type',
        width: '20%'
      }, {
        title: '方向',
        dataIndex: 'direction',
        key: 'direction',
        width: '20%'
      }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state'
      }
    ];
    // console.log(cashFlowProjectStore.mainTableData.data, 'cashFlowProjectStore.mainTableData.data');
    // table data
    let tblData = [];
    tblData = (cashFlowProjectStore.mainTableData.data && cashFlowProjectStore.mainTableData.data.map(pItem => {
      pItem.key = pItem.id;
      return pItem;
    }));
    // tree data
    let treeData = [];
    treeData = (cashFlowProjectStore.treeData && cashFlowProjectStore.treeData.data.map(tItem => {
      tItem.key = tItem.id;
      return tItem;
    }));
    // treeNode
    const TreeNode = Tree.TreeNode
    const loop = data => data.map((item) => {
      if (item.children && item.children.length > 0) {
        return <TreeNode key={item.id} title={item.name}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode key={item.id} title={item.name} />
    });
    // console.log(tblData, '---', treeData)
    // html
    return (
      <div className="cashFlowProject-main">
        <div className="cashFlowProject-main-header">
          <PurpleButton onClick={() => {
            this.handleAddOpr()
          }}>新增</PurpleButton>
          <WhiteButton onClick={() => {
            this.handleModifyOpr()
          }}>修改</WhiteButton>
          <WhiteButton onClick={() => {
            this.canOpr(this.handleDeleteOpr)
          }}>删除</WhiteButton>
          <GreenButton onClick={() => {
            this.canOpr(this.handleAbleOpr.bind(this, '启用'))
          }}>启用</GreenButton>
          <RedButton onClick={() => {
            this.canOpr(this.handleAbleOpr.bind(this, '禁用'))
          }}>禁用</RedButton>
          <Input
            className="searchInput"
            type="text"
            // value={this.state.abstractName}
            placeholder="请输入编码或摘要名称查询"
            icon="search"
            onPressEnter={() => {
            }}
            onChange={(e) => {
            }}
          />
          <PurpleButton onClick={() => {
          }}>查询</PurpleButton>
        </div>
        <div className='cashFlowProject-main-content'>
          <div className="cashFlowProject-main-tree">
            <Tree
              defaultExpandAll
              onSelect={this.handleSelectedBytree}
            >
              {loop(treeData)}
            </Tree>
          </div>
          <div className="cashFlowProject-main-tbl">
            <Table
              rowSelection={{
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                  })
                }
              }}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: 10,
                current: this.state.pageNum,
                pageSize: this.state.pageSize,
                total: cashFlowProjectStore.mainTableData.total,
                onChange: (page, pageSize) => {
                  this.setState({
                    pageNum: page,
                    pageSize: pageSize,
                    selectedRowKeys: []
                  })
                  // this.handleTableReload()
                },
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                onShowSizeChange: (current, size) => {
                  this.setState({
                    pageSize: size,
                    pageNum: 1
                  })
                  // this.handleTableReload()
                },
                showQuickJumper: true,
                showTotal: function () {
                  return '从1到' + cashFlowProjectStore.mainTableData.pages + '页  共 ' + cashFlowProjectStore.mainTableData.total + ' 条数据'
                }
              }}
              bordered={true}
              scroll={{ y: 400 }}
              rowKey={(record) => {
              }}
              columns={columns}
              dataSource={tblData} />
            {this.state.dialog}
            {!tblData && <div className="empty-holder">暂无数据</div>}
          </div>
        </div>
      </div>
    )
  }
}
export default CashFlowProjectMain;