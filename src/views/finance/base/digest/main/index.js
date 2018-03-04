import React from 'react'
import { inject, observer } from 'mobx-react'
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { Tree } from 'element-react'
import { Input, Table, message } from 'antd'
import Modal from 'components/modal'

import './main.less'

@inject('digestStore') @observer
class DigestMain extends React.Component {
	// 初始化组件
	constructor(props) {
		super(props)
		this.state = {
			stateDialog: '',
			abstractName: '',
			pageNum: 1,
			pageSize: 10,
			showTable: '',
			selectedArray: [],
			queryBookNameString: '',
			selectedRowKeys: [],
			abstractTypeID: '',
			abstractTypeName: ''
		}
	}
	componentWillMount() {
		let { digestStore } = this.props
		digestStore.QueryAbstractTypeList()
		if (digestStore.currPageConfigAndQueryCondition.pageNum) {
			digestStore.QueryAbstractList({
				pageNum: digestStore.currPageConfigAndQueryCondition.pageNum || 1,
				pageSize: digestStore.currPageConfigAndQueryCondition.pageSize || 10,
				abstractName: digestStore.currPageConfigAndQueryCondition.abstractName || '',
				abstractTypeID: digestStore.currPageConfigAndQueryCondition.abstractTypeID || '',
				success: (fetchJson) => {
					if (fetchJson.data.length < 1 && digestStore.currPageConfigAndQueryCondition.pageNum > 1) {
						digestStore.currPageConfigAndQueryCondition.pageNum -= 1
						digestStore.QueryAbstractList({
							pageNum: digestStore.currPageConfigAndQueryCondition.pageNum || 1,
							pageSize: digestStore.currPageConfigAndQueryCondition.pageSize || 10,
							abstractName: digestStore.currPageConfigAndQueryCondition.abstractName || '',
							abstractTypeID: digestStore.currPageConfigAndQueryCondition.abstractTypeID || ''
						})
					}
					this.setState({
						pageNum: digestStore.currPageConfigAndQueryCondition.pageNum || 1,
						pageSize: digestStore.currPageConfigAndQueryCondition.pageSize || 10,
						abstractName: digestStore.currPageConfigAndQueryCondition.abstractName || '',
						abstractTypeID: digestStore.currPageConfigAndQueryCondition.abstractTypeID || ''
					})
					digestStore.currPageConfigAndQueryCondition = {}
				}
			})
		} else {
			this.handleTableReload()
		}
	}
	handleIsEmpty(obj) {
		for (var key in obj) {
			return false
		}
		return true
	}
	onMessage = (text) => {
		message.destroy()
		message.info(text)
	}
	handleDialog = (title, success) => {
		if (this.state.selectedRowKeys.length > 0) {
			this.setState({
				stateDialog: <Modal
					title={title}
					toast={`确定进行${title}吗？`}
					onCancel={() => {
						this.handleRemoveDialog()
					}}
					onOk={() => {
						success && success()
						this.handleRemoveDialog()
					}}
				/>
			})
		} else {
			this.onMessage('请选择数据')
		}
	}
	handleTableReload = () => {
		let { digestStore } = this.props
		setTimeout(() => {
			digestStore.QueryAbstractList({
				"pageNum": this.state.pageNum,
				"pageSize": this.state.pageSize,
				"abstractName": this.state.abstractName,
				"abstractTypeID": this.state.abstractTypeID
			})
		}, 0)
	}
	handleRemoveDialog = () => {
		this.setState({ stateDialog: '' })
	}
	handleStoragePageConfigAndQueryCondition = () => {
		let { digestStore } = this.props
		digestStore.storagePageConfigAndQueryCondition({
			pageNum: this.state.pageNum,
			pageSize: this.state.pageSize,
			"abstractName": this.state.abstractName,
			"abstractTypeID": this.state.abstractTypeID
		})
	}
	handleAddForTable = () => {
		let { digestStore } = this.props
		digestStore.storageCurrAbstractType({
			abstractTypeID: this.state.abstractTypeID,
			abstractTypeName: this.state.abstractTypeName
		})
		digestStore.changePageControl('DigestAdd')
	}
	handleModifyForTable = () => {
		let { digestStore } = this.props
		let len = this.state.selectedRowKeys.length
		if (len === 1) {
			this.handleStoragePageConfigAndQueryCondition({})
			digestStore.GetAbstractDetail({
				'abstractID': this.state.selectedArray[0].abstractID,
				'success': () => {
					digestStore.changePageControl('DigestModify')
				}
			})
		}
		if (len > 1) {
			this.onMessage('请选择一条数据')
		}
		if (len < 1) {
			this.onMessage('请选择数据')
		}
	}
	handleDeleteForTable = () => {
		let { digestStore } = this.props
		this.handleDialog('删除', () => {
			digestStore.DeleteAbstract(this.state.selectedRowKeys, () => {
				digestStore.QueryAbstractList({
					pageNum: this.state.pageNum,
					pageSize: this.state.pageSize,
					abstractName: this.state.abstractName,
					abstractTypeID: this.state.abstractTypeID,
					success: (responseJson) => {
						if (responseJson.data.length < 1 && this.state.pageNum > 1) {
							digestStore.QueryAbstractList({
								pageNum: this.state.pageNum - 1,
								pageSize: this.state.pageSize,
								abstractName: this.state.abstractName,
								abstractTypeID: this.state.abstractTypeID
							})
							this.setState({
								pageNum: this.state.pageNum - 1
							})
						}
					}
				})
			})
			this.setState({
				selectedArray: [],
				selectedRowKeys: []
			})
		})
	}
	handleAbleAndDisable = (title, statuCode) => {
		let { digestStore } = this.props
		this.handleDialog(title, () => {
			digestStore.ModAbstractStatus(this.state.selectedRowKeys, statuCode, this.handleTableReload)
			this.setState({
				selectedRowKeys: [],
				selectedArray: []
			})
		})
	}
	handleModifyForAbstractType = () => {
		let { digestStore } = this.props
		if (this.state.abstractTypeID) {
			digestStore.GetAbstractTypeItemDetail(this.state.abstractTypeID, () => {
				this.setState({ selectedRowKeys: [] })
				digestStore.changePageControl('DigestSideBarEdit')
			})
			
		} else {
			this.onMessage('请选择数据')
		}
	}
	handleDeleteForAbstractType = (title) => {
		let { digestStore } = this.props
		if (this.state.abstractTypeID) {
			this.setState({
				stateDialog: <Modal
					title={title}
					toast={`确定进行${title}操作吗？`}
					onCancel={() => {
						this.handleRemoveDialog()
					}}
					onOk={() => {
						digestStore.DelAbstractTypeItem({
							abstractTypeID: this.state.abstractTypeID, success: () => {
								digestStore.QueryAbstractTypeList()
							}
						})
						this.setState({
							abstractTypeID: '',
							selectedRowKeys: []
						})
						this.handleRemoveDialog()
					}}
				/>
			})
		} else {
			this.onMessage('请选择数据')
		}
	}
	handleSaveCurrentItemOfAbstractType = (data, reactElement) => {
		let { digestStore } = this.props
		digestStore.getAbstractTypeItemDetail(data)
		this.setState({
			abstractTypeID: data.id,
			abstractTypeName: data.label,
			pageNum: 1
		})
		data.id === 0 && (data.id = '')
		setTimeout(() => {
			digestStore.QueryAbstractList({
				"pageNum": 1,
				"pageSize": this.state.pageSize,
				"abstractName": this.state.abstractName,
				"abstractTypeID": this.state.abstractTypeID
			})
		}, 0)
	}
	handleSearchForAbstractTable = () => {
		let { digestStore } = this.props
		this.setState({
			pageNum: 1
		})
		digestStore.QueryAbstractList({
			pageNum: 1,
			pageSize: this.state.pageSize,
			abstractName: this.state.abstractName,
			abstractTypeID: this.state.abstractTypeID
		})
	}
	handleFetchAbstractDetailForDetailPage = (abstractID, pageName) => {
		let { digestStore } = this.props
		digestStore.GetAbstractDetail({
			'abstractID': abstractID,
			'success': () => {
				this.handleStoragePageConfigAndQueryCondition()
				digestStore.changePageControl(pageName)
			}
		})
	}

