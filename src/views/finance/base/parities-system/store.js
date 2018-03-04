import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';

class paritiesStore {

  @observable pageControl; //页面控制
  @observable isShowLoading;//是否加载动画
  @observable paritiesMain;//主页数据
  @observable paritiesList;//汇率列表
  @observable paritiesDetail;//获取页面详情数据
  @observable paritiesAddList;
  @observable CurrencyNameList;//增加时币别种类
  @observable SystemDetailObj;//详情对象 
  @observable currentPage;  //修改时当前页

  constructor() {
    this.pageControl = "ParitiesMain";
    this.paritiesMain = ''; 
    this.paritiesList = [];
    this.isShowLoading = false;
    this.paritiesDetail = null;
    this.paritiesAddList = [];
    this.CurrencyNameList = [];
    this.SystemDetailObj = null;
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      searchName: ''
    };
  }


  @action clearCurrentPage() {
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      searchName: ''
    };
  }

  @action changeCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  //控制显示的页面
  @action changePageControl(page) {
    this.pageControl = page;
  }

 

  //显示动画
  @action showLoading() {
    this.isShowLoading = true;
  }

  //关闭加载页面
  @action closeLoading() {
    this.isShowLoading = false;
  }

  //获取页面详情
  @action getDetail(detail) {
    this.paritiesDetail = detail;
  }


   

  //添加界面获取详情
  @action queryForInsert() {
    request({
      url: '/fm/merchantCurrencyInfo/queryForInsert',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((json) => {
      if (json.code * 1 === 1) {
        this.currencyAddList = json.data.map((item) => {
          item.key = item.currencyID;
          return item;
        });
      }

    }).catch((error) => {

    })
  }

  //添加界面获时获取原币和目标币
  @action queryCurrencyAll() {
    request({
      url: '/fm/merchantCurrencyInfo/queryAll',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { status:'1005' },
    }).then((json) => {
      if (json.code * 1 === 1) { 
        this.CurrencyNameList = json.data.map((item) => {
          item.key = item.currencyID;
          return item;
        });
      }
    }).catch((error) => {

    })
  }


  //列表页数据
  @action getParitiesList({ data, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/exchangeRateInfo/query',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data
    }).then((json) => {
      closeLoading && closeLoading();
      if (json.code * 1 === 1 && json.data) {
        this.paritiesMain = json;
        this.paritiesList = json.data.map((item) => {
          item.key = item.exchangeRateID;
          return item;
        });
        success && success(json.data);
      }
    }).catch((error) => {
      closeLoading && closeLoading();
    })
  }

  //添加action
  @action SystemSave({ parameter, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    let WDparameter = JSON.stringify(parameter)
    request({
      url: '/fm/exchangeRateInfo/save',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: WDparameter
    }).then((json) => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("添加成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }
    }).catch((error) => {
      closeLoading && closeLoading();
    })
  }

  //查看详情的action
  @action SystemDetail({ exchangeRateID, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/exchangeRateInfo/detail',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: { exchangeRateID }
    }).then((json) => {
      closeLoading && closeLoading();
      if (json.code === "1" && json.data) {
        this.SystemDetailObj = json.data;
        success && success();
      } else {

      }
    }).catch((error) => {
      closeLoading && closeLoading();
    })
  }


  //修改action
  @action SystemUpdate({ parameter, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    let WDparameter = JSON.stringify(parameter)
    request({
      url: '/fm/exchangeRateInfo/update',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: WDparameter
    }).then((json) => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("修改成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }
    }).catch((error) => {
      closeLoading && closeLoading();
    })
  }


  //删除数据
  @action SystemDelete({ exchangeRateIDs, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    let WDparameter = JSON.stringify(exchangeRateIDs)
    request({
      url: '/fm/exchangeRateInfo/delete',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: WDparameter
    }).then((json) => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("删除成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }
    }).catch((error) => {
      closeLoading && closeLoading();
    })
  }
}

export default new paritiesStore();