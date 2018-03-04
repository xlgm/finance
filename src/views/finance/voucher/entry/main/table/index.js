import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TableHeader from './table-header';
import TableRow from './table-row';
import TableFooter from './table-footer';

import './vocher-entry-table.less';

@inject('voEntryStore') @observer
class VoucherTable extends Component {
    constructor(props){
      super(props);
    }

    render(){
      return <table className="voucher-entry-table">
         <TableHeader/>
         <tbody>
            <TableRow rows={1}/>
            <TableRow rows={2}/>
            <TableRow rows={3}/>
         </tbody>
         <TableFooter/>
      </table>
    }
}

export default VoucherTable;