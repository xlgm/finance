import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Input, Select } from 'element-react';
import AccSystemModal from '../modal-accSystem';
import AccOrgModal from '../modal-accOrg';
import SubjectModal from '../modal-subject';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import './edit.less'

const REGSPACE = /(^\s*)|(\s*$)/g

@inject('ledgerStore', 'appStore') @observer
class LedgerEdit extends React.Component {
	constructor(props) {
		super(props)
		let { ledgerStore } = this.props
		this.state = {
			firstLoad: false,
			currBookID: ledgerStore.detailOfBooksID.booksID,
			form: {
				booksName: ledgerStore.detailOfBooksID.booksName, // 名称
				booksTypeName: ledgerStore.detailOfBooksID.booksTypeName, // 账簿类型
				accSystemName: ledgerStore.detailOfBooksID.accSystemName, // 核算体系
				orgName: ledgerStore.detailOfBooksID.orgName, // 核算组织
				accPolicyName: ledgerStore.detailOfBooksID.accPolicyID, // 会计政策
				currencyName: ledgerStore.detailOfBooksID.currencyName, // 记账本位币
				startUpPeriod: ledgerStore.detailOfBooksID.startUpPeriod, // 启用期间
				accCaptionTableName: ledgerStore.detailOfBooksID.accCaptionTableName, // 科目表
				certificateWord: ledgerStore.detailOfBooksID.certificateWordID + '', // 默认凭证字
				financialPayConfirmName: ledgerStore.detailOfBooksID.financialPayConfirm, // 财务应付确认方式
				financialRecConfirmName: ledgerStore.detailOfBooksID.financialRecConfirm, // 财务应收确认方式
				booksDescription: ledgerStore.detailOfBooksID.booksDescription, // 描述
				accSystemID: ledgerStore.detailOfBooksID.accSystemID,
				booksID: ledgerStore.detailOfBooksID.booksID,
				certificateWordID: ledgerStore.detailOfBooksID.certificateWordID,
				defaultCertificateWord: ledgerStore.detailOfBooksID.defaultCertificateWord,
				accOrganizationID: ledgerStore.detailOfBooksID.accOrganizationID,
				accPolicyID: ledgerStore.detailOfBooksID.accPolicyID,
				accCaptionTableID: ledgerStore.detailOfBooksID.accCaptionTableID,
				booksType: ledgerStore.detailOfBooksID.booksType,
				exchangeTypeID: ledgerStore.detailOfBooksID.exchangeTypeID,
				status: ledgerStore.detailOfBooksID.status,
				creatorID: ledgerStore.detailOfBooksID.creatorID,
				createTime: ledgerStore.detailOfBooksID.createTime,
				memo: ledgerStore.detailOfBooksID.memo,
				financialPayConfirm: ledgerStore.detailOfBooksID.financialPayConfirm,
				financialRecConfirm: ledgerStore.detailOfBooksID.financialRecConfirm,
				accOrgID: ledgerStore.detailOfBooksID.accOrgID
			},
			seleteModal: '',
			commitable: true,
			isMainAccountBool: true,
			rules: {
				booksName: [
					{ required: true, message: '请输入名称!', validateTrigger: ['change', 'blur'] },
					{
						validator: (rule, value, callback) => {
							value = value.replace(REGSPACE, '')
							let regForInput = /^[A-Za-z0-9\u4e00-\u9fa5]+$/g
							if (value.length > 20) {
								callback(new Error('名称不能超过20字符!'))
							} else {
								if (!regForInput.test(value)) {
									callback(new Error('名称只能包含中文, 数字, 字母'))
								} else {
									callback()
								}
							}
						}, trigger: 'blur, change'
					}
				],
				accSystemName: [
					{ required: true, message: '请输入核算体系', validateTrigger: ['blur'] }
				],
				orgName: [
					{ required: true, message: '请输入核算组织', validateTrigger: ['blur'] }
				],
				startUpPeriod: [
					{ required: true, message: '请输入启用期间', trigger: 'change' }
				],
				accCaptionTableName: [
					{ required: true, message: '请输入科目表', validateTrigger: ['blur'] }
				],
				certificateWord: [
					{ required: true, message: '请输入默认凭证字', trigger: 'change' }
				],
				booksDescription: [
					{
						validator: (rule, value, callback) => {
							value = value.replace(REGSPACE, '')
							if (value && value.length > 200) {
								callback(new Error('描述不能超过200个字符!'))
							} else {
								callback()
							}
						}, trigger: 'blur, change'
					}
				]
			}

		}
	}
	componentDidMount() {
		let { ledgerStore } = this.props
		this.onChange('booksTypeName', ledgerStore.detailOfBooksID.booksType + '')
		ledgerStore.queryStartPeriodByAccPolicyID({
			accPolicyID: this.state.form.accPolicyID, success: (item) => {
				this.setState({
					form: Object.assign({}, this.state.form, { startUpPeriod: item.accYear + '.' + item.accPeriod })
				})
			}
		})
		ledgerStore.QueryValidateCertificateWord({
			accCaptionTableID: ledgerStore.detailOfBooksID.accCaptionTableID
		})
	}
	componentWillUnmount () {
    let { ledgerStore } = this.props
    ledgerStore.certificateWordTableData = []
    ledgerStore.accOrg = []
    ledgerStore.subjectTableData = []
    ledgerStore.accPolicy = []
    ledgerStore.defaultBaseCurrency = ''
		ledgerStore.defaultExchangeTypeWord = ''
  }
	handleDefalutAccPolicyAndStartUpPeriod() {
		let { ledgerStore } = this.props
		ledgerStore.QueryAccountingPolicyByOrgID({
			accOrganizationID: ledgerStore.selectedAccOrg.accOrgID,
			booksID: this.state.form.booksID,
			success: (item) => {
				this.onChange('accPolicyName', item.accPolicyID)
			}
		})
	}
	onChange(key, value) {
		let { ledgerStore } = this.props
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
		// 启用期间操作
		if (key === 'accPolicyName') {
			ledgerStore.clearDefaultCertifyWordAndBaseCurrency()
			for (let i = 0; i < ledgerStore.accPolicy.length; i++) {
				if (ledgerStore.accPolicy[i].accPolicyID - value === 0) {
					let modifiedForm = Object.assign({}, this.state.form, {
						accPolicyID: ledgerStore.accPolicy[i].accPolicyID,
						accPolicyName: value,
						exchangeTypeID: ledgerStore.accPolicy[i].exchangeTypeID,
						exchangeRateType: this.handleMatchExchangeRateById(ledgerStore.accPolicy[i].exchangeTypeID),
						currencyName: ledgerStore.accPolicy[i].currencyName,
						currencyID: ledgerStore.accPolicy[i].currencyID,
						accCalendarID: ledgerStore.accPolicy[i].accCalendarID
					})
					this.setState({
						seleteModal: '',
						form: modifiedForm
					})
					ledgerStore.defaultBaseCurrency = ledgerStore.accPolicy[i].currencyName
					ledgerStore.defaultExchangeTypeWord = ledgerStore.accPolicy[i].exchangeTypeID
					break
				}

			}
			ledgerStore.queryStartPeriodByAccPolicyID({
				accPolicyID: this.state.form.accPolicyID, success: (item) => {
					this.setState({
						form: Object.assign({}, this.state.form, { startUpPeriod: item.accYear + '.' + item.accPeriod })
					})
				}
			})
		}
		// 凭证字操作
		if (key === 'certificateWord') {
			for (let i = 0; i < ledgerStore.certificateWordTableData.length; i++) {
				if (ledgerStore.certificateWordTableData[i].certificateWordID - value === 0) {
					let modifiedForm = Object.assign({}, this.state.form, {
						certificateWordID: ledgerStore.certificateWordTableData[i].certificateWordID,
						certificateWord: ledgerStore.certificateWordTableData[i].certificateWord
					})
					this.setState({
						seleteModal: '',
						form: modifiedForm
					})
					break
				}
			}
		}
		if (key === 'booksTypeName') {
			if (value - 7010 === 0) {
				this.setState({
					isMainAccountBool: true
				})
				this.handleDefalutAccPolicyAndStartUpPeriod()
			} else {
				this.setState({
					isMainAccountBool: false
				})
			}
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		let { ledgerStore } = this.props
		let defaultCertificateWord = ''
		for (let value of ledgerStore.certificateWordTableData) {
			if (value.certificateWordID - this.state.form.certificateWordID === 0) {
				defaultCertificateWord = value.certificateWord
			}
		}
		
		let commitForm = {
			accCaptionTableID: this.state.form.accCaptionTableID,
			accOrgID: this.state.form.accOrgID,
			booksID: this.state.form.booksID,
			accPolicyID: this.state.form.accPolicyID,
			booksType: this.state.form.booksTypeName,
			certificateWordID: this.state.form.certificateWordID,
			startUpPeriod: this.state.form.startUpPeriod,
			accSystemName: this.state.form.accSystemName,
			orgName: this.state.form.orgName,
			booksDescription: this.state.form.booksDescription,
			booksName: this.state.form.booksName,
			financialPayConfirm: this.state.form.financialPayConfirmName  + '',
			financialRecConfirm: this.state.form.financialRecConfirmName  + '',
			accCaptionTableName: this.state.form.accCaptionTableName,
			exchangeTypeID: this.state.form.exchangeTypeID,
			defaultCertificateWord: defaultCertificateWord,
			accSystemID: this.state.form.accSystemID,
			accPolicyName: this.state.form.accPolicyName
		}
		this.refs.form.validate((valid) => {
			if (valid) {
				ledgerStore.ModifyAccountBookItem(commitForm)
			}
		})
	}
	handleMatchExchangeRateById(id) {
		switch (id) {
			case 3001: return '固定汇率';
			case 3002: return '浮动汇率';
			case 3003: return '即期汇率';
			case 3004: return '基准汇率';
			case 3005: return '中间汇率';
			default: return ''
		}
	}
	render() {
		let { ledgerStore, appStore } = this.props
		return <div className="ledgerEdit">
			<div className='btns'>
				<WhiteButton onClick={() => {
					ledgerStore.changePageControl('ledgerMain');
				}}>返回</WhiteButton>
				<PurpleButton onClick={this.handleSubmit.bind(this)}>保存</PurpleButton>
				<PurpleButton onClick={() => {
					ledgerStore.CommitBooks([this.state.currBookID], () => {
						ledgerStore.QueryBookDetail(this.state.currBookID, () => {
							ledgerStore.changePageControl('ledgerEditDetail')
						})
					})
				}}>提交</PurpleButton>
			</div>
			<div className="ledgerEditContent">
				<Form inline={true} ref="form" labelPosition="right" labelWidth="150" model={this.state.form} rules={this.state.rules} className="ledgerAddForm">
					<Form.Item prop="booksName" label="名称" >
						<Input
							type="text"
							value={this.state.form.booksName} onChange={this.onChange.bind(this, 'booksName')}
						/>
					</Form.Item>
					<Form.Item label="账簿类型" >
						<Select
							value={this.state.form.booksTypeName}
							placeholder="主账簿"
							onChange={this.onChange.bind(this, 'booksTypeName')}>
							{
								appStore.dictionarys.BooksType && (appStore.dictionarys.BooksType.length > 0) && appStore.dictionarys.BooksType.map((item, index) => {
									return <Select.Option selected={item.value - 7010 === 0} label={item.description} value={item.value + ''} key={index}></Select.Option>
								})
							}
						</Select>
					</Form.Item>
					<Form.Item prop="accSystemName" label="核算体系" >
						<Input type="text" icon="search" value={this.state.form.accSystemName}
							onClick={() => {
								this.setState({
									seleteModal: <AccSystemModal
										title="添加核算体系"
										onCancel={() => {
											this.setState({ seleteModal: '' });
										}}
										onOk={(item) => {
											let modifiedForm = Object.assign({}, this.state.form, {
												accSystemName: item.accSystemName,
												accSystemID: item.accSystemID,
												orgName: '',
												accPolicyName: '',
												currencyName: '',
												exchangeTypeID: '',
												startUpPeriod: '',
												certificateWord: '',
												defaultBaseCurrency: '',
												defaultExchangeTypeWord: ''
											})
											this.setState({
												seleteModal: '',
												form: modifiedForm
											})
										}}
									/>
								})
							}} />
					</Form.Item>
					<Form.Item prop="orgName" label="核算组织" >
						<Input type="text" icon="search" value={this.state.form.orgName}
							disabled={this.state.form.accSystemName ? false : true}
							onClick={() => {
								this.setState({
									seleteModal: <AccOrgModal
										title="添加核算组织"
										onCancel={() => {
											this.setState({ seleteModal: '' });
										}}
										onOk={(item) => {
											let modifiedForm = Object.assign({}, this.state.form, {
												accOrgID: item.accOrgID,
												orgName: item.orgName,
												defaultAccPolicyID: item.defaultAccPolicyID,
											})
											this.setState({
												seleteModal: '',
												form: modifiedForm
											})
											this.handleDefalutAccPolicyAndStartUpPeriod()
										}}
									/>
								})
							}} />
					</Form.Item>
					<Form.Item label="会计政策" prop="accPolicyName">
						<Select
							placeholder="请选择会计政策"
							value={this.state.form.accPolicyName + ''}
							onVisibleChange={
								(bool) => {
									if (bool) {
										ledgerStore.QueryAccountingPolicyByOrgID({
											accOrganizationID: ledgerStore.selectedAccOrg.accOrgID,
											booksID: '',
											success: (item) => {
												this.onChange('accPolicyName', item.accPolicyID)
											}
										})
									}
								}
							}
							disabled={ledgerStore.accPolicy.length && !this.state.isMainAccountBool > 0 ? false : true}
							onChange={this.onChange.bind(this, 'accPolicyName')}>
							{
								ledgerStore.accPolicy.length > 0 ? ledgerStore.accPolicy.map((item, index) => {
									return (
										<Select.Option
											selected={item.default}
											key={item.accPolicyID}
											label={item.accPolicyName + ''}
											value={item.accPolicyID + ''}>
										</Select.Option>)
								}) : 
										<Select.Option
											label={ledgerStore.detailOfBooksID.accPolicyName + ''}
											value={this.state.form.accPolicyID + ''}
										>
										</Select.Option>
							}
						</Select>
					</Form.Item>
					<Form.Item prop="currencyName" label="记账本位币" >
						<Input type="text" value={ledgerStore.defaultBaseCurrency ? ledgerStore.defaultBaseCurrency : this.state.form.currencyName}
							disabled={true} />
					</Form.Item>
					<Form.Item prop="exchangeTypeName" label="默认汇率类型" >
						<Input
							type="text"
							value={ledgerStore.defaultExchangeTypeWord ? this.handleMatchExchangeRateById(ledgerStore.defaultExchangeTypeWord) : this.handleMatchExchangeRateById(this.state.form.exchangeTypeID)}
							disabled={true}
						/>
					</Form.Item>
					<Form.Item label="启用期间" prop="startUpPeriod">
						<Select
							placeholder="请选择启用期间"
							value={this.state.form.startUpPeriod}
							disabled={ledgerStore.accPolicy.length > 0 ? false : true}
							onChange={this.onChange.bind(this, 'startUpPeriod')}>
							{
								ledgerStore.accCalendar.length > 0 ? ledgerStore.accCalendar.map((item, index) => {
									return <Select.Option key={index} label={item.accYear + '.' + item.accPeriod} value={item.accYear + '.' + item.accPeriod}></Select.Option>
								}) : <Select.Option value={this.state.form.startUpPeriod}></Select.Option>
							}
						</Select>
					</Form.Item>
					<Form.Item label="科目表" prop="accCaptionTableName">
						<Input type="text"
							icon="search"
							value={this.state.form.accCaptionTableName}
							disabled={this.state.form.accPolicyName ? false : true}
							onClick={() => {
								this.setState({
									seleteModal: <SubjectModal
										title="添加科目表"
										onCancel={() => {
											this.setState({ seleteModal: '' });
										}}
										onOk={(item) => {
											let modifiedForm = Object.assign({}, this.state.form, {
												accCaptionTableID: item.accCaptionTableID,
												accCaptionTableName: item.accCaptionTableName
											})
											this.setState({
												seleteModal: '',
												form: modifiedForm
											})
										}} />
								})
							}} />
					</Form.Item>
					<Form.Item label="默认凭证字" props="certificateWord">
						<Select
							placeholder="请选择默认凭证字"
							value={this.state.form.certificateWord}
							onVisibleChange={(bool)=>{
								if (bool) {
									ledgerStore.QueryValidateCertificateWord({accCaptionTableID: this.state.form.accCaptionTableID})
								}
							}}
							disabled={this.state.form.accCaptionTableName ? false : true}
							onChange={this.onChange.bind(this, 'certificateWord')}>
							{
								ledgerStore.certificateWordTableData.length > 0 && ledgerStore.certificateWordTableData.map((item, index) => {
									return <Select.Option key={index} label={item.certificateWord + ''} value={item.certificateWordID + ''}></Select.Option>
								})
							}
						</Select>
					</Form.Item>
					<Form.Item prop="financialRecConfirmName" label="财务应收确认方式" >
						<Select
							placeholder="应收单确认"
							value={this.state.form.financialRecConfirmName}
							onChange={this.onChange.bind(this, 'financialRecConfirmName')}>
							{
								appStore.dictionarys.BooksReceiveConfirm && appStore.dictionarys.BooksReceiveConfirm.map(function (v, k) {
									return (
										<Select.Option 
											selected={v.value - ledgerStore.detailOfBooksID.financialRecConfirm === 0 ? true : false}
											key={k} label={v.description  + ''}
											value={v.value + ''}>
										</Select.Option>
									)
								})
							}
						</Select>
					</Form.Item>
					<Form.Item prop="financialPayConfirmName" label="财务应付确认方式" >
						<Select
							placeholder="应付单确认"
							value={this.state.form.financialPayConfirmName}
							onChange={this.onChange.bind(this, 'financialPayConfirmName')}>
							{
								appStore.dictionarys.BooksPayConfirm && appStore.dictionarys.BooksPayConfirm.map(function (v, k) {
									return (
										<Select.Option 
											selected={v.value - ledgerStore.detailOfBooksID.financialPayConfirm === 0 ? true : false}
											key={k}
											label={v.description  + ''}
											value={v.value + ''}>
										</Select.Option>
									)
								})
							}
						</Select>
					</Form.Item>
					<Form.Item prop="booksDescription" label="描述" className="booksDescription">
						<Input type="textarea" value={this.state.form.booksDescription} onChange={this.onChange.bind(this, 'booksDescription')} />
					</Form.Item>
				</Form>
				{this.state.seleteModal}
			</div>
		</div>
	}
}

export default LedgerEdit