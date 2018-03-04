import React from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import CashFlowProjectMain from './main';
import CashFlowProjectAdd from './add';
import CashFlowProjectModify from './modify';
import CashFlowProjectDetail from './detail';

@inject('cashFlowProjectStore') @observer
class CashFlowProjectContainer extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			showPage: 'CashFlowProjectMain'
		}
	}
	componentWillUnmount() {
		let { cashFlowProjectStore } = this.props;
		cashFlowProjectStore.switchPage('CashFlowProjectStoreMain')
	}
	render() {
		let { cashFlowProjectStore } = this.props
		let showPage
		switch (cashFlowProjectStore.showPage) {
			case "CashFlowProjectMain": //列表页 
				showPage = <CashFlowProjectMain/>;
				break;
			case 'CashFlowProjectAdd': // 摘要名称详情
				showPage = <CashFlowProjectAdd/>;
				break;
			case 'CashFlowProjectModify': // 摘要名称详情
				showPage = <CashFlowProjectModify/>;
				break;
			case 'CashFlowProjectDetail': // 摘要名称详情
				showPage = <CashFlowProjectDetail/>;
				break;
			default: showPage = <CashFlowProjectMain/>;
		}
		return (
			<div style={{ width: '100%', height: '100%' }}>
				{showPage}
				{cashFlowProjectStore.isLoading && <Loading></Loading>}
			</div>
		)
	}
}

export default CashFlowProjectContainer;