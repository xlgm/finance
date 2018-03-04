import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import { Select, Cascader, Icon, Checkbox, Table, Modal } from 'antd';
import './index.less';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

@inject('tableCashStore') @observer
class CashFlowTableMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPop: false,
      showMoreOprItems: false,
      showMoreOprItemValue: '',
      showModal: ''
    }
  }
  componentDidMoun() {
    this.setState({
      showModal: (
        <Modal 
          title='123'
        />
      )
    });
  }
  render() {
    let { tableCashStore } = this.props;
    let columns = [
      {
        title: '项目类别',
        dataIndex: 'projectType',
        index: 'projectType'
      }, {
        title: '现金流量项目',
        dataIndex: 'cashFlowProject',
        index: 'cashFlowProject'
      }, {
        title: '行次',
        dataIndex: 'line',
        index: 'line'
      }, {
        title: '本期合计',
        dataIndex: 'issueAcc',
        index: 'issueAcc'
      }, {
        title: '本年累计',
        dataIndex: 'yearAcc',
        index: 'yearAcc'
      }
    ]
    return (
      <div className="table-cashFlow-main">
        <div className="table-cashFlow-main-header">
          <div className="header-container">
            <div className="header-item">
              <h3>账簿</h3>
              <Select
                defaultValue='拓润'
              >
                {
                  [{ key: 1, val: '拓润' }, { key: 2, val: '不用等' }].map(item => {
                    return <Option key={item.key} val={item.val}>{item.val}</Option>
                  })
                }
              </Select>
            </div>
            <div className="header-item">
              <h3>币别</h3>
              <Select
                defaultValue="人民币"
              >
                {
                  [{ key: 1, val: '人民币' }, { key: 2, val: '综合本位币' }].map(item => {
                    return <Option key={item.key}>{item.val}</Option>
                  })
                }
              </Select>
            </div>
            <Select
              className="report"
              defaultValue="月报"
            >
              {
                [{ key: 1, val: '月报' }, { key: 2, val: '季报' }].map(item => {
                  return <Option key={item.key}>{item.val}</Option>
                })
              }
            </Select>
            <Cascader
              className="issues"
              options={[{
                value: '2008年',
                label: '2008年',
                children: [{
                  value: '1期',
                  label: '1期'
                }]
              }]}
              onChange={(value, selectedOptions) => {
                console.log(value, selectedOptions);
              }}
              placeholder="请选择年份/期数"
            />
            <WhiteButton
              className="advanced-search"
              onMouseOver={() => {
                this.setState({
                  showPop: true
                });
              }}
            >
              高级查询
            <Icon type="caret-down" />
              {this.state.showPop ? (
                <div className="clearLine"></div>
              ) : null}
              {this.state.showPop ? (
                <div className="advanced-search-pop">
                  <div>
                    <div>
                      <div className="certify-select">
                        <p>项目总级数</p>
                        <Select
                          defaultValue="3"
                        >
                          {[{ key: '1', val: '3' }, { key: '2', val: '4' }].map(item => {
                            return <Option key={item.key}>{item.val}</Option>
                          })}
                        </Select>
                      </div>

                      <CheckboxGroup
                        options={['包含为过账凭证']}
                        value={this.state.checkedList}
                        onChange={(checkedList) => {
                          this.setState({
                            checkedList: checkedList
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="btns-confirm">
                    <WhiteButton
                      onClick={() => {
                        this.setState({
                          showPop: false
                        });
                      }}
                    >
                      取消
                  </WhiteButton>
                    <PurpleButton
                      onClick={() => {
                        this.setState({
                          showPop: false
                        });
                      }}
                    >
                      确定
                  </PurpleButton>
                  </div>
                </div>
              ) : null}
            </WhiteButton>
          </div>
          <div className="btns-group">
            <WhiteButton>刷新</WhiteButton>
            <WhiteButton className="moreOpr"
              onClick={() => {
                this.setState({
                  showMoreOprItems: !this.state.showMoreOprItems
                });
                console.log();
              }}
            >
              更多
              <ul style={{ display: this.state.showMoreOprItems ? 'block' : 'none' }}>
                <li
                  value="1"
                  onClick={(e) => {
                    this.setState({
                      showMoreOprItemValue: e.target
                    });
                  }}
                >打印</li>
                <li
                  value="2"
                  onClick={(e) => {
                    this.setState({
                      showMoreOprItemValue: e.target
                    });
                  }}
                >导出</li>
              </ul>
            </WhiteButton>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={[]}
          pagination={false}
          bordered
        />
        {this.state.showModal}
      </div>
    )
  }
}

export default CashFlowTableMain;