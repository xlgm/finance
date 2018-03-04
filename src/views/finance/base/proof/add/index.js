import React from 'react';
import { Input, Form, Select } from 'element-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { Switch, message, Select as MySelect, Table } from 'antd';
import AddSubjectDialog from '../add-subject';
import './add.less';
const Option = MySelect.Option;

@inject('proofStore', 'appStore') @observer
class ProofAdd extends React.Component {

  constructor(props) {
    super(props);
    let { proofStore } = this.props;
    this.state = {
      addSubject: '',//添加科目弹出层
      finalAddDatas: [],
      rowSelection: [],
      selectedRowKeys: [],
      limitLending: false,//限制多借多贷 
      accCaptionTableName: proofStore.captionTableList.length > 0 ? proofStore.captionTableList[0].accCaptionTableName : '',//科目名称
      form: {
        uName: '',//名称 
        accCaptionTableID: proofStore.captionTableList.length > 0 ? proofStore.captionTableList[0].accCaptionTableID + "" : '',//添加科目表传参 
      },
      rules: {
        uName: [
          { required: true, message: '请输入名称!', validateTrigger: ['change', "blur"], },
          {
            validator: (rule, value, callback) => {
              if (value.length > 20) {
                callback(new Error('名称不能超过20字符!'));
              } if (!(/^[A-Za-z0-9\u4e00-\u9fa5]*$/.test(value))) {
                callback(new Error('只能含有(汉字、英文、数字)!'));
              } else {
                callback();
              }
            }, validateTrigger: ['change', "blur"],
          }
        ],
        accCaptionTableID: [
          { required: true, message: '请选择科目表', trigger: 'change' }
        ],
      },
      addcolumns: [
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
          width: '10%',
        },
        {
          title: '科目',
          dataIndex: 'accCaptionName',
          key: 'accCaptionName',
          width: '58%',
        },
        {
          title: '控制类型',
          dataIndex: 'controltype',
          key: 'controltype',

        },
      ], addtable: [],
    };

