import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class currencyStore {

  @observable pageControl; //页面控制
  @observable currencyDetail; //详情页数据
  @observable currencyAddList;
  @observable currencyMain; //列表页
  @observable currencyList; //币别列表
  @observable isShowLoading; //是否加载动画

  @observable currentPage;  //修改时当前页

  constructor() {
    this.pageControl = "CurrencyMain";
    this.currencyDetail = null;
    this.currencyAddList = [];
    this.currencyMain = '';
    this.isShowLoading = false;
    this.currencyList = [];

    this.currentPage={
      pageNum: 1,
      pageSize: 10,
      searchName: ''
    }
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

  @action clearCurrentPage(){
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      searchName: ''
    };
  }

  @action changeCurrentPage(currentPage){
    this.currentPage = currentPage;
  }

  //获取页面详情
  @action getDetail(detail) {
    this.currencyDetail = detail;
  }

  //添加界面获取详情
  @action queryForInsert() {
    request({
      url: '/fm/merchantCurrencyInfo/queryForInsert',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((json) => {
      if (json.code * 1 === 1) {
        this.currencyAddList = json
          .data
          .map((item) => {
            item.key = item.currencyID;
            return item;
          });
      }
    }).catch((error) => {})
  }

  //添加提交
  @action currencySubmitAdd({selectedRowKeys, showLoading, closeLoading}) {

    showLoading && showLoading();
    request({
      url: '/fm/merchantCurrencyInfo/insert',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(selectedRowKeys)
    }).then((json) => {

      let success;
      if (json.code * 1 === 1) {
        success = true;
        message.destroy();
        message.success('添加成功');
      } else {
        success = false;

        message.destroy();
        message.info(json.message);
  
      }

      closeLoading && closeLoading(success);
     
    }).catch((error) => {
      closeLoading && closeLoading();

    })
  }

  //列表页数据

  @action getCurrencyList(data) {
    this.showLoading();

    request({
      url: '/fm/merchantCurrencyInfo/query',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }).then((json) => {
      this.closeLoading();
      if (json.code * 1 === 1) {
        this.currencyMain = json;
        this.currencyList = json
          .data
          .map((item) => {
            item.key = item.mercCurrencyID;
            return item;
          })
      }
    }).catch((error) => {
      this.closeLoading();
    })
  }

  //启用

  @action enabale({selectedRowKeys, success}) {

    request({
      url: '/fm/merchantCurrencyInfo/enabale',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(selectedRowKeys)
    }).then((json) => {
      if (json.code * 1 === 1) {
        message.destroy();
        message.success('启用成功');

        success && success();
      }else{
        message.destroy();
        message.success(json.message);
      }
     

    }).catch((error) => {})
  }
  //禁用
  @action disable({selectedRowKeys, success}) {
    request({
      url: '/fm/merchantCurrencyInfo/disable',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(selectedRowKeys)
    }).then((json) => {
      if (json.code * 1 === 1) {
        message.destroy();
        message.success('禁用成功');
        success && success();
      }else{
        message.destroy();
        message.success(json.message);
      }
    }).catch((error) => {})
  }

}

export default new currencyStore();