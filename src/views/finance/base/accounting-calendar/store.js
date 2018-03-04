import { observable, action } from 'mobx';

class calendarStore {

  @observable pageControl; //页面控制
  constructor() {
    this.pageControl = "CalendarMain";
  }

  //控制显示的页面
  @action changePageControl(page) {
    this.pageControl = page;
  }

}

export default new calendarStore();