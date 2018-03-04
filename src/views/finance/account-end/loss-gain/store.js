import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';
message.config({ top: 200, duration: 2 });

class lossGainEndStore {

  @observable current; //页面控制

  constructor() {
    this.current = 0;
  }

  //初始化当前页
  @action currentInitial() {
    this.current = 0;
  }


  //下一页
  @action currentNext() {
    this.current = this.current + 1;
  }


  //下两页
  @action currentTwoNext() {
    this.current = this.current + 2;
  }

  //上一页
  @action currentPrev() {
    this.current = this.current - 1;
  }

  //上两页
  @action currentTwoPrev() {
    this.current = this.current - 2;
  }


}

export default new lossGainEndStore();