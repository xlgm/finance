import React from 'react'
import { inject, observer } from 'mobx-react'
import { Input, Form, Select, Switch } from 'element-react'
import { PurpleButton } from 'components/Button.js'
import './detail.less'

@inject('digestStore') @observer
class DigestDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			form: {
				digestID: 1,
				digestCode: '',
				digestType: '',
				digestSwitch: '',
				digestIsForbid: '',
				digestName: ''
			}
		}
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		})
	}
	render() {
		let { digestStore } = this.props;
		return <div className="digest-detail">
			<div className="btns">
				<PurpleButton onClick={() => {
					digestStore.changePageControl('DigestMain')
				}}>返回</PurpleButton>
			</div>
			<Form ref="form" labelPosition="right" labelWidth="120" model={digestStore.digestDetail} rules={this.state.rules} >
				<Form.Item prop="digestCode" label="摘要编码" >
					<Input type="text" value={digestStore.digestDetail.digestCode} />
				</Form.Item>
				<Form.Item prop="digestName" label="摘要名称" >
					<Input type="text" value={digestStore.digestDetail.digestName} />
				</Form.Item>
				<Form.Item prop="digestType" label="摘要类别" >
					<Select
						value={digestStore.digestDetail.digestType}
						placeholder="请选择摘要类别"
						onChange={this.onChange.bind(this, 'targetCurrency')}>
						<Select.Option label="摘要类别1" value="1"></Select.Option>
						<Select.Option label="摘要类别2" value="2"></Select.Option>
						<Select.Option label="摘要类别3" value="2"></Select.Option>
						<Select.Option label="摘要类别4" value="2"></Select.Option>
						<Select.Option label="摘要类别5" value="2"></Select.Option>
						<Select.Option label="摘要类别6" value="2"></Select.Option>
					</Select>
				</Form.Item>
				<Form.Item prop="digestSwitch" label="不参与多条汇总" >
					<Switch
						value={digestStore.digestDetail.digestSwitch === '是' ? true : false}
						onText="是"
						offText="否"
						onColor="rgba(152, 92, 197, 1)"
						offColor="rgba(153, 153, 153, 1)">
					</Switch>
				</Form.Item>
			</Form>
		</div>
	}
}

export default DigestDetail