import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';

@inject('voEntryStore') @observer
class Footer extends Component {
  
    constructor(props){
      super(props);
    }

    render(){
      return <div className='entry-footer'>
        <Row>
          <Col span={6}>
            <span>制单人：</span>
            <span>操作用户</span>
          </Col>
          <Col span={6}>
            <span>审核人：</span>
            <span>操作用户</span>
          </Col>
          <Col span={6}>
            <span>过账：</span>
            <span>操作用户</span>
          </Col>
          <Col span={6}>
            <span>出纳：</span>
            <span>操作用户</span>
          </Col>
        </Row>
         
      </div>
    }
}

export default Footer;