import React from 'react'
import {
  inject,
  observer
} from 'mobx-react';
import {
  Form,
  Input,
  Select
} from 'element-react';
import AccSystemModal from '../modal-accSystem';
import AccOrgModal from '../modal-accOrg';
import SubjectModal from '../modal-subject';
import {
  PurpleButton,
  WhiteButton
} from 'components/Button.js'
import './add.less'

const REGSPACE = /(^\s*)|(\s*$)/g

@inject('ledgerStore', 'appStore') @observer
class LedgerAdd extends React.Component {
  constructor(props) {
    super(props)
    let {appStore} = this.props
    this.state = {
      form: {
        // 名称
        booksName: '',
        // 账簿类型
        booksTypeName: '7010',
        // 核算体系
        accSystemName: '',
        // 核算组织
        orgName: '',
        // 会计政策
        accPolicyName: '',
        // 记账本位币
        currencyName: '',
        // 默认汇率类型
        ledgerAddDefaultParities: '',
        // 启用期间
        startUpPeriod: '',
        // 科目表
        accCaptionTableName: '',
        // 默认凭证字
        certificateWord: '',
        // 财务应付确认方式
        financialPayConfirmName: '7020',
        // 财务应收确认方式
        financialRecConfirmName: '7030',
        // 描述
        booksDescription: '',
        accSystemID: '',
        exchangeTypeID: '',
        exchangeRateType: ''
      },
      seleteModal: '',
      commitable: true,
      isMainAccountBool: true,
      hasDefaultAccPolicy_bool: false,
      rules: {
        booksName: [{
          required: true,
          message: '请输入账簿名称!',
          validateTrigger: ['change', 'blur']
        },
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
          },
          trigger: 'blur, change'
        }
        ],
        accSystemName: [{
          required: true,
          message: '请输入核算体系',
          validateTrigger: ['blur']
        }],
        orgName: [{
          required: true,
          message: '请输入核算组织',
          validateTrigger: ['blur']
        }],
        startUpPeriod: [{
          required: true,
          message: '请输入启用期间',
          trigger: 'change'
        }],
        accCaptionTableName: [{
          required: true,
          message: '请输入科目表',
          validateTrigger: ['blur']
        }],
        certificateWord: [{
          required: true,
          message: '请输入默认凭证字',
          trigger: 'change'
        }],
        booksDescription: [{
          validator: (rule, value, callback) => {
            value = value.replace(REGSPACE, '')
            if (value && value.length > 200) {
              value = value.slice(0, 200)
              let cloneForm = Object.assign({}, this.state.form, {
                booksDescription: value
              })
              this.setState({
                form: cloneForm
              })
              callback(new Error('描述不能超过200个字符!'))
            } else {
              callback()
            }
          },
          trigger: 'blur, change'
        }]
      }
    }
  }
  // 初始化数据
  componentDidMount() {
    this.handleDefaultSubjectTable()
  }
  componentWillUnmount() {
    this.clearCommitedData()
  }
  clearCommitedData () {
    let { ledgerStore } = this.props
    ledgerStore.certificateWordTableData = []
    ledgerStore.accOrg = []
    ledgerStore.subjectTableData = []
    ledgerStore.accPolicy = []
    ledgerStore.defaultBaseCurrency = ''
    ledgerStore.defaultExchangeTypeWord = ''
  }
  handleDefalutAccPolicyAndStartUpPeriod() {
    let {
            ledgerStore
        } = this.props
    ledgerStore.QueryAccountingPolicyByOrgID({
      accOrganizationID: ledgerStore.selectedAccOrg.accOrgID,
      booksID: '',
      success: (item) => {
        this.onChange('accPolicyName', item.accPolicyID)
      }
    })
  }
  onChange(key, value) {
    let {
            ledgerStore
        } = this.props
    this.setState({
      form: Object.assign({}, this.state.form, {
        [key]: value
      })
    })
    // 会计政策操作
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
        accPolicyID: this.state.form.accPolicyID,
        success: (item) => {
          this.setState({
            form: Object.assign({}, this.state.form, {
              startUpPeriod: item.accYear + '.' + item.accPeriod
            })
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
    let {
      ledgerStore
    } = this.props
    let commitForm = {
      accCaptionTableID: this.state.form.accCaptionTableID,
      accOrgID: this.state.form.accOrgID,
      accPolicyID: this.state.form.accPolicyID,
      booksType: this.state.form.booksTypeName,
      certificateWordID: this.state.form.certificateWordID,
      startUpPeriod: this.state.form.startUpPeriod,
      accSystemName: this.state.form.accSystemName,
      orgName: this.state.form.orgName,
      booksDescription: this.state.form.booksDescription,
      booksName: this.state.form.booksName,
      defaultCertificateWord: this.state.form.certificateWord,
      financialPayConfirm: this.state.form.financialPayConfirmName,
      financialRecConfirm: this.state.form.financialRecConfirmName,
      accCaptionTableName: this.state.form.accCaptionTableName
    }
    this.refs.form.validate((valid) => {
      if (valid) {
        ledgerStore.AddedAccountBookItem(commitForm, (bookID) => {
          this.clearCommitedData() 
          ledgerStore.QueryBookDetail([bookID], () => {
            ledgerStore.changePageControl("ledgerEdit")
          })
        })
      }
    })
  }
  handleMatchExchangeRateById(id) {
    switch (id) {
      case 3001:
        return '固定汇率'
      case 3002:
        return '浮动汇率'
      case 3003:
        return '即期汇率'
      case 3004:
        return '基准汇率'
      case 3005:
        return '中间汇率'
      default:
        return ''
    }
  }
  // 设置默认科目表
  handleDefaultSubjectTable() {
    let { ledgerStore } = this.props
    ledgerStore.GetSubjectData('', (responseJson) => {
      ledgerStore.QueryValidateCertificateWord({
        accCaptionTableID: responseJson.data[0].accCaptionTableID,
        success: () => {
          this.onChange('accCaptionTableName', responseJson.data[0].accCaptionTableName)
          this.onChange('accCaptionTableID', responseJson.data[0].accCaptionTableID)
        }
      })
    })
  }
  render() {
    let {
      ledgerStore,
      appStore
    } = this.props
    return (
      <div className="ledgerAdd">
        <div className='btns'>
          <WhiteButton
            onClick={
              () => {
                ledgerStore.changePageControl('ledgerMain')
              }
            }
          >
            返回
          </WhiteButton>
          <PurpleButton onClick={this.handleSubmit.bind(this)}>
            保存
          </PurpleButton>
        </div>
        <div className="ledgerAddContent">
          <Form
            inline={
              true
            }
            ref="form"
            labelPosition="right"
            labelWidth="150"
            model={
              this.state.form
            }
            rules={
              this.state.rules
            }
            className="ledgerAddForm"
          >
            <Form.Item
              prop="booksName"
              label="名称"
            >
              <Input
                type="text"
                value={
                  this.state.form.booksName
                }
                onChange={
                  this.onChange.bind(this, 'booksName')
                }
              />
            </Form.Item>
            <Form.Item label="账簿类型">
              <Select
                value={
                  this.state.form.booksTypeName + ''
                }
                placeholder="主账簿"
                onChange={
                  this.onChange.bind(this, 'booksTypeName')
                }
              >
                {
                  appStore.dictionarys.BooksType && (appStore.dictionarys.BooksType.length > 0) && appStore.dictionarys.BooksType.map((item, index) => {
                    return (
                      <Select.Option
                        selected={
                          item.value - 7010 === 0
                        }
                        label={
                          item.description + ''
                        }
                        value={
                          item.value + ''
                        }
                        key={
                          index
                        }
                      >
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              prop="accSystemName"
              label="核算体系"
            >
              <Input
                type="text"
                icon="search"
                value={
                  this.state.form.accSystemName
                }
                onClick={
                  () => {
                    this.setState({
                      seleteModal: (
                        <AccSystemModal
                          title="添加核算体系"
                          onCancel={
                            () => {
                              this.setState({
                                seleteModal: ''
                              })
                            }
                          }
                          onOk={
                            (item) => {
                              let modifiedForm = Object.assign({}, this.state.form, {
                                accSystemName: item.accSystemName,
                                accSystemID: item.accSystemID,
                                orgName: '',
                                accPolicyName: '',
                                currencyName: '',
                                exchangeTypeID: '',
                                certificateWord: '',
                                defaultBaseCurrency: '',
                                defaultExchangeTypeWord: ''
                              })
                              this.setState({
                                seleteModal: '',
                                form: modifiedForm
                              })
                            }
                          }
                        />
                      )
                    })
                  }
                }
              />
            </Form.Item>
            <Form.Item
              prop="orgName"
              label="核算组织"
            >
              <Input type="text"
                icon="search"
                value={
                  this.state.form.orgName
                }
                disabled={
                  this.state.form.accSystemName ? false : true
                }
                onClick={
                  () => {
                    this.setState({
                      seleteModal: (
                        <AccOrgModal title="添加核算组织"
                          onCancel={
                            () => {
                              this.setState({
                                seleteModal: ''
                              })
                            }
                          }
                          onOk={
                            (item) => {
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
                            }
                          }
                        />
                      )
                    })
                  }
                }
              />
            </Form.Item>
            <Form.Item
              label="会计政策"
              prop="accPolicyName"
            >
              <Select placeholder="请选择会计政策"
                value={
                  this.state.form.accPolicyName + ''
                }
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
                disabled={
                  ledgerStore.accPolicy.length > 0 && !this.state.isMainAccountBool ? false : true
                }
                onChange={
                  this.onChange.bind(this, 'accPolicyName')
                }
              >
                {
                  ledgerStore.accPolicy.map((item, index) => {
                    return (
                      <Select.Option
                        selected={
                          item.default
                        }
                        key={
                          item.accPolicyID
                        }
                        label={
                          item.accPolicyName + ''
                        }
                        value={
                          item.accPolicyID + ''
                        }
                      >
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              prop="currencyName"
              label="记账本位币"
            >
              <Input type="text"
                value={
                  ledgerStore.defaultBaseCurrency ? ledgerStore.defaultBaseCurrency : this.state.form.currencyName
                }
                disabled={
                  true
                }
              />
            </Form.Item>
            <Form.Item
              prop="exchangeTypeName"
              label="默认汇率类型"
            >
              <Input type="text"
                value={
                  ledgerStore.defaultExchangeTypeWord ? this.handleMatchExchangeRateById(ledgerStore.defaultExchangeTypeWord) : this.state.form.exchangeRateType
                }
                disabled={
                  true
                }
              />
            </Form.Item>
            <Form.Item
              label="启用期间"
              prop="startUpPeriod"
            >
              <Select
                placeholder="请选择启用期间"
                value={
                  this.state.form.startUpPeriod
                }
                disabled={
                  ledgerStore.accPolicy.length > 0 ? false : true
                }
                onChange={
                  this.onChange.bind(this, 'startUpPeriod')
                }> {
                  ledgerStore.accCalendar.length > 0 && ledgerStore.accCalendar.map((item, index) => {
                    return (
                      <Select.Option
                        key={
                          index
                        }
                        label={
                          item.accYear + '.' + item.accPeriod
                        }
                        value={
                          item.accYear + '.' + item.accPeriod
                        }
                      >
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="科目表"
              prop="accCaptionTableName"
            >
              <Input type="text"
                icon="search"
                value={
                  this.state.form.accCaptionTableName
                }
                disabled={
                  this.state.form.accPolicyName ? false : true
                }
                onClick={
                  () => {
                    this.setState({
                      seleteModal: (
                        <SubjectModal
                          title="添加科目表"
                          onCancel={
                            () => {
                              this.setState({
                                seleteModal: ''
                              })
                            }
                          }
                          onOk={
                            (item) => {
                              let modifiedForm = Object.assign({}, this.state.form, {
                                accCaptionTableID: item.accCaptionTableID,
                                accCaptionTableName: item.accCaptionTableName,
                                certificateWord: ''
                              })
                              this.setState({
                                seleteModal: '',
                                form: modifiedForm
                              })
                            }
                          }
                        />
                      )
                    })
                  }
                }
              />
            </Form.Item>
            <Form.Item
              label="默认凭证字"
              prop="certificateWord"
            >
              <Select
              className="certificateWord"
                placeholder="请选择默认凭证字"
                onVisibleChange={(bool)=>{
                  if (bool) {
                    ledgerStore.QueryValidateCertificateWord({accCaptionTableID: this.state.form.accCaptionTableID})
                  }
                }}
                value={
                  this.state.form.certificateWord
                }
                disabled={
                  this.state.form.accCaptionTableName ? false : true
                }
                onChange={
                  this.onChange.bind(this, 'certificateWord')
                } > {
                  ledgerStore.certificateWordTableData.length > 0 && ledgerStore.certificateWordTableData.map((item, index) => {
                    return (
                      <Select.Option
                        key={
                          index
                        }
                        label={
                          item.certificateWord + ''
                        }
                        value={
                          item.certificateWordID + ''
                        }
                      >
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              prop="financialRecConfirmName"
              label="财务应收确认方式"
            >
              <Select
                placeholder="应收单确认"
                value={
                  this.state.form.financialRecConfirmName + ''
                }
                onChange={
                  this.onChange.bind(this, 'financialRecConfirmName')
                } > {
                  appStore.dictionarys.BooksReceiveConfirm && appStore.dictionarys.BooksReceiveConfirm.map(function (v, k) {
                    return (
                      <Select.Option
                        key={
                          k
                        }
                        label={
                          v.description
                        }
                        value={
                          v.value
                        }
                        selected={v.value - 7030 === 0}
                      >
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              prop="financialPayConfirmName"
              label="财务应付确认方式"
            >
              <Select
                placeholder="应付单确认"
                value={
                  this.state.form.financialPayConfirmName + ''
                }
                onChange={
                  this.onChange.bind(this, 'financialPayConfirmName')
                }
              > {
                  appStore.dictionarys.BooksPayConfirm && appStore.dictionarys.BooksPayConfirm.map(function (v, k) {
                    return (
                      <Select.Option
                        key={
                          k
                        }
                        label={
                          v.description
                        }
                        value={
                          v.value
                        }
                        selected={v.value - 7020 === 0}
                      >
                      </Select.Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              prop="booksDescription"
              label="描述"
              className="booksDescription"
            >
              <Input
                type="textarea"
                value={
                  this.state.form.booksDescription
                }
                onChange={
                  this.onChange.bind(this, 'booksDescription')
                }
              />
            </Form.Item>
          </Form>
          {this.state.seleteModal}
        </div>
      </div>
    )
  }
}

export default LedgerAdd