import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';
import MoneyUnit from './money'
import Digest from './digest';
import Subject from './subject';
import Currency from './currency';
import Settlement from './settlement';
import SettlementNum from './settlement-num';

import './voucher-table-row.less';

@inject('voEntryStore') @observer
class TableRow extends Component {

    constructor(props){

      super(props);

    }

    //行添加事件
    addRow = (rows)=>{

    }

    //行删除事件
    deleteRow = (rows) =>{

    }

    render(){
      let { rows } = this.props;

      return <tr className='entry-table-row'>
        <td className="col_operate">
          <Icon type="plus-circle" onClick={()=>{
            this.addRow(rows)
          }}/>
          <Icon type="close-circle" onClick={()=>{
            this.deleteRow(rows)
          }}/>
        </td>
        <td className="col_index">{ rows }</td>
        <td className="col_summary">
          <Digest rows={ rows }/>
        </td>
        <td className="col_subject">
          <Subject rows={ rows }/>
        </td>
        <td className='col_currency'>
          <Currency rows={ rows } hasCurrency={true}/>
        </td>
        <td className="col_money">
          <MoneyUnit rows={ rows } type="jie"/>
        </td>
        <td className="col_money">
          <MoneyUnit rows={ rows } type="dai"/>
        </td>
        <td className='col_settlement'>
          <Settlement hasSettlement={true}/>
        </td>
        <td className='col_settlement_number'>
          <SettlementNum hasNum={ true }/>
        </td>
      </tr>
    }
}

export default TableRow;