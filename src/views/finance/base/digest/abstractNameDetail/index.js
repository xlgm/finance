import React from 'react'
import { inject, observer } from 'mobx-react'
import { WhiteButton } from 'components/Button.js'
import { Tabs, Switch, Form } from 'antd';
import FormDetail from '../components/form-detail.js';
import FormItemInput from '../components/formItem-input.js';
import './index.less'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
};

@inject('digestStore') @observer
class AbstractName extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let { digestStore } = this.props
		return (
			<div className="abstractName">
				<div className="btnGroup">
					<WhiteButton onClick={() => {
						digestStore.changePageControl('DigestMain')
					}}>返回</WhiteButton>
				</div>
				<Tabs defaultActiveKey="1" onChange={(activeKey) => {}}>
					<TabPane tab="基本信息" key="1">
						<div className="modify-form">
							<FormDetail>
								<FormItemInput
									formItemLayout={formItemLayout}
									label="摘要编码"
									value={digestStore.abstractItemDetail.abstractCode}
									disabled={true}
								/>
								<FormItemInput
									formItemLayout={formItemLayout}
									label="摘要名称"
									value={digestStore.abstractItemDetail.abstractName}
									disabled={true}
								/>
								<FormItemInput
									formItemLayout={formItemLayout}
									label="摘要类别"
									value={digestStore.abstractItemDetail.abstractType}
									disabled={true}
								/>
								<FormItem
									label="不参与多条汇总"
									{...formItemLayout}
								>
									<Switch
										checked={digestStore.abstractItemDetail.isMultiColumnSummary - 1 === 0 }
										disabled
									/>
								</FormItem>
							</FormDetail>
						</div>
					</TabPane>
					<TabPane tab="操作信息" key="2">
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default AbstractName;