import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class dimDetailAccountStore {

  @observable treeData

  constructor() {

    this.treeData = {
      "data": [
        {
          "id": "1",
          "name": "0001   不用等餐饮集团",
          "children": [{
            "id": "11",
            "name": "",
          }]
        },
        {
          "id": "2",
          "name": "0002   拓润计算机有限公司",
          "children": [{
            "id": "12",
            "name": "",
          }]
        },
        {
          "id": "3",
          "name": "0003   易酷计算机有限公司",
          "children": [{
            "id": "13",
            "name": "",
          }]
        },
      ],
    }
  }


 

}

export default new dimDetailAccountStore();