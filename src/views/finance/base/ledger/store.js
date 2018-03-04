import { observable, action } from 'mobx'
import request from 'common/request.js'
import { message } from 'antd'

class LedgerStore {
  @observable pageControl; //页面控制
  @observable ledgerDetail;//详情页数据
  @observable ledgerMainTableData;//详情页数据
  @observable currentPageWithPagination;
  @observable accSystemNameTableDataSource // 核算体系数据
  @observable selectedItemForAccSystemName // 核算体系选中项
  @observable accOrg // 核算组织
  @observable selectedAccOrg // 核算组织选中项
  @observable accPolicy // 会计政策
  @observable subjectTableData // 科目表
  @observable selectSubjectTableData // 科目表选中项
  @observable certificateWordTableData // 默认凭证字
  @observable accCalendar // 
  @observable isShowLoading // 
  @observable tableTotal // 
  @observable selectedCalenderArr
  @observable detailOfBooksID
  @observable pageCount
  @observable defaultBaseCurrency
  @observable defaultExchangeTypeWord
  @observable accElemTableID
  @observable currPageConfig

  constructor() {
    this.isShowLoading = false
    this.pageControl = "ledgerMain"
    this.ledgerDetail = {}
    this.ledgerMainTableData = []
    this.currentPage = 1
    this.accSystemNameTableDataSource = []
    this.selectedAccSystem = []
    this.accOrg = []
    this.selectedAccOrg = []
    this.accPolicy = []
    this.subjectTableData = []
    this.selectSubjectTableData = {}
    this.certificateWordTableData = []
    this.accCalendar = []
    this.tableTotal = 0
    this.selectedCalenderArr = []
    this.detailOfBooksID = {}
    this.pageCount = 0
    this.defaultBaseCurrency = ''
    this.defaultExchangeTypeWord = ''
    this.currPageConfig = {}
  }

  @action changePageControl(page) {
    this.pageControl = page
  }
  @action getDetail(detail) {
    this.ledgerDetail = detail;
  }
  @action changePageWithPagination(page) {
    this.currentPageWithPagination = page
  }
  @action tip(text) {
    message.destroy()
    message.info(text)
  }
  @action changeLoadingStatu(bool) {
    this.isShowLoading = bool
  }
  @action getSelectedAccSystem(item) {
    this.selectedAccSystem = item
  }
  @action getSelectedAccOrg(item) {
    this.selectedAccOrg = item
  }
  @action getSelectedSubject(item) {
    this.selectSubjectTableData = item
  }
  @action fetchDefaultCertifyWord(arr, success) {
    for (let item of arr) {
      if (item.default) {
        this.setDefaultCertifyWordAndBaseCurrency(item)
        success && success(item)
        break
      }
    }
  }
  @action setDefaultCertifyWordAndBaseCurrency(item) {
    this.defaultBaseCurrency = item.currencyName
    this.defaultExchangeTypeWord = item.exchangeTypeID
  }
  @action clearDefaultCertifyWordAndBaseCurrency() {
    this.defaultBaseCurrency = ''
    this.defaultExchangeTypeWord = ''
  }
  @action matchExchangeRateById(id) {
    switch (id) {
      case 3001:
        return '固定汇率';
      case 3002:
        return '浮动汇率';
      case 3003:
        return '即期汇率';
      case 3004:
        return '基准汇率';
      case 3005:
        return '中间汇率';
      default:
        return '';
    }
  }
  @action getAccElemTableID(tid) {
    this.accElemTableID = tid
  }
  @action clearAccElemTableID(tid) {
    this.accElemTableID = ''
  }
  @action isExistDefaultAccPolicyOpr(accPolicies) {
    let isExist = false
    for (let i = 0; i < accPolicies.length; i++) {
      if (accPolicies[i].default) {
        isExist = true
        break
      }
      if (!isExist && i >= accPolicies.length - 1) {
        accPolicies[0].default = true
      }
    }
    return accPolicies
  }
  @action storageCurrPageConfig (payload) {
    this.currPageConfig = payload
  }

