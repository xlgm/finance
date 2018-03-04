import React from 'react';
import {Tabs} from 'antd';
import {inject, observer} from 'mobx-react';

import HomePage from '../../home';
import './content.less';

import {asyncComponent} from 'react-async-component';
const TabPane = Tabs.TabPane;

const CurrencyContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/currency'));
  }, 'currency'))
}); //币别

const ParitiesContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/parities-system'));
  }, 'parities'))
}); //汇率体系

const ParitiesFloatContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/parities-float'));
  }, 'parities-float'))
}); //浮动汇率查询

const DimensionContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/accounting-dimension'));
  }, 'dimension'))
}); //核算维度

const SubjectContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/subject'));
  }, 'subject'))
}); //科目

const ProofContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/proof'));
  }, 'proof'))
}); //凭证字

const PolicyContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/accounting-policy'));
  }, 'policy'))
}); //会计政策

const SystemContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/accounting-system'));
  }, 'system'))
}); //会计核算体系

const LedgerContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/ledger'));
  }, 'ledger'))
}); //账簿

const DigestContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/digest'));
  }, 'digest'))
}); //常用摘要

const SettlementContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/settlement-mode'));
  }, 'settlement'))
}); //结算方式


const CashFlowProjectContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/cash-flow-project'));
  }, 'cash-flow-project'))
}); //现金流量项目

const CashFlowDefaultContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/base/cash-flow-default'));
  }, 'cash-flow-default'))
}); //项目批量预设

const ParameterContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/parameter-setting/setting'));
  }, 'parameter-setting'))
}); //总账参数设置

const SubjectEntryContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/initialization/subject-entry'));
  }, 'init-subject-entry'))
}); //科目初始数据录入

const CashEntryContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/initialization/cash-entry'));
  }, 'init-cash-entry'))
}); //现金流量初始数据录入

const GenLedgerContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/initialization/general-ledger'));
  }, 'init-general-ledger'))
}); //总账初始化

const VoEntryContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/entry'));
  }, 'voucher-entry'))
}); //凭证录入

const VoQueryContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/query'));
  }, 'voucher-query'))
}); //凭证查询

const VoDirectorContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/director-review'));
  }, 'voucher-director'))
}); //主管复核

const VoucherDirector = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/director-review/voucher'));
  }, 'voucher-director-detail'))
}); //主管复核凭证详情页

const VoTellerContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/teller-review'));
  }, 'voucher-teller'))
}); //出纳复核

const VoucherTeller = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/teller-review/voucher'));
  }, 'voucher-teller-detail'))
}); //出纳复核凭证详情页

const VoPostingContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/posting'));
  }, 'voucher-posting'))
}); //凭证过账

const VoSummaryContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/voucher/summary-table'));
  }, 'voucher-summary'))
}); //凭证汇总表

const TAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/cash-flow/t-account'));
  }, 't-account'))
}); //T型账

const AssignCashContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/cash-flow/schedules-assign'));
  }, 'assign-cash-flow'))
}); //附表项目指定

const AdjustMainCashContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/cash-flow/main-adjust'));
  }, 'main-adjust-cash-flow'))
}); //主表项目调整

const AdjustSchCashContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/cash-flow/schedules-adjust'));
  }, 'sch-adjust-cach-flow'))
}); //附表项目调整

const TableCashContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/cash-flow/table'));
  }, 'table-cash-flow'))
}); //现金流量表

const QueryCashFlowContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/cash-flow/query'));
  }, 'query-cash-flow'))
}); //现金流量查询

const ExchangeEndContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-end/exchange'));
  }, 'exchange-end'))
}); //期末调汇

const LossGainEndContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-end/loss-gain'));
  }, 'loss-gain-end'))
}); //结转损益

const PeriodEndContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-end/period-close'));
  }, 'period-close-end'))
}); //总账期末结账

const TotalAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/total-account'));
  }, 'total-account'))
}); //总账

const DetailAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/detail-account'));
  }, 'detail-account'))
}); //明细账

const SubjectAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/subject-balance'));
  }, 'subject-balance-account'))
}); //科目余额表

const MultiAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/multi-account'));
  }, 'multi-account'))
}); //多栏账

const DimBalanceAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/dimession-balance'));
  }, 'dimession-balance-account'))
}); //核算维度余额表

const DimDetailAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/dimension-detail'));
  }, 'dimension-detail-account'))
}); //核算维度明细账

const CashAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/cash-journal'));
  }, 'cash-journal-account'))
}); //现金日记帐

const BankAccountContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/account-table/bank-journal'));
  }, 'bank-journal-account'))
}); //银行日记账

const AssetReportContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/report/asset'));
  }, 'asset-report'))
}); //资产负债表

const ProfitReportContainer = asyncComponent({
  resolve: () => new Promise(resolve => require.ensure([], require => {
    resolve(require('../../finance/report/profit'));
  }, 'profit-report'))
}); //利润表



