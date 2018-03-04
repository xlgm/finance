import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';
message.config({ top: 200, duration: 2 });


class cashFlowDefaultStore {


 

  constructor() {
    this.treeData = {
      "data": [
        {
          "id": "1",
          "name": "全部",
          "children": [
            {
              "id": "11",
              "name": "资产",
              "children": [
                {
                  "id": "101",
                  "name": "流动资产"
                },
                {
                  "id": "102",
                  "name": "非流动资产"
                }
              ]
            },
            {
              "id": "12",
              "name": "负债",
              "children": [
                {
                  "id": "103",
                  "name": "流动负债"
                },
                {
                  "id": "104",
                  "name": "非流动负债"
                }
              ]
            },
          ]
        }
      ],
    }
  }

}

export default new cashFlowDefaultStore();