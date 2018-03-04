import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';

class policyStore {

  @observable pageControl; //页面控制
  @observable isShowLoading;//是否加载动画 
  @observable currencyInfoList;//新增页面
  @observable rateTypeList;
  @observable acctElementTableInfoList;
  @observable PolicyDatalist;
  @observable PolicyDataobj;
  @observable temporaryPaging;//接收分页的返回值
  @observable currentPage;  //修改时当前页

  constructor() {
    this.pageControl = "PolicyMain"; 
    this.currencyInfoList = [];
    this.isShowLoading = false;
    this.rateTypeList = [];
    this.acctElementTableInfoList = [];
    this.PolicyDatalist = [];
    this.PolicyDataobj = null;
    this.temporaryPaging = {
      total: null,
      pages: null,
    };

    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      accPolicyName: ''
    };
    

  }

  @action clearCurrentPage(){
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      accPolicyName: ''
    };
  }

  @action changeCurrentPage(currentPage){
    this.currentPage = currentPage;
  }

  @action changePageControl(parameter) {
    this.pageControl = parameter;
  }

  

  //显示动画
  @action showLoading() {
    this.isShowLoading = true;
  }

  //关闭加载页面
  @action closeLoading() {
    this.isShowLoading = false;
  }

  @action clearData(){
    this.currencyInfoList=[];
  }


  @action getAccPolicyMessage() {
    request({
      url: '/fm/accountingPolicy/getAccPolicyMessage',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      if (json.code === "1" && json.data) { 
        if (json.data.currencyInfoList && json.data.currencyInfoList.length > 0) {
          this.currencyInfoList = json.data.currencyInfoList.map((obj, i) => {
            return obj;
          });
        }else{
          this.currencyInfoList = [];
        }

        if (json.data.rateTypeList && json.data.rateTypeList.length > 0) {
          this.rateTypeList = json.data.rateTypeList.map((obj, i) => {
            return obj;
          });
        }else{
          this.rateTypeList = [];
        }

        if (json.data.acctElementTableInfoList && json.data.acctElementTableInfoList.length > 0) {
          this.acctElementTableInfoList = json.data.acctElementTableInfoList.map((obj, i) => {
            return obj;
          });
        }else{
          this.acctElementTableInfoList = [];
        }

      } else { 
        this.currencyInfoList = [];
        this.rateTypeList = [];
        this.acctElementTableInfoList = [];
      }
    }).catch(error => {
    })
  }


  //添加会计政策
  @action addAccountingPolicy({ accPolicyName, currencyID, exchangeTypeID, elementTableID, policyDesc, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingPolicy/addAccountingPolicy',
      method: 'POST',
      data: { accPolicyName, currencyID, exchangeTypeID, elementTableID, policyDesc },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("添加成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }

  //查询会计政策
  @action queryAccountingPolicyList({ pageNum = 1, pageSize = 10, accPolicyName, showLoading, closeLoading, success,error }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingPolicy/queryAccountingPolicyList',
      method: 'GET',
      data: { pageNum, pageSize, accPolicyName },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1" && json.data.length > 0) {
        this.PolicyDatalist = json.data.map((obj, i) => {
          return obj;
        });
        this.temporaryPaging = {
          total: json.total,
          pages: json.pages,
        }
      } else { 
        error && error(json.data.length === 0 && this.currentPage.pageNum);
        this.PolicyDatalist = [];
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


  //查询详情
  @action queryAccountingPolicyByID({ accPolicyID, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingPolicy/queryAccountingPolicyByID',
      method: 'GET',
      data: { accPolicyID },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1" && json.data) {
        this.PolicyDataobj = json.data;
        success && success();
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })

  } 
  
  //修改会计政策
  @action modAccountingPolicy({ accPolicyID, accPolicyName, currencyID, exchangeTypeID, elementTableID, policyDesc, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingPolicy/modAccountingPolicy',
      method: 'POST',
      data: { accPolicyID, accPolicyName, currencyID, exchangeTypeID, elementTableID, policyDesc },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("修改成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }
    }).catch(error => {
      closeLoading && closeLoading();
    })
  } 

  //删除
  @action batchDeleteAccountingPolicy({ accPolicyIDs, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingPolicy/batchDeleteAccountingPolicy',
      method: 'GET',
      data: { accPolicyIDs },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("删除成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }
 
  //启用
  @action batchEnableAccountingPolicy({ accPolicyIDs, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingPolicy/batchEnableAccountingPolicy',
      method: 'GET',
      data: { accPolicyIDs },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("启用成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //禁用
  @action batchDisableAccountingPolicy({ accPolicyIDs, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingPolicy/batchDisableAccountingPolicy',
      method: 'GET',
      data: { accPolicyIDs },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("禁用成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }

}

export default new policyStore();