import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
// import { Tabs } from 'element-react';
import { message, Table, Select, Switch, Input, AutoComplete, Icon, Tabs } from 'antd';
import AddDimension from '../add-dimension/';
import AddCaption from '../add-caption';
import AddCurrency from '../add-currency';
import Cash from '../add-cash';
import { isInArray } from 'common/utils'
import Modal from 'components/modal';

import './add.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const Search = Input.Search;
message.config({
  top: 200,
  duration: 2,
});

@inject('subjectStore') @observer
class SubjectAdd extends React.Component {


  constructor(props) {
    super(props);

    let { subjectStore } = this.props;
    this.state = {
      stateDialog: '',
      dimensionSelected: [],
      currencySelected: [],
      flag: true,
      numData: '',
      isFirstNode: '',

      "captionAccountLatitudeInfoList": [
        // { 
        //     index:'1',
        //     key: "accLatitudeID",
        //     "accLatitudeID": 0, //核算维度编号,
        //     "accLatitudeName": "string", //核算维度名称 ,
        //     "nassary": true //是否必须录入 
        // } 
      ],

      "captionCurrencyInfoList": [
        // {   index:'1',
        //     key: 'businessCurrencyID',
        //     "businessCurrencyID": 0, //商户币别编号 (必填),
        //     "currencyName": "string" //货币名称 (不需要) 
        // } 
      ],
      "changeRate": false, //是否期末调汇
      "currencyAccAll": false,//是否核算所有币别
      form: {
        accCaptionCode: '', //编码
        accCaptionName: '',//名称

        accCaptionTypeID: '',
        accCaptionTypeName: '',


        parentAccCaptionID: '', //上级科目  
        parentAccCaptionName: '',
        accCaptionTableID: subjectStore.myAccCaptionTableID, //会计科目表ID
        lendingDirection: '', //借贷方向id
        lendingDirectionName: '', //借贷方向名称
      },

    };
  }
  alertMsg = (text) => {
    message.destroy();
    message.info(text);
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }


