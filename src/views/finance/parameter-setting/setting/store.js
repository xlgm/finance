import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';
message.config({ top: 200, duration: 2 });

class parameterStore {

  @observable currencyList;//币别列表
  @observable accElementName

  constructor() {
    this.currencyList = [];
    this.accElementName = ''
  }

  //添加查询币别
  @action queryCurrency(data) {
    request({
      url: '/fm/merchantCurrencyInfo/query',
      method: 'GET',
      data: data,
    }).then(json => {

      if (json.code * 1 === 1) {
        this.currencyList = json.data.map((item) => {
          item.key = item.businessCurrencyID;
          return item;
        })
      }

    })
  }

  // 获取树形图 /fm/accountingCaption/getAccountingCaptionConditionList
  @action queryTreeData(accCaptionTableID, success) {
    request({
      url: '/fm/accountingCaption/getAccountingCaptionConditionList',
      method: 'GET',
      data: { accCaptionTableID: accCaptionTableID },
    }).then(json => {
      if (json.code - 1 === 0) {
        this.accElementName = json.data.map((item) => {
          return item;
        })
        success && success(this.accElementName)
      }
    })
  }

}

export default new parameterStore();