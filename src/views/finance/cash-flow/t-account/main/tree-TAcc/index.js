import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Tree, Modal, Pagination } from 'antd';
import TreeWrap from './tree-wrapTAcc';
import RowTreeNode from './row-TreeNode';
import './index.less';

const TreeNode = Tree.TreeNode;

@inject('tAccountStore') @observer
class TreeTAcc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cashFlowProjectModal: '',
      date: new Date()
    }
  }
  componentWillMount() {
    console.log(this.state.date, 'kkkkk')
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    let { tAccountStore } = this.props;
    let treeData = [
      {
        typeName: "项目名称1",
        amount: "金额",
        mainSubject: "主表项目",
        assign: "已指定",
        children: [
          {
            typeName: "项目名称1-1",
            amount: "金额",
            mainSubject: "主表项目",
            assign: "已指定",
            children: [
              {
                typeName: "项目名称1-2",
                amount: "金额",
                mainSubject: "主表项目",
                assign: "已指定",
                children: [
                  {
                    typeName: "项目名称1-2-1",
                    amount: "金额",
                    mainSubject: "主表项目",
                    assign: "已指定"
                  }, {
                    typeName: "项目名称1-2-2",
                    amount: "金额",
                    mainSubject: "主表项目",
                    assign: "已指定"
                  }
                ]
              }, {
                typeName: "项目名称1-3",
                amount: "金额",
                mainSubject: "主表项目",
                assign: "已指定"
              }
            ]
          }, {
            typeName: "项目名称1-2",
            amount: "金额",
            mainSubject: "主表项目",
            assign: "已指定"
          }
        ]
      }, {
        typeName: "项目名称2",
        amount: "金额",
        mainSubject: "主表项目",
        assign: "已指定"
      }, {
        typeName: "项目名称3",
        amount: "金额",
        mainSubject: "主表项目",
        assign: "已指定"
      }
    ]
    treeData.map(item => {
      return item.lv = 1;
    });
    const assignLv = function (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length > 0) {
          for (let j = 0; j < data[i].children.length; j++) {
            data[i].children[j].lv = (data[i].lv + 1);
          }
          assignLv(data[i].children);
        }
      }
    }
    assignLv(treeData);
    const loop = data => data.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode
            key={`${item.typeName}`}
            title={
              <RowTreeNode
                typeName={item.typeName}
                amount={item.amount}
                mainSubject={item.mainSubject}
                assign={item.assign}
                marginLeft={`${- 25 - (18 * (item.lv - 1))}px`}
              />
            }
          >
            {loop(item.children)}
          </TreeNode>
        );
      } else {
        return (
          <TreeNode
            key={`${item.typeName}`}
            title={
              <RowTreeNode
                typeName={item.typeName}
                amount={item.amount}
                mainSubject={item.mainSubject}
                assign={item.assign}
                marginLeft={`${- 25 - (18 * (item.lv - 1))}px`}
              />
            }
          />
        );
      }
    });
    return (
      <div className="treeWrap-container-tacc">
        <TreeWrap typeName="对方科目1" amountDirect="借方">
          <Tree
            className="tree-TAcc"
            checkable={false}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
            showLine
          >
            {loop(treeData)}
          </Tree>
        </TreeWrap>
        {this.state.cashFlowProjectModal}
      </div>
    )
  }
}

export default TreeTAcc;