import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { WhiteButton } from 'components/Button.js';
import { Select, Table } from 'antd';
import Loading from 'components/loading';
import './posting.less';

const Option = Select.Option;
@inject('voPostingStore')@observer
class VoPostingContainer extends Component {

  constructor(props) {
    super(props);

  }

 
  render() {
    let { voPostingStore } = this.props;
    
    const postingColums = [
      {
        title: '账簿',
        dataIndex: 'ledger',
        width: '25%',
      },
      {
        title: '账簿类型',
        dataIndex: 'ledgerType',
        width: '25%',
      }, 
      {
        title: '当前会计时间',
        dataIndex: 'time', 
        width: '10%',
      },
      {
        title: '过账范围',
        dataIndex: 'range',
        width: '20%',
      }, 
      {
        title: '指定日期',
        dataIndex: 'date'
      }
    ]
    const postingData = [
      {
        key: 1,
        ledger: '001',
        ledgerType: '拓润',
        time: '2017/09/12',
        range: '指定日期的凭证',
        date: '当前结构'
      },
      {
        key: 2,
        ledger: '002',
        ledgerType: '现金日记账',
        time: '2017/08/08',
        range: '指定日期的凭证',
        date: '当前结构'
      },
      {
        key: 3,
        ledger: '003',
        ledgerType: '现金日记账',
        time: '2017/08/08',
        range: '指定日期的凭证',
        date: '当前结构'
      }
    ]

    const operateColums = [
      {
        title: '账簿',
        dataIndex: 'ledger',
        width: '10%',
      },
      {
        title: '凭证总数',
        dataIndex: 'count',
        width: '10%',
      }, 
      {
        title: '发生错误凭证数',
        dataIndex: 'failed', 
        width: '10%',
      },
      {
        title: '结果',
        dataIndex: 'result',
        width: '10%',
      }, 
      {
        title: '详细描述',
        dataIndex: 'description'
      }
    ]
    const operateData = [
      {
        key: 1,
        ledger:'001',
        count: '10',
        failed: '2',
        result: '过账终止',
        description: '未审核'
      }
    ]
   
    return <div 
      className="posting_main"
      style={{
        width: '100%',
        height: '100%'
      }}>
        <div className="btn_group">
          <WhiteButton className='btn'>刷新</WhiteButton>
          <WhiteButton className='btn'>过账</WhiteButton>
          <Select defaultValue="lucy" style={{ width: 200 }}>
            <Option value="jack">现金</Option>
            <Option value="lucy">现金日记账</Option>
          </Select>
        </div>
        <div className="leder_table">
          <Table
            rowSelection={{
              onChange: (selectedRowKeys)=>{
                this.setState({ selectedRowKeys });
              }
            }} 
            columns={postingColums}
            dataSource={postingData}
            bordered
            scroll={{ y: 162 }}
            pagination={false}
          />
        </div>
        <div className="operate_table">
            <div className="title">操作结果</div>
            <Table
              columns={operateColums}
              dataSource={operateData}
              bordered
              scroll={{ y: 162 }}
              pagination={false}
            />
        </div>
        
    </div>
  }
}

export default VoPostingContainer;