import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import Cash from '../add-cash';
import { message, Table, Select, Switch, Input, AutoComplete, Icon, Tabs } from 'antd';

// import './detail.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
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

      "captionAccountLatitudeInfoList": subjectStore.subjectDetail.captionAccountLatitudeInfoList || [],

      "captionCurrencyInfoList": subjectStore.subjectDetail.captionCurrencyInfoList || [],
      "changeRate": subjectStore.subjectDetail.changeRate, //是否期末调汇
      "currencyAccAll": subjectStore.subjectDetail.currencyAccAll,//是否核算所有币别
      form: subjectStore.subjectDetail.form
    };
  }



  render() {

    let { subjectStore } = this.props;

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
        render: (text) => {

          let value;
          if (text) {
            value = "是"
          } else {
            value = "否"
          }

          return <div>{value}</div>
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

    let captionAccountLatitudeInfoList = [];
    if (subjectStore.subjectDetail.captionAccountLatitudeInfoList) {
      captionAccountLatitudeInfoList = subjectStore.subjectDetail.captionAccountLatitudeInfoList.map((item) => {
        let { index, accLatitudeName, nassary, accLatitudeID } = item;
        return { index, accLatitudeName, nassary, accLatitudeID }
      })
    }
    let captionCurrencyInfoList = [];
    if (subjectStore.subjectDetail.captionCurrencyInfoList) {
      captionCurrencyInfoList = subjectStore.subjectDetail.captionCurrencyInfoList.map((item) => {
        let { index, currencyName, businessCurrencyID } = item;
        return { index, currencyName, businessCurrencyID }
      })
    }

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
            <span className="certain-search-item-count-add" style={{ position: 'absolute', right: 16 }}>{opt.count} </span>
          </Option>)
        }
      </OptGroup>);
    return (<div className="dimension-add">
      <div className="add-top">
        <WhiteButton onClick={() => {
          subjectStore.changePageControl('SubjectMain');
        }}>返回</WhiteButton>

      </div>
      <div className="add-main">
        <div className="main-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <div className="base-info">

                <div className='item-input'>
                  <span><e>*</e> 编码</span>
                  <Input
                    disabled
                    style={{ width: 300, height: 36, marginLeft: 48 }}
                    type="text"
                    value={this.state.form.accCaptionCode}
                    placeholder="请输入编码"

                  />
                </div>
                <div className='item-input'>
                  <span><e>*</e> 名称</span>
                  <Input
                    disabled
                    style={{ width: 300, height: 36, marginLeft: 48 }}
                    type="text"
                    value={this.state.form.accCaptionName}
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
                  <Input
                    style={{ width: 300, height: 36 }}
                    type="text"
                    value={this.state.form.lendingDirectionName}
                    disabled
                  />
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

                <div className="detail-table">
                  <Table
                    columns={dimensionColumns}
                    dataSource={captionAccountLatitudeInfoList}
                    bordered
                    scroll={{ y: 400 }}
                    pagination={false}
                  />
                </div>
              </div>

            </TabPane>
            <TabPane tab="外币核算" key="3">
              <div className="detail-info">
                <div className="btns">
                  <span>
                    <span className="btns_swicth">期末调汇</span>
                    <Switch
                      checked={this.state.changeRate}

                    >
                    </Switch>
                    <span className="btns_swicth" style={{ marginLeft: 10 }}>核算所有币别</span>
                    <Switch
                      checked={this.state.currencyAccAll}
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
                        dataSource={captionCurrencyInfoList}
                        bordered
                        scroll={{ y: 400 }}
                        pagination={false}
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

export default SubjectAdd;