  clearState = () => {
    let { subjectStore } = this.props;

    this.setState({
      stateDialog: '',
      dimensionSelected: [],
      currencySelected: [],


      "captionAccountLatitudeInfoList": [
        // { 
        //     index:'1',
        //     key: "accLatitudeID",
        //     "accLatitudeID": 0, //核算维度编号,
        //     "accLatitudeName": "string", //核算维度名称 ,
        //     "nassary": true //是否必须录入 
        // } 
      ],

      "captionCurrencyInfoList": [
        // {   index:'1',
        //     key: 'businessCurrencyID',
        //     "businessCurrencyID": 0, //商户币别编号 (必填),
        //     "currencyName": "string" //货币名称 (不需要) 
        // } 
      ],
      "changeRate": false, //是否期末调汇
      "currencyAccAll": false,//是否核算所有币别
      form: {
        accCaptionCode: '', //编码
        accCaptionName: '',//名称

        accCaptionTypeID: '',
        accCaptionTypeName: '',


        parentAccCaptionID: '', //上级科目  
        parentAccCaptionName: '',
        accCaptionTableID: subjectStore.myAccCaptionTableID, //会计科目表ID
        lendingDirection: '', //借贷方向id
        lendingDirectionName: '', //借贷方向名称

      }
    })
  }
  //科目添加
  addSave = (flag) => {
    let form = this.state.form;
    let isaccCaptionCode, isaccCaptionName, isaccCaptionTypeID;//
    let regx = /^\d{1,4}(\.\d{1,4}){0,4}$/
    let regxs = /^\d{1,4}(\.\d{1,100}){5,100}$/

    if (form.accCaptionCode) {
      if (regx.test(form.accCaptionCode)) {
        if (this.state.numData.code == 1) {
          isaccCaptionCode = true;
        } else {
          isaccCaptionCode = false;
          message.destroy();
          message.info(this.state.numData.message);
        }
      } else {
        if (regxs.test(form.accCaptionCode)) {
          isaccCaptionCode = false;
          this.alertMsg('编码级数最多是5级')
        } else {
          isaccCaptionCode = false;
          this.alertMsg('编码格式错误，正确如下：4-3-3-2-2')
        }

      }

    } else {
      isaccCaptionCode = false;
      this.alertMsg('请输入编码')
    }

    if (isaccCaptionCode) {
      if (form.accCaptionName) {
        if (form.accCaptionName.length < 20) {
          isaccCaptionName = true;
        } else {
          isaccCaptionName = false;
          message.destroy();
          message.info('输入的名称不能多于20个字符');
        }

      } else {
        isaccCaptionName = false;
        message.destroy();
        message.info('请输入名称');
      }
    }

    if (isaccCaptionCode && isaccCaptionName) {
      if (form.accCaptionTypeID) {
        isaccCaptionTypeID = true;
      } else {
        isaccCaptionTypeID = false;
        message.destroy();
        message.info('请选择科目类别');
      }
    }

    if (isaccCaptionCode && isaccCaptionName && isaccCaptionTypeID) {

      let captionAccountLatitudeInfoList = this.state.captionAccountLatitudeInfoList;
      captionAccountLatitudeInfoList = captionAccountLatitudeInfoList.map((item) => {
        let { accLatitudeID, accLatitudeName, nassary } = item;
        return { accLatitudeID, accLatitudeName, nassary }

      })

      let captionCurrencyInfoList = this.state.captionCurrencyInfoList;
      captionCurrencyInfoList = captionCurrencyInfoList.map((item) => {
        let { businessCurrencyID, currencyName } = item;
        return { businessCurrencyID, currencyName }
      })

      let obj = {

        "accCaptionCode": this.state.form.accCaptionCode, //会计科目编码 (必填), 
        "accCaptionName": this.state.form.accCaptionName, //会计科目名称 (必填), 
        "accCaptionTableID": this.state.form.accCaptionTableID, //会计科目表编号 (必填),
        "accCaptionTypeID": this.state.form.accCaptionTypeID, //会计科目类别编号 (必填),
        "captionAccountLatitudeInfoList": captionAccountLatitudeInfoList,
        "captionCurrencyInfoList": captionCurrencyInfoList,//商户币别编号 (选填), 
        "changeRate": this.state.changeRate, //是否期末调汇 
        "currencyAccAll": this.state.currencyAccAll, //是否核算所有币别 
        "lendingDirection": this.state.form.lendingDirection, //借贷方向 (必填),
        "parentAccCaptionID": this.state.form.parentAccCaptionID ? this.state.form.parentAccCaptionID : '', //父级科目编号 (选填),

      }

      let { subjectStore } = this.props;
      if (form.accCaptionCode && this.state.isFirstNode && form.parentAccCaptionID) {
        this.setState({
          stateDialog: <Modal
            title="第一个下级科目"
            toast="您正在为当前科目增加第一个下级科目，系统将把该科目的数据全部转移到新增的下级科目中，该流程不可逆，您是否要继续？"
            onCancel={() => {
              this.setState({ stateDialog: '' });
              return
            }}
            onOk={() => {
              subjectStore.addAccountingCaption({
                obj,
                success: () => {
                  flag ? subjectStore.changePageControl('SubjectMain') : '';
                  this.clearState();
                }
              })
            }
            } />
        })
      } else {

        subjectStore.addAccountingCaption({
          obj,
          success: () => {
            flag ? subjectStore.changePageControl('SubjectMain') : '';
            this.clearState();
          }
        })

      }

    }

  }


