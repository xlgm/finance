import React, { Component } from 'react';
import logo from 'assets/images/keyboard_logo.png'
import './keyboard.less';

class Keyboard extends Component {

  render() {

    return ( 
      <div className="keyboard_com">
        <i className='icon iconfont icon-pingzheng_jianpan'></i>
        <div className="popup_keyboardOpr">
          <img src={logo} style={{width:400, height: 150}} alt="键盘"/>
          <div className="text">
            <h3>凭证分录</h3>
            <ul className="key_name">
              <li>"//"(小键盘)</li>  
              <li>".."(小键盘)</li>  
              <li>Enter(借贷方金额后)</li>  
              <li>=</li>  
              <li>空格键</li>  
            </ul>
            <ul>
              <li>复制第一条分录的摘要</li>  
              <li>复制上条分录的摘要</li>  
              <li>开始录入第二条分录</li>  
              <li>自动平衡借贷方金额</li>  
              <li>借贷方金额互换</li>  
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Keyboard;

