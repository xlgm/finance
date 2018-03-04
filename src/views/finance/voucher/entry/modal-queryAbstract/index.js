import React, { Component } from 'react';
import { Input } from 'antd';
import { PurpleButton } from 'components/Button.js';
import ModalWrap from '../modal-wrap';
import './index.less';

class QueryAbstract extends Component {
  render() {
    let {onOk, onCancel, title, style} = this.props;
    return (
      <ModalWrap      
        title='凭证摘要库'
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
        style={{...style}}
      >
        <div className="wrap-queryAbstract">
          <div className="wrap-queryAbstract-header">
            <Input placeholder="请输入摘要内容"/>
            <PurpleButton>查询</PurpleButton>
          </div>  
          <div className="wrap-queryAbstract-content">
            <h3>摘要内容</h3>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
              <li>6</li>
            </ul>
          </div>  
        </div>
      </ModalWrap>
    )
  }
}

export default QueryAbstract;