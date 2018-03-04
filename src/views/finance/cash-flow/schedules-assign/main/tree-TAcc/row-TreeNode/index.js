import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Col, Row, Icon, Input, Table} from 'antd';
import ModalCashFlowProject from '../modal-cashFlowProject';
import './index.less';

const Search=Input.Search;

@inject('assignCashStore') @observer
class TreeNodeTAcc extends Component {

  constructor(props) {
    super(props);
    this.state= {
      showModal: '',
      showTable: false
    }
  }
  onSearch = () => {
    this.setState({
      showTable: false,
      showModal: (
        <ModalCashFlowProject 
          onOk={() => {
            this.setState({
              showModal: ''
            });
          }}  
          onCancel={() => {
            this.setState({
              showModal: ''
            });
          }}
        />
      )
    });
  }
  render() {
    let { assignCashStore, typeName, amount, mainSubject, assign, marginLeft } = this.props;
    let columns = [
      {
        title: '代码',
        dataIndex: 'code',
        index: 'code'
      }, {
        title: '名称',
        dataIndex: 'name',
        index: 'name'
      }
    ]
    return (
      <Row className="row-schedulesAssign" style={{marginLeft: marginLeft}}>
        <Col span={8}>
          {typeName}
        </Col>
        <Col span={4}>
          {amount}
        </Col>
        <Col span={8}>
          <Search
            onSearch = {this.onSearch}
            onClick = {() => {
              this.setState({
                showTable: true
              });
            }}
            onChange={(e) => {
              this.setState({
                searchValue: e.target.value
              });
            }}
            onBlur = {() => {
              setTimeout(() => {
                this.setState({
                  showTable: false
                });
              }, 200);
            }}
            value = {this.state.searchValue}
          />
          {this.state.showTable ? <Table
            dataSource={[{code: 1, name: '123'}, {code: 2, name: '112233'}]}
            bordered
            columns={columns}
            pagination={false}
            onRowClick={(record) => {
              this.setState({
                searchValue: record.name,
                showTable: false
              });
            }}
          /> : null}
        </Col>
        <Col className="noBorderRight" span={4}>
          {assign ? <Icon type="check"/> : null}
        </Col>
        {this.state.showModal}
      </Row>
    )
  }
}

export default TreeNodeTAcc;