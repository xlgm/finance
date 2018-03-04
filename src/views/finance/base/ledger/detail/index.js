import React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input } from 'element-react'
import { WhiteButton } from 'components/Button.js'

@inject('ledgerStore', 'appStore') @observer
class LedgerDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		let { ledgerStore } = this.props;
		return <div className="ledgerAdd">
			<div className='btns'>
				<WhiteButton onClick={() => {
					ledgerStore.changePageControl('ledgerMain')
				}}>返回</WhiteButton>
			</div>
			<div>
				<Form inline={true} labelPosition="right" labelWidth="150" className="ledgerAddForm">
					<Form.Item label="名称" >
						<Input type="text" value={ledgerStore.detailOfBooksID.booksName} disabled={true} />
					</Form.Item>
					<Form.Item label="账簿类型">
						<Input value={ledgerStore.detailOfBooksID.booksName === 7010 ? '主账簿' : '副账簿'} disabled={true} />
					</Form.Item>
					<Form.Item label="核算体系">
						<Input type="text" icon="search" value={ledgerStore.detailOfBooksID.accSystemName} disabled={true} />
					</Form.Item>
					<Form.Item label="核算组织" >
						<Input type="text" icon="search" value={ledgerStore.detailOfBooksID.orgName} disabled={true} />
					</Form.Item>
					<Form.Item label="会计政策" >
						<Input type="text" icon="search" value={ledgerStore.detailOfBooksID.accPolicyName} disabled={true} />
					</Form.Item>
					<Form.Item label="记账本位币" >
						<Input type="text" value={ledgerStore.detailOfBooksID.currencyName} disabled={true} disabled={true} />
					</Form.Item>
					<Form.Item label="默认汇率类型" >
						<Input type="text" value={ledgerStore.detailOfBooksID.exchangeTypeID} disabled={true} disabled={true} />
					</Form.Item>
					<Form.Item label="启用期间" >
						<Input type="text" value={ledgerStore.detailOfBooksID.startUpPeriod} disabled={true} />
					</Form.Item>
					<Form.Item label="科目表">
						<Input type="text" icon="search" value={ledgerStore.detailOfBooksID.accCaptionTableName} disabled={true} />
					</Form.Item>
					<Form.Item label="默认凭证字">
						<Input type="text" icon="search" value={ledgerStore.detailOfBooksID.defaultCertificateWord} disabled={true} />
					</Form.Item>
					<Form.Item label="财务应收确认方式" >
						<Input type="text" icon="search" value={ledgerStore.detailOfBooksID.financialRecConfirm - 7030 == 0 ? '应收单确认' : '销售发票确认'} disabled={true} />
					</Form.Item>
					<Form.Item label="财务应付确认方式" >
						<Input type="text" icon="search" value={ledgerStore.detailOfBooksID.financialPayConfirm - 7020 == 0 ? '应付单确认' : '采购发票确认'} disabled={true} />
					</Form.Item>
					<Form.Item label="描述" className="booksDescription">
						<Input type="textarea" value={ledgerStore.detailOfBooksID.booksDescription} disabled={true} />
					</Form.Item>
				</Form>
				{this.state.seleteModal}
			</div>
		</div>
	}
}

export default LedgerDetail