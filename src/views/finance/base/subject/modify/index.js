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

// import './modify.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
message.config({
  top: 200,
  duration: 2,
});

@inject('subjectStore') @observer
class SubjectModify extends React.Component {


  constructor(props) {
    super(props);

    let { subjectStore } = this.props;
    this.state = {

      stateDialog: '',
      dimensionSelected: [],
      currencySelected: [],


      "captionAccountLatitudeInfoList": subjectStore.modifyDetial.captionAccountLatitudeInfoList.map((item) => { return item }),
      "captionCurrencyInfoList": subjectStore.modifyDetial.captionCurrencyInfoList.map((item) => { return item }),
      accCaptionID: subjectStore.modifyDetial.accCaptionID,
      "changeRate": subjectStore.modifyDetial.changeRate, //是否期末调汇
      "currencyAccAll": subjectStore.modifyDetial.currencyAccAll,//是否核算所有币别
      form: subjectStore.modifyDetial.form,
    };
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }


  //科目添加
  addSave = () => {
    let form = this.state.form;
    let isaccCaptionCode, isaccCaptionName, isaccCaptionTypeID;

    if (form.accCaptionCode) {
      isaccCaptionCode = true;
    } else {
      isaccCaptionCode = false;
      message.destroy();
      message.info('请输入编码');
    }

    if (isaccCaptionCode) {
      if (form.accCaptionName) {
        isaccCaptionName = true;
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
        accCaptionID: this.state.accCaptionID,
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
      subjectStore.modifySubjectSubmit({
        obj,
        success: () => {
          subjectStore.changePageControl('SubjectMain');
        }
      })
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
            {opt.title}
            <span className="certain-search-item-count-modify" style={{ position: 'absolute', right: 16 }}>{opt.count} </span>
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
            this.addSave();
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
                      disabled
                      onChange={(e) => {
                        let form = this.state.form;
                        form.parentAccCaptionID = '';
                        form.parentAccCaptionName = '';
                        this.setState({ form });
                        if (e.target.value.length < 30) {
                          let form = this.state.form;
                          form.accCaptionCode = e.target.value;
                          this.setState({ form })
                        }
                      }}
                      placeholder="请输入编码"
                      onBlur={(e) => {
                        return


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
                    <Input
                      disabled
                      style={{ width: 300, height: 36 }}
                      icon="search"
                      value={this.state.form.accCaptionTypeName}
                      placeholder="请选择科目类别"
                      onClick={() => {
                        return

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
                    <Select disabled value={this.state.form.lendingDirectionName} style={{ width: 300, height: 36, marginLeft: 18 }}
                      onSelect={(value) => {
                        return

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

export default SubjectModify;