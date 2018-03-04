import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import LedgerMain from './main'
import LedgerDetail from './detail'
import LedgerAdd from './add'
import LedgerEdit from './edit'
import LedgerEditDetail from './editDetail'
import Loading from 'components/loading'

@inject('ledgerStore') @observer
class Ledger extends Component {
	constructor(props) {
		super(props)
	}

	componentWillUnmount() {
		let { ledgerStore } = this.props;
		ledgerStore.changePageControl('ledgerMain')
	}

	render() {
		let { ledgerStore } = this.props
		let pageControl = ledgerStore.pageControl
		let ledgerPage
		switch (pageControl) {
			case "ledgerMain": //列表页 
				ledgerPage = <LedgerMain></LedgerMain>
				break;
			case "ledgerDetail": //详情页面 
				ledgerPage = <LedgerDetail></LedgerDetail>
				break;
			case "ledgerAdd": //新增页面 
				ledgerPage = <LedgerAdd></LedgerAdd>
				break;
			case "ledgerEdit": //编辑页面 
				ledgerPage = <LedgerEdit></LedgerEdit>
				break;
			case "ledgerEditDetail": //编辑详情页面
				ledgerPage = <LedgerEditDetail></LedgerEditDetail>
				break;
			default:
		}
		return <div style={{ width: '100%', height: '100%' }}>
			{ledgerPage}
			{ledgerStore.isShowLoading && <Loading />}
		</div>

	}
}

export default Ledger