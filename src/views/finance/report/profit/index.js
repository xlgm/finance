import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Cascader, Select, Input, Checkbox, Dropdown, Menu, Tooltip } from 'antd';
import { WhiteButton } from 'components/Button.js';
import PromptBox from 'components/prompt-box';
import EditDialog from './edit-popups';
import './index.less'


@inject('profitReportStore') @observer
class ProfitReportContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      promptBox: '',
      editpop: '',
      section: '1',
      datalist: [
        {
          key: '1',
          project: '一、营业收入',
          line: '1',
          currentAmount: 11,
          accumulatedAmount: 22,
        }
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
    let textPrompt = "您有未设置报表项目的科目：6001  主营业务收入"
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

  onChangeSection = (value) => {
    this.setState({
      section: value
    })
  }


  //编辑
  editPopups = (param) => {
    this.setState({
      editpop:
      <EditDialog
        paramText={param}
        onCancel={() => {
          this.setState({
            editpop: ''
          })
        }}>
      </EditDialog>

    })
  }



  render() {
    let { profitReportStore } = this.props;


    //选择日期
    const date = [];
    const quarterDate = [];
    const dateChildren = [];
    const quarterChildren = [];
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


    for (let i = 1; i <= 4; i++) {
      quarterChildren.push({
        value: `第${i}季度`,
        label: `第${i}季度`,
      })
    }

    for (let i = 2008; i <= year; i++) {
      quarterDate.push({
        value: `${i}年`,
        label: `${i}年`,
        children: quarterChildren,
      })
    }

    let column = [
      {
        title: '项目',
        dataIndex: 'project',
        key: "project",
        width: '50%',
        render: (text, record) => {
          return <div className="edit-div" onClick={(e) => { this.editPopups.call(this, text) }}>
            <span className="edit-name">{text}  </span>
            <i className="iconfont icon-list_bianjieps" ></i>
          </div>
        }
      }, {
        title: '行次',
        dataIndex: 'line',
        key: "line",
        width: '10%'
      }, {
        title: '本期金额',
        dataIndex: 'currentAmount',
        key: "currentAmount",
        width: '20%',
        render: (text, record) => {
          return <div className="formula">
            <span className="formula-text">{text}  </span>
            <Tooltip placement="bottom" title="这里是一个公式的提示喔喔">
              <i className="iconfont icon-chakan"></i>
            </Tooltip>
          </div>
        }
      }, {
        title: '本年累计金额',
        dataIndex: 'accumulatedAmount',
        key: "accumulatedAmount",
        render: (text, record) => {
          return <div className="formula">
            <span className="formula-text">{text}  </span>
            <Tooltip placement="topLeft" title="这里是一个公式的提示喔喔">
              <i className="iconfont icon-chakan"></i>
            </Tooltip>
          </div>
        }
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
      <div className="profit-container">
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
            <span>币别</span>
            <Select defaultValue="1" placeholder="选择一个选项">
              <Select.Option value="1">人名币</Select.Option>
              <Select.Option value="2">综合本位币</Select.Option>
            </Select>
            <Select defaultValue={this.state.section} onChange={this.onChangeSection}>
              <Select.Option value="1">月报</Select.Option>
              <Select.Option value="2">季报</Select.Option>
            </Select>
            {this.state.section * 1 === 1 &&
              <Cascader
                options={date}
                style={{ width: 120, fontSize: 14, }}
                defaultValue={["2008年", "1期"]} />
            }
            {this.state.section * 1 === 2 &&
              <Cascader
                options={quarterDate}
                style={{ width: 150, fontSize: 14, }}
                defaultValue={["2008年", "第1季度"]} />
            }

            <Checkbox >包含未过账凭证</Checkbox>
          </div>
          <div className="button-div">
            <WhiteButton onClick={this.Refresh}>刷新</WhiteButton>
            <Dropdown overlay={menu} trigger={['click']}>
              <WhiteButton >更多</WhiteButton>
            </Dropdown>
          </div>
        </div>
        <div className="table-layout">
          <Table
            rowSelection={null}
            columns={column}
            bordered
            dataSource={this.state.datalist}
            pagination={false}
          >
          </Table>
        </div>
        {this.state.promptBox}
        {this.state.editpop}
      </div>
    )
  }
}

export default ProfitReportContainer;