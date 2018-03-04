import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Col, Row} from 'antd';
import './index.less';
import UlTreeNode from '../row-TreeNode';

@inject('assignCashStore') @observer
class TreeTAcc extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    let { assignCashStore, typeName, amountDirect } = this.props;
    return (
      <div className="wrap-tree-schedulesAssign">
        <Row>
          <Col className="title" span={24}>
            <span>现金类科目</span>-    
            <span>借方</span>    
          </Col>
        </Row>
        <Row className="wrap-tree-thGroup">
          <Col span={8}>对方项目</Col>
          <Col span={4}>金额</Col>
          <Col span={8}>附表项目</Col>
          <Col className="noBorderRight" span={4}>已指定</Col>
        </Row>
        {this.props.children}
      </div>
    )
  }
}

export default TreeTAcc;