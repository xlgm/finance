import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { message, Table, Tree, Input, Select, AutoComplete, Icon } from 'antd';
import Schedule from './main-table';

import './main.less';



@inject('cashFlowDefaultStore', 'appStore') @observer
class CashFlowDefaultContainer extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      pageNum: 1,
      pageSize: 10,
      haveSelectedTreeNodeExcludeLv1: false
    }
  }
  componentDidMount() {
    let { cashFlowDefaultStore } = this.props


  }

  componentWillUnmount() {
    // let {cashFlowDefaultStore} = this.props;
    // cashFlowDefaultStore.changePageControl('cashFlowDefaultMain');
  }

  render() {
    let { cashFlowDefaultStore } = this.props;
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;




    // 处理 树状 展示数据
    let treeData = []
    const TreeNode = Tree.TreeNode
    treeData = (cashFlowDefaultStore.treeData && cashFlowDefaultStore.treeData.data.map(tItem => {
      tItem.key = tItem.id;
      return tItem;
    }));
    // tree 组件 tree.node 生成函数
    const loop = (data) => data.map((item, index) => {
      if (item.children && item.children.length > 0) {
        return <TreeNode key={item.id} title={item.name}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode key={item.id} title={item.name} ></TreeNode>
    })
  
    


    return <div>
      <div className="subject-cash-header">

        <div className="subject-left">
          <span>科目表</span>
          <Select
            defaultValue='新会计准则科目表'
            style={{ marginLeft: 20, width: 200, fontSize: 14, }}
            onChange={(value) => {

            }} >
            <Option value='1'>新会计准则科目表</Option>
            <Option value='2'>小企业会计准则表</Option>
          </Select>
        </div>
        <div className="subject-right">
          <PurpleButton>保存</PurpleButton>
        </div>

      </div>
      <div className='subject-cash-table'>
        <div className='subject-table-left'>
          <Tree style={{ backgroundColor: '#fff' }}
            defaultExpandAll
          >
            {loop(treeData)}
          </Tree>
        </div>
        <div className='subject-table-right'>
          <Schedule></Schedule>
        </div>
      </div>

    </div>
  }

}

export default CashFlowDefaultContainer;