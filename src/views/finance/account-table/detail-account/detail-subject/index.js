import React from 'react';
import { Modal, Table, Tabs } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import { isInArray } from 'common/utils'

const TabPane = Tabs.TabPane;
message.config({
  top: 200,
  duration: 2,
});

@inject('detailAccountStore') @observer
class Subject extends React.Component {

  constructor(props) {
    super(props);

    

    this.state = {
      selectedRowKeys: '',
      selectedRows: [],
      // activeKey: ind,
      // panes,
    }
    
    
  }
  // onChange = (activeKey) => {
  //   this.setState({ activeKey });
  // }
  componentDidMount() {
    let { detailAccountStore } = this.props;
    // parameterStore.queryCurrency({
    //   pageNum: 1,
    //   pageSize: 1000,
    //   status: 1005,
    // })
  }

  render() {
    let { onCancel, onOk, detailAccountStore, currencyIDs } = this.props;
    
    // let ind = parameterStore.currencyList.map((item, index) =>{
    //   return index+1
    // })
    let panes = [
      {
        key: 1,
        subject: '资产'
      },{
        key: 2,
        subject: '负债'
      },{
        key: 3,
        subject: '权益'
      },{
        key: 4,
        subject: '成本'
      },{
        key: 5,
        subject: '损益'
      }
    ];
    // panes = parameterStore.currencyList.map((item, index) =>{
    //   return item
    // })


    return (
      <Modal
        title="选择科目"
        visible={true}
        width={500}
        height={400}
        footer={null}
        maskClosable={false}
        wrapClassName='detail-account-subject'
        onCancel={() => {
          onCancel && onCancel();
        }}
      >
        <div className="detail-account-subject-table">
          <Tabs
            // onChange={this.onChange}
            // activeKey={this.state.activeKey}
          >
            {panes.map(pane => <TabPane tab={pane.subject} key={pane.key}>{pane.subject}</TabPane>)}
          </Tabs>

        </div>
        <div className="detail-account-subject-buttons">
          <WhiteButton onClick={() => {
            onCancel && onCancel();
          }}>取消</WhiteButton>
          <PurpleButton onClick={() => {

          }}>确定</PurpleButton>
        </div>
        {this.state.loading}
      </Modal>
    )
  }
}

export default Subject;