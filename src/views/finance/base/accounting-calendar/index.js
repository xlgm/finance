//只是一个容器组件 用来处理要加载的模块
import React from 'react';
import { inject, observer } from 'mobx-react';
import CalendarMain from './main';
import CalendarAdd from './add';
import CalendarModify from './modify';
import CalendarDetail from './detail';

@inject('calendarStore') @observer
class CalendarContainer extends React.Component {


  componentWillUnmount() {
    let { calendarStore } = this.props;
    calendarStore.changePageControl('CalendarMain');
  }

  render() {
    let { calendarStore } = this.props;

    let pageControl = calendarStore.pageControl;
    let calendarPage
    switch (pageControl) {
      case "CalendarMain":
        calendarPage = <CalendarMain></CalendarMain>;
        break;
      case "CalendarDetail":
        calendarPage = <CalendarDetail></CalendarDetail>;
        break;
      case "CalendarModify":
        calendarPage = <CalendarModify></CalendarModify>;
        break;
      case "CalendarAdd":
        calendarPage = <CalendarAdd></CalendarAdd>;
        break;
      default:
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {calendarPage}
      </div>
    )
  }

}

export default CalendarContainer;