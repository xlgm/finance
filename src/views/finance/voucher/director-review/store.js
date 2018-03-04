import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class voDirectorStore {
  @observable pageControl; //页面控制
  @observable isShowLoading;//是否加载动画

  constructor() {
    this.pageControl = "DirectorMain";
    this.isShowLoading = false;
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
}

export default new voDirectorStore();