  // 查询总体数据
  @action QueryAccountBookList({ page, pageSize, booksName, success }) {
    this.changeLoadingStatu(true)
    request({
      url: 'fm/books/queryBooksList',
      method: 'GET',
      data: { page, pageSize, booksName },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.changeLoadingStatu(false)
        if (json.data) {
          this.tableTotal = json.total
          this.pageCount = json.pages
          this.ledgerMainTableData = json.data.map((item, index) => {
            item.key = index
            return item
          })
        }
        success && success(json)
      } else {
        this.changeLoadingStatu(false)
      }
    }).catch(error => {
      console.log(error);
    })
  }
  // 删除
  @action DeleteAccountBookItem(booksID, success) {
    request({
      url: 'fm/books/delBooks',
      method: 'GET',
      data: { booksIDs: booksID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.tip('删除成功')
        success && success()
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error);
    })
  }
  // 修改
  @action ModifyAccountBookItem(booksInfo, success) {
    request({
      url: 'fm/books/modBooks',
      method: 'POST',
      data: JSON.stringify(booksInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.detailOfBooksID = {}
        this.tip('修改成功')
        success && success()
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error);
    })
  }
  // 新增
  @action AddedAccountBookItem(booksInfo, success) {
    request({
      url: 'fm/books/addBooks',
      method: 'POST',
      data: JSON.stringify(booksInfo),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.detailOfBooksID = {}
        this.tip('新增成功')
        success && success(json.data.booksID)
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 查询账簿详情
  @action QueryBookDetail(booksID, success) {
    request({
      url: 'fm/books/getBooks',
      method: 'GET',
      data: { booksID: booksID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.detailOfBooksID = json.data
        success && success()
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 提交
  @action CommitBooks(booksIDArr, success) {
    request({
      url: 'fm/books/commitBooks',
      method: 'GET',
      data: { booksIDs: booksIDArr },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.tip('提交成功')
        success && success()
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 审核
  @action AuditAccBooksItem(booksIDs, auditFlag, auditReason, success) {
    request({
      url: 'fm/books/examineBooks',
      method: 'GET',
      data: {
        booksIDs: booksIDs,
        auditFlag: auditFlag,
        auditReason: auditReason
      },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        if (auditFlag - 1) {
          this.tip('审核不通过')
        } else {
          this.tip('审核已通过')
        }
        success && success()
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 通过 核算体系名称 获取账簿
  @action QueryAccountingSystemList({ accSystemName }) {
    request({
      url: '/fm/accountingSystem/queryAccountingSystemList',
      method: 'GET',
      data: { accSystemName },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (!(json.code * 1 === 1)) {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 撤回
  @action RefundBooks(booksIDs, success) {
    request({
      url: '/fm/books/refundBooks',
      method: 'GET',
      data: { booksIDs: booksIDs },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.tip('撤回成功')
        success && success()
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  //启用禁用
  @action ModBooksStatus(booksIDs, status, success) {
    request({
      url: '/fm/books/modBooksStatus',
      method: 'GET',
      data: { booksIDs: booksIDs, status: status },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        if (status - 1) {
          this.tip('禁用成功')
        } else {
          this.tip('启用成功')
        }
        success && success()
      } else {
        this.tip(json.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * 添加页面 核算体系 核算组织 科目表
   * */
  // 获取核算体系
  @action QueryAccountingSystem({ pageNum, pageSize, accSystemName }) {
    request({
      url: '/fm/accountingSystem/queryAccSystemListByOrgID',
      method: 'GET',
      data: { pageNum, pageSize, accSystemName },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.accSystemNameTableDataSource = json.data.map(function (item, index) {
          item.key = item.accSystemID
          return item
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 获取核算组织
  @action QueryAccountingSystemOrgBySystemID({ accSystemID, orgName }) {
    request({
      url: '/fm/books/queryAccountingSystemOrgBySystemID',
      method: 'GET',
      data: { accSystemID, orgName },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.accOrg = json.data.map(function (item, index) {
          item.key = item.accOrgID
          return item
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 获取会计政策
  @action QueryAccountingPolicyByOrgID({ accOrganizationID, booksID, success }) {
    request({
      url: '/fm/books/queryAccountingPolicyByOrgID',
      method: 'GET',
      data: { accOrganizationID, booksID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        let data = json.data.map(function (item, index) {
          item.key = item.index
          return item
        })
        this.accPolicy = this.isExistDefaultAccPolicyOpr(data)
        this.fetchDefaultCertifyWord(this.accPolicy, success)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 获取启用期间
  @action queryStartPeriodByAccPolicyID({ accPolicyID, success }) {
    request({
      url: '/fm/books/queryStartPeriodByAccPolicyID',
      method: 'GET',
      data: { accPolicyID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.accCalendar = json.data.map(function (item, index) {
          return item
        })
        success && success(this.accCalendar[0])
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 获取科目表
  @action GetSubjectData(searchContent, success) {
    request({
      url: '/fm/accountingCaption/getAccountCaptionTableList',
      method: 'GET',
      data: { searchContent: searchContent },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.subjectTableData = json.data.map(function (item, index) {
          item.key = item.accCaptionTableID
          return item
        })
        success && success(json)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  // 获取默认凭证字
  @action QueryValidateCertificateWord({ accCaptionTableID, success }) {
    request({
      url: '/fm/certificateWord/queryValidateCertificateWord',
      method: 'GET',
      data: { accCaptionTableID },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(json => {
      if (json.code * 1 === 1) {
        this.certificateWordTableData = json.data.map(function (item, index) {
          item.key = item.certificateWordID
          return item
        })
      }
      success && success()
    }).catch(error => {
      console.log(error)
    })
  }
}

export default new LedgerStore()