import React from 'react'
import { inject, observer } from 'mobx-react'
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { Input, Form, Select, Switch } from 'element-react'
import './add.less'
const REGSPACE = /(^\s*)|(\s*$)/g

@inject('digestStore') @observer
class DigestAdd extends React.Component {
	constructor(props) {
		super(props)
		let { digestStore } = this.props
		this.state = {
			form: {
				abstractCode: '',
				abstractType: digestStore.currAbstractType.abstractTypeID ? digestStore.currAbstractType.abstractTypeID + '&' + digestStore.currAbstractType.abstractTypeName : '',
				isMultiColumnSummary: false,
				abstractName: '',
				haveAbstractTypeStorage: false
			},
			rules: {
				abstractCode: [{
          required: true,
          message: '请输入摘要编码!',
          validateTrigger: ['change', 'blur']
        },
        {
          validator: (rule, value, callback) => {
            value = value.replace(REGSPACE, '')
            let regForInput = /^[A-Za-z0-9]+$/g
            if (value.length > 20) {
              callback(new Error('名称不能超过20字符!'))
            } else {
              if (!regForInput.test(value)) {
                callback(new Error('名称只能包含数字, 字母'))
              } else {
                callback()
              }
            }
          },
          trigger: 'blur, change'
        }],
				abstractType: [
					{ required: true, message: '请选择摘要类别', trigger: 'change' }
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
						}, trigger: 'change, blur'
					}
				]
			}
		}
	}

	componentWillUnmount () {
		let { digestStore } = this.props
		digestStore.clearCurrAbstractType()
	}
	onChange(key, value) {
		this.setState({
			form: Object.assign({}, this.state.form, { [key]: value })
		});
	}
	handleSubmit(e, backToMain) {
		e.preventDefault()
		let { digestStore } = this.props
		let arr = this.state.form.abstractType.split('&')
		let commitObj = {
			abstractCode: this.state.form.abstractCode,
			isMultiColumnSummary: this.state.form.isMultiColumnSummary ? 1 : 0,
			abstractName: this.state.form.abstractName,
			abstractType: arr[1],
			abstractTypeID: arr[0]
		}
		this.refs.form.validate((valid) => {
			if (valid) {
				digestStore.AddAbstract(commitObj, () => {
					if (backToMain) {
						backToMain()
					} else {
						this.setState({
							form: {
								abstractCode: '',
								abstractType: digestStore.currAbstractType.abstractTypeID ? digestStore.currAbstractType.abstractTypeID + '&' + digestStore.currAbstractType.abstractTypeName : '',
								isMultiColumnSummary: false,
								abstractName: '',
								haveAbstractTypeStorage: false
							}
						})
					}
				})
			}
		})
	} 

	render() {
		let { digestStore } = this.props
		return <div className='digest-add'>
			<div className='btns'>
				<WhiteButton onClick={() => {
					digestStore.changePageControl('DigestMain')
				}}>返回</WhiteButton>
				<PurpleButton onClick={
					this.handleSubmit.bind(this)
				}>保存并新增</PurpleButton>
				<PurpleButton onClick={
					(event) => {
						this.handleSubmit(event, () => {
							digestStore.changePageControl('DigestMain')
						})
					}
				}>保存</PurpleButton>
			</div>
			<div className="add-form">
				<Form ref="form" labelPosition="right" labelWidth="120" model={this.state.form} rules={this.state.rules}>
					<Form.Item prop="abstractCode" label="摘要编码" >
						<Input type="text" value={this.state.form.abstractCode} onChange={this.onChange.bind(this, 'abstractCode')} />
					</Form.Item>
					<Form.Item prop="abstractName" label="摘要名称" >
						<Input type="text" value={this.state.form.abstractName} onChange={this.onChange.bind(this, 'abstractName')} />
					</Form.Item>
					<Form.Item prop="abstractType" label="摘要类别" >
						<Select
							className="selectAbc"
							value={this.state.form.abstractType}
							placeholder="请选择摘要类别"
							onChange={this.onChange.bind(this, 'abstractType')}>
							{digestStore.abstractTypeList.map((item, index) => {
								return (
									<Select.Option 
										selected={digestStore.currAbstractType.abstractTypeID && (digestStore.currAbstractType.abstractTypeID - item.abstractTypeID === 0) ? true : false}
										label={item.abstractTypeName + ''}
										value={item.abstractTypeID + '&' + item.abstractTypeName}
										key={index}
									>
									</Select.Option>)
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
		</div>
	}
}

export default DigestAdd;