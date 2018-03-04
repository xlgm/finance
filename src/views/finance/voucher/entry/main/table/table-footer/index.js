import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './voucher-table-footer.less';

@inject('voEntryStore') @observer
class TableFooter extends Component {
    constructor(props){
      super(props);
    }

    render(){
      return <tfoot className='entry-table-footer'>
        <tr>
          <td className="col_operate"></td>
          <td colSpan={4}>Sum</td>
          <td>$180</td>
          <td>Sum</td>
          <td></td>
          <td></td>
        </tr>  
      </tfoot>
    }
}

export default TableFooter;