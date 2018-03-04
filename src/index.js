import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'mobx-react';
import 'whatwg-fetch';
//import 'babel-polyfill';

// import registerServiceWorker from './registerServiceWorker';
import 'assets/iconfont/iconfont.css';
import 'assets/theme/index.css';
import 'assets/styles/public.less';
import 'moment/locale/zh-cn';

import appStore from 'stores/appStore'; //全局store
import commonStore from 'stores/commonStore'//公用的store


import currencyStore from './views/finance/base/currency/store'; //币别
import paritiesStore from './views/finance/base/parities-system/store'; //固定汇率 
import paritiesFloatStore from './views/finance/base/parities-float/store'; //浮动汇率查询
import calendarStore from './views/finance/base/accounting-calendar/store';//会计日历
import elementStore from './views/finance/base/accounting-element/store';// 会计要素
import categoryStore from './views/finance/base/subject-category/store';//科目类别
import dimensionStore from './views/finance/base/accounting-dimension/store';//核算维度
import subjectStore from './views/finance/base/subject/store';//科目
import proofStore from './views/finance/base/proof/store';//凭证字
import policyStore from './views/finance/base/accounting-policy/store';//会计政策 
import systemStore from './views/finance/base/accounting-system/store';//会计核算体系
import ledgerStore from './views/finance/base/ledger/store'; // 账簿
import digestStore from './views/finance/base/digest/store'; //常用摘要 
import settlementStore from './views/finance/base/settlement-mode/store';//结算方式
import cashFlowProjectStore from './views/finance/base/cash-flow-project/store'; //现金流量项目
import cashFlowDefaultStore from './views/finance/base/cash-flow-default/store'; //项目批量预设

import parameterStore from './views/finance/parameter-setting/setting/store'; //总账参数设置

import subjectEntryStore from './views/finance/initialization/subject-entry/store'; //科目初始数据录入
import cashEntryStore from './views/finance/initialization/cash-entry/store'; //现金流量初始数据录入
import genLedgerStore from './views/finance/initialization/general-ledger/store'; //总账初始化

import voEntryStore from './views/finance/voucher/entry/store';//凭证录入
import voQueryStore from './views/finance/voucher/query/store';//凭证查询
import voDirectorStore from './views/finance/voucher/director-review/store';//主管复核
import voTellerStore from './views/finance/voucher/teller-review/store';//出纳复核
import voPostingStore from './views/finance/voucher/posting/store';//凭证过账
import voSummaryStore from './views/finance/voucher/summary-table/store';//凭证汇总表

import tAccountStore from './views/finance/cash-flow/t-account/store';//T型账
import assignCashStore from './views/finance/cash-flow/schedules-assign/store';//附表项目指定
import adjustMainCashStore from './views/finance/cash-flow/main-adjust/store';//主表项目调整
import adjustSchCashStore from './views/finance/cash-flow/schedules-adjust/store';//附表项目调整
import tableCashStore from './views/finance/cash-flow/table/store';//现金流量表
import queryCashFlowStore from './views/finance/cash-flow/query/store';//现金流量查询

import exchangeEndStore from './views/finance/account-end/exchange/store';//期末调汇
import lossGainEndStore from './views/finance/account-end/loss-gain/store';//结转损益
import periodEndStore from './views/finance/account-end/period-close/store';//总账期末结账

import totalAccountStore from './views/finance/account-table/total-account/store';//总账
import detailAccountStore from './views/finance/account-table/detail-account/store';//明细账
import subjectAccountStore from './views/finance/account-table/subject-balance/store';//科目余额表
import multiAccountStore from './views/finance/account-table/multi-account/store';//多栏账
import dimBalanceAccountStore from './views/finance/account-table/dimession-balance/store';//核算维度余额表
import dimDetailAccountStore from './views/finance/account-table/dimension-detail/store';//核算维度明细账
import cashAccountStore from './views/finance/account-table/cash-journal/store';//现金日记帐
import bankAccountStore from './views/finance/account-table/bank-journal/store';//银行日记账

import assetReportStore from './views/finance/report/asset/store';//资产负债表
import profitReportStore from './views/finance/report/profit/store';//利润表 

const stores = {
  appStore,
  commonStore,
  currencyStore,
  paritiesStore,
  paritiesFloatStore,
  calendarStore,
  elementStore,
  categoryStore,
  dimensionStore,
  subjectStore,
  proofStore,
  policyStore,
  systemStore,
  ledgerStore,
  digestStore,
  settlementStore,
  cashFlowProjectStore,
  cashFlowDefaultStore,
  parameterStore,
  subjectEntryStore,
  cashEntryStore,
  genLedgerStore,
  voEntryStore,
  voQueryStore,
  voDirectorStore,
  voTellerStore,
  voPostingStore,
  voSummaryStore,
  tAccountStore,
  assignCashStore,
  adjustMainCashStore,
  adjustSchCashStore,
  tableCashStore,
  queryCashFlowStore,
  exchangeEndStore,
  lossGainEndStore,
  periodEndStore,
  totalAccountStore,
  detailAccountStore,
  subjectAccountStore,
  multiAccountStore,
  dimBalanceAccountStore,
  dimDetailAccountStore,
  cashAccountStore,
  bankAccountStore,
  assetReportStore,
  profitReportStore
}

//根容器components/choice-subject-modal
const App = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./App').default)
  }, 'app')
}

//登录页面
const Login = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./views/login').default)
  }, 'app')
}

//主结构
const Main = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./views/main').default)
  }, 'app')
}


const Routes = () => {
  return <Router history={browserHistory}>
 
    <Route path="/" getComponent={App}>
      <IndexRoute getComponent={Main}></IndexRoute>
      <Route path="/login" getComponent={Login}>
      </Route>
    </Route>
  </Router>
}

ReactDOM.render(
  <Provider {...stores}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
