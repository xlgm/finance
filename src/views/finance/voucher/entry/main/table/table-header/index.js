import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {  Row, Col } from 'antd';

import './voucher-table-header.less';

@inject('voEntryStore') @observer
class TableHeader extends Component {
  
    constructor(props){
      super(props);

    }

    render(){
      return <thead className="voucher-table-header">
        <tr>
          <th className="col_operate"></th>
          <th className="col_index">序号</th>
          <th className="col_summary">摘要</th>
          <th className="col_subject">会计科目</th>
          <th className='col_currency'>币别</th>
          <th className="col_money">
            <div className="money_title">借方金额</div>
            <div className='money_unit'>
              <span>亿</span> 
              <span>千</span> 
              <span className="bai">百</span> 
              <span>十</span> 
              <span>万</span> 
              <span className="qian">千</span> 
              <span>百</span> 
              <span>十</span> 
              <span className="yuan">元</span> 
              <span>角</span> 
              <span className="last">分</span>
            </div>
          </th>
          <th className="col_money">
            <div className="money_title">贷方金额</div>
            <div className='money_unit'>
              <span>亿</span> 
              <span>千</span> 
              <span className="bai">百</span> 
              <span>十</span> 
              <span>万</span> 
              <span className="qian">千</span> 
              <span>百</span> 
              <span>十</span> 
              <span className="yuan">元</span> 
              <span>角</span> 
              <span className="last">分</span>
            </div>
          </th>
          {<th className='col_settlement'>结算方式</th>}
          {<th className='col_settlement_number'>结算号</th>}
        </tr>
      </thead>
    }
}

export default TableHeader;