    let captionTab = proofStore.captionTableList.length > 0 ? proofStore.captionTableList[0].accCaptionTableID : '';
    proofStore.changeId(captionTab);

  }

  policyBack = () => {
    let { proofStore } = this.props;
    proofStore.changePageControl("ProofMain");
  }

  handleSubmit(e, param) {
    e.preventDefault();
    this.refs.form.validate((valid) => {
      if (valid) {
        let { proofStore } = this.props;
        let certificateWordCaptionInfoList = [];
        if (this.state.addtable.length > 0) {
          this.state.addtable.forEach(function (obj, i) {
            certificateWordCaptionInfoList.push({
              accCaptionID: obj.accCaptionID,
              controlType: obj.actualvalue
            })
          })
        }

        let certificateWordInfo = {
          "certificateWord": this.state.form.uName,
          "accCaptionTableID": this.state.form.accCaptionTableID,
          "accCaptionTableName": this.state.accCaptionTableName,
          "isOnlyOne": this.state.limitLending === true ? 1 : 0,
          "certificateWordCaptionInfoList": certificateWordCaptionInfoList
        }


        proofStore.addCertificateWord({
          certificateWordInfo: certificateWordInfo,
          success: () => {
            if (param === 1) {
              this.setState({
                form: {
                  uName: '',//名称 
                  accCaptionTableID: proofStore.captionTableList.length > 0 ? proofStore.captionTableList[0].accCaptionTableID + "" : '',//添加科目表传参 
                },
                limitLending: false,//限制多借多贷 
                addtable: [],
              })
            } else {
              proofStore.changePageControl("ProofMain");
            }

          },
          showLoading: () => {
            proofStore.showLoading();
          },
          closeLoading: () => {
            proofStore.closeLoading();
          }

        })

      } else {

        return false;
      }
    });
  }

  onChange(key, value) {
    let { proofStore } = this.props;
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
    if (key === "accCaptionTableID") {
      this.setState({
        addtable: [],
        accCaptionTableName: proofStore.captionTableList[value - 1].accCaptionTableName
      });
      proofStore.changeId(value);
    }


  }

  handleSelectChange = (i, value) => {
    let lempdata = this.state.addtable;
    lempdata[i].actualvalue = value;

  }

  addSubject = () => {
    let { proofStore, appStore } = this.props;

    let addtable = this.state.addtable;
    let accCaptionIDs = addtable.map((item) => {
      if (item.accCaptionID) {
        return item.accCaptionID
      }
    });
    if (this.state.form.accCaptionTableID === "") {
      message.destroy();
      message.success("请选择科目表");
    } else {
   
      this.setState(({
        addSubject:
        <AddSubjectDialog
          onCancel={() => {
            this.setState({
              addSubject: '',
            })
          }} 
          accCaptionIDs={accCaptionIDs}
          accCaptionTableID={this.state.form.accCaptionTableID}
          clickdetermine={(finalDatas) => {

            let lempdata = this.state.addtable;
            let ControlType = appStore.dictionarys.ControlType;
            let _this = this;
            lempdata.forEach(function (obj, i) {
              finalDatas = finalDatas.filter(function (element, index, self) {
                return obj.accCaptionID !== element.accCaptionID;
              });
            })

            finalDatas.forEach(function (obj, i) {
              lempdata.push({
                key: lempdata.length + 1,
                accCaptionName: obj.accCaptionName,
                controltype:
                <MySelect
                  defaultValue={ControlType[0].description}
                  style={{ width: 120 }}
                  placeholder="请选择控制类型"
                  onChange={(value) => {
                    _this.handleSelectChange(i, value)
                  }}>
                  {ControlType.length > 0 && ControlType.map((caption, index) => {
                    return <Option value={caption.value + ""} key={index}>{caption.description}</Option>
                  })
                  }
                </MySelect>,
                actualvalue: ControlType[0].value,
                accCaptionID: obj.accCaptionID

              });
            });

            this.setState({
              addtable: lempdata,
              addSubject: '',
              selectedRowKeys: [],
            })

          }}>
        </AddSubjectDialog>
      }));
    }

  }



  //删除
  delClick = () => {
    if (this.state.selectedRowKeys.length === 0) {
      message.destroy();
      message.success("请选择数据");
    } else {

      let lempdata = this.state.addtable;
      let selectedRowKeys = this.state.selectedRowKeys;
      selectedRowKeys.forEach(function (obj, i) {
        lempdata = lempdata.filter(function (element, index, self) {
          return obj !== element.key;
        });
      });

      let newdata = [];
      lempdata.forEach(function (obj, i) {
        newdata.push({
          key: i + 1,
          accCaptionName: obj.accCaptionName,
          controltype: obj.controltype,
          actualvalue: obj.actualvalue,
          accCaptionID: obj.accCaptionID
        });
      });


      this.setState({
        addtable: newdata,
        selectedRowKeys: [],

      });
    }

  }

  switchClick = (checked) => {
    if (checked) {
      this.setState({
        limitLending: true
      });
    } else {
      this.setState({
        limitLending: false
      });
    }
  }


  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }


  render() {
    let { proofStore } = this.props;
    let { selectedRowKeys } = this.state;
    let captionTableList = proofStore.captionTableList;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return <div id='peoof-add'>
      <div className="add-top">
        <WhiteButton onClick={this.policyBack}>返回</WhiteButton>
        <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 1) }}>保存并新增</PurpleButton>
        <PurpleButton onClick={(e) => { this.handleSubmit.call(this, e, 2) }}>保存</PurpleButton>
      </div>

      <div className="add-main">
        <div className="add-main-from">
          <Form ref="form" labelPosition="right" model={this.state.form} rules={this.state.rules} >
            <Form.Item prop="uName" label="名称" labelWidth="52" >
              <Input
                type="text"
                value={this.state.form.uName}
                onChange={this.onChange.bind(this, 'uName')}
                placeholder="请输入名称"
              />
            </Form.Item>
            <Form.Item label="限制多借多贷" labelWidth="120" >
              <Switch checked={this.state.limitLending} checkedChildren="是" unCheckedChildren="否" onChange={this.switchClick} />
            </Form.Item>

            <Form.Item prop="accCaptionTableID" label="科目表" labelWidth="100" >
              <Select
                value={this.state.form.accCaptionTableID}
                placeholder="请选择科目表"
                onChange={this.onChange.bind(this, 'accCaptionTableID')}>
                {captionTableList.length > 0 && captionTableList.map((caption, index) => {
                  return (
                    <Select.Option
                      selected={caption.accCaptionTableID === this.state.form.accCaptionTableID}
                      label={caption.accCaptionTableName + ""}
                      value={caption.accCaptionTableID + ""}
                      key={index}>
                    </Select.Option>
                  )
                })
                }
              </Select>
            </Form.Item>

            <div className="discharge-div">
              <PurpleButton onClick={this.addSubject}>添加科目</PurpleButton>
              <WhiteButton onClick={this.delClick}>删除</WhiteButton>
            </div>
            <div className="show-table">
              <Table
                rowSelection={rowSelection}
                columns={this.state.addcolumns}
                dataSource={this.state.addtable}
                bordered
                pagination={false}
                scroll={{ y: 300 }}
                onRowClick={(record, index) => {
                }}
                rowClassName={(record, index) => {
                }}
              />
            </div>
          </Form>
        </div>
      </div>
      {this.state.addSubject}
    </div>
  }
}

export default ProofAdd;