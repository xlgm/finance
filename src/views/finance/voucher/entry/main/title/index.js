import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './vocher-entry-title.less';

@inject('voEntryStore') @observer
class Title extends Component {
    constructor(props){
      super(props);
    }

    render(){
      return <div className='entry-title'>
          <h2>记账凭证</h2>
          <div className='entry-title-label'>
            <div className='has-cash-flow'>已指定现金流量</div>
            <div className='review-name'>张三</div>
            <div className='icon iconfont icon-pingzheng_yishenhe'></div>
            <div className='icon iconfont icon-pingzheng_yizuofei'></div>
          </div>
          
      </div>
    }
}

export default Title;