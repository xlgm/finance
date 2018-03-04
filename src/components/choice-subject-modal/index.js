import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Tabs, Tree, Alert } from 'antd';

import './index.less';
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode

/**
 * booksParam:账簿id【必填】
 * allParam:是否查询全部【不填则查询全部科目。损益类科目筛选/非损益类科目筛选】
*/
@inject('commonStore') @observer
class ChoiceSubjectModal extends Component {

  constructor(props) {
    super(props);
    let { booksParam, allParam } = this.props;
    this.state = {
      Keys: '',
      booksParam: booksParam ? booksParam : '',
      allParam: allParam ? allParam : 0,
      selectedName: '',
      selectedKeys: []
    }
  }


  componentWillMount() {
    console.log(this.state.booksParam, this.state.allParam);
  }

  handleSelectedBytree = (selectedKeys, e) => {
    if (e.selected) {
      this.setState({
        selectedName: e.selectedNodes[0].props.title,
        Keys: selectedKeys[0],
        selectedKeys: selectedKeys
      })
    } else {
      this.setState({
        selectedName: '',
        Keys: '',
        selectedKeys: []
      })
    }
  }


  //确定事件
  onOk = () => {
    if (this.state.selectedKeys.length > 0) {
      if (this.props.onOk) {
        this.props.onOk(this.state.selectedName, this.state.Keys);
      }
    }
  }

  onChange = (activeKey) => {
  }

  render() {
    let { onCancel, commonStore } = this.props;

    let loop = data => data.map((item) => {
      if (item.children && item.children.length > 0) {
        return <TreeNode key={item.id} title={item.name}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode key={item.id} title={item.name} />
    });



    return <Modal
      maskClosable={false}
      title="选择科目"
      wrapClassName="entry_subject_modal"
      visible={true}
      onOk={this.onOk}
      onCancel={onCancel}
    >

      <div className="show-div">
        {this.state.selectedKeys.length === 0 &&
          <Alert message="请选择科目"
            type="error"
          />
        }
      </div>
      <Tabs onChange={this.onChange}>
        {(() => {
          if (commonStore.tabName.length) {
            return commonStore.tabName.map((tabobj, i) => {
              return <TabPane tab={tabobj.name} key={i}>
              </TabPane>
            });
          }
        })()}
      </Tabs>
      <Tree
        showLine
        defaultExpandAll
        onSelect={this.handleSelectedBytree}
        selectedKeys={this.state.selectedKeys}
      >
        {loop(commonStore.termData)}
      </Tree>
    </Modal>
  }
}

export default ChoiceSubjectModal;