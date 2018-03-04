import React from 'react';
import { inject, observer } from 'mobx-react';
import { Popover } from 'antd';

import './popover.less';

@inject('appStore') @observer
class MainPopover extends React.Component {

  render() {

    let { appStore, closeItem, closeAll, closeOthers, itemClick } = this.props;
    let menuContainers = appStore.menuContainers;
    let ALL_MENU = appStore.ALL_MENU;
    
    return (

      <div className="main-popover-down">
        <Popover
          placement="bottomRight"
          title=""
          trigger="click"
          content={<div id='main_popover'>
            <ul>      
              {menuContainers.map((ele, index) => {
                let tabName;
                switch (ele) {
                  case ALL_MENU.main_page_key:
                    tabName = '首页';
                    break;
                  case ALL_MENU.base_currency_key:
                    tabName = '币别';
                    break;
                  case ALL_MENU.base_parities_key:
                    tabName = '汇率体系';
                    break;
                  case ALL_MENU.base_parities_float_key:
                    tabName = '浮动汇率查询';
                    break;
                  case ALL_MENU.base_dimension_key:
                    tabName = '核算维度';
                    break;
                  case ALL_MENU.base_subject_key:
                    tabName = '科目';
                    break;
                  case ALL_MENU.base_proof_key:
                    tabName = '凭证字';
                    break;
                  case ALL_MENU.base_policy_key:
                    tabName = '会计政策';
                    break;
                  case ALL_MENU.base_system_key:
                    tabName = '会计核算体系';
                    break;
                  case ALL_MENU.base_ledger_key:
                    tabName = '账簿';
                    break;
                  case ALL_MENU.base_digest_key:
                    tabName = '常用摘要';
                    break;
                  case ALL_MENU.base_settlement_key:
                    tabName = '结算方式';
                    break;
                  case ALL_MENU.base_cash_flow_project_key:
                    tabName = '现金流量项目';
                    break;
                  case ALL_MENU.base_cash_flow_default_key:
                    tabName = '项目批量预设';
                    break;
                  case ALL_MENU.parameter_setting_key:
                    tabName = '总账参数设置';
                    break;
                  case ALL_MENU.init_subject_entry_key:
                    tabName = '科目初始数据录入';
                    break;
                  case ALL_MENU.init_cash_entry_key:
                    tabName = '现金流量初始数据录入';
                    break;
                  case ALL_MENU.init_general_ledger_key:
                    tabName = '总账初始化';
                    break;
                  case ALL_MENU.voucher_entry_key:
                    tabName = '凭证录入';
                    break;
                  case ALL_MENU.voucher_query_key:
                    tabName = '凭证查询';
                    break;
                  case ALL_MENU.voucher_director_key:
                    tabName = '主管复核';
                    break;
                  case ALL_MENU.voucher_director_detail:
                    tabName = '主管复核-凭证详情';
                    break;
                  case ALL_MENU.voucher_teller_key:
                    tabName = '出纳复核';
                    break;
                  case ALL_MENU.voucher_teller_detail:
                    tabName = '出纳复核-凭证详情';
                    break;
                  case ALL_MENU.voucher_posting_key:
                    tabName = '凭证过账';
                    break;
                  case ALL_MENU.voucher_summary_key:
                    tabName = '凭证汇总表';
                    break;
                  case ALL_MENU.cash_flow_t_key:
                    tabName = 'T型账';
                    break;
                  case ALL_MENU.cash_flow_assign_key:
                    tabName = '附表项目指定';
                    break;
                  case ALL_MENU.cash_flow_main_adjust_key:
                    tabName = '主表项目调整';
                    break;
                  case ALL_MENU.cash_flow_adjust_key:
                    tabName = '附表项目调整';
                    break;
                  case ALL_MENU.cash_flow_table_key:
                    tabName = '现金流量表';
                    break;
                  case ALL_MENU.cash_flow_query_key:
                    tabName = '现金流量查询';
                    break;
                  case ALL_MENU.account_end_exchange_key:
                    tabName = '期末调汇';
                    break;
                  case ALL_MENU.account_end_loss_gain_key:
                    tabName = '结转损益';
                    break;
                  case ALL_MENU.account_end_period_close_key:
                    tabName = '总账期末结账';
                    break;
                  case ALL_MENU.account_table_total_key:
                    tabName = '总账';
                    break;
                  case ALL_MENU.account_table_detail_key:
                    tabName = '明细账';
                    break;
                  case ALL_MENU.account_table_subject_key:
                    tabName = '科目余额表';
                    break;
                  case ALL_MENU.account_table_multi_key:
                    tabName = '多栏账';
                    break;
                  case ALL_MENU.account_table_dimession_balance_key:
                    tabName = '核算维度余额表';
                    break;
                  case ALL_MENU.account_table_dimension_detail_key:
                    tabName = '核算维度明细账';
                    break;
                  case ALL_MENU.account_table_cash_journal_key:
                    tabName = '现金日记帐';
                    break;
                  case ALL_MENU.account_table_bank_journal_key:
                    tabName = '银行日记账';
                    break;
                  case ALL_MENU.report_asset_key:
                    tabName = '资产负债表';
                    break;
                  case ALL_MENU.report_profit_key:
                    tabName = '利润表';
                    break;        
                  default:
                }
                if (ele === 'main_page') {
                  return ''
                } else {
                  return <li
                    onClick={() => {
                      itemClick && itemClick(ele);
                    }}
                    key={ele}>
                    <span>{tabName}</span>
                    <span
                      className="close el-icon-close"
                      onClick={(e) => {
                        //阻止事件冒泡
                        e.stopPropagation();
                        closeItem && closeItem(ele);
                      }}
                    ></span>
                  </li>
                }
              })}
            </ul>
            <div className="main-po-close">
              <div onClick={() => {
                closeAll && closeAll();
              }}>
                关闭全部页
              </div>
              <div onClick={() => {
                closeOthers && closeOthers();
              }}>
                关闭其他页
              </div>
            </div>
          </div>}>
          <div className="main-click el-icon-caret-bottom el-icon--right"></div>
        </Popover>
      </div>
    )
  }


}

export default MainPopover;