	render() {
		let { digestStore } = this.props;
		let treeTagData_array = [{
			id: 0,
			key: 0,
			label: '全部',
			children: []
		}]
		digestStore.abstractTypeList.map((v, k) => {
			treeTagData_array[0].children.push({
				id: v.abstractTypeID,
				key: ++k,
				label: v.abstractTypeName,
			})
		})
		let tableData = []
		tableData = digestStore.MainTableDataSource.map((item, index) => {
			return item
		})
		let columns = [
			{
				title: '摘要编码',
				dataIndex: 'abstractCode',
				key: 'abstractCode',
				width: '20%'
			}, {
				title: '摘要类别',
				dataIndex: 'abstractType',
				key: 'abstractType',
				width: '20%',
				render: (text, record) => {
					return <span onClick={() => {
						digestStore.GetAbstractTypeItemDetail(record.abstractTypeID, () => {
							this.handleStoragePageConfigAndQueryCondition()
							digestStore.changePageControl('AbstractType')
						})
					}
					}>{text}</span>
				}
			}, {
				title: '不参与多栏账汇总',
				dataIndex: 'isMultiColumnSummary',
				key: 'isMultiColumnSummary',
				width: '20%'
			}, {
				title: '摘要名称',
				dataIndex: 'abstractName',
				key: 'abstractName',
				width: '20%',
				render: (text, record) => {
					return <span onClick={() => {
						this.handleFetchAbstractDetailForDetailPage(record.abstractID, 'AbstractName')
					}
					}>{text}</span>
				}
			}, {
				title: '启用禁用',
				dataIndex: 'abstractStatus',
				key: 'abstractStatus',
			}
		]
		let pageCount = digestStore.pageCount
		return <div id="digest-container">
			<div className="digest-header">
				<PurpleButton onClick={() => {
					this.handleAddForTable()
				}}>新增</PurpleButton>
				<WhiteButton onClick={() => {
					this.handleModifyForTable()
				}}>修改</WhiteButton>
				<WhiteButton onClick={() => {
					this.handleDeleteForTable()
				}}>删除</WhiteButton>
				<GreenButton onClick={() => {
					this.handleAbleAndDisable('启用', 1)
				}}>启用</GreenButton>
				<RedButton onClick={() => {
					this.handleAbleAndDisable('禁用', 2)
				}}>禁用</RedButton>
				<WhiteButton onClick={() => {
				}}>打印</WhiteButton>
				<WhiteButton onClick={() => {
				}}>导出</WhiteButton>
				<Input
					className="searchInput"
					type="text"
					value={this.state.abstractName}
					placeholder="请输入编码或摘要名称查询"
					icon="search"
					onPressEnter={() => {
						this.handleSearchForAbstractTable()
					}}
					onChange={(e) => {
						this.setState({ abstractName: e.target.value.replace(/(^\s*)|(\s*$)/g, '') })
					}}
				/>
				<PurpleButton onClick={() => {
					this.handleSearchForAbstractTable()
				}}>查询</PurpleButton>
			</div>
			<div className="digest-table">
				<div className="btn-block">
					<div className="digest-sideBar-btns">
						<PurpleButton onClick={() => {
							digestStore.changePageControl('DigestSideBarAdd');
						}}>新增</PurpleButton>
						<WhiteButton onClick={() => {
							this.handleModifyForAbstractType()
						}}>编辑</WhiteButton>
						<WhiteButton onClick={() => {
							this.handleDeleteForAbstractType('删除')
						}}>删除</WhiteButton>
					</div>
					<Tree
						className="digest-tree"
						data={treeTagData_array}
						options={this.state.options}
						highlightCurrent={true}
						defaultExpandAll={true}
						expandOnClickNode={false}
						nodeKey='id'
						onNodeClicked={(data, reactElement) => this.handleSaveCurrentItemOfAbstractType(data, reactElement)}>
					</Tree>
				</div>
				<div className='table-block'>
					<Table
						rowSelection={{
							selectedRowKeys: this.state.selectedRowKeys,
							onSelect: (currItem, selected, selectedRows) => {
								digestStore.getDetail(currItem)
								this.setState({ selectedArray: selectedRows })
							},
							onSelectAll: (selected, selectedRows, changeRows) => {
								this.setState({ selectedArray: selectedRows })
							},
							onChange: (selectedRowKeys) => {
								this.setState({ selectedRowKeys: selectedRowKeys })
							}
						}}
						pagination={{
							current: this.state.pageNum,
							defaultCurrent: 1,
							total: digestStore.MainTableDataTotal,
							defaultPageSize: 10,
							pageSize: this.state.pageSize,
							onChange: (page, pageSize) => {
								this.setState({
									pageNum: page,
									pageSize: pageSize,
									selectedRowKeys: []
								})
								this.handleTableReload()
							},
							showSizeChanger: true,
							pageSizeOptions: ['10', '20', '50', '100'],
							onShowSizeChange: (current, size) => {
								this.setState({
									pageSize: size,
									pageNum: 1
								})
								this.handleTableReload()
							},
							showQuickJumper: true,
							size: '',
							simple: '',
							showTotal: function () {
								return '从1到' + pageCount + '页  共 ' + digestStore.MainTableDataTotal + ' 条数据'
							}
						}}
						bordered={true}
						scroll={{ y: 400 }}
						rowKey={(record) => {
							return record.abstractID
						}}
						loading={digestStore.MainTableDataSource ? false : true}
						columns={columns}
						dataSource={tableData} />
					{!digestStore.MainTableDataSource && <div className="empty-holder">暂无数据</div>}
				</div>
			</div>
			{this.state.stateDialog}
		</div>
	}
}

export default DigestMain;