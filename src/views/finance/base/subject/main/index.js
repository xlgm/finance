import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { Layout, Select } from 'element-react';
import { message, Table, Tree, Input } from 'antd';
import Modal from 'components/modal';

import './main.less';

@inject('subjectStore', 'appStore') @observer
class SubjectMain extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      searchContent: '',
      accCaptionID: [],
      selectedRowKeys: '',
      selectedRows: '',
      sleft: [],

      accCaptionTableID: 1,
      accCaptionTypeID: '',
      accountingCaptionName: '',
      accElementID: '',
      pageNum: 1,
      pageSize: 10,
      status: '',
      customExpandTreeKeys: ['0'],
      memoryZero: [],
      hasZero: true
    }
  }
  componentDidMount() {
    let { subjectStore } = this.props
    subjectStore.accountsubject()
    this.queryTableData()
    subjectStore.queryTreeData(this.state.accCaptionTableID, () => {
      let arr = []
      for (let i = 0; i < subjectStore.accElementName.length; i++) {
        if (subjectStore.accElementName[i]) {
          arr.push(subjectStore.accElementName[i].accElementID + '')
        } else {
          break
        }
      }
      this.setState({
        customExpandTreeKeys: arr
      })
    })
  }
  alertMsg = (text) => {
    message.destroy()
    message.info(text)
  }
  queryTableData = () => {
    // console.log(this.state.accCaptionTableID)
    let { subjectStore } = this.props;
    let currentPage = subjectStore.currentPage;

    this.setState({
      accCaptionTableID: currentPage.accCaptionTableID,
      accountingCaptionName: currentPage.accountingCaptionName,
      pageNum: currentPage.pageNum,
      pageSize: currentPage.pageSize,
    });
    subjectStore.queryAccountingCaptionList({
      accCaptionTableID: currentPage.accCaptionTableID,
      accElementID: this.state.accElementID,
      accCaptionTypeID: this.state.accCaptionTypeID,
      accountingCaptionName: currentPage.accountingCaptionName,
      pageNum: currentPage.pageNum,
      pageSize: currentPage.pageSize,
      status: this.state.status
    })
    subjectStore.clearCurrentPage();
  }
  // handleExpandedKeys
  onSelect_tree = (selectedKeys, info) => {
    let { subjectStore } = this.props
    let _selectedKeys = selectedKeys[0]
    // console.log(selectedKeys)
    if (_selectedKeys > 10000) {

      this.setState({ accElementID: parseInt(_selectedKeys / 10000), pageNum: 1, accCaptionTypeID: _selectedKeys % 1000, selectedRows: [], selectedRowKeys: [], })
      setTimeout(function () {
        subjectStore.queryAccountingCaptionList({
          accCaptionTableID: this.state.accCaptionTableID,
          accElementID: parseInt(_selectedKeys / 10000),
          accCaptionTypeID: _selectedKeys % 1000,
          accountingCaptionName: this.state.accountingCaptionName,
          pageNum: 1,
          pageSize: this.state.pageSize,
          status: this.state.status
        })
      }.bind(this), 0)
    } else {
      if (_selectedKeys == 0) {
        this.setState({ accElementID: '', pageNum: 1, accCaptionTypeID: '', selectedRows: [], selectedRowKeys: [], })
        setTimeout(function () {
          subjectStore.queryAccountingCaptionList({
            accCaptionTableID: this.state.accCaptionTableID,
            accElementID: '',
            accCaptionTypeID: '',
            accountingCaptionName: this.state.accountingCaptionName,
            pageNum: 1,
            pageSize: this.state.pageSize,
            status: this.state.status
          })
        }.bind(this), 0)
      } else {
        this.setState({ accElementID: _selectedKeys?_selectedKeys:'', pageNum: 1, accCaptionTypeID: '', selectedRows: [], selectedRowKeys: [], })
        setTimeout(function () {
          //重复点击树状图
          _selectedKeys ? subjectStore.queryAccountingCaptionList({
            accCaptionTableID: this.state.accCaptionTableID,
            accElementID: _selectedKeys,
            accCaptionTypeID: '',
            accountingCaptionName: this.state.accountingCaptionName,
            pageNum: 1,
            pageSize: this.state.pageSize,
            status: this.state.status
          }) : ''
        }.bind(this), 0)
      }
    }
  }
  deleteOpr = () => {
    let { subjectStore } = this.props
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({
        stateDialog: <Modal
          title={'删除'}
          toast={`确定要删除选中的记录吗？`}
          onCancel={() => {
            this.setState({ stateDialog: '' });
          }}
          onOk={() => {
            this.setState({ selectedRowKeys: [] })
            subjectStore.delAccountingCaption(
              this.state.selectedRowKeys,
              () => {
                subjectStore.queryAccountingCaptionList({
                  accCaptionTableID: this.state.accCaptionTableID,
                  accElementID: this.state.accElementID,
                  accCaptionTypeID: this.state.accCaptionTypeID,
                  accountingCaptionName: this.state.accountingCaptionName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  status: this.state.status
                },
                  (data) => {
                    if (this.state.pageNum > 1 && data.length === 0) {
                      let pageNum = this.state.pageNum - 1;
                      this.setState({ pageNum });
                      subjectStore.queryAccountingCaptionList({
                        accCaptionTableID: this.state.accCaptionTableID,
                        accElementID: this.state.accElementID,
                        accCaptionTypeID: this.state.accCaptionTypeID,
                        accountingCaptionName: this.state.accountingCaptionName,
                        pageNum: pageNum,
                        pageSize: this.state.pageSize,
                        status: this.state.status
                      })
                    }
                  })

              }
            )
            this.setState({ stateDialog: '', selectedRows: [] })
          }}

        />
      })

    } else {
      this.alertMsg('请选择数据')
    }
  }
  ableOpr(title, status) {
    let { subjectStore } = this.props
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({
        stateDialog: <Modal
          title={title}
          toast={`确定要${title}选中的记录吗？`}
          onCancel={() => {
            this.setState({ stateDialog: '' });
          }}
          onOk={() => {
            subjectStore.operateAccountingCaptionStatus(
              this.state.selectedRowKeys,
              status,
              () => {
                this.setState({ selectedRowKeys: [], selectedRows: [] })
                subjectStore.queryAccountingCaptionList({
                  accCaptionTableID: this.state.accCaptionTableID,
                  accElementID: this.state.accElementID,
                  accCaptionTypeID: this.state.accCaptionTypeID,
                  accountingCaptionName: this.state.accountingCaptionName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize,
                  status: this.state.status
                })
              }
            )
            this.setState({ stateDialog: '' })
          }}

        />
      })
    } else {
      this.alertMsg('请选择数据')
    }
  }
  render() {
    let { subjectStore } = this.props;
    let { selectedRowKeys } = this.state;
    // 处理 表格 数据
    let datas = []
    if (subjectStore.mainData.data) {
      datas = subjectStore.mainData.data.map((item) => {
        item.key = item.accCaptionID
        return item
      })
    }
    const data = [{
      label: '全部',
      children: subjectStore.accElementName
    }]
    // 表格列设置
    const columns = [
      {
        title: "编码",
        dataIndex: "accCaptionCode",
        key: 'accCaptionCode',
        width: '10%',
      },
      {
        title: "名称",
        dataIndex: "accCaptionName",
        key: 'accCaptionName',
        width: '20%',
        render: (text, record, index) => {

          return <div className='currency-name' onClick={() => {

            subjectStore.getSubjectDetail({
              accCaptionID: record.accCaptionID,
              success: () => {
                subjectStore.changePageControl('SubjectDetail');
                let currentPage = {
                  accCaptionTableID: this.state.accCaptionTableID,
                  accountingCaptionName: this.state.accountingCaptionName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize
                }
                subjectStore.changeCurrentPage(currentPage)
              }

            });
          }}> {text}</div>
        }

      },
      {
        title: "借贷方向",
        dataIndex: "lendingDirectionName",
        key: 'lendingDirectionName',
        width: '10%',
      },
      {
        title: "科目类别",
        dataIndex: "accCaptionTypeName",
        key: 'accCaptionTypeName',
        width: '15%',
      },
      {
        title: "期末调汇",
        dataIndex: "changeRate",
        key: 'changeRate',
        width: '10%',
        render: (text) => {
          let changeRate = "";
          switch (text) {
            case true:
              changeRate = '是'
              break;
            case false:
              changeRate = '否'
              break;
            default:
          }

          return <div>{changeRate}</div>
        }
      },
      {
        title: "外币核算",
        dataIndex: "currencyNames",
        key: 'currencyNames',
        width: '10%',
        render: (text, record) => {
          let currencyAccAll = "";
          switch (record.currencyAccAll) {
            case true:
              currencyAccAll = '所有币别';
              break;
            case false:
              currencyAccAll = text;
              break;
            default: currencyAccAll = record.currencyNames;
          }

          return <div>{currencyAccAll}</div>
        }
      },
      {
        title: "核算维度",
        dataIndex: "accLatitudeNames",
        key: 'accLatitudeNames',
        width: '10%',
      },
      {
        title: "启用/禁用",
        dataIndex: "status",
        key: 'status',
        width: '10%',
        render: (text) => {
          let name = "";
          switch (text) {
            case 1005:
              name = '启用'
              break;
            case 1006:
              name = '禁用'
              break;
            default:
          }

          return <div>{name}</div>
        }
      },


    ]
    // 处理 树状 展示数据
    let treeData = []
    const TreeNode = Tree.TreeNode
    subjectStore.accElementName && subjectStore.accElementName.map((item, index) => {
      if (item.accountingCaptionElementTypeInfoList && item.accountingCaptionElementTypeInfoList.length > 0) {
        let children = []
        for (let i = 0; i < item.accountingCaptionElementTypeInfoList.length; i++) {
          children.push({
            key: item.accountingCaptionElementTypeInfoList[i].accCaptionTypeID + 1000 + (10000 * item.accElementID),
            title: <span className="span-spot">{item.accountingCaptionElementTypeInfoList[i].accCaptionTypeName}</span>
          })
        }
        treeData.push({
          key: item.accElementID,
          title: <span  >{item.accElementName}</span>,
          children: children
        })
      } else {
        treeData.push({
          key: item.accElementID,
          title: <span >{item.accElementName}</span>
        })
      }
    })
    // tree 组件 tree.node 生成函数
    const loop = (data) => data.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode key={item.key} title={item.title} autoExpandParent></TreeNode>
    })

    return (<div className="subject-main">
      <div className="subject-header">
        <Layout.Row>
          <div className="subject-left"><span>科目表</span>
            <Select value={this.state.accCaptionTableID} style={{ marginLeft: 20 }}
              onChange={(key) => {
                this.setState({
                  accCaptionTableID: key,
                  pageNum: 1,//下拉切换科目类别默认选择第一页;
                  selectedRows: [],//切换科目类清空勾选
                  selectedRowKeys: [],
                })
                subjectStore.queryAccountingCaptionList({
                  accCaptionTableID: key,
                  accElementID: this.state.accElementID,
                  accCaptionTypeID: this.state.accCaptionTypeID,
                  accountingCaptionName: this.state.accountingCaptionName,
                  pageNum: 1,
                  pageSize: this.state.pageSize,
                  status: this.state.status
                })
              }} >

              {subjectStore.subjectlist && subjectStore.subjectlist.map((ele, index) => {
                return <Select.Option key={index}
                  selected={this.state.accCaptionTableID === ele.accCaptionTableID}
                  label={ele.accCaptionTableName + ''}
                  value={ele.accCaptionTableID + ''} />
              })}

            </Select>
          </div>
          <div className="subject-right">
            <Input
              style={{ width: 270, marginRight: 20, height: 37 }}
              value={this.state.accountingCaptionName}
              onChange={(event) => { this.setState({ accountingCaptionName: event.target.value.trim() }) }}
              onPressEnter={(e) => {
                let value = e.target.value.trim();
                subjectStore.queryAccountingCaptionList({
                  accCaptionTableID: this.state.accCaptionTableID,
                  accElementID: this.state.accElementID,
                  accCaptionTypeID: this.state.accCaptionTypeID,
                  accountingCaptionName: value,
                  pageNum: 1,
                  pageSize: this.state.pageSize,
                  status: this.state.status
                })
                if (value == '') {
                  this.setState({ pageNum: 1, })
                }
              }}
              placeholder="请输入名称查询" />
            <PurpleButton onClick={(event) => {
              if (this.state.accountingCaptionName === '') {
                this.setState({ pageNum: 1, })
              }
              subjectStore.queryAccountingCaptionList({
                accCaptionTableID: this.state.accCaptionTableID,
                accElementID: this.state.accElementID,
                accCaptionTypeID: this.state.accCaptionTypeID,
                accountingCaptionName: this.state.accountingCaptionName,
                pageNum: 1,
                pageSize: this.state.pageSize,
                status: this.state.status
              })
            }}>查询</PurpleButton></div>
        </Layout.Row>
      </div>
      <div className='subject-top'>
        <PurpleButton onClick={() => {
          subjectStore.getAccCaptionTableID(this.state.accCaptionTableID);
          subjectStore.changePageControl('SubjectAdd');
          let currentPage = {
            accCaptionTableID: this.state.accCaptionTableID,
            accountingCaptionName: this.state.accountingCaptionName,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
          }
          subjectStore.changeCurrentPage(currentPage)
        }}>新增</PurpleButton>
        <WhiteButton onClick={() => {
          this.setState({
            selectedRows: [],
            selectedRowKeys: [],
          })
          let selectedRows = this.state.selectedRows;
          if (selectedRows.length === 1) {
            subjectStore.modifyGetDetail({
              accCaptionID: selectedRows[0].accCaptionID,
              success: () => {
                subjectStore.changePageControl('SubjectModify')
                let currentPage = {
                  accCaptionTableID: this.state.accCaptionTableID,
                  accountingCaptionName: this.state.accountingCaptionName,
                  pageNum: this.state.pageNum,
                  pageSize: this.state.pageSize
                }
                subjectStore.changeCurrentPage(currentPage)

              }
            })

          } else {
            message.destroy();
            message.info('请选择一条数据');
          }

        }}>修改</WhiteButton>
        <WhiteButton onClick={() => {
          this.deleteOpr()
        }}>删除</WhiteButton>
        <GreenButton onClick={() => {
          this.ableOpr('启用', 1005)
        }}>启用</GreenButton>
        <RedButton onClick={() => {
          this.ableOpr('禁用', 1006)
        }}>禁用</RedButton>
        <WhiteButton>打印</WhiteButton>
        <WhiteButton>导出</WhiteButton>
      </div>
      <div className='subject-table'>
        <div className='subject-table-left'>
          <Tree style={{ backgroundColor: '#fff' }}
            onSelect={this.onSelect_tree}
            onExpand={
              (expandedKeys) => {
                let expandedKeys2Str = expandedKeys.toString()
                if (expandedKeys2Str.indexOf(0) === -1) {
                  this.setState({
                    customExpandTreeKeys: [],
                    memoryZero: expandedKeys,
                    hasZero: false
                  })
                } else {
                  this.setState({
                    customExpandTreeKeys: this.state.hasZero ? expandedKeys : this.state.memoryZero,
                    hasZero: true
                  })
                }

              }
            }
            autoExpandParent
            // //指定展开所有节点；
            expandedKeys={this.state.customExpandTreeKeys}
          >
            <TreeNode key={0} title="全部" >
              {loop(treeData)}
            </TreeNode>
          </Tree>
        </div>
        <div className='subject-table-right'>
          <Table
            columns={columns}
            dataSource={datas}
            scroll={{ y: 330 }}
            bordered
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows: selectedRows })
              }
            }}
            pagination={{  //分页
              total: subjectStore.mainData.total,
              pageSize: this.state.pageSize,
              current: this.state.pageNum,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onShowSizeChange: (current, pageSize) => {

                this.setState({
                  pageSize,
                  pageNum: 1,
                  selectedRowKeys: []
                });


                subjectStore.queryAccountingCaptionList({
                  accCaptionTableID: this.state.accCaptionTableID,
                  accElementID: this.state.accElementID,
                  accCaptionTypeID: this.state.accCaptionTypeID,
                  accountingCaptionName: this.state.accountingCaptionName,
                  pageNum: 1,
                  pageSize: pageSize,
                  status: this.state.status
                })


              },
              onChange: (pageNum) => {
                this.setState({
                  pageNum,
                  selectedRowKeys: []
                });

                subjectStore.queryAccountingCaptionList({
                  accCaptionTableID: this.state.accCaptionTableID,
                  accElementID: this.state.accElementID,
                  accCaptionTypeID: this.state.accCaptionTypeID,
                  accountingCaptionName: this.state.accountingCaptionName,
                  pageNum: pageNum,
                  pageSize: this.state.pageSize,
                  status: this.state.status
                })

              },
              showTotal: function () {  //设置显示一共几条数据
                return '从1至' + subjectStore.mainData.pages + '共' + subjectStore.mainData.total + '条数据';
              }
            }}

          />
        </div>

      </div>
      <div className='subject-page'>
        {this.state.stateDialog}
      </div>
    </div>
    )
  }
}

export default SubjectMain;