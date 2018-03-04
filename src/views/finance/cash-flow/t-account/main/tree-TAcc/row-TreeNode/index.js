import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Row, Icon, Input, AutoComplete, Table } from 'antd';
import ModalCashFlowProject from '../modal-cashFlowProject';
import './index.less';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const Search = Input.Search;

@inject('tAccountStore') @observer
class TreeNodeTAcc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: '',
      showTable: false,
      searchContent: ''
    }
  }
  handleClickForSearchIcon = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
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
  handleSearchForAutoComplete = (value) => {
    let { tAccountStore } = this.props;
    console.log(value)
    // this.setState({
    //   searchContent: value
    // });
    // if (value === '芝麻开门') {
    //   tAccountStore.autoCompleteDataSource = ['芝麻开不了门'];
    // }
    // if (value === '1') {
    //   tAccountStore.autoCompleteDataSource = ['芝麻开不了门1', '芝麻开不了门2', '芝麻开不了门3'];
    // }
  }

  render() {
    let { tAccountStore, typeName, amount, mainSubject, assign, marginLeft } = this.props;
    // tAccountStore.autoCompleteDataSource
    //   <OptGroup
    //   key={group.title}
    //   label={
    //     <ul>
    //       <li></li>
    //       <li></li>
    //     </ul>
    //   }
    // >
    // </OptGroup>
    // const options = tAccountStore.autoCompleteDataSource.data.map(item => {
    //   return (
    //     <Option key={item.code} value={item.code}>
    //       <ul>
    //         <li>{item.code}</li>
    //         <li>{item.name}</li>
    //       </ul>
    //     </Option>
    //   )
    // });
    // console.log(options, 'options');
    // const optionsGroup = [
    //   <OptGroup
    //     key={tAccountStore.autoCompleteDataSource.titles[0]}
    //     label={
    //       <ul>
    //         <li>{tAccountStore.autoCompleteDataSource.titles[0]}</li>
    //         <li>{tAccountStore.autoCompleteDataSource.titles[1]}</li>
    //       </ul>
    //     }
    //   >
    //     {[...options]}
    //   </OptGroup>
    // ]
    let columns = [
      {
        title: '代码',
        dataIndex: 'code',
        index: 'code',
        width: '50%'
      }, {
        title: '名称',
        dataIndex: 'name',
        index: 'name',
        width: '50%'
      }
    ]
    return (
      <Row className="row-TAcc" style={{ marginLeft: marginLeft }}>
        <Col span={10}>
          {typeName}
        </Col>
        <Col span={3}>
          {amount}
        </Col>
        <Col span={8}>
          <Search
            onSearch={this.onSearch}
            onBlur={() => {
              setTimeout(() => {
                this.setState({
                  showTable: false
                });
              }, 200);
            }}
            onChange={(e) => {
              this.setState({
                searchValue: e.target.value
              });
            }}
            onClick={() => {
              this.setState({
                showTable: true
              });
            }}
            value={this.state.searchValue}
          />
          {this.state.showTable ? <Table
            dataSource={[{ code: 1, name: '123' }, { code: 2, name: '112233' }]}
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
        <Col className="noBorderRight" span={3}>
          {assign ? <Icon type="check" /> : null}
        </Col>
        {this.state.showModal}
      </Row>
    )
  }
}

export default TreeNodeTAcc;