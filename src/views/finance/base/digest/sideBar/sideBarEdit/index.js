import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import { Input, Form } from 'element-react';
import { Tabs } from 'antd';
import './sideBarEdit.less';

const REGSPACE = /(^\s*)|(\s*$)/g
const TabPane = Tabs.TabPane;

@inject('digestStore') @observer
class DigestSideBarEdit extends React.Component {

	constructor(props) {
		super(props)
		let { digestStore } = this.props
		this.state = {
			form: {
				abstractTypeName: digestStore.abstractTypeItemDetail.abstractTypeName,
				abstractTypeDescription: digestStore.abstractTypeItemDetail.abstractTypeDescription,
				abstractTypeID: digestStore.abstractTypeItemDetail.abstractTypeID,
				status: digestStore.abstractTypeItemDetail.status
			},
			rules: {
				abstractTypeName: [
					{ required: true, message: '请输入摘要类别名称', validateTrigger: ['change', "blur"], },
					{
						validator: (rule, value, callback) => {
							value = value.replace(REGSPACE, '')
							if (value.length > 20) {
								callback(new Error('名称不能超过20个字!'))
							} else {
								let regForInput = /^[A-Za-z0-9\u4e00-\u9fa5]+$/g
								if (!regForInput.test(value)) {
									callback(new Error('名称只能包含中文, 数字, 字母'))
								} else {
									callback()
								}
							}
						}, trigger: 'blur, change'
					}
				],
				abstractTypeDescription: [
					{ required: false, message: ' ', validateTrigger: ['change', "blur"], },
					{
						validator: (rule, value, callback) => {
							value = value.replace(REGSPACE, '')
							if (value.length > 200) {
								callback(new Error('描述不能超过200个字!'))
							} else {
								callback()
							}
						}, trigger: 'blur, change'
					}
				]
			}

		};
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	handleSubmit(e) {
		e.preventDefault();
		let { digestStore } = this.props;
		this.refs.form.validate((valid) => {
			if (valid) {
				digestStore.ModAbstractTypeItemDetail(this.state.form, () => {
					digestStore.changePageControl('DigestMain')
				});
			} else {
				return false;
			}
		})
	}
	render() {
		let { digestStore } = this.props
		return (
			<div className="digest-sideBar-edit">

				<div className="btnGroup">
					<WhiteButton onClick={() => {
						digestStore.changePageControl('DigestMain')
					}}>返回</WhiteButton>
					<PurpleButton onClick={this.handleSubmit.bind(this)}>保存</PurpleButton>
				</div>
	
				<Tabs defaultActiveKey="1" onChange={(activeKey) => {}}>
					<TabPane tab="基本信息" key="1">
						<div>
							<Form ref="form" labelPosition="right" labelWidth="120" model={this.state.form} rules={this.state.rules} >
								<Form.Item prop="abstractTypeName" label="名称" >
									<Input type="text" value={this.state.form.abstractTypeName} onChange={this.onChange.bind(this, 'abstractTypeName')} />
								</Form.Item>
								<Form.Item label="描述" prop="abstractTypeDescription">
									<Input type="textarea"
										autosize={{ minRows: 2, maxRows: 4 }}
										style={{ width: '245px' }}
										value={this.state.form.abstractTypeDescription}
										onChange={this.onChange.bind(this, 'abstractTypeDescription')}
										placeholder="请输入内容" />
								</Form.Item>
							</Form>
						</div>
					</TabPane>
					<TabPane tab="操作纪录" key="2">
					</TabPane>
				</Tabs>
				
			</div>
		)
	}
}

export default DigestSideBarEdit