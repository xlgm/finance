import React, { Component } from 'react';
import { Modal, Tabs, Tree} from 'antd';
import './index.less';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

class ModalSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        { title: 'Tree Node', key: '2', isLeaf: true },
      ]
    }
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }
  render() {
    let {onOk, onCancel, title, width} = this.props;
    return (
      <Modal
        width={width}
        wrapClassName="cf-modalSubject"
        title={title}
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Tabs defaultActiveKey="1" onChange={(a, b, c) => {
            console.log(a, b, c);
          }}
        >
          <TabPane tab="Tab 1" key="1">  
          </TabPane>
          <TabPane tab="Tab 2" key="2">
          </TabPane>
          <TabPane tab="Tab 3" key="3">
          </TabPane>
        </Tabs>
        <Tree loadData={this.onLoadData}>
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      </Modal>
    )
  }
}

export default ModalSubject;