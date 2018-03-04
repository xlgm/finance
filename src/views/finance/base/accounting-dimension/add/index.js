import React from 'react'
import { inject, observer } from 'mobx-react'
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { Form, Select } from 'element-react'
import { Input, Message, Tabs } from 'antd'
import { message, Table, Popconfirm } from 'antd'
import './add.less'
const TabPane = Tabs.TabPane;
@inject('dimensionStore') @observer
class DimensionAdd extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeName_tab: '1',
      dataSource: [],
      flag: true,
      tblItem: {
        accLatitudeDetailCode: '',
        accLatitudeDetailName: '',
        accLatitudeDetailDesc: ''
      },
      count: 1,
      detiled: [],
      selectedRowKeys: [],
      form: {
        basicName: '', //名称
        basicDescript: '', //描述
      },
      rules: {
        basicName: [
          {
            required: true,
            message: '*请输入名称',
            trigger: 'blur'
          }
        ],
        basicDescript: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 200) {
                callback(new Error('描述不能超过200个字符!'))
              } else {
                callback();
              }
            },
            trigger: 'blur, change'
          }
        ]
      }
    }
    this.columns = [
      {
        title: <div><i style={{ color: 'red' }}>*</i><span>编码</span></div>,
        dataIndex: "detailCode",
        key: 'detailCode',
        width: '30%',
        render: (text, record) => {
          return <div
            className="inputCodeContainer"
            style={{
              position: 'relative'
            }}>
            <Input
              type="text"
              onChange={(e) => {
                this.onCellChange(record.key, 'accLatitudeDetailCode', e.target.value)
              }}
              placeholder="请输入编码" />
            <span
              style={{
                position: 'absolute',
                top: '25px',
                left: '0',
                display: 'none',
                color: 'red'
              }}>*请输入少于20个字符</span>
          </div>
        }

      }, {
        title: <div><i style={{ color: 'red' }}>*</i><span>名称</span></div>,
        dataIndex: "detailName",
        key: 'detailName',
        width: '30%',
        render: (text, record, index) => {
          return <div
            className="inputNameContainer"
            style={{
              position: 'relative'
            }}>
            <Input
              type="text"
              onChange={(e) => {
                this.onCellChange(record.key, 'accLatitudeDetailName', e.target.value)
              }}
              placeholder="请输入名称" />
            <span
              style={{
                position: 'absolute',
                top: '25px',
                left: '0',
                display: 'none',
                color: 'red'
              }}>*请输入少于20个字符</span>
          </div>
        }

      }, {
        title: "描述",
        dataIndex: "detailDescript",
        key: 'detailDescript',
        width: '40%',
        render: (text, record) => {
          return <div>
            <Input
              type="text"
              onChange={(e) => {
                if(e.target.value.length <=200){
                  this.onCellChange(record.key, 'accLatitudeDetailDesc', e.target.value)
                }              
              }}
              placeholder="请输入描述" />
          </div>
        }
      }
    ]
  }
  componentWillMount() {
    this.handleAdd()
  }
  componentDidMount() {
    
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }
  onCellChange = (key, objKey, value) => {
    let dataSource = this.state.dataSource
    let inputCodeContainer_arr = document.getElementsByClassName('inputCodeContainer')
    let inputNameContainer_arr = document.getElementsByClassName('inputNameContainer')
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].key === key) {
        dataSource[i][objKey] = value
        // dataSource[i].accLatitudeDetailDesc
        break
      }
    }
    this.setState({ dataSource: dataSource })
    for (let i = 0; i < inputCodeContainer_arr.length; i++) {
      let input = inputCodeContainer_arr[i].children[0]
      let span = inputCodeContainer_arr[i].children[1]
      span.style.display = 'none'
    }
    for (let i = 0; i < inputNameContainer_arr.length; i++) {
      let input = inputNameContainer_arr[i].children[0]
      let span = inputNameContainer_arr[i].children[1]
      span.style.display = 'none'
    }
  }
  onDelete = (selectedRowKeys) => {
    if (selectedRowKeys.length > 0) {
      for (let i = 0; i <= selectedRowKeys.length; i++) {
        this.delectOpr(selectedRowKeys[i])
      }
    } else {
      this.alertMsg('请勾选想要删除的数据')
    }
  }
  delectOpr = (key) => {
    let dataSource = this.state.dataSource;
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].key - key === 0) {
        dataSource.splice(i, 1)
      }
    }
    this.setState({ dataSource: dataSource });
  }
  handleAdd = () => {
    let { count, dataSource } = this.state
    let newData = Object.assign({}, this.state.tblItem, { key: count })
    this.setState({
      dataSource: [
        ...dataSource,
        newData
      ],
      count: count + 1
    })
  }
  alertMsg = (text) => {
    message.destroy()
    message.info(text);
  }
  submit = (flag) => {
    let { dimensionStore } = this.props
    let inputCodeContainer_arr = document.getElementsByClassName('inputCodeContainer')
    let inputNameContainer_arr = document.getElementsByClassName('inputNameContainer')
    let detailLines = document.querySelectorAll('.detail-table .ant-table-body > table > tbody > tr')
    let basicName = this
      .state
      .form
      .basicName
      .replace(/\s/gi, '')
    let regx = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
    let regxNum = /^[A-Za-z0-9]+$/
    let canSubmit = true
    for (let i = 0; i < inputCodeContainer_arr.length; i++) {
      let input = inputCodeContainer_arr[i].children[0]
      let span = inputCodeContainer_arr[i].children[1]
      let inputVal = input
        .value
        .replace(/\s/gi, '')
      if (!inputVal) {
        span.style.display = 'block'
        span.innerHTML = '*编码不能为空'
        canSubmit = false
      }
      if (inputVal && inputVal.length < 21) {
        span.style.display = 'none'
      }
      if (inputVal) {
        if (!regxNum.test(inputVal)) {
          span.style.display = 'block'
          span.innerHTML = '*编码仅限数字、英文'
          canSubmit = false
        }
      }

      if (inputVal.length > 20) {
        span.style.display = 'block'
        span.innerHTML = '*编码不能超过20个字符'
        canSubmit = false
      }
    }
    for (let i = 0; i < inputNameContainer_arr.length; i++) {
      let input = inputNameContainer_arr[i].children[0]
      let span = inputNameContainer_arr[i].children[1]
      let inputVal = input
        .value
        .replace(/\s/gi, '')
      if (!inputVal) {
        span.style.display = 'block'
        span.innerHTML = '*名称不能为空'
        canSubmit = false
      }
      if (inputVal && inputVal.length < 21) {
        span.style.display = 'none'
      }
      if (inputVal) {
        if (!regx.test(inputVal)) {
          span.style.display = 'block'
          span.innerHTML = '*名称仅限数字、英文和汉字'
          canSubmit = false
        }
      }

      if (inputVal.length > 20) {
        span.style.display = 'block'
        span.innerHTML = '*名称不能超过20个字符'
        canSubmit = false
      }
    }
    this
      .refs
      .form
      .validate((valid) => {
        if (valid) {
          if (detailLines.length < 1) {
            this.alertMsg('至少插入一条明细数据')
            canSubmit = false
          }
          if (canSubmit) {
            if (regx.test(basicName)) {
              dimensionStore.addkeep(basicName, this.state.form.basicDescript, this.state.dataSource, () => {
                flag?dimensionStore.changePageControl('DimensionMain'): '';
                let form = this.state.form;
                form.basicName = '';
                form.basicDescript = '';
                this.setState({form, dataSource: []})
              })
            } else {
              this.alertMsg('名称仅限数字、英文和汉字')
              this.setState({ activeName_tab: '1' })
              canSubmit = false
            }

          } else {
            this.setState({ activeName_tab: '2' })
          }
        } else {
          this.setState({ activeName_tab: '1' })
        }
      })
  }
  render() {
    let { dimensionStore } = this.props;
    const { dataSource } = this.state;
    const columns = this.columns;

    return (
      <div className="dimension-add">
        <div className="add-top">
          <WhiteButton
            onClick={() => {
              dimensionStore.changePageControl('DimensionMain');
            }}>返回</WhiteButton>
          <PurpleButton onClick={() => {
            this.submit()
          }}>保存并新增</PurpleButton>
          <PurpleButton onClick={() => {
            this.submit(this.state.flag)
          }}>保存</PurpleButton>
        </div>
        <div className="add-main">
          <div className="main-content">
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <div className="base-info">
                  <Form
                    ref="form"
                    labelPosition="right"
                    labelWidth="120"
                    model={this.state.form}
                    rules={this.state.rules}>
                    <Form.Item prop="basicName" label="名称">
                      <Input
                        type="text"
                        style={{
                          width: '245px',
                          height: '36px',
                        }}
                        value={this.state.form.basicName}
                        onChange={(event) => {
                          if (event.target.value.length < 21 && /^[\u4E00-\u9FA5A-Za-z0-9]*$/.test(event.target.value)) {
                            let form = this.state.form;
                            form.basicName = event.target.value;
                            this.setState({ form })
                          }
                        }}
                        placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item prop="basicDescript" label="描述">
                      <Input
                        style={{
                          width: '245px',
                          height: '100px',
                        }}
                        type="textarea"
                        value={this.state.form.basicDescript}
                        onChange={(event) => {
                          if (event.target.value.length <= 200) {
                            let form = this.state.form;
                            form.basicDescript = event.target.value;
                            this.setState({ form })
                          }
                        }}
                        placeholder="请输入少于200字的描述"></Input>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="明细数据" key="2">
                <div className="detail-info">
                  <div className="btns">
                    <PurpleButton onClick={this.handleAdd}>新增行</PurpleButton>
                    <WhiteButton
                      onClick={() => {
                        this.onDelete(this.state.selectedRowKeys)
                      }}>删除行</WhiteButton>
                  </div>
                  <div>
                    <Table
                      className="detail-table"
                      columns={columns}
                      dataSource={this.state.dataSource}
                      bordered
                      scroll={{
                        y: 400
                      }}
                      pagination={false}
                      rowSelection={{
                        selectedRowKeys: this.state.selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                          this.setState({ selectedRowKeys: selectedRowKeys })
                        }
                      }} />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default DimensionAdd;