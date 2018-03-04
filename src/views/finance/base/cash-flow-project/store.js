import { observable, action } from 'mobx'
import request from 'common/request.js'
import { message } from 'antd'

class cashFlowProjectStore {
  @observable showPage
  @observable isLoading
  @observable mainTableData
  @observable treeData

  @observable treeDataChildren

  constructor() {
    this.showPage = "CashFlowProjectMain"
    this.isLoading = false
    this.mainTableData = {
      "pageNum": 1,
      "pageSize": 10,
      "total": 6,
      "pages": 1,
      "data": [
        {
          "id": 1,
          "code": "CI01.01",
          "name": "现金流入",
          "type": "主表项目",
          "direction": "现金流入/增加",
          "state": "启用"
        },
        {
          "id": 2,
          "code": "CI01.02",
          "name": "现金流出",
          "type": "主表项目",
          "direction": "现金流出/增加",
          "state": "启用"
        },
        {
          "id": 3,
          "code": "CI01.03",
          "name": "现金流入",
          "type": "主表项目",
          "direction": "现金流入/减少",
          "state": "启用"
        },
        {
          "id": 4,
          "code": "CI01.01",
          "name": "现金流入",
          "type": "主表项目",
          "direction": "现金流入/增加",
          "state": "启用"
        },
        {
          "id": 5,
          "code": "CI01.02",
          "name": "现金流出",
          "type": "主表项目",
          "direction": "现金流出/增加",
          "state": "启用"
        },
        {
          "id": 6,
          "code": "CI01.03",
          "name": "现金流入",
          "type": "主表项目",
          "direction": "现金流入/减少",
          "state": "启用"
        }

      ],
    }

    this.treeDataChildren = ''
    this.treeData = {
      "data": [
        {
          "id": "1",
          "name": "新会计准则现金流量项目表（PRE01）",
          "children": [
            {
              "id": "11",
              "name": "经营活动产生的现金流量(CI01)",
              "children": [
                {
                  "id": "101",
                  "name": "现金流入(CI02.01)"
                },
                {
                  "id": "102",
                  "name": "现金流出(CI02.01)"
                }
              ]
            },
            {
              "id": "12",
              "name": "投资活动产生的现金流量(CI02)",
              "children": [
                {
                  "id": "103",
                  "name": "现金流入(CI02.01)"
                },
                {
                  "id": "104",
                  "name": "现金流出(CI02.01)"
                }
              ]
            },
          ]
        }
      ],
    }
  }
  // data opr
  @action changeLoadingState(bool) {
    this.isLoading = bool
  }
  @action switchPage(page) {
    this.showPage = page;
  }
  

  
}

export default new cashFlowProjectStore()