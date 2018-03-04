import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class assignCashStore {
  @observable loading;
  @observable currPage;
  @observable advancedQueryBtnBorderBottomColor;
  @observable formAdvancedQueryDisplay;
  @observable topAdvancedQuery;
  @observable treeLevel;

  constructor() {
    this.loading = true;
    this.currPage = 'Main';
    this.treeLevel = 0;
  }

  @action switchPage(currPage) {
    this.currPage = currPage;
  }
}

export default new assignCashStore();