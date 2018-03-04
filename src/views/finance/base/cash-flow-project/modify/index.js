import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js';
import { message, Input, Form, Select, Switch, Button, Tree, Tabs, Row, Col } from 'antd';
import './modify.less';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

@inject('cashFlowProjectStore') @observer
class CashFlowProjectModify extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accCaptionCode: '',//编码
      accCaptionName: '',//名称
      lendingDirectionName: '',//方向
      basicDescript: '',//描述
    }
  }

  handleSubmit = (e) => {
    let  isaccCaptionName, islendingDirectionName;



      if (this.state.accCaptionName) {
        isaccCaptionName = true;

        if (this.state.lendingDirectionName) {
          islendingDirectionName = true;
        } else {
          islendingDirectionName = false;
          message.destroy();
          message.info('请选择借贷方向');
        }
      } else {
        isaccCaptionName = false;
        message.destroy();
        message.info('请输入名称');
      }
     



    if (isaccCaptionName && islendingDirectionName) {
      message.destroy();
      message.info('输入正确');
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
      <div className='cashFlowProject-modify'>
        <div className="cashFlowProject-modify-header">
          <WhiteButton onClick={() => {
            cashFlowProjectStore.switchPage('CashFlowProjectMain')
          }}>返回</WhiteButton>
          <PurpleButton onClick={(e) => {
            this.handleSubmit(e)
          }}>保存</PurpleButton>
        </div>
        <Tabs defaultActiveKey="1" onChange={(key) => { }}>
          <Tabs.TabPane tab="基本信息" key="1">
            <div className="cashFlowProject-modify-tree">
              <Tree
                defaultExpandAll
                onSelect={this.handleSelectedBytree}
              >
                {loop(treeData)}
              </Tree>
            </div>
            <div className="cashFlowProject-modify-content">
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
                    onChange={(event) => {
                      if (event.target.value.length < 21 && /^[\u4E00-\u9FA5A-Za-z0-9]*$/.test(event.target.value)) {
                        this.setState({ accCaptionName: event.target.value })
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={4}><span style={{ color: 'red' }}>*</span>方向</Col>
                <Col span={8}>
                  <Select
                    style={{ width: 200 }}
                    value={this.state.lendingDirectionName}
                    onSelect={(value) => {
                      this.setState({ lendingDirectionName: value });
                    }}
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
                    onChange={(event) => {
                      if (event.target.value.length <= 200) {
                        this.setState({ basicDescript: event.target.value })
                      }
                    }}
                  />
                </Col>
              </Row>
            </div>
            <div className="clear"></div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="操作记录" key="2"></Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

const CashFlowProjectModifyContainer = Form.create()(CashFlowProjectModify);
export default CashFlowProjectModifyContainer;