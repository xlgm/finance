import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/loading';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon, Tabs, Checkbox } from 'antd';
import ChoiceSubjectModal from 'components/choice-subject-modal';
import './setting.less';

const Option = Select.Option;
const Search = Input.Search;
const TabPane = Tabs.TabPane;

@inject('parameterStore') @observer
class ParameterContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stateDialog: '',
    }
  }

  componentWillUnmount() {
    // let {parameterStore} = this.props;
    // parameterStore.changePageControl('');
  }

  render() {
    let { parameterStore } = this.props;

    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;


    const dataSource = [
      {
        title: '00010',
        count: '预付账款',
      }, {
        title: '00010',
        count: '农业银行',
      },
      {
        title: '20202000010',
        count: '应付账款_黎广深',
      },
    ];
    const options = dataSource.map((group, index) => {
      return <Option key={group.title} value={group.count}>
        <div className="parameter-setting-setting-options">
          <span>{group.title}</span>
          <span className="certain-search-item-counts">{group.count} </span>
        </div>
      </Option>
    })



    return <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div className="parameter-setting-top">
        <div className="parameter-books">
          <span>账簿</span>
          <Select
            defaultValue="现金日记账"
            style={{ marginLeft: 20, width: 200, fontSize: 14, }}
            onChange={(key) => {

            }} >
            <Option value={'现金日记账'}>现金日记账</Option>
            <Option value={'银行账'}>银行账</Option>
          </Select>
        </div>
        <div className="parameter-organization">
          <span>核算组织</span>
          <Input
            style={{ marginLeft: 20, width: 200, fontSize: 14, }}
            value={'不用等'}
            disabled
          />
        </div>
        <div className="parameter-top-btn">
          <PurpleButton onClick={() => {

          }}>保存</PurpleButton>
        </div>
        <div className="clear"></div>
      </div>
      <div className="parameter-tab">
        <Tabs defaultActiveKey="1">
          <TabPane tab="账簿参数" key="1">
            <div className="parameter-table">
              <div className="parameter-base">基本选项</div>
              <div className="parameter-info">
                <div className="parameter-info-list">汇兑损益科目</div>
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
                        stateDialog: <ChoiceSubjectModal
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
                <div className="clear"></div>
              </div>
              <div className="parameter-info">
                <div className="parameter-info-list">本年利润科目</div>
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
                        stateDialog: <ChoiceSubjectModal
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
                <div className="clear"></div>
              </div>
              <div className="parameter-info">
                <div className="parameter-info-list">利润分配科目</div>
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
                        stateDialog: <ChoiceSubjectModal
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
                <div className="clear"></div>
              </div>
            </div>
            <div className="parameter-table">
              <div className="parameter-checkout">结账选项</div>
              <div className="parameter-checkout-info">
                <Checkbox>账簿余额方向与科目设置的余额方向相同</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>结账时要求损益类科目余额为零</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>允许跨财务年度的反结账</Checkbox>
              </div>
            </div>
          </TabPane>
          <TabPane tab="凭证参数" key="2">
            <div className="parameter-table">
              <div className="parameter-checkout">基本选项</div>
              <div className="parameter-checkout-info">
                <Checkbox>凭证过账前必须主管复核</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>允许不同人取消主管复核</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>凭证过账前必须出纳复核</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>允许不同人取消出纳复核</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>每条凭证分录必须有摘要</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>凭证借贷金额不等允许保存</Checkbox>
              </div>
            </div>
            <div className="parameter-table">
              <div className="parameter-checkout">数据校验</div>
              <div className="parameter-checkout-info">
                <Checkbox>银行存款科目必须输入结算方式和结算号</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>凭证中的汇率允许手工修改</Checkbox>
              </div>
            </div>
            <div className="parameter-table">
              <div className="parameter-checkout">现金流量</div>
              <div className="parameter-checkout-info">
                <Checkbox>现金流量科目必须输入现金流量项目</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <Checkbox>录入凭证时指定现金流量附表项目</Checkbox>
              </div>
              <div className="parameter-checkout-info">
                <span>T型账多借多贷凭证拆分方式
                <Select
                    style={{ marginLeft: 20, width: 150, fontSize: 14, }}
                    onChange={(key) => {

                    }} >
                    <Option value={'按金额相近匹配'}>按金额相近匹配</Option>
                    <Option value={'按金额比例匹配'}>按金额比例匹配</Option>
                  </Select></span>
              </div>
              <div className="parameter-checkout-info">
                <span>附表多借多贷凭证拆分方式
              <Select
                    style={{ marginLeft: 26, width: 150, fontSize: 14, }}
                    onChange={(key) => {

                    }} >
                    <Option value={'按金额相近匹配'}>按金额相近匹配</Option>
                    <Option value={'按金额比例匹配'}>按金额比例匹配</Option>
                  </Select></span>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
      {this.state.stateDialog}
    </div>
  }
}

export default ParameterContainer;