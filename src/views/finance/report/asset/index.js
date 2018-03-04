import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Cascader, Select, Input, Checkbox, Dropdown, Menu } from 'antd';
import { WhiteButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import AssetLayoutContainer from './asset-layout';
import LiabilitiesContainer from './liabilities-layout';
import './index.less'


@inject('assetReportStore') @observer
class AssetReportContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      promptBox: '',
      datalist: [
      ]
    } 
  }

  componentWillUnmount() {
  }


  /**
   * 打印导出
  */
  handleCommand = ({ key }) => {

  }

  onChangeSelect = (value) => {
    let textPrompt="资产负债表不平，请检查账务处理、报表项目公式设置。 您有未设置报表项目的科目：1122  应收账款"
    this.setState({
      promptBox:
      <PromptBox
        title="提示"
        promptLanguage={textPrompt}
        onCancel={() => {
          this.setState({ promptBox: '' })
        }}
        onOK={() => {
          this.setState({ promptBox: '' })
        }}>
      </PromptBox>
    })

  }


  render() {
    let { assetReportStore } = this.props;


    //选择日期
    const date = [];
    const dateChildren = [];
    let dateNow = new Date;
    let year = dateNow.getFullYear();

    for (let i = 1; i <= 12; i++) {
      dateChildren.push({
        value: `${i}期`,
        label: `${i}期`,
      })
    }
    for (let i = 2008; i <= year; i++) {
      date.push({
        value: `${i}年`,
        label: `${i}年`,
        children: dateChildren,
      })
    }

    let column = [
      {
        title: '资产',
        dataIndex: 'assets',
        key: "assets",
        width: '50%',
      }, {
        title: '行次',
        dataIndex: 'line',
        key: "line",
        width: '10%'
      }, {
        title: '期末数',
        dataIndex: 'finalNumber',
        key: "finalNumber",
        width: '20%'
      }, {
        title: '年初数',
        dataIndex: 'yearBeginning',
        key: "yearBeginning"
      }
    ];


    let column2 = [
      , {
        title: '负债和所有者（或股东）权益',
        dataIndex: 'liabilities',
        key: "liabilities",
        width: '50%'
      }, {
        title: '行次',
        dataIndex: 'linec',
        key: "linec",
        width: '10%'
      }, {
        title: '期末数',
        dataIndex: 'finalNumberc',
        key: "finalNumberc",
        width: '20%'
      }, {
        title: '年初数',
        dataIndex: 'yearBeginningc',
        key: "yearBeginningc",
      }
    ];


    const menu = (
      <Menu onClick={this.handleCommand} style={{ textAlign: 'center' }}>
        <Menu.Item key="1">打印</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">导出</Menu.Item>
      </Menu>
    );
    return (
      <div className="asset-container">
        <div className="button-top">
          <div className="query-criteria">
            <span>账簿</span>
            <Select defaultValue="1" placeholder="选择一个选项" onChange={this.onChangeSelect}>
              <Select.Option value="1">不用等</Select.Option>
              <Select.Option value="2">拓润</Select.Option>
            </Select>
            <span>核算组织</span>
            <Input
              value="研发中心"
              disabled
              className="styleInput"
            />
            <span>会计期间</span>
            <Cascader
              options={date}
              style={{ width: 120, fontSize: 14, }}
              onChange={this.dateChange}
              defaultValue={["2008年", "1期"]} />
            <Checkbox >按科目方向调汇</Checkbox>
          </div>
          <div className="button-div">
            <WhiteButton onClick={this.Refresh}>刷新</WhiteButton>
            <Dropdown overlay={menu} trigger={['click']}>
              <WhiteButton >更多</WhiteButton>
            </Dropdown>
          </div>
        </div>
        <div className="table-layout">
          <div className="table-left">
            <Table
              rowSelection={null}
              columns={column}
              bordered
              dataSource={null}
              pagination={false}
              className="table-main"
            >
            </Table>
          </div>
          <div className="table-right">
            <Table
              rowSelection={null}
              columns={column2}
              bordered
              dataSource={null}
              pagination={false}
              className="table-main"
            >
            </Table>
          </div>
        </div>
        <div className="data-main">
          <div className="data-left">
            <AssetLayoutContainer />
          </div>
          <div className="data-right">
            <LiabilitiesContainer />
          </div>
        </div>
        {this.state.promptBox}
      </div>
    )
  }
}

export default AssetReportContainer;