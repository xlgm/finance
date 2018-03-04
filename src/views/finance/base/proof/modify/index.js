import React from 'react';
import { Input, Form, Select } from 'element-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { Switch, message, Select as MySelect, Table } from 'antd';
import { Tabs } from 'antd';
import AddSubjectDialog from '../add-subject';
import './modify.less';

const Option = MySelect.Option;
const TabPane = Tabs.TabPane;

@inject('proofStore', 'appStore') @observer
class ProofModify extends React.Component {

  constructor(props) {
    super(props);
    let { proofStore, appStore } = this.props;
    let ControlType = appStore.dictionarys.ControlType;
    let certificateWordObj = proofStore.certificateWordObj;
    let cannotEdit = proofStore.ifModifyDetails === "detailsState" ? true : false;
    let certificateWordCaptionInfoList = certificateWordObj.certificateWordCaptionInfoList === null ? [] : certificateWordObj.certificateWordCaptionInfoList;
    let lempdata = [];
    let _this = this;
    certificateWordCaptionInfoList.forEach(function (obj, i) {
      var map = {};
      ControlType.forEach(function (item, i) {
        map[item.value] = item.description;
      });
      var value = map[obj.controlType];
      lempdata.push({
        key: lempdata.length + 1,
        accCaptionName: obj.accCaptionName,
        controltype:
        <MySelect
          disabled={cannotEdit}
          defaultValue={value}
          style={{ width: 120 }}
          placeholder="请选择控制类型"
          onChange={(value) => {
            _this.handleSelectChange(i, value)
          }}>
          {ControlType.length && ControlType.map((caption, index) => {
            return <Option value={caption.value + ""} key={index}>{caption.description + ""}</Option>
          })
          }
        </MySelect>,
        actualvalue: obj.controlType,
        accCaptionID: obj.accCaptionID,
      })
    });

    this.state = {
      addSubject: '',//添加科目弹出层
      defaultData: proofStore.defaultData,//判断是否是预设数据
      certificateWordID: certificateWordObj.certificateWordID,//修改的id
      cannotEdit: cannotEdit,
      finalAddDatas: [],
      rowSelection: [],
      selectedRowKeys: [],
      limitLending: certificateWordObj.isOnlyOne === 1 ? true : false,//限制多借多贷
      accCaptionTableID: certificateWordObj.accCaptionTableID,//添加科目表传参 
      accCaptionTableName: certificateWordObj.accCaptionTableName,//科目名称
      form: {
        uName: certificateWordObj.certificateWord,//名称 
        accCaptionTableID: certificateWordObj.accCaptionTableID+"",//添加科目表传参 
      },
      rules: {
        uName: [
          { required: true, message: '请输入名称!', validateTrigger: ['change', "blur"], },
          {
            validator: (rule, value, callback) => {
              if (value.length > 20) {
                callback(new Error('名称不能超过20字符!'));
              }if (!(/^[A-Za-z0-9\u4e00-\u9fa5]*$/.test(value))) {
                callback(new Error('只能含有(汉字、英文、数字)!'));
              }  else {
                callback();
              }
            }, validateTrigger: ['change', "blur"],
          }
        ],
        accCaptionTableID: [
          { required: true, message: '请选择科目表!', validateTrigger: ['change', "blur"], },
        ]
      },
      addcolumns: [
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
          width: '10%'
        },
        {
          title: '科目',
          dataIndex: 'accCaptionName',
          key: 'accCaptionName',
          width: '58%'
        },
        {
          title: '控制类型',
          dataIndex: 'controltype',
          key: 'controltype',

        },
      ], addtable: lempdata,
    }; 
  }

  policyBack = () => {
    let { proofStore } = this.props;
    proofStore.changePageControl("ProofMain");
  }

  handleSubmit(e) {
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
            });
          })
        }
        let certificateWordInfo = {
          "certificateWordID": this.state.certificateWordID,
          "certificateWord": this.state.form.uName,
          "accCaptionTableID": this.state.accCaptionTableID,
          "accCaptionTableName": this.state.accCaptionTableName,
          "isOnlyOne": this.state.limitLending === true ? 1 : 0,
          "certificateWordCaptionInfoList": certificateWordCaptionInfoList
        }

        proofStore.modCertificateWord({
          certificateWordInfo: certificateWordInfo,
          success: () => {
            proofStore.changePageControl("ProofMain");
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
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
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
    if (this.state.accCaptionTableID === null) {
      message.destroy();
      message.warning("请选择科目表");
    } else { 
      this.setState(({
        addSubject:
        <AddSubjectDialog
          onCancel={() => {
            this.setState({
              addSubject: ''
            })
          }}
          accCaptionIDs={accCaptionIDs}
          accCaptionTableID={this.state.accCaptionTableID}
          clickdetermine={(finalDatas) => {
            let lempdata = this.state.addtable;
            let ControlType = appStore.dictionarys.ControlType;

            let _this = this;
            lempdata.forEach(function (obj, i) {
              finalDatas = finalDatas.filter(function (element, index, self) {
                return obj.accCaptionID !== element.accCaptionID;
              });
            })

            finalDatas.map(function (obj, i) {
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
                  {ControlType.length > 0 && 
                    ControlType.map((caption, index) => {
                      return <Option value={caption.value + ""} key={index}>{caption.description + ""}</Option>
                    })
                  }
                </MySelect>,
                actualvalue: ControlType[0].value,
                accCaptionID: obj.accCaptionID 
              });
              return obj;
            }); 
            this.setState({
              addtable: lempdata,
              addSubject: '',
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
      message.success("请选择要删除的数据");
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

    return <div id='proof-modify'>
      <div className="add-top">
        <WhiteButton onClick={this.policyBack}>返回</WhiteButton>
        {!this.state.cannotEdit && 
          <PurpleButton 
            disabled={this.state.cannotEdit} 
            onClick={!this.state.cannotEdit && this.handleSubmit.bind(this)}>
            保存
          </PurpleButton>
        } 
      </div>
      <div className="add-main">
        <div className="add-main-from">
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1"> 
            <div className="add-main-from">
              <Form ref="form" labelPosition="right" model={this.state.form} rules={this.state.rules} >
                <Form.Item prop="uName" label="名称" labelWidth="52" >
                  <Input
                    type="text"
                    value={this.state.form.uName}
                    onChange={this.onChange.bind(this, 'uName')}
                    placeholder="请输入名称"
                    disabled={this.state.cannotEdit}
                  />
                </Form.Item>
                <Form.Item label="限制多借多贷" labelWidth="120" >
                  <Switch 
                    disabled={this.state.cannotEdit} 
                    defaultChecked={this.state.limitLending} 
                    checkedChildren="是" 
                    unCheckedChildren="否" 
                    onChange={this.switchClick}
                  />
                </Form.Item>

                <Form.Item label="科目表" labelWidth="100" prop="accCaptionTableID" >
                  <Select
                    value={this.state.accCaptionTableID}
                    placeholder="请选择科目表"
                    disabled={true}
                    onChange={this.onChange.bind(this, 'accCaptionTableID')}  >
                    {captionTableList.length > 0 && 
                      captionTableList.map((caption, index) => {
                      return (
                        <Select.Option 
                          selected={caption.accCaptionTableID === this.state.accCaptionTableID} 
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
                  {!this.state.cannotEdit && 
                    <PurpleButton 
                      disabled={this.state.cannotEdit || this.state.defaultData} onClick={(!this.state.cannotEdit && !this.state.defaultData) && this.addSubject}>添加科目</PurpleButton>}
                  {!this.state.cannotEdit && <WhiteButton disabled={this.state.cannotEdit || this.state.defaultData} onClick={(!this.state.cannotEdit && !this.state.defaultData) && this.delClick}>删除</WhiteButton>}
                </div>
                <div className="show-table">
                  <Table
                    rowSelection={(this.state.cannotEdit || this.state.defaultData) ? null : rowSelection}
                    scroll={{ y: 300 }}
                    columns={this.state.addcolumns}
                    dataSource={this.state.addtable}
                    pagination={false}
                    bordered
                    onRowClick={(record, index) => {

                    }}
                    rowClassName={(record, index) => {

                    }}
                  />
                </div>
              </Form>
            </div>
            </TabPane>
            <TabPane tab="操作纪录" key="2"> 
                <div className="records">
                  
                </div>                        
            </TabPane> 
          </Tabs>  
        </div>
      </div>

      {this.state.addSubject}

    </div>
  }
}

export default ProofModify;