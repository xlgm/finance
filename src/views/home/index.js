/**
* @author
* @description 首页
* @date 2017-09-05
**/
import React from 'react';
import { GreenButton, RedButton } from 'components/Button';
import { inject, observer } from 'mobx-react';
import { Message } from 'element-react';
import Modal from 'components/modal'
import PrintExportModal from 'components/print-export-modal/index.js';//打印导出
import './home.less'

@inject('appStore') @observer
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: ''
    }
  }

  render() {
    let { appStore } = this.props;
    return <div className="home-page">
      <div className="home-pic">不用等餐饮管理系统2.0</div>
    </div>
  }

}

export default HomePage;