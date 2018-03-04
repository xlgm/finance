import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton } from 'components/Button.js';
import { Tabs } from 'antd';
import FormDetail from '../components/form-detail.js';
import FormItemInput from '../components/formItem-input.js';
import './index.less'
const TabPane = Tabs.TabPane;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};
@inject('digestStore') @observer
class AbstractTypeDetail extends React.Component {
	render() {
		let { digestStore } = this.props;
		return (
			<div className="abstractType">
				<div>
					<WhiteButton onClick={() => {
						digestStore.changePageControl('DigestMain')
					}}>返回</WhiteButton>
				</div>
				<Tabs defaultActiveKey="1" onChange={(activeKey) => {}}>
					<TabPane tab="基本信息" key="1">
						<FormDetail>
							<FormItemInput
								formItemLayout={formItemLayout}
								label="名称"
								value={digestStore.abstractTypeItemDetail.abstractTypeName}
								disabled={true}
							/>
							<FormItemInput
								formItemLayout={formItemLayout}
								type="textarea"
								label="描述"
								value={digestStore.abstractTypeItemDetail.abstractTypeDescription}
								disabled={true}
							/>
						</FormDetail>
					</TabPane>
					<TabPane tab="操作记录" key="2">
					
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default AbstractTypeDetail;