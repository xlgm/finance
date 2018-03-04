import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js';
import { Table, message, Input } from 'antd';
import Modal from 'components/modal';
import AuditModal from '../modal-audit';

import './main.less'
@inject('ledgerStore', 'appStore') @observer
class LedgerMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stateDialig: '',
			booksName: '',
			page: 1,
			pageSize: 10,
			selectedArray: [],
			selectedRowKeys: [],
			auditReason: '',
			auditFlag: 1,
			canAuditBool: true
		}
	}
	componentWillMount() {
		let { ledgerStore } = this.props
		if (ledgerStore.currPageConfig.page) {
			ledgerStore.QueryAccountBookList({
				"page": ledgerStore.currPageConfig.page,
				"pageSize": ledgerStore.currPageConfig.pageSize,
				"booksName": ledgerStore.currPageConfig.booksName,
				success: (response) => {
					if (response.data.length < 1 && ledgerStore.currPageConfig.page > 1) {
						ledgerStore.currPageConfig.page -= 1
						ledgerStore.QueryAccountBookList({
							"page": ledgerStore.currPageConfig.page,
							"pageSize": ledgerStore.currPageConfig.pageSize,
							"booksName": ledgerStore.currPageConfig.booksName
						})
					}
					this.setState({
						page: ledgerStore.currPageConfig.page,
						pageSize: ledgerStore.currPageConfig.pageSize,
						booksName: ledgerStore.currPageConfig.booksName
					})
					ledgerStore.storageCurrPageConfig({})
				}
			})
		} else {
			ledgerStore.QueryAccountBookList({
				"page": this.state.page,
				"pageSize": this.state.pageSize,
				"booksName": this.state.booksName
			})
		}
	}
	onMessage = (text) => {
		message.destroy()
		message.info(text)
	}
	handleBookIDArr = () => {
		let booksIdArr = []
		for (let i = 0; i < this.state.selectedArray.length; i++) {
			booksIdArr.push(this.state.selectedArray[i].booksID)
		}
		return booksIdArr
	}
	handleReload = (pageNum) => {
		let { ledgerStore } = this.props
		ledgerStore.QueryAccountBookList({
			"page": pageNum ? pageNum : this.state.page,
			"pageSize": this.state.pageSize,
			"booksName": this.state.booksName
		})
	}
	// 启用禁用对应操作
	handleAbleAndDisableOpr = (title, oprFunc) => {
		let { ledgerStore } = this.props
		if (this.state.selectedRowKeys.length > 0) {
			this.setState({
				stateDialig: <Modal
					title={title}
					toast={`确定要${title}选中的记录吗？`}
					onCancel={() => {
						this.setState({ stateDialig: '' });
					}}
					onOk={() => {
						if (title === '启用') { ledgerStore.ModBooksStatus(this.handleBookIDArr(), 1, this.handleReload) }
						if (title === '禁用') { ledgerStore.ModBooksStatus(this.handleBookIDArr(), 2, this.handleReload) }
						this.setState({ stateDialig: '', selectedRowKeys: [] })
					}}
				/>
			})
		} else {
			this.onMessage('请勾选数据')
		}
	}
	handleModify = () => {
		let { ledgerStore } = this.props
		let len = this.state.selectedRowKeys.length
		if (len === 1) {
			if (this.state.selectedArray[0].status - 7002 === 0) {
				return this.onMessage('审核中不能修改')
			}
			if (this.state.selectedArray[0].status - 7003 === 0) {
				return this.onMessage('已审核不能修改')
			}
			ledgerStore.QueryBookDetail(this.state.selectedArray[0].booksID, () => {
				ledgerStore.storageCurrPageConfig({
					page: this.state.page,
					pageSize: this.state.pageSize,
					booksName: this.state.booksName
				})
				ledgerStore.changePageControl("ledgerEdit")
			})
			this.setState({ selectedRowKeys: [] })
		}
		if (len > 1) {
			this.onMessage('请选择一条数据')
		}
		if (len < 1) {
			this.onMessage('请选择数据')
		}
	}
	handleAudit = (title, status) => {
		let { ledgerStore } = this.props
		if (this.state.selectedRowKeys.length > 0) {
			this.setState({
				stateDialig: (
					<AuditModal
						className="auditDialogLedger" 
						title={`${title}`}
						onCancel={() => { this.setState({ stateDialig: '' }) }}
						onOk={() => {
							if (this.state.selectedRowKeys.length > 0 && this.state.canAuditBool) {
								ledgerStore.AuditAccBooksItem(this.handleBookIDArr(), status, this.state.auditReason, this.handleReload)
								this.setState({ stateDialig: '', selectedRowKeys: [] })
							}
						}}>
						<Input type="textarea"
							placeholder="请输入你的审核意见"
							onChange={(e) => {
								let auditReason = e.target.value.replace(/(^\s*)|(\s*$)/g, '')
								if (auditReason.length > 200) {
									this.onMessage('请输入少于200字符')
									this.setState({
										canAuditBool: false
									})
								} else {
									this.setState({
										canAuditBool: true
									})
								}
								this.setState({
									auditReason: auditReason
								})
							}} />
					</AuditModal>)
			})
		} else {
			this.onMessage('请选择数据')
		}
	}
	handleRefund = () => {
		let { ledgerStore } = this.props
		if (this.state.selectedRowKeys.length > 0) {
			this.setState({
				stateDialig: <Modal
					title="撤回"
					toast="确定要撤回选中的记录吗？"
					onCancel={() => {
						this.setState({ stateDialig: '' });
					}}
					onOk={() => {
						var booksIdArr = this.handleBookIDArr()
						ledgerStore.RefundBooks(booksIdArr, this.handleReload)
						this.setState({ stateDialig: '', selectedRowKeys: [] })
					}}
				/>
			})
		} else {
			this.onMessage('请选择数据')
		}
	}
	handleCommit = () => {
		let { ledgerStore } = this.props
		if (this.state.selectedRowKeys.length > 0) {
			this.setState({
				stateDialig: <Modal
					title="提交"
					toast="确定要提交选中的记录吗？"
					onCancel={() => {
						this.setState({ stateDialig: '' })
					}}
					onOk={() => {
						if (this.state.selectedArray.length > 0) {
							let booksIdArr = []
							for (let i = 0; i < this.state.selectedArray.length; i++) {
								booksIdArr.push(this.state.selectedArray[i].booksID)
							}
							ledgerStore.CommitBooks(booksIdArr, this.handleReload)
						}
						this.setState({ stateDialig: '', selectedRowKeys: [] })
					}}
				/>
			});
		} else {
			this.onMessage('请选择数据')
		}
	}
	handleDelete = () => {
		let { ledgerStore } = this.props
		if (this.state.selectedRowKeys.length > 0) {
			this.setState({
				stateDialig: <Modal
					title="删除"
					toast="确定要删除选中的记录吗？"
					onCancel={() => {
						this.setState({ stateDialig: '' })
					}}
					onOk={() => {
						if (this.state.selectedArray.length > 0) {
							ledgerStore.DeleteAccountBookItem(this.handleBookIDArr(), () => {
								ledgerStore.QueryAccountBookList({
									page: this.state.page,
									pageSize: this.state.pageSize,
									booksName: this.state.booksName,
									success: (resJson) => {
										if (resJson.data.length < 1 && this.state.page > 1) {
											ledgerStore.QueryAccountBookList({
												page: this.state.page - 1,
												pageSize: this.state.pageSize,
												booksName: this.state.booksName
											})
											this.setState({
												page: this.state.page - 1 
											})
										}
									}
								})
							})
						}
						this.setState({
							stateDialig: '',
							selectedRowKeys: []
						})
					}}
				/>
			})
		} else {
			this.onMessage('请选择数据')
		}
	}
	render() {
		let { ledgerStore, appStore } = this.props;
		const columns = [
			{
				title: '名称',
				dataIndex: 'booksName',
				key: 'booksName',
				width: '8%'
			}, {
				title: '账簿类型',
				dataIndex: 'booksTypeName',
				key: 'booksTypeName',
				width: '6%',
				render: (text, record) => {
					let bookType = ''
					if (record.booksType - 7010 === 0) {
						bookType = '主账簿'
					}
					else {
						bookType = '副账簿'
					}
					return <span onClick={() => {
						ledgerStore.QueryBookDetail(record.booksID, () => {
							ledgerStore.storageCurrPageConfig({
								page: this.state.page,
								pageSize: this.state.pageSize,
								booksName: this.state.booksName
							})
							ledgerStore.changePageControl('ledgerDetail')
						})
					}}>{bookType}</span>
				}
			}, {
				title: '默认凭证字',
				dataIndex: 'defaultCertificateWord',
				key: 'defaultCertificateWord',
				width: '8%'
			}, {
				title: '核算体系',
				dataIndex: 'accSystemName',
				key: 'accSystemName',
				width: '6%'
			}, {
				title: '核算组织',
				dataIndex: 'orgName',
				key: 'orgName',
				width: '6%'
			}, {
				title: '会计政策',
				dataIndex: 'accPolicyName',
				key: 'accPolicyName',
				width: '10%'
			}, {
				title: '科目表',
				dataIndex: 'accCaptionTableName',
				key: 'accCaptionTableName',
				width: '11%'
			}, {
				title: '启用期间',
				dataIndex: 'startUpPeriod',
				key: 'startUpPeriod',
				width: '6%'
			}, {
				title: '财务应付确认方式',
				dataIndex: 'financialPayConfirmName',
				key: 'financialPayConfirmName',
				width: '12%'
			}, {
				title: '财务应收确认方式',
				dataIndex: 'financialRecConfirmName',
				key: 'financialRecConfirmName',
				width: '12%'
			}, {
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render: (text, record) => {
					for (let i = 0; i < appStore.dictionarys.BooksStatus.length; i++) {
						if (text === appStore.dictionarys.BooksStatus[i].value) {
							return appStore.dictionarys.BooksStatus[i].description
						}
					}
					return ''
				}
			}
		]
		const PARTTERN_PAY_CONFIRM = function (pid) {
			for (let i = 0; i < appStore.dictionarys.BooksPayConfirm.length; i++) {
				if (appStore.dictionarys.BooksPayConfirm[i].value - pid === 0) {
					return appStore.dictionarys.BooksPayConfirm[i].description
				}
			}
		}
		const PARTTERN_REC_CONFIRM = (rid) => {
			for (let i = 0; i < appStore.dictionarys.BooksReceiveConfirm.length; i++) {
				if (appStore.dictionarys.BooksReceiveConfirm[i].value - rid === 0) {
					return appStore.dictionarys.BooksReceiveConfirm[i].description
				}
			}
			return ''
		}
		// 处理mobx数据
		let tableData = []
		tableData = ledgerStore.ledgerMainTableData.map((item, index) => {
			item.financialPayConfirmName = PARTTERN_PAY_CONFIRM(item.financialPayConfirm)
			item.financialRecConfirmName = PARTTERN_REC_CONFIRM(item.financialRecConfirm)
			return item
		})
		let pageCount = ledgerStore.pageCount
		return <div id='ledger-main'>
			<div className="currency-top">
				<div className="searchBox">
					<Input
						type="text"
						placeholder="请输入名称查询"
						icon="search"
						onPressEnter={() => {
							this.setState({
								page: 1
							})
							setTimeout(() => {
								ledgerStore.QueryAccountBookList({
									"page": this.state.page,
									"pageSize": this.state.pageSize,
									"booksName": this.state.booksName
								})
							}, 0)
						}}
						onChange={(e) => {
							this.setState({
								booksName: e.target.value.replace(/(^\s*)|(\s*$)/g, '')
							})
						}}
					/>
					<PurpleButton className="searchBtn" onClick={() => {
						this.setState({
							page: 1
						})
						ledgerStore.QueryAccountBookList({
							"page": "1",
							"pageSize": this.state.pageSize,
							"booksName": this.state.booksName
						})
					}}>查询</PurpleButton>
				</div>
				<PurpleButton onClick={() => { ledgerStore.changePageControl("ledgerAdd") }}>新增</PurpleButton>
				<WhiteButton onClick={() => { this.handleModify() }}>修改</WhiteButton>
				<WhiteButton className="ledger-main-delete-btn" onClick={() => { this.handleDelete() }}>删除</WhiteButton>
				<WhiteButton onClick={() => { this.handleCommit() }}>提交</WhiteButton>
				<WhiteButton onClick={() => { this.handleRefund() }}>撤回</WhiteButton>
				<WhiteButton onClick={() => { this.handleAudit('审核通过', 1) }}>审核通过</WhiteButton>
				<WhiteButton onClick={() => { this.handleAudit('审核不通过', 2) }}>审核不通过</WhiteButton>
				<GreenButton onClick={() => { this.handleAbleAndDisableOpr('启用') }}>启用</GreenButton>
				<RedButton onClick={() => { this.handleAbleAndDisableOpr('禁用') }}>禁用 </RedButton>
				<WhiteButton onClick={() => { }}>打印</WhiteButton>
				<WhiteButton onClick={() => { }}>导出</WhiteButton>
			</div>
			<div className="ledger-table">
				<Table
					rowSelection={{
						selectedRowKeys: this.state.selectedRowKeys,
						onSelect: (currItem, selected, selectedRows) => {
							ledgerStore.getDetail(currItem)
							this.setState({ selectedArray: selectedRows })
						},
						onSelectAll: (selected, selectedRows, changeRows) => {
							this.setState({ selectedArray: selectedRows })
						},
						onChange: (selectedRowKeys) => {
							this.setState({ selectedRowKeys: selectedRowKeys })
						}
					}}
					bordered={true}
					scroll={{ y: 390 }}
					pagination={{
						current: this.state.page,
						defaultCurrent: 1,
						total: ledgerStore.tableTotal,
						defaultPageSize: 10,
						pageSize: this.state.pageSize,
						onChange: (page, pageSize) => {
							this.setState({
								page: page,
								selectedRowKeys: []
							})
							ledgerStore.QueryAccountBookList({
								"page": page,
								"pageSize": pageSize,
								"booksName": this.state.booksName,
							})
						},
						showSizeChanger: true,
						pageSizeOptions: ['10', '20', '50', '100'],
						onShowSizeChange: (current, size) => {
							this.setState({
								page: 1,
								pageSize: size
							})
							ledgerStore.QueryAccountBookList({
								"page": '1',
								"pageSize": size,
								"booksName": this.state.booksName,
							})
						},
						showQuickJumper: true,
						showTotal: function () {
							return '从1至' + pageCount + ' 共 ' + ledgerStore.tableTotal + ' 条数据';
						}
					}}
					columns={columns}
					dataSource={tableData} />
			</div>
			{this.state.data}
			{this.state.stateDialig}
		</div>
	}
}

export default LedgerMain;