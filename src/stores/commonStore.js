import { observable, action } from 'mobx';
import request from 'common/request.js';

class commonStore {
  @observable termData;
  @observable tabName;
  constructor() {
    this.termData = [
      {  
        "id": "1",
        "name": "库存现金",
        "children": [
          {
            "id": "110",
            "name": "嘻嘻1",
            "children": [
              {
                "id": "111",
                "name": "嘻嘻哈哈1",
                "children": [
                  {
                    "id": "1111",
                    "name": "嘻嘻啦啦啦啦啦1"
                  },
                  {
                    "id": "11112",
                    "name": "嘻嘻啦啦啦啦啦2"
                  }
                ]
              },
              {
                "id": "112",
                "name": "嘻嘻哈哈2"
              }
            ]
          },
          {
            "id": "2",
            "name": "嘻嘻2"
          }
        ] 
      } 
    ];

    this.tabName=[
      {
        id:"1",
        name:'资产'
      },
      {
        id:"2",
        name:'负债'
      }
    ];
  }

  


}

export default new commonStore();
