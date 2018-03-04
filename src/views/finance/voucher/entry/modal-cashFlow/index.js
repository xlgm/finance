import React, { Component } from 'react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import { Input, Table, Select, Spin, Icon } from 'antd';
import WrapModal from '../modal-wrap';
import Modal2MainSubject from './modal-mainSubject';
import './index.less';

const Option = Select.Option;
const Search = Input.Search;

class Modal4CashFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subModal: '',
      theadBaseCurrency: '0.00',
      oppositeSubjectVal: '',
      selectMockData: [{i: 1, v: '1'}, {i: 2, v: '1'}, {i: 3, v: '1'}],
      oppositeDropdownBlock: 'none',
    }
  }

  handleMainSubjectModal = () => {
    this.setState({
      subModal: (
        <Modal2MainSubject
          style={{width: '60%'}}
          onOk={(selectedRowKeys, selectedRows) => {
            this.setState({
              subModal: ''
            });
            console.log(selectedRowKeys, selectedRows, '00000');
          }}
          onCancel={() => {
            this.setState({
              subModal: ''
            });
          }}
        />
      )
    });
  }
  handleLlstsSubjectModal = () => {
    this.setState({
      subModal: (
        <Modal2MainSubject 
          onOk={(selectedRowKeys, selectedRows) => {
            this.setState({
              subModal: ''
            });
            console.log(selectedRowKeys, selectedRows, '00000');
          }}
          onCancel={() => {
            this.setState({
              subModal: ''
            });
          }}
        />
      )
    });
  }

  render() {
    let mockData_firColomn = [1, 2, 3, 4, 5]
    let {onOk, onCancel, style, title} = this.props;
    let columns_searchMainList = [{
      title: '代码',
      dataIndex: 'mainListCode'
    }, {
      title: '名称',
      dataIndex: 'mainListName'
    }];
    let columnsShow = [{
      title: '科目编码',
      dataIndex: 'code'
    }, {
      title: '科目名称',
      dataIndex: 'name'
    }, {
      title: '币别',
      dataIndex: 'currencyType'
    }, {
      title: '方向',
      dataIndex: 'direction'
    }, {
      title: '原币',
      dataIndex: 'originalCurrency'
    }, {
      title: '汇率',
      dataIndex: 'parties'
    }, {
      title: '本位币',
      dataIndex: 'baseCurrency'
    }];
    
    let columnsOpr = [{
      title: (
        <span>
          <i style={{color: 'red'}}>*</i>对方科目
        </span>
      ),
      dataIndex: 'oppositeSubject',
      width: '20%',
      render: (text, record, index) => {
        return (
          <div className="thead-oppositeSubject">
            <Select
              mode="combobox"
              value={this.state.oppositeSubjectVal}
              placeholder="Select users"
              notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={() => {}}
              onFocus={() => {
                this.setState({
                  oppositeDropdownBlock: 'none'
                });
              }}
              onChange={value => this.setState({oppositeSubjectVal: ''})}
              style={{ width: '100%' }}
            >
              {this.state.selectMockData.map(d => <Option key={d.i}>{d.v}</Option>)}
            </Select>
            <div className="iconContainer" onClick={() => {
              this.setState({
                oppositeDropdownBlock: 'block'
              });
            }}>
              <Icon type="caret-down" />
            </div>
          </div>
        )
      }
    }, {
      title: (
        <span>
          <i style={{color: 'red'}}>*</i>主表项目
        </span>
      ),
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => {
        return (
          <div className="thead-mainSubject">
            <Select
              mode="combobox"
              value={this.state.oppositeSubjectVal}
              filterOption={false}
              onSearch={() => {}}
              onChange={value => this.setState({oppositeSubjectVal: ''})}
              style={{ width: '100%' }}
            >
              {this.state.selectMockData.map(d => <Option key={d.i}>{d.v}</Option>)}
            </Select>
            <div className="iconContainer" onClick={() => {this.handleMainSubjectModal()}}>
              <Icon type="search" />
            </div>
          </div>
        )
      }
    }, {
      title: '附表项目',
      dataIndex: 'Llsts',
      width: '20%',
      render: (text, record, index) => {
        return (
          <div className="thead-Llsts">
            <Select
              mode="combobox"
              value={this.state.oppositeSubjectVal}
              filterOption={false}
              onSearch={() => {}}
              onChange={value => this.setState({oppositeSubjectVal: ''})}
              style={{ width: '100%' }}
            >
              {this.state.selectMockData.map(d => <Option key={d.i}>{d.v}</Option>)}
            </Select>
            <div className="iconContainer" onClick={() => {this.handleLlstsSubjectModal()}}>
              <Icon type="search" />
            </div>
          </div>
        )
      }
    }, {
      title: '原币',
      dataIndex: 'originalCurrency',
      width: '10%',
      render: (text, record, index) => {
        return (
          <Input
            className="thead-originalCurrency"
          />
        )
      }
    }, {
      title: '汇率',
      dataIndex: 'parties',
      width: '10%',
      render: (text, record, index) => {
        return (
          <Input
            className="thead-parties"
            value="1.01"
          />
        )
      }
    }, {
      title: '本位币',
      dataIndex: 'baseCurrency',
      width: '10%',
      render: (text, record, index) => {
        return (
          <Input
            className="thead-baseCurrency"
            value={this.state.theadBaseCurrency}
          />
        )
      }
    }];
    return (
      <WrapModal
        title="现金流量项目指定"
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        width={'80%'}
      >
        <div className="vt-modal2CashFlow">
          <div className="vt-modal2CashFlow-accBook">
            <span>账簿</span>
            <Input className="title" disabled/>
          </div>
          <div className="vt-modal2CashFlow-table">
            <h3>现金科目列表</h3>
            <Table
              className="table-show"
              columns={columnsShow}
              dataSource={[]}
              size="middle"
              bordered
            />
            <div className="table-add">
              <Table
                className="table-add"
                columns={columnsOpr}
                dataSource={[{
                  code: [{
                    id: 1,
                    value: 'a'
                  }, {
                    id: 2,
                    value: 'b'
                  }],
                  name: '',
                  currencyType: '',
                  direction: '',
                  originalCurrency: '',
                  parties: '',
                  baseCurrency: ''
                }]}
                size="middle"
                bordered
                pagination={false}
              />
              <ul className="ul-opposite-dropdown" style={{display: this.state.oppositeDropdownBlock}}>
                {[{id: 1, value: '1'}, {id: 2, value: '2'}, {id: 3, value: '2'}, {id: 4, value: '2'}, {id: 5, value: '2'}].map((textItem, index) => {
                  return <li onClick={() => {
                    this.setState({
                      oppositeDropdownBlock: 'none'
                    });
                  }} key={textItem.id} value={textItem.value}>{textItem.value}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="btnGroup-addCashFlowOpr">
          <WhiteButton>流量检查</WhiteButton>
          <WhiteButton>删除流量</WhiteButton>
          <WhiteButton>自动指定</WhiteButton>
          <WhiteButton>取消</WhiteButton>
          <WhiteButton>确定</WhiteButton>
        </div>
        {this.state.subModal}
      </WrapModal>
    )
  }
}

export default Modal4CashFlow;