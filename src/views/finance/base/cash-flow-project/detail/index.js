import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton } from 'components/Button.js';
import { message, Input, Form, Select, Switch, Button, Tree, Tabs, Row, Col } from 'antd';
import './detail.less';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

@inject('cashFlowProjectStore') @observer
class CashFlowProjectAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accCaptionCode: '',//编码
      accCaptionName: '',//名称
      lendingDirectionName: '',//方向
      basicDescript: '',//描述
    }
  }



  render() {
    let { cashFlowProjectStore } = this.props
    const { getFieldDecorator } = this.props.form;

 
    // tree data
    let treeData = [];
    treeData = (cashFlowProjectStore.treeData && cashFlowProjectStore.treeData.data.map(tItem => {
      tItem.key = tItem.id;
      return tItem;
    }));
    // treeNode
    const TreeNode = Tree.TreeNode
    const loop = data => data.map((item) => {
      if (item.children && item.children.length > 0) {
        return <TreeNode key={item.id} title={item.name}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode key={item.id} title={item.name} />
    });


    return (
      <div className='cashFlowProject-detail'>
        <div className="cashFlowProject-detail-header">
          <WhiteButton onClick={() => {
            cashFlowProjectStore.switchPage('CashFlowProjectMain')
          }}>返回</WhiteButton>
        </div>
        <Tabs defaultActiveKey="1" onChange={(key) => { console.log(key) }}>
          <TabPane tab="基本信息" key="1">
            <div className="cashFlowProject-detail-tree">
              <Tree
                defaultExpandAll
                onSelect={this.handleSelectedBytree}
              >
                  {loop(treeData)}
              </Tree>
            </div>
            <div className="cashFlowProject-detail-content">
              <Row>
                <Col span={4}>项目类别</Col>
                <Col span={8}>
                  <Input
                    value={cashFlowProjectStore.treeDataChildren}
                    style={{ width: 200, height: 30 }}
                    size="small"
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}>上级项目</Col>
                <Col span={8}>
                  <Input
                    value={cashFlowProjectStore.treeDataChildren}
                    style={{ width: 200, height: 30 }}
                    size="small"
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}><span style={{ color: 'red' }}>*</span>编码</Col>
                <Col span={12}>
                  <span>C01.01</span>
                  <Input
                    style={{ width: 157, height: 30 }}
                    size="small"
                    value={this.state.accCaptionCode}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}><span style={{ color: 'red' }}>*</span>名称</Col>
                <Col span={8}>
                  <Input
                    style={{ width: 200, height: 30 }}
                    size="small"
                    value={this.state.accCaptionName}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}><span style={{ color: 'red' }}>*</span>方向</Col>
                <Col span={8}>
                  <Select
                    style={{ width: 200 }}
                    value={this.state.lendingDirectionName}
                    disabled
                  >
                    <Option value="1">现金流入/增加</Option>
                    <Option value="2">现金流出/减少</Option>
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col span={4}><span style={{ color: 'white' }}>*</span>描述</Col>
                <Col span={16}>
                  <Input
                    style={{ width: 478, height: 100 }}
                    type="textarea"
                    value={this.state.basicDescript}
                    disabled
                  />
                </Col>
              </Row>
            </div>
            <div className="clear"></div>
          </TabPane>
          <TabPane tab="操作记录" key="2"></TabPane>
        </Tabs>
      </div>
    )
  }
}

const CashFlowProjectAddContainer = Form.create()(CashFlowProjectAdd);
export default CashFlowProjectAddContainer;