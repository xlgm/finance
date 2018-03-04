import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import { Input, Form, Select, Switch } from 'element-react';
import { Tabs } from 'antd';
import './modify.less'
const REGSPACE = /(^\s*)|(\s*$)/g
const TabPane = Tabs.TabPane;

@inject('digestStore') @observer
class DigestModify extends React.Component {

	constructor(props) {
		super(props);
		let { digestStore } = this.props
		this.state = {
			form: {
				abstractCode: digestStore.abstractItemDetail.abstractCode,//汇率类型
				abstractType: digestStore.abstractItemDetail.abstractType,
				abstractTypeID: digestStore.abstractItemDetail.abstractTypeID,
				isMultiColumnSummary: digestStore.abstractItemDetail.isMultiColumnSummary === 1 ? true : false,
				abstractName: digestStore.abstractItemDetail.abstractName,
				abstractID: digestStore.abstractItemDetail.abstractID,
				abstractTypeName: digestStore.abstractItemDetail.abstractName
			},
			rules: {
				abstractCode: [
					{ required: true, message: '请输入摘要编码!', validateTrigger: ['change', 'blur'] },
					{
						validator: (rule, value, callback) => {
							value = value.replace(REGSPACE, '')
							if (value.length > 20) {
								callback(new Error('编码不能超过20字符!'))
							} else {
								var reg = /^[A-Za-z0-9]+$/g
								if (!reg.test(value)) {
									callback(new Error('编码只能为数字,字母'))
								} else {
									callback()
								}
							}
						}, trigger: 'blur, change'
					}
				],
				abstractTypeName: [
					{ required: true, message: '请选择摘要类型!', trigger: 'change' }
				],
				abstractName: [
					{ required: true, message: '请输入摘要名称!', validateTrigger: ['change', 'blur'] },
					{
						validator: (rule, value, callback) => {
							value = value.replace(REGSPACE, '')
							let regForInput = /^[A-Za-z0-9\u4e00-\u9fa5]+$/g
							if (value.length > 50) {
								callback(new Error('名称不能超过50字符!'))
							} else {
								if (!regForInput.test(value)) {
									callback(new Error('名称只能包含中文, 数字, 字母'))
								} else {
									callback()
								}
							}
						}, trigger: 'blur, change'
					}
				]
			},
			changed: false
		}
	}

	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		let { digestStore } = this.props
		let obj = {}
		let abstractTypeMsg = []
		if (this.state.form.abstractTypeName.indexOf('&') !== -1) {
			abstractTypeMsg = this.state.form.abstractTypeName.split('&')
		}
		obj = {
			abstractCode: this.state.form.abstractCode,
			abstractType: abstractTypeMsg.length > 0 ? abstractTypeMsg[1] : this.state.form.abstractType,
			isMultiColumnSummary: this.state.form.isMultiColumnSummary ? 1 : 0,
			abstractName: this.state.form.abstractName,
			abstractTypeID: abstractTypeMsg.length > 0 ? abstractTypeMsg[0] : this.state.form.abstractTypeID,
			abstractID: this.state.form.abstractID
		}
		this.refs.form.validate((valid) => {
			if (valid) {
				digestStore.ModAbstract(obj, () => {
					digestStore.changePageControl('DigestMain')
				})
			}
		})
	}
	render() {
		let { digestStore } = this.props

		return (
			<div className="digest-modify">
				<div className="btnGroup">
					<WhiteButton onClick={() => {
						digestStore.changePageControl('DigestMain');
					}}>返回</WhiteButton>
					<PurpleButton onClick={this.handleSubmit.bind(this)}>保存</PurpleButton>
				</div>
				<div>
					<div>
						<Tabs defaultActiveKey="1" onChange={(activeKey) => {}}>
							<TabPane tab="基本信息" key="1">
								<div>
									<Form ref="form" labelPosition="right" labelWidth="120" model={this.state.form} rules={this.state.rules} >
										<Form.Item prop="abstractCode" label="摘要编码" >
											<Input type="text" value={this.state.form.abstractCode} onChange={this.onChange.bind(this, 'abstractCode')} />
										</Form.Item>
										<Form.Item prop="abstractName" label="摘要名称" >
											<Input type="text" value={this.state.form.abstractName} onChange={this.onChange.bind(this, 'abstractName')} />
										</Form.Item>
										<Form.Item prop="abstractTypeName" label="摘要类别" >
											<Select
												placeholder="请选择摘要类别"
												onChange={this.onChange.bind(this, 'abstractTypeName')}>
												{digestStore.abstractTypeList.map((v, k) => {
													return <Select.Option selected={v.abstractTypeID === digestStore.abstractItemDetail.abstractTypeID} label={v.abstractTypeName + ''} value={v.abstractTypeID + '&' + v.abstractTypeName} key={v.abstractTypeID}></Select.Option>
												})}
											</Select>
										</Form.Item>
										<Form.Item label="不参与多条汇总" >
											<Switch
												value={this.state.form.isMultiColumnSummary}
												onText="是"
												offText="否"
												onColor="#685196"
												offColor="rgba(153, 153, 153, 1)"
												onChange={this.onChange.bind(this, 'isMultiColumnSummary')}>
											</Switch>
										</Form.Item>
									</Form>
								</div>
							</TabPane>
							<TabPane tab="操作记录" key="2">
							</TabPane>
						</Tabs>

					</div>
				</div>
			</div>
		)
	}
}

export default DigestModify;