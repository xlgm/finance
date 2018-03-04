import { observable, action } from 'mobx'
import request from 'common/request.js'
import { message } from 'antd'

class CashFlowProjectStore {
  @observable pageControl
  @observable digestDetail
  @observable MainTableDataSource
  @observable digestMainDeleteMsg
  @observable currentPageWithPagination
  @observable abstractTypeList
  @observable abstractItemDetail
  @observable abstractTypeItemDetail
  @observable alertMsgFromUsrOpr
  @observable MainTableDataTotal
  @observable loaded
  @observable pageCount
  @observable currPageConfigAndQueryCondition
  @observable currAbstractType

  constructor() {
    this.pageControl = "DigestMain"
    this.digestDetail = null
    this.MainTableDataSource = []
    this.digestMainDeleteMsg = null
    this.currentPage = 1
    this.abstractTypeList = []
    this.abstractItemDetail = {}
    this.abstractTypeItemDetail = {}
    this.alertMsgFromUsrOpr = ''
    this.MainTableDataTotal = null
    this.loaded = false
    this.pageCount = 1
    this.currPageConfigAndQueryCondition = {}
    this.currAbstractType = {}
  }

  @action changeLoadedStatu(bool) {
    this.loaded = bool
  }
  @action changePageControl(page) {
    this.pageControl = page;
  }
  @action getDetail(detail) {
    this.digestDetail = detail
  }
  // 提示当前操作信息
  @action handleMainTableDataSource(unHandleArr) {
    let arr = []
    arr = unHandleArr.map((v, k) => {
      v.key = v.abstractID
      v.isMultiColumnSummary = (v.isMultiColumnSummary - 1 === 0 ? '是' : '否')
      v.abstractStatus  = (v.abstractStatus - 1005 === 0 ? '启用' : '禁用')
      return v
    })
    return arr
  }
  // 当前显示的页面
  @action changePageWithPagination(page) {
    this.currentPageWithPagination = page
  }
  // 获取当前选中摘要类别项的详情
  @action getAbstractTypeItemDetail(currentItemData) {
    this.currentPageWithPagination = currentItemData
  }
  // 提示信息
  @action setTip(text) {
    message.destroy()
    message.info(text)
  }
  // 保存当前pageNum, pageSize, 查询条件信息
  @action storagePageConfigAndQueryCondition(payload) {
    this.currPageConfigAndQueryCondition = {
      pageNum: payload.pageNum,
      pageSize: payload.pageSize, 
      abstractName: payload.abstractName,
      abstractTypeID: payload.abstractTypeID
    }
  }
  @action storageCurrAbstractType (payload) {
    this.currAbstractType = {
      abstractTypeID: payload.abstractTypeID,
      abstractTypeName: payload.abstractTypeName
    }
  }
  @action clearCurrAbstractType (payload) {
    this.currAbstractType = {}
  }

  // 查询摘要列表
  @action QueryAbstractList({ pageNum, pageSize, abstractName, abstractTypeID, success }) {
    this.changeLoadedStatu(false)
    this.MainTableDataSource = [];
    request({
      url: 'fm/abstractInfo/queryAbstractList',
      method: 'GET',
      data: { pageNum, pageSize, abstractName, abstractTypeID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.changeLoadedStatu(true)
        if (json.data) {
          this.MainTableDataSource = this.handleMainTableDataSource(json.data)
          this.MainTableDataTotal = json.total
          this.pageCount = json.pages
          success && success(json)
        } else {
          this.setTip(json.message)
        }
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 查询摘要详情
  @action GetAbstractDetail({ abstractID, success }) {
    request({
      url: 'fm/abstractInfo/getAbstract',
      method: 'GET',
      data: { abstractID: abstractID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.abstractItemDetail = json.data
        success && success()
      }
    }).catch(error => {
      console.warn(error)
    })
  }

  // 添加摘要列表
  @action AddAbstract(abstractInfo, success) {
    request({
      url: 'fm/abstractInfo/addAbstract',
      method: 'POST',
      data: JSON.stringify(abstractInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        success && success()
        this.setTip('添加成功')
      } else {
        this.setTip(json.message)
      }
    }).catch(error => {
      console.warn(error)
    })
  }
  // 查询摘要类别
  @action QueryAbstractTypeList() {
    request({
      url: 'fm/abstractType/queryAbstractTypeList',
      method: 'GET',
      data: {},
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.abstractTypeList = json.data
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 修改摘要列表
  @action ModAbstract(abstractInfo, success) {
    request({
      url: 'fm/abstractInfo/modAbstract',
      method: 'POST',
      data: JSON.stringify(abstractInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.setTip('修改成功')
        success && success()
      } else {
        this.setTip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 删除摘要列表
  @action DeleteAbstract(abstractIDArr, success) {
    request({
      url: 'fm/abstractInfo/delAbstract',
      method: 'GET',
      data: { abstractID: abstractIDArr },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.setTip('删除成功')
        success && success(json)
      } else {
        this.setTip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 启用禁用摘要列表项
  @action ModAbstractStatus(abstractIDArr, status, success) {
    request({
      url: 'fm/abstractInfo/modAbstractStatus',
      method: 'GET',
      data: { abstractID: abstractIDArr, status: status },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        if (status - 1) {
          this.setTip('禁用成功')
        } else {
          this.setTip('启用成功')
        }
        success && success()
      } else {
        this.setTip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 新增摘要类别
  @action AddAbstractType(abstractInfo, success) {
    request({
      url: 'fm/abstractType/addAbstractType',
      method: 'POST',
      data: JSON.stringify(abstractInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.setTip('添加成功')
        success && success()
      } else {
        this.setTip(json.message)
      }
      
    }).catch(error => {
      console.log(error)
    })
  }
  // 删除摘要类别项
  @action DelAbstractTypeItem({ abstractTypeID, success }) {
    request({
      url: 'fm/abstractType/delAbstractType',
      method: 'GET',
      data: { abstractTypeID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.setTip('删除成功')
        success && success()
      } else {
        this.setTip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 查询摘要类别项详情 /abstractType/getAbstractType
  @action GetAbstractTypeItemDetail(abstractTypeID, success) {
    request({
      url: 'fm/abstractType/getAbstractType',
      method: 'GET',
      data: { abstractTypeID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.abstractTypeItemDetail = json.data
        success && success()
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 修改摘要类别项详情
  @action ModAbstractTypeItemDetail(abstractType, success) {
    request({
      url: 'fm/abstractType/modAbstractType',
      method: 'POST',
      data: JSON.stringify(abstractType),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.setTip('修改成功')
        success && success()
      } else {
        this.setTip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

export default new CashFlowProjectStore()