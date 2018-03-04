import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';

class settlementStore {
  @observable pageControl; //页面控制
  @observable isShowLoading;//是否加载动画
  @observable methodinfoList;//列表list
  @observable temporaryPaging;
  @observable detailsObj; 
  @observable PlatformList;
  @observable ItemsList;
  @observable itemPaging;
  @observable paymentnameList;
  @observable currentPage;  //修改时当前页

  constructor() {
    this.pageControl = "SettlementMain";
    this.methodinfoList = [];
    this.temporaryPaging = {
      total: null,
      pages: null,
    };
    this.itemPaging = {
      total: null,
      pages: null,
    };
    this.detailsObj = null; 
    this.PlatformList = [];
    this.ItemsList = [];
    this.isShowLoading = false;
    this.paymentnameList = [];
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      accPolicyName: ''
    };
  }

  //控制显示的页面
  @action changePageControl(page) {
    this.pageControl = page;
  }

  @action SavedetailsObj(obj) {
    this.detailsObj = obj;
  }

  


  @action clearCurrentPage() {
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      paymentname: ''
    };
  }

  @action changeCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  //显示动画
  @action showLoading() {
    this.isShowLoading = true;
  }

  //关闭加载页面
  @action closeLoading() {
    this.isShowLoading = false;
  }


  //查询列表action  
  @action paymentmethodinfo({
    paymentName = '',
    pageNum = 1,
    pageSize = 10,
    showLoading,
    closeLoading,
    error,
    success
  }) {
    showLoading && showLoading();
    request({
      url: '/fm/paymethod/query',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        paymentName, pageNum, pageSize
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.data && json.data.length > 0) {

        this.methodinfoList = json.data.map((obj, i) => {
          let newappType = "";
          if (obj.appType && obj.appType.includes("1361")) {
            newappType += '供应链财务,';
          }
          if (obj.appType && obj.appType.includes("1360")) {
            newappType += '收银机,';
          } 
          obj.newappType = newappType
          return obj;
        });
        this.temporaryPaging = {
          total: json.total,
          pages: json.pages,
        }

      } else {
        error && error(json.data.length === 0 && this.currentPage.pageNum);
        this.methodinfoList = [];
        this.temporaryPaging = {
          total: null,
          pages: null,
        }
      }
      success && success(json.data);
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //取名字的action  
  @action paymentnameListAction({
    paymentName = '',
    pageNum = 1,
    pageSize = 100000,
    success,
    showLoading,
    closeLoading
  }) {
    request({
      url: '/fm/paymethod/query',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        paymentName, pageNum, pageSize
      },
    }).then(json => {

      if (json.data && json.data.length > 0) {
        this.paymentnameList = json.data.map((obj, i) => {
          return obj.paymentName;
        });
        success && success();
      } else {
        this.paymentnameList = [];
        success && success();
      }

    }).catch(error => {

    })
  }


  //新增
  @action paymentmethodinfoAdd({
    sortNo,
    paymentName,
    appType,
    isOnline = 0,
    success,
    showLoading,
    closeLoading }) {
    showLoading && showLoading();
    request({
      url: '/fm/paymethod/add',
      method: 'POST',
      data: JSON.stringify({ sortNo, paymentName, appType, isOnline }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("新增成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //修改action
  @action paymentmethodinfoUpdate({ mappingID, sortNo, paymentName, appType, isOnline, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/paymethod/update',
      method: 'POST',
      data: JSON.stringify({ mappingID, sortNo, paymentName, appType, isOnline }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("修改成功!");
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //删除action
  @action paymentmethodinfoDel({ id, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/paymethod/delete',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(id),
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("删除成功!");
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //启用/禁用
  @action paymentmethodinfoEnable({ obj, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/paymethod/updateStatus',
      method: 'POST',
      data: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //查询平台结算方式
  @action paymentmethodinfoPlatform({
        methodstatus = 9,
    select = 'paymentmethodid,sortno,paymentname,isonline,methodstatus,apptype,payorgid',
    sort = 'sortno',
    dir = 'ASC',
    page = 1,
    size = -1,
    count = 0,
    paymentname = '',
    success
  }) {
    request({
      url: '/plat/general/paymentmethodinfo.json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        'filters[methodstatus].eq': methodstatus,
        'select': select,
        'sort': sort,
        'dir': dir,
        'page': page,
        'size': size,
        'count': count,
        'filters[paymentname].like': paymentname
      },
    }).then(data => {

      if (data && data.length > 0) {

        this.ItemsList = data.map((obj, i) => {
          return obj;
        });
        success && success();
      } else {
        this.ItemsList = [];
        success && success();

      }
    })

  }




  //批量添加
  @action batchAdd({ form, showLoading, closeLoading, success }) {
    showLoading && showLoading();

    request({
      url: '/fm/paymethod/batchAdd',
      method: 'POST',
      data: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("添加成功!");
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }

}

export default new settlementStore();