  render() {

    let { subjectStore } = this.props;

    let { dimensionSelected, currencySelected } = this.state;

    let dimensionColumns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '20%',
      },
      {
        title: '核算维度',
        dataIndex: 'accLatitudeName',
        key: 'accLatitudeName',
        width: '50%',
      },
      {
        title: '必录',
        dataIndex: 'nassary',
        key: 'nassary',
        render: (text, record, index) => {
          let captionAccountLatitudeInfoList = this.state.captionAccountLatitudeInfoList;
          let nassary = captionAccountLatitudeInfoList[index].nassary;
          return <Select value={nassary + ''} onSelect={(value) => {
            captionAccountLatitudeInfoList[index].nassary = value;
            this.setState({ captionAccountLatitudeInfoList });
          }} style={{ width: 200 }}>
            <Option value={true + ''}>是</Option>
            <Option value={false + ''}>否</Option>
          </Select>
        }
      },
    ]
    let currencyCoumns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '30%',
      },
      {
        title: '币别',
        dataIndex: 'currencyName',
        key: 'currencyName',
      },
    ]
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;
    const dataSource = [{
      title: '代码',
      children: [
        {
          title: 'CI02.02.03',
          count: '投资支付的现金',
        }, {
          title: 'CI02.02.06',
          count: '资产减值准备',
        },
        {
          title: 'CI02.02.09',
          count: '偿还债务支付的现金',
        },
      ],
    }];

    function renderTitle(title) {
      return (
        <span style={{ marginLeft: 10 }}>
          {title}
          <span style={{ position: 'absolute', right: 15 }}>名称</span>
        </span>
      );
    }

    const options = dataSource.map(group =>
      <OptGroup
        key={group.title}
        label={renderTitle(group.title)}
      >
        {group.children.map((opt, index) =>
          <Option key={index} value={opt.count}>
            <div>
              <span className="base-subject-add-title" >{opt.title}</span>
              <span className="base-subject-add-count" >{opt.count} </span>
              <div className="clear"></div>
            </div>
          </Option>)
        }
      </OptGroup>);

    return (
      <div className="dimension-add">
        <div className="add-top">
          <WhiteButton onClick={() => {
            subjectStore.changePageControl('SubjectMain');
          }}>返回</WhiteButton>
          <PurpleButton onClick={() => {
            //接口请求完成后得到数据才触发添加函数
            setTimeout(function () {
              this.addSave();
            }.bind(this), 500)
          }}>保存并新增</PurpleButton>
          <PurpleButton onClick={() => {
            setTimeout(function () {
              this.addSave(this.state.flag);
            }.bind(this), 500)
          }}>保存</PurpleButton>
        </div>
        <div className="add-main">
          <div className="main-content">
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <div className="base-info">

                  <div className='item-input'>
                    <span><e>*</e> 编码</span>
                    <Input
                      style={{ width: 300, height: 36, marginLeft: 48 }}
                      type="text"
                      value={this.state.form.accCaptionCode}
                      onChange={(e) => {
                        let form = this.state.form;
                        form.parentAccCaptionID = '';
                        form.parentAccCaptionName = '';
                        this.setState({ form });
                        if (e.target.value.length < 30 && /^[0-9\.]*$/.test(e.target.value)) {
                          let form = this.state.form;
                          form.accCaptionCode = e.target.value;
                          this.setState({ form })
                        }
                      }}
                      placeholder="请输入编码"
                      onBlur={(e) => {
                        if (e.target.value) {
                          let data = {
                            accCaptionCode: e.target.value,
                            accCaptionTableID: this.state.form.accCaptionTableID
                          }
                          subjectStore.checkAccountingCaptionParent({
                            data, success: (data) => {
                              // console.log(data.data.parentAccCaptionID);
                              if (data) {
                                if (data.data.parentAccCaptionID) {
                                  let form = this.state.form;
                                  form.parentAccCaptionID = data.data.parentAccCaptionID;
                                  form.parentAccCaptionName = data.data.parentAccCaptionName;

                                  this.setState({ form });
                                }

                                if (data.data.isFirstNode) {
                                  if (data.data.parentAccCaptionID) {
                                    let accCaptionID = data.data.parentAccCaptionID;
                                    subjectStore.parentGetDetail({
                                      accCaptionID,
                                      success: () => {
                                        this.setState({
                                          captionAccountLatitudeInfoList: subjectStore.parentDetial.captionAccountLatitudeInfoList.map((item) => { return item }),
                                          captionCurrencyInfoList: subjectStore.parentDetial.captionCurrencyInfoList.map((item) => { return item }),
                                          currencyAccAll: subjectStore.parentDetial.currencyAccAll,
                                        })
                                      }
                                    })
                                  }
                                }

                                this.setState({
                                  numData: data,
                                  isFirstNode: data.data.isFirstNode,

                                });
                              } else {

                              }
                            }
                          });
                        }

                      }}
                    />
                  </div>
                  <div className='item-input'>
                    <span><e>*</e> 名称</span>
                    <Input
                      style={{ width: 300, height: 36, marginLeft: 48 }}
                      type="text"
                      value={this.state.form.accCaptionName}
                      onChange={(e) => {
                        if (e.target.value.length < 21 && /^[A-Za-z0-9\u4e00-\u9fa5]*$/.test(e.target.value)) {
                          let form = this.state.form;
                          form.accCaptionName = e.target.value;
                          this.setState({ form })
                        }
                      }}
                      placeholder="请输入名称"
                    />

                  </div>
                  <div className='item-input'>
                    <span><e>*</e> 科目类别</span>
                    <Search
                      readOnly
                      placeholder="请选择科目类别"
                      style={{ width: 300, height: 30 }}
                      value={this.state.form.accCaptionTypeName}
                      onClick={() => {
                        this.setState({
                          stateDialog: <AddCaption
                            onCancel={() => {
                              this.setState({ stateDialog: '' });
                            }}
                            onOk={(accCaptionType) => {

                              this.setState({ stateDialog: '' });
                              let form = this.state.form;
                              form.accCaptionTypeID = accCaptionType.accCaptionTypeID;
                              form.accCaptionTypeName = accCaptionType.accCaptionTypeName;
                              form.lendingDirectionName = accCaptionType.accCaptionTypeDirectName;
                              form.lendingDirection = accCaptionType.accCaptionTypeDirect
                              this.setState({ form });
                            }}
                          />
                        })
                      }}
                      onSearch={() => {
                        this.setState({
                          stateDialog: <AddCaption
                            onCancel={() => {
                              this.setState({ stateDialog: '' });
                            }}
                            onOk={(accCaptionType) => {

                              this.setState({ stateDialog: '' });
                              let form = this.state.form;
                              form.accCaptionTypeID = accCaptionType.accCaptionTypeID;
                              form.accCaptionTypeName = accCaptionType.accCaptionTypeName;
                              form.lendingDirectionName = accCaptionType.accCaptionTypeDirectName;
                              form.lendingDirection = accCaptionType.accCaptionTypeDirect
                              this.setState({ form });
                            }}
                          />
                        })
                      }}
                    />
                  </div>
                  <div className='item-input' style={{ marginLeft: 28 }}>
                    <span>上级科目</span>
                    <Input
                      style={{ width: 300, height: 36 }}
                      type="text"
                      value={this.state.form.parentAccCaptionName}
                      disabled
                    />
                  </div>
                  <div className='item-input'>
                    <span><e>*</e> 借贷方向</span>
                    <Select value={this.state.form.lendingDirectionName} style={{ width: 300, marginLeft: 18 }}
                      onSelect={(value) => {
                        let form = this.state.form;
                        form.lendingDirection = value;
                        form.lendingDirectionName = value;
                        this.setState({ form });
                      }}
                    >
                      <Option value='4001'>借方</Option>
                      <Option value='4002'>贷方</Option>
                    </Select>
                  </div>
                  <div className='item-input' style={{ marginLeft: 28 }}>
                    <span>现金科目</span>
                    <Switch
                      style={{ marginLeft: 33 }}
                      checkedChildren="是"
                      unCheckedChildren="否"
                      onChange={(value) => {

                      }}
                    >
                    </Switch>
                  </div>
                  <div className='item-input' style={{ marginLeft: 28 }}>
                    <span>现金等价物</span>
                    <Switch
                      style={{ marginLeft: 20 }}
                      checkedChildren="是"
                      unCheckedChildren="否"
                      onChange={(value) => {

                      }}
                    >
                    </Switch>
                  </div>
                  <div className='item-input' style={{ marginLeft: 28 }}>
                    <span>银行科目</span>
                    <Switch
                      style={{ marginLeft: 33 }}
                      checkedChildren="是"
                      unCheckedChildren="否"
                      onChange={(value) => {

                      }}
                    >
                    </Switch>
                  </div>

                </div>
              </TabPane>
              <TabPane tab="核算维度" key="2">

                <div className="detail-info">
                  <div className="btns">
                    <PurpleButton onClick={() => {
                      let captionAccountLatitudeInfoList = this.state.captionAccountLatitudeInfoList || [];
                      let latitude = captionAccountLatitudeInfoList.map((item) => {
                        return item.accLatitudeID;
                      })
                      let mLength = captionAccountLatitudeInfoList.length;
                      this.setState({
                        stateDialog: <AddDimension
                          latitudeIDs={latitude}
                          onCancel={() => {
                            this.setState({ stateDialog: '' })
                          }}
                          onOk={(accountLatitudeIDs, accountLatitudeNames) => {
                            this.setState({ stateDialog: '' })
                            accountLatitudeIDs.forEach((item, index) => {
                              captionAccountLatitudeInfoList.push({
                                index: index + 1 + mLength,
                                key: item,
                                accLatitudeID: item, //核算维度编号,
                                accLatitudeName: accountLatitudeNames[index], //核算维度名称 ,
                                nassary: true //是否必须录入 
                              })

                            })

                            this.setState({ captionAccountLatitudeInfoList })
                          }}
                        />
                      })
                    }}>添加维度</PurpleButton>

                    <WhiteButton onClick={() => {
                      let dimensionSelected = this.state.dimensionSelected || [];
                      if (dimensionSelected.length > 0) {
                        let captionAccountLatitudeInfoList = this.state.captionAccountLatitudeInfoList || [];
                        captionAccountLatitudeInfoList = captionAccountLatitudeInfoList.filter((item) => {
                          return !isInArray(dimensionSelected, item.accLatitudeID);
                        })
                        captionAccountLatitudeInfoList = captionAccountLatitudeInfoList.map((item, index) => {
                          item.index = index + 1;
                          return item;
                        })

                        this.setState({ captionAccountLatitudeInfoList, dimensionSelected: [] });
                      } else {
                        message.destroy();
                        message.info('请选择数据');
                      }


                    }}>删除</WhiteButton>
                  </div>
                  <div className="detail-table">
                    <Table
                      columns={dimensionColumns}
                      dataSource={this.state.captionAccountLatitudeInfoList}
                      bordered
                      scroll={{ y: 310 }}
                      pagination={false}
                      rowSelection={{
                        selectedRowKeys: dimensionSelected,
                        onChange: (selectKeys) => {
                          this.setState({ dimensionSelected: selectKeys });
                        }
                      }}
                    />
                  </div>
                </div>

              </TabPane>
              <TabPane tab="外币核算" key="3">
                <div className="detail-info">
                  <div className="btns">

                    {!this.state.currencyAccAll && <PurpleButton style={{ marginRight: 20 }} onClick={() => {
                      let captionCurrencyInfoList = this.state.captionCurrencyInfoList || [];

                      let mLength = captionCurrencyInfoList.length;
                      let currencyIDs = captionCurrencyInfoList.map((item) => {
                        return item.businessCurrencyID
                      })
                      this.setState({
                        stateDialog: <AddCurrency
                          currencyIDs={currencyIDs}
                          onCancel={() => {
                            this.setState({ stateDialog: '' })
                          }}
                          onOk={(businessCurrencyIDs, currencyNames) => {

                            this.setState({ stateDialog: '' });
                            businessCurrencyIDs.forEach((item, index) => {
                              captionCurrencyInfoList.push({
                                index: mLength + index + 1,
                                key: item,
                                businessCurrencyID: item, //商户币别编号 (必填),
                                currencyName: currencyNames[index] //货币名称 (不需要) 
                              })

                            })
                          }}

                        />
                      })
                    }}>添加币别</PurpleButton>}
                    {!this.state.currencyAccAll && <WhiteButton onClick={() => {
                      let currencySelected = this.state.currencySelected || [];
                      let captionCurrencyInfoList = this.state.captionCurrencyInfoList;
                      if (currencySelected.length > 0) {
                        captionCurrencyInfoList = captionCurrencyInfoList.filter((item) => {
                          return !isInArray(currencySelected, item.businessCurrencyID);
                        })
                        captionCurrencyInfoList = captionCurrencyInfoList.map((item, index) => {
                          item.index = index + 1;
                          return item;
                        })
                        this.setState({ captionCurrencyInfoList, currencySelected: [] })
                      } else {
                        message.destroy();
                        message.info('请选择数据');
                      }
                    }}>删除</WhiteButton>}

                    <span style={{ position: 'absolute', left: 300 }}>
                      <span className="btns_swicth">期末调汇</span>
                      <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        checked={this.state.changeRate}
                        onChange={(value) => {
                          this.setState({ changeRate: value });
                        }}
                      >
                      </Switch>
                      <span className="btns_swicth" style={{ marginLeft: 15 }} >核算所有币别</span>
                      <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        checked={this.state.currencyAccAll}
                        onChange={(value) => {
                          this.setState({ currencyAccAll: value }
                          )
                        }}
                      >
                      </Switch>
                    </span>

                  </div>
                  <div>
                    {
                      !this.state.currencyAccAll &&
                      <div className="detail-table">
                        <Table
                          columns={currencyCoumns}
                          dataSource={this.state.captionCurrencyInfoList}
                          bordered
                          scroll={{ y: 310 }}
                          pagination={false}
                          rowSelection={{
                            selectedRowKeys: currencySelected,
                            onChange: (selectedRowKeys) => {
                              this.setState({ currencySelected: selectedRowKeys })
                            }
                          }}
                        />
                      </div>
                    }
                  </div>

                </div>
              </TabPane>
              <TabPane tab="现金流量预设" key="4">
                <div className="detail-info">
                  <div className='item-input'>
                    <div className="item-input-cash">主表项目(增加)</div>
                    <div className="certain-category-search-wrapper">
                      <AutoComplete
                        className="certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        size="large"
                        style={{ width: '100%' }}
                        dataSource={options}
                        placeholder=""
                        optionLabelProp="value"
                        filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
                        onChange={(value) => {

                        }}
                      >
                        <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.setState({
                            stateDialog: <Cash
                              onCancel={() => {
                                this.setState({ stateDialog: '' });
                              }}
                              onOk={() => {


                              }}
                            />
                          })
                        }} />} />
                      </AutoComplete>
                    </div>
                    <div className='clear-float'></div>
                  </div>
                  <div className='item-input'>
                    <div className="item-input-cash">附表项目(增加)</div>
                    <div className="certain-category-search-wrapper">
                      <AutoComplete
                        className="certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        size="large"
                        style={{ width: '100%' }}
                        dataSource={options}
                        placeholder=""
                        optionLabelProp="value"
                        filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
                        onChange={(value) => {

                        }}
                      >
                        <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.setState({
                            stateDialog: <Cash
                              onCancel={() => {
                                this.setState({ stateDialog: '' });
                              }}
                              onOk={() => {


                              }}
                            />
                          })
                        }} />} />
                      </AutoComplete>
                    </div>
                    <div className='clear-float'></div>
                  </div>
                  <div className='item-input'>
                    <div className="item-input-cash">主表项目(减少)</div>
                    <div className="certain-category-search-wrapper">
                      <AutoComplete
                        className="certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        size="large"
                        style={{ width: '100%' }}
                        dataSource={options}
                        placeholder=""
                        optionLabelProp="value"
                        filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
                        onChange={(value) => {

                        }}
                      >
                        <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.setState({
                            stateDialog: <Cash
                              onCancel={() => {
                                this.setState({ stateDialog: '' });
                              }}
                              onOk={() => {


                              }}
                            />
                          })
                        }} />} />
                      </AutoComplete>
                    </div>
                    <div className='clear-float'></div>
                  </div>
                  <div className='item-input'>
                    <div className="item-input-cash">附表项目(减少)</div>
                    <div className="certain-category-search-wrapper">
                      <AutoComplete
                        className="certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={false}
                        dropdownStyle={{ width: 300 }}
                        size="large"
                        style={{ width: '100%' }}
                        dataSource={options}
                        placeholder=""
                        optionLabelProp="value"
                        filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
                        onChange={(value) => {

                        }}
                      >
                        <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          this.setState({
                            stateDialog: <Cash
                              onCancel={() => {
                                this.setState({ stateDialog: '' });
                              }}
                              onOk={() => {


                              }}
                            />
                          })
                        }} />} />
                      </AutoComplete>
                    </div>
                    <div className='clear-float'></div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>

        </div>
        {this.state.stateDialog}
      </div>
    )
  }

}

export default SubjectAdd;