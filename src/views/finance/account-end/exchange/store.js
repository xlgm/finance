import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';
message.config({ top: 200, duration: 2 });

class exchangeEndStore {


  @observable current; //页面控制


  constructor() {
    this.current = 0;
  }

  //初始化当前页
  @action currentInitial(){
    this.current = 0;
  }


  //下一页
  @action currentNext() {
    this.current = this.current + 1;
  }

  //上一页
  @action currentPrev() {
    this.current = this.current - 1;
  }

}

export default new exchangeEndStore();