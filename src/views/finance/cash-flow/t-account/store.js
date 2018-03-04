import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';
message.config({ top: 200, duration: 2 });

class tAccountStore {
  @observable loading;
  @observable currPage;
  @observable advancedQueryBtnBorderBottomColor;
  @observable formAdvancedQueryDisplay;
  @observable topAdvancedQuery;
  @observable treeLevel;
  @observable autoCompleteDataSource;

  constructor() {
    this.loading = true;
    this.currPage = 'Main';
    this.treeLevel = 0;
    this.autoCompleteDataSource = {
      titles: ['代码', '名称'],
      data: [
        {
          code: 'c192.168.1.1',
          name: '名称1'
        }, {
          code: 'c192.168.1.2',
          name: '名称2'
        }, {
          code: 'c192.168.1.3',
          name: '名称3'
        }
      ]
    }
  }

  @action switchPage(currPage) {
    this.currPage = currPage;
  }
}

export default new tAccountStore();