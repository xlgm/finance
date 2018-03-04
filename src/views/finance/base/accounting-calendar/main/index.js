import React from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton, GreenButton, RedButton } from 'components/Button.js'
import { Input, Table, Pagination } from 'element-react';

import './main.less';


@inject('calendarStore') @observer
class CalendarMain extends React.Component {

  render() {
    let { calendarStore } = this.props;
    let columns = [
      {
        type: 'selection'
      },
      {
        label: "名称",
        prop: "accountingCalendarName",
        width: 200,
        render: function (detail) {
          return <span onClick={() => {
            calendarStore.changePageControl("CalendarDetail");
          }}>{detail.accountingCalendarName}</span>
        }
      },
      {
        label: "开始日期",
        prop: "startTime",
        width: 200,
      },
      {
        label: "结束日期",
        prop: "endTime",
        width: 200,
      },
      {
        label: "起始会计年度",
        prop: "startAccountingYear",
        width: 100,
      },
      {
        label: "期间类型",
        prop: "periodType",
        width: 100,
      },
      {
        label: "启用/禁用",
        prop: "status",

      }
    ]
    let testlist = [{
      accountingCalendarID: 1,
      accountingCalendarName: '系统预设会计日历',
      startTime: '2017-07-22',
      endTime: '2017-12-22',
      startAccountingYear: '2017',
      periodType: '自然月',
      status: 1,
    }, {
      accountingCalendarID: 1,
      accountingCalendarName: '系统预设会计日历',
      startTime: '2017-07-22',
      endTime: '2017-12-22',
      startAccountingYear: '2017',
      periodType: '自然月',
      status: 1,
    }, {
      accountingCalendarID: 1,
      accountingCalendarName: '系统预设会计日历',
      startTime: '2017-07-22',
      endTime: '2017-12-22',
      startAccountingYear: '2017',
      periodType: '自然月',
      status: 1,
    }];
    return (
      <div className="calendar-main">

        <div className="calendar-top">
          <WhiteButton onClick={() => {
            calendarStore.changePageControl('CalendarAdd');
          }}>新增</WhiteButton>
          <PurpleButton onClick={() => {
            calendarStore.changePageControl('CalendarModify');
          }}>修改</PurpleButton>
          <PurpleButton onClick={() => {

          }}>删除</PurpleButton>
          <GreenButton onClick={() => {

          }}>启用</GreenButton>
          <RedButton onClick={() => {

          }}>禁用</RedButton>
          <PurpleButton onClick={() => {

          }}>打印</PurpleButton>
          <PurpleButton onClick={() => {

          }}>导出</PurpleButton>
          <Input
            style={{ width: 270 }}
            type="text"
            placeholder="请输入名称查询"
            icon="search"
          />
          <PurpleButton>查询</PurpleButton>
        </div>
        <div className="calendar-table">
          <Table
            style={{ width: '100%' }}
            columns={columns}
            data={testlist}
            border={true}
            onSelectChange={(dataItem, checked) => { console.log(dataItem, checked) }}
            onSelectAll={(dataList, checked) => { console.log(dataList, checked); }}
          />
          {testlist.length === 0 && <div className="empty-holder">暂无数据</div>}
        </div>
        <div className='calendar-page'>
          <span className="page-span">从1到{'2'}页</span>
          <Pagination
            layout="total, sizes, prev, pager, next, jumper"
            total={401}
            pageSizes={[10, 20, 50, 100]}
            pageSize={10}
            currentPage={1}
            onSizeChange={(pageSize) => {
              console.log(pageSize)
              this.setState({
                manyPages: Math.ceil(401 / pageSize)
              })
            }}
            onCurrentChange={(currentPage) => {
              console.log(currentPage)
            }} />
        </div>
      </div>
    )
  }
}

export default CalendarMain;