import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class tableCashStore {
  @observable currPage;

  constructor() {
    this.currPage = 'main';
  }
 
  @action switchPage(pageName) {
    this.currPage = pageName;
  }
}

export default new tableCashStore();