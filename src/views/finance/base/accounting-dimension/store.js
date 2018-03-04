import { observable, action } from 'mobx';
import request from 'common/request.js'
import { message } from 'antd';

class dimensionStore {
  @observable pageControl //页面控制
  @observable allList //展示列表
  @observable dedetail //明细数据
  @observable total
  @observable currencyDetail //详情页数据
  @observable isShowLoading
  @observable pageCount
  @observable detailById
  @observable currentPage //当前页

  constructor() {
    this.pageControl = "DimensionMain"
    this.allList = []
    this.currencyDetail = null
    this.isShowLoading = false
    this.pageCount = ''
    this.detailById = ''
    this.currentPage = {
      accountLatitudeName: '',
      pageNum: 1,
      pageSize: 10
    }
  }

  @action clearCurrentPage() {
    this.currentPage = {
      accountLatitudeName: '',
      pageNum: 1,
      pageSize: 10
    }
  }
  @action changeCurrentPage(currentPage) {
    this.currentPage = currentPage 
  }
  //显示动画
  @action showLoading() {
    this.isShowLoading = true;
  }

  //关闭加载页面
  @action closeLoading() {
    this.isShowLoading = false;
  }
  //控制显示的页面
  @action changePageControl(page) {
    this.pageControl = page;
  }
  @action alertMsg(text) {
    message.destroy()
    message.info(text)
  }

  //获取页面详情
  @action getDetail(detail) {
    let obj = detail;
    let target = {
      accLatituDedetailInfos: [],
      accountLatitudeID: '',
      isPreData: '',
      form: {
        accountLatitudeName: '',
        accountLatitudeDescr: '',
      },

    }

    let accLatituDedetailInfos = obj.accLatituDedetailInfos
    target.accLatituDedetailInfos = []
    if (accLatituDedetailInfos.length > 0) {
      target.accLatituDedetailInfos = accLatituDedetailInfos.map((item, index) => {
        let { accLatitudeDetailName, accLatitudeDetailDesc, accLatitudeDetailCode } = item
        return { accLatitudeDetailName, accLatitudeDetailDesc, accLatitudeDetailCode }
      })
    }
    target.isPreData = obj.isPreData;
    target.accountLatitudeID = obj.accountLatitudeID
    target.form.accountLatitudeName = obj.accountLatitudeName
    target.form.accountLatitudeDescr = obj.accountLatitudeDescr
    if (target.accountLatitudeID) {
      this.currencyDetail = target;
    }

  }
  // 查询列表详情
  @action account(data,success) {
    this.isShowLoading = true;
    request({
      url: '/fm/accountLatitude/query',
      method: 'GET',
      data: data,
    }).then(json => {
      if (json.code * 1 == 2) {
        success && success(json.data)
      }
      this.isShowLoading = false;
      this.allList = json.data.map((item) => {
        item.key = item.accountLatitudeID
        return item;
      })
      console.log(json)
      this.total = json.total
      this.pageCount = json.pages
    }).catch(() => {
      this.isShowLoading = false;
    })
  }
  //增加
  @action addkeep(name, descript, infos, success) {
    request({
      url: '/fm/accountLatitude/add',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        'accountLatitudeDescr': descript,
        'accountLatitudeName': name,
        'accLatituDedetailInfos': infos
      }),
    }).then(json => {
      if (json.code * 1 == 1) {
        success && success()
        this.alertMsg('添加成功')
      } else {
        this.alertMsg(json.message)
      }
      
    })
  }
  //删除表格数据
  @action accountdelete({ accountLatitudes, success }) {
    request({
      url: '/fm/accountLatitude/delete',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(accountLatitudes),
    }).then(json => {
      if (json.code * 1 === 1) {
        success && success(json.data)
        this.alertMsg('删除成功')
      } else {
        this.alertMsg(json.message)
      }
      
    })
  }
  //查询
  // @action accountselect(accountLatitudeName,pageNum,pageSize) {
  //     request({
  //       url: '/fm/accountLatitude/query',
  //       method: 'GET',
  //       data: { 
  //           "pageNum": pageNum,
  //           "pageSize": pageSize,
  //           "accountLatitudeName": accountLatitudeName,
  //           "random":new Date()
  //       }          
  //       ,
  //       }).then(json => {
  //         this.allList = json.data.map((item)=>{
  //           item.key = item.accountLatitudeID
  //           return item;
  //         })

  //   })
  // }
  //修改
  @action accountmodify({ basicName, basicDescript, accountLatitudeID, accLatituDedetailInfos, success }) {
    request({
      url: '/fm/accountLatitude/update',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        'accountLatitudeDescr': basicDescript,
        'accountLatitudeName': basicName,
        'accountLatitudeID': accountLatitudeID,
        'accLatituDedetailInfos': accLatituDedetailInfos
      }),
    }).then(json => {
      if (json.code * 1 === 1) {
        success && success();
        this.alertMsg('修改成功');
      } else {
        this.alertMsg(json.message)
      }
    })
  }

  //启用禁用
  @action modifystatus({ accLatitudeIDs, status, success }) {
    request({
      url: '/fm/accountLatitude/updateStatus',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: { accLatitudeIDs, status },
    }).then(json => {
      if (json.code * 1 === 1) {
        success && success();
        if (status === 1005) {
          this.alertMsg('启用成功');
        } else {
          this.alertMsg('禁用成功');
        }
      } else {
        this.alertMsg(json.message)
      } 
    })
  }


  @action modifyidedetail(dedetail) {

    this.dedetail = dedetail
  }
  // 查询列表项详情 GET /accountLatitude/findAccountLatitudeByID
  @action findAccountLatitudeByID(accountLatitudeID, success) {
    request({
      url: '/fm/accountLatitude/findAccountLatitudeByID',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { accountLatitudeID: accountLatitudeID },
    }).then(json => {
      if (json.code * 1 === 1) {
        this.detailById = json.data
        success && success();
      } else {
        this.alertMsg(json.message)
      }
    })
  }
}


export default new dimensionStore();