@inject('appStore')@observer
class Content extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      panes: [
        {
          title: <div className="homepage">
            <i className="iconfont icon-zhuye"></i>首页
          </div>,
          content: <HomePage/>,
          name: 'main_page',
          closable: false
        }
      ]
    };
  }

  refreshMenus=()=>{
    let { appStore } = this.props;
    let menuContainers = appStore.menuContainers;
    let ALL_MENU = appStore.ALL_MENU;
    let panes = [];
    
    panes = menuContainers.map((item)=>{
      switch (item) {
        case ALL_MENU.main_page_key:
          return {
            title: <div className="homepage">
              <i className="iconfont icon-zhuye"></i>首页</div>,
            content: <HomePage/>,
            name: item,
            closable: false
          }
        case ALL_MENU.base_currency_key:
          return {
            title: '币别', content: <CurrencyContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_parities_key:
          return {
            title: '汇率体系', content: <ParitiesContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_parities_float_key:
          return {
            title: '浮动汇率查询', content: <ParitiesFloatContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_dimension_key:
          return {
            title: '核算维度', content: <DimensionContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_subject_key:
          return {
            title: '科目', content: <SubjectContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_proof_key:
          return {
            title: '凭证字', content: <ProofContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_policy_key:
          return {
            title: '会计政策', content: <PolicyContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_system_key:
          return {
            title: '会计核算体系', content: <SystemContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_ledger_key:
          return {
            title: '账簿', content: <LedgerContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_digest_key:
          return {
            title: '常用摘要', content: <DigestContainer />,
            name: item,
            closable: true
          };                                  
        case ALL_MENU.base_settlement_key:
          return {
            title: '结算方式', content: <SettlementContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_cash_flow_project_key:
          return {
            title: '现金流量项目', content: <CashFlowProjectContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.base_cash_flow_default_key:
          return {
            title: '项目批量预设', content: <CashFlowDefaultContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.parameter_setting_key:
          return {
            title: '总账参数设置', content: <ParameterContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.init_subject_entry_key:
          return {
            title: '科目初始数据录入', content: <SubjectEntryContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.init_cash_entry_key:
          return {
            title: '现金流量初始数据录入', content: <CashEntryContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.init_general_ledger_key:
          return {
            title: '总账初始化', content: <GenLedgerContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.voucher_entry_key:
          return {
            title: '凭证录入', content: <VoEntryContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.voucher_query_key:
          return {
            title: '凭证查询', content: <VoQueryContainer />,
            name: item,
            closable: true
          };       
        case ALL_MENU.voucher_director_key:
          return {
            title: '主管复核', content: <VoDirectorContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.voucher_director_detail:
          return {
            title: '主管复核-凭证详情', content: <VoucherDirector />,
            name: item,
            closable: true
          };

        case ALL_MENU.voucher_teller_key:
          return {
            title: '出纳复核', content: <VoTellerContainer />,
            name: item,
            closable: true
          };

        case ALL_MENU.voucher_teller_detail:
          return {
            title: '出纳复核-凭证详情', content: <VoucherTeller />,
            name: item,
            closable: true
          };
        case ALL_MENU.voucher_posting_key:
          return {
            title: '凭证过账', content: <VoPostingContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.voucher_summary_key:
          return {
            title: '凭证汇总表', content: <VoSummaryContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.cash_flow_t_key:
          return {
            title: 'T型账', content: <TAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.cash_flow_assign_key:
          return {
            title: '附表项目指定', content: <AssignCashContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.cash_flow_main_adjust_key:
          return {
            title: '主表项目调整', content: <AdjustMainCashContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.cash_flow_adjust_key:
          return {
            title: '附表项目调整', content: <AdjustSchCashContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.cash_flow_table_key:
          return {
            title: '现金流量表', content: <TableCashContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.cash_flow_query_key:
          return {
            title: '现金流量查询', content: <QueryCashFlowContainer />,
            name: item,
            closable: true
          };
         
        case ALL_MENU.account_end_exchange_key:
          return {
            title: '期末调汇', content: <ExchangeEndContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_end_loss_gain_key:
          return {
            title: '结转损益', content: <LossGainEndContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_end_period_close_key:
          return {
            title: '总账期末结账', content: <PeriodEndContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_total_key:
          return {
            title: '总账', content: <TotalAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_detail_key:
          return {
            title: '明细账', content: <DetailAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_subject_key:
          return {
            title: '科目余额表', content: <SubjectAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_multi_key:
          return {
            title: '多栏账', content: <MultiAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_dimession_balance_key:
          return {
            title: '核算维度余额表', content: <DimBalanceAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_dimension_detail_key:
          return {
            title: '核算维度明细账', content: <DimDetailAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_cash_journal_key:
          return {
            title: '现金日记帐', content: <CashAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.account_table_bank_journal_key:
          return {
            title: '银行日记账', content: <BankAccountContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.report_asset_key:
          return {
            title: '资产负债表', content: <AssetReportContainer />,
            name: item,
            closable: true
          };
        case ALL_MENU.report_profit_key:
          return {
            title: '利润表', content: <ProfitReportContainer />,
            name: item,
            closable: true
          };

        default:
      }
     
    })
    return panes;
  }
  

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  onChange = (activeKey) =>{
    let {appStore} = this.props;
    appStore.tabClick(activeKey);

  }

  remove = (targetKey) =>{
    if (this.props.removeTab) {
      this
        .props
        .removeTab(targetKey);
    }

  }
  render() {
    let {appStore} = this.props;
    let panes = this.refreshMenus();
    return <div id='content'>

      <Tabs
        hideAdd
        type="editable-card"
        value={appStore.activedTab}
        activeKey={appStore.activedTab}
        onChange={this.onChange}
        onEdit={this.onEdit}
       >
        {panes
          .map((item, index) => {
            return <TabPane
              key={item.name}
              closable={item.closable}
              tab={item.title}>{item.content}</TabPane>
          })
        }
      </Tabs>
    </div>
  }
}

export default Content;