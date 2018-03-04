import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class detailAccountStore {

  @observable accElementName
  @observable treeData

  constructor() {
    this.accElementName = ''
    this.treeData = {
      "data": [
        {
          "id": "1",
          "name": "2221 应交税费",
          "children": [
            {
              "id": "11",
              "name": "2221.01 应收增值",
              "children": [
                {
                  "id": "101",
                  "name": "2221.01.02 销项税额"
                },
                {
                  "id": "102",
                  "name": "2221.01.02 销项税额"
                }
              ]
            }
          ]
        },
        {
          "id": "2",
          "name": "2222 应交票据",
          "children": [
            {
              "id": "12",
              "name": "2222.01 不用等餐饮",
              "children": [
                {
                  "id": "103",
                  "name": "2222.01.02 产品部"
                },
                {
                  "id": "104",
                  "name": "2222.01.02 产品部"
                }
              ]
            }
          ]
        },
      ],
      "code": "1",
      "message": "操作成功!",
      "timestamp": 1508150599177
    }
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

export default new detailAccountStore();