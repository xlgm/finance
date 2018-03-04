import React from 'react'
import { inject, observer } from 'mobx-react'
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { Form, Select, } from 'element-react'
import { Input, Message } from 'antd'
import { message, Table, Popconfirm, Tabs } from 'antd'
import './modify.less'

const TabPane = Tabs.TabPane;
@inject('dimensionStore') @observer
class DimensionAdd extends React.Component {

  constructor(props) {
    super(props);
    let { dimensionStore } = this.props;
    let accLatituDedetailInfos = dimensionStore.detailById.accLatituDedetailInfos;
    let _dataSource = [];
    if (accLatituDedetailInfos.length > 0) {
      for (let i = 0; i < accLatituDedetailInfos.length; i++) {
        if (accLatituDedetailInfos[i]) {
          accLatituDedetailInfos[i].key = accLatituDedetailInfos[i].accLatitudeDetailID
          _dataSource.push(accLatituDedetailInfos[i])
        } else {
          break;
        }
      }
    }
    this.state = {
      dataSource: _dataSource,
      count: 1,
      activeName_tab: '1',
      detiled: [],
      selectedRowKeys: [],
      isPreData: dimensionStore.detailById.isPreData,
      form: {
        basicName: dimensionStore.detailById.accountLatitudeName,//名称
        basicDescript: dimensionStore.detailById.accountLatitudeDescr,//描述
      },

      rules: {
        basicName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        basicDescript: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 200) {
                callback(new Error('描述不能超过200个字符!'))
              } else {
                callback();
              }
            }, trigger: 'blur, change'
          }
        ]
      }



    };
    this.columns = [

      {
        title: "编码",
        dataIndex: "accLatitudeDetailCode",
        key: 'accLatitudeDetailCode',
        width: '30%',
        render: (text, record) => {
          return <div className="inputContainer" style={{ position: 'relative' }}>
            <Input
              type="text"
              onChange={(e) => { this.onCellChange(record.key, 'accLatitudeDetailCode', e.target.value) }}
              placeholder="请输入编码"
              value={record.accLatitudeDetailCode} />
            <span style={{ position: 'absolute', top: '25px', left: '0', display: 'none', color: 'red' }}>*请输入少于20个字符</span>
          </div>
        },

      },
      {
        title: "名称",
        dataIndex: "accLatitudeDetailName",
        key: 'accLatitudeDetailName',
        width: '30%',
        render: (text, record, index) => {
          return <div className="inputNameContainer" style={{ position: 'relative' }}>
            <Input type="text"
              onChange={(e) => { this.onCellChange(record.key, 'accLatitudeDetailName', e.target.value) }}
              placeholder="请输入名称"
              value={record.accLatitudeDetailName} />
            <span style={{ position: 'absolute', top: '25px', left: '0', display: 'none', color: 'red' }}>*请输入少于20个字符</span>
          </div>
        }

      },
      {
        title: "描述",
        width: '40%',
        dataIndex: "accLatitudeDetailDesc",
        key: 'accLatitudeDetailDesc',
        render: (text, record) => {
          return <div>
            <Input type="text"
              onChange={(e) => {
                if(e.target.value.length <=200){
                  this.onCellChange(record.key, 'accLatitudeDetailDesc', e.target.value)
                }              
              }}
              placeholder="请输入描述"
              value={record.accLatitudeDetailDesc} />
          </div>
        }

      }

    ]
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }
  componentDidMount() {
    var th_thead = document.querySelectorAll('.detail-table table > thead > tr > th');
    for (let i = 0; i < th_thead.length; i++) {
      if (i === 1 || i === 2) {
        let span_th = th_thead[i].children[0];
        let lastHtml = span_th.innerHTML;
        span_th.innerHTML = '<i style="color: #f00">*</i>' + lastHtml;
      }
    }
  }
  onCellChange = (key, objKey, value) => {
    let inputCodeContainer_arr = document.getElementsByClassName('inputContainer');
    let inputNameContainer_arr = document.getElementsByClassName('inputNameContainer');
    let dataSource = this.state.dataSource;
    let changeObj = {};
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].key == key) {
        dataSource[i][objKey] = value;
        break;
      }
    }
    this.setState({
      dataSource: dataSource
    })
    for (let i = 0; i < inputCodeContainer_arr.length; i++) {
      let input = inputCodeContainer_arr[i].children[0];
      let span = inputCodeContainer_arr[i].children[1];
      span.style.display = 'none';
    }
    for (let i = 0; i < inputNameContainer_arr.length; i++) {
      let input = inputNameContainer_arr[i].children[0];
      let span = inputNameContainer_arr[i].children[1];
      span.style.display = 'none';
    }
  }
  onDelete = (selectedRowKeys) => {
    if (selectedRowKeys.length > 0) {
      for (let i = 0; i <= selectedRowKeys.length; i++) {
        this.delectOpr(selectedRowKeys[i]);
      }
    } else {
      this.alertMsg('请勾选想要删除的数据');
    }
  }
  delectOpr = (key) => {
    let dataSource = this.state.dataSource;
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].key - key == 0) {
        dataSource.splice(i, 1);
      }
    }
    this.setState({ dataSource: dataSource });
  }
  handleAdd = () => {
    let _count = this.state.count;
    let _dataSource = this.state.dataSource;
    let tblItem = this.state.tblItem;
    _count++;
    let willAddItem = {
      accLatitudeDetailCode: '',
      accLatitudeDetailName: '',
      accLatitudeDetailDesc: '',
      key: _count
    }
    _dataSource.push(willAddItem);
    this.setState({
      dataSource: _dataSource,
      count: _count
    })
  }
  alertMsg = (text) => {
    message.destroy()
    message.info(text);
  }
  submit = (accLatituDedetailInfos) => {
    let { dimensionStore } = this.props;
    let inputCodeContainer_arr = document.getElementsByClassName('inputContainer');
    let inputNameContainer_arr = document.getElementsByClassName('inputNameContainer');
    let basicName = this
      .state
      .form
      .basicName
      .replace(/\s/gi, '')
    let regx = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
    let regxNum = /^[A-Za-z0-9]+$/;
    let canSubmit = true;
    for (let i = 0; i < inputCodeContainer_arr.length; i++) {
      let input = inputCodeContainer_arr[i].children[0];
      let span = inputCodeContainer_arr[i].children[1];
      if (!input.value) {
        span.style.display = 'block';
        span.innerHTML = '*编码不能为空';
        canSubmit = false;
      }
      if (input.value && input.value.length < 21) {
        span.style.display = 'none';
      }
      if (input.value) {
        if (!regxNum.test(input.value)) {
          span.style.display = 'block';
          span.innerHTML = '*编码仅限数字、英文';
          canSubmit = false;
        }
      }


      if (input.value.length > 20) {
        span.style.display = 'block';
        span.innerHTML = '*编码不能超过20个字符';
        canSubmit = false;
      }
    }
    for (let i = 0; i < inputNameContainer_arr.length; i++) {
      let input = inputNameContainer_arr[i].children[0];
      let span = inputNameContainer_arr[i].children[1];
      if (!input.value) {
        span.style.display = 'block';
        span.innerHTML = '*名称不能为空';
        canSubmit = false;
      }
      if (input.value && input.value.length < 21) {
        span.style.display = 'none';
      }
      if (input.value) {
        if (!regx.test(input.value)) {
          span.style.display = 'block';
          span.innerHTML = '*名称仅限数字、英文和汉字';
          canSubmit = false;
        }
      }

      if (input.value.length > 20) {
        span.style.display = 'block';
        span.innerHTML = '*名称不能超过20个字符';
        canSubmit = false;
      }
    }
    this.refs.form.validate((valid) => {
      if (valid) {
        if (canSubmit) {
          if (regx.test(basicName)) {
            let { dimensionStore } = this.props;
            let basicName = this.state.form.basicName;
            let basicDescript = this.state.form.basicDescript;
            let accountLatitudeID = dimensionStore.detailById.accountLatitudeID;
            dimensionStore.accountmodify({
              basicName,
              basicDescript,
              accountLatitudeID,
              accLatituDedetailInfos,
              success: () => {
                dimensionStore.changePageControl('DimensionMain');
              }
            });
          } else {
            this.alertMsg('名称仅限数字、英文和汉字')
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
          <WhiteButton onClick={() => {
            dimensionStore.changePageControl('DimensionMain');
          }}>返回</WhiteButton>
          <PurpleButton onClick={() => {
            let accLatituDedetailInfos = [];
            this.state.dataSource.forEach((item, index) => {
              accLatituDedetailInfos.push({
                accLatitudeDetailCode: item.accLatitudeDetailCode,
                accLatitudeDetailName: item.accLatitudeDetailName,
                accLatitudeDetailDesc: item.accLatitudeDetailDesc
              })
            })

            this.submit(accLatituDedetailInfos);
          }}>保存</PurpleButton>
        </div>
        <div className="add-main">
          <div className="main-content">
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <div className="base-info">
                  <Form ref="form" labelPosition="right" labelWidth="120" model={this.state.form} rules={this.state.rules} >
                    <Form.Item prop="basicName" label="名称" >
                      <Input
                        type="text"
                        style={{ width: '245px', height: '36px', }}
                        value={this.state.form.basicName}
                        onChange={(event) => {
                          if (event.target.value.length < 21 && /^[A-Za-z0-9\u4e00-\u9fa5]*$/.test(event.target.value)) {
                            let form = this.state.form;
                            form.basicName = event.target.value;
                            this.setState({ form })
                          }
                        }}
                        placeholder="请输入名称"
                      />
                    </Form.Item>
                    <Form.Item prop="basicDescript" label="描述">
                      <Input
                        style={{ width: '245px', height: '100px', }}
                        type="textarea"
                        value={this.state.form.basicDescript}
                        onChange={(event) => {
                          if (event.target.value.length <= 200) {
                            let form = this.state.form;
                            form.basicDescript = event.target.value;
                            this.setState({ form })
                          }
                        }}
                        placeholder="请输入描述"
                      >
                      </Input>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="明细数据" key="2">
                <div className="detail-info">
                  {this.state.isPreData !== 1 && <div className="btns">
                    <PurpleButton onClick={this.handleAdd}>新增行</PurpleButton>
                    <WhiteButton onClick={() => {
                      this.onDelete(this.state.selectedRowKeys)
                    }}>删除行</WhiteButton>
                  </div>
                  }
                  <div className="detail-table">
                    <Table
                      columns={columns}
                      dataSource={this.state.dataSource}
                      bordered
                      scroll={{ y: 400 }}
                      pagination={false}
                      rowSelection={{
                        selectedRowKeys: this.state.selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                          this.setState({
                            selectedRowKeys: selectedRowKeys
                          })
                        }
                      }}
                    />
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