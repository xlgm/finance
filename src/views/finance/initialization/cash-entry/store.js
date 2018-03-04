import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class cashEntryStore {

  @observable pageControl; //页面控制

  constructor() {
    this.pageControl = "PolicyMain";
  }

  @action changePageControl(parameter) {
    this.pageControl = parameter;
  }


 

}

export default new cashEntryStore();