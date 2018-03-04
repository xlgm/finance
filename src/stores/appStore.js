/**
* @author William Cui
* @description 全局数据模型
* @date 2017-08-16
**/

import { observable, action } from 'mobx';
import request from 'common/request.js';
import { isInArray, isInString } from 'common/utils';

class appStore {

  @observable isShowLoading;//是否显示加载页面
  @observable activedTab;//当前选中的tab
  @observable menus;//slider所有的menu 
  @observable orgName;
  @observable userobj;//个人信息对象

  @observable menuContainers;//保存页签容器
  

  @observable dictionarys;//枚举 数据字典
  @observable ALL_MENU;


  constructor() {
    this.isShowLoading = false;

    this.activedTab = 'main_page';
    this.ALL_MENU = {
      main_page_key: 'main_page',//主页

      base_currency_key: 'finance_base_currency_1',//币别
      base_parities_key: 'finance_base_parities_2',//固定汇率
      base_parities_float_key: 'finance_base_parities_float_2',// 浮动汇率查询
      base_dimension_key: 'finance_base_dimension_3',//核算维度
      base_subject_key: 'finance_base_subject_4',//科目
      base_proof_key: 'finance_base_proof_5', //凭证字
      base_policy_key: 'finance_base_policy_6',//会计政策
      base_system_key: 'finance_base_system_7', //会计核算体系
      base_ledger_key: 'finance_base_ledger_8',//账簿
      base_digest_key: 'finance_base_digest_9',//常用摘要
      base_settlement_key: 'finance_base_settlement_10',//结算方式
      base_cash_flow_project_key: 'finance_base_cash_flow_project_12',//现金流量项目
      base_cash_flow_default_key: 'finance_base_cash_flow_default_13',//项目批量预设

      parameter_setting_key: 'finance_parameter_setting_1',//总账参数设置

      init_subject_entry_key: 'finance_initialization_subject_entry_1',//科目初始数据录入
      init_cash_entry_key: 'finance_initialization_cash_entry_2',//现金流量初始数据录入
      init_general_ledger_key: 'finance_initialization_general_ledger_3', //总账初始化

      voucher_entry_key: 'finance_voucher_entry_1',//凭证录入
      voucher_query_key: 'finance_voucher_query_2',//凭证查询
      voucher_director_key: 'finance_voucher_director_review_4',//主管复核
      voucher_teller_key: 'finance_voucher_teller_review_5',//出纳复核
      voucher_posting_key: 'finance_voucher_posting_6',//凭证过账
      voucher_summary_key: 'finance_voucher_summary_table_7',//凭证汇总表

      voucher_director_detail: 'voucher_director_detail_0',//主管复核凭证详情页
      voucher_teller_detail: 'voucher_teller_detail_0',//出纳复核凭证详情页

      cash_flow_t_key: 'finance_cash_flow_t_1',//T型账
      cash_flow_assign_key: 'finance_cash_flow_assign_2',//附表项目指定
      cash_flow_main_adjust_key: 'finance_cash_flow_main_adjust_6',//主表项目调整
      cash_flow_adjust_key: 'finance_cash_flow_adjust_3',//附表项目调整
      cash_flow_table_key: 'finance_cash_flow_table_4',//现金流量表
      cash_flow_query_key: 'finance_cash_flow_query_5',//现金流量查询

      account_end_exchange_key: 'finance_account_end_exchange_1',//期末调汇
      account_end_loss_gain_key: 'finance_account_end_loss_gain_2',//结转损益
      account_end_period_close_key: 'finance_account_end_period_close_3',//总账期末结账

      account_table_total_key: 'finance_account_table_total_account_1',//总账
      account_table_detail_key: 'finance_account_table_detail_account_2',//明细账
      account_table_subject_key: 'finance_account_table_subject_balance_3',//科目余额表
      account_table_multi_key: 'finance_account_table_multi_account_4',//多栏账
      account_table_dimession_balance_key: 'finance_account_table_dimession_balance_5',//核算维度余额表
      account_table_dimension_detail_key: 'finance_account_table_dimension_detail_6',//核算维度明细账
      account_table_cash_journal_key: 'finance_account_table_cash_journal_7',//现金日记帐
      account_table_bank_journal_key: 'finance_account_table_bank_journal_8',//银行日记账

      report_asset_key: 'finance_report_asset_1',//资产负债表,
      report_profit_key: 'finance_report_profit_2'//利润表

    }


    this.menus = [
      {
        node:{
          key:'sub#menu_base_0',
          title:'基础设置'
        },
        childs:[
          { key: this.ALL_MENU.base_currency_key, name: '币别' },
          { key: this.ALL_MENU.base_parities_key, name: '固定汇率' },
          { key: this.ALL_MENU.base_parities_float_key, name: '浮动汇率查询' },
          { key: this.ALL_MENU.base_dimension_key, name: '核算维度' },
          { key: this.ALL_MENU.base_subject_key, name: '科目' },
          { key: this.ALL_MENU.base_proof_key, name: '凭证字' },
          { key: this.ALL_MENU.base_policy_key, name: '会计政策' }, 
          { key: this.ALL_MENU.base_system_key, name: '会计核算体系' },
          { key: this.ALL_MENU.base_ledger_key, name: '账簿' },
          { key: this.ALL_MENU.base_digest_key, name: '常用摘要' },
          { key: this.ALL_MENU.base_settlement_key, name: '结算方式' },
          { key: this.ALL_MENU.base_cash_flow_project_key, name: '现金流量项目' },
          { key: this.ALL_MENU.base_cash_flow_default_key, name: '项目批量预设' } 
        ]
      },
      {
        node:{
          key:'sub#menu_parameter_setting_0',
          title:'参数设置'
        },
        childs:[
          { key: this.ALL_MENU.parameter_setting_key, name: '总账参数设置' },
        ]
      },
      {
        node:{
          key:'sub#menu_initialization_0',
          title:'初始化'
        },
        childs:[
          { key: this.ALL_MENU.init_subject_entry_key, name: '科目初始数据录入' },
          { key: this.ALL_MENU.init_cash_entry_key, name: '现金流量初始数据录入' },
          { key: this.ALL_MENU.init_general_ledger_key, name: '总账初始化' },
          
        ]
      },
      {
        node:{
          key:'sub#menu_voucher_0',
          title:'凭证管理'
        },
  
        childs:[
          { key: this.ALL_MENU.voucher_entry_key, name: '凭证录入' },
          { key: this.ALL_MENU.voucher_query_key, name: '凭证查询' },
          { key: this.ALL_MENU.voucher_director_key, name: '主管复核' },
          { key: this.ALL_MENU.voucher_teller_key, name: '出纳复核' },
          { key: this.ALL_MENU.voucher_posting_key, name: '凭证过账' },
          { key: this.ALL_MENU.voucher_summary_key, name: '凭证汇总表' },
        ]
      },
      {
        node:{
          key:'sub#menu_cash_flow_0',
          title:'现金流量'
        },
  
        childs:[
          { key: this.ALL_MENU.cash_flow_t_key, name: 'T型账' },
          { key: this.ALL_MENU.cash_flow_assign_key, name: '附表项目指定' },
          { key: this.ALL_MENU.cash_flow_main_adjust_key, name: '主表项目调整' },
          { key: this.ALL_MENU.cash_flow_adjust_key, name: '附表项目调整' },
          { key: this.ALL_MENU.cash_flow_table_key, name: '现金流量表' },
          { key: this.ALL_MENU.cash_flow_query_key, name: '现金流量查询' },
        ]
      },
      {
        node:{
          key:'sub#menu_account_end_0',
          title:'期末处理'
        },
        childs:[
          { key: this.ALL_MENU.account_end_exchange_key, name: '期末调汇' },
          { key: this.ALL_MENU.account_end_loss_gain_key, name: '结转损益' },
          { key: this.ALL_MENU.account_end_period_close_key, name: '总账期末结账' },
        ]
      },
      {
        node:{
          key:'sub#menu_account_table_0',
          title:'账表'
        },
       
        childs:[
          { key: this.ALL_MENU.account_table_total_key, name: '总账' },
          { key: this.ALL_MENU.account_table_detail_key, name: '明细账' },
          { key: this.ALL_MENU.account_table_subject_key, name: '科目余额表' },
          { key: this.ALL_MENU.account_table_multi_key, name: '多栏账' },
          { key: this.ALL_MENU.account_table_dimession_balance_key, name: '核算维度余额表' },
          { key: this.ALL_MENU.account_table_dimension_detail_key, name: '核算维度明细账' },
          { key: this.ALL_MENU.account_table_cash_journal_key, name: '现金日记帐' },
          { key: this.ALL_MENU.account_table_bank_journal_key, name: '银行日记账' },
        ]
      },
      {
        node:{
          key:'sub#menu_report_0',
          title:'报表'
        },
        childs:[
          { key: this.ALL_MENU.report_asset_key, name: '资产负债表' },
          { key: this.ALL_MENU.report_profit_key, name: '利润表' },
        ]
      },
     
    ]

    this.orgName = "";

    this.userobj = {
      employeeCode: '',
      logoUrl: '',
      userName: '',
      gender: '',
      responsibility: '',
      phone: '',
      email: '',
      homeAddress: '',
    };

    this.dictionarys = '';


    this.menuContainers=[
      'main_page'
    ]

  }
/*************************************************单页签操作********************************************************* */
//content 中tab点击事件
@action tabClick = (key) => {
  this.activedTab = key;
}

//改变menuContainers
@action changeMenus(menuContainers){
  this.menuContainers = menuContainers;
}

//打开新的页签
@action openNewTab(menu){
  let menuContainers = this.menuContainers;
  if(isInArray(menuContainers,menu)){
    this.activedTab = menu;
  }else{
    menuContainers.push(menu);
    this.menuContainers = menuContainers;
    this.activedTab = menu;
  }
}


/******************************************************************************************************************* */
  

  //显示加载页面
  @action showLoading() {

    this.isShowLoading = true;
  }

  //关闭加载页面
  @action closeLoading() {
    this.isShowLoading = false;
   
  }

 
  //请求数据
  @action requestData() {

    request({
      url: '/fm/api/citys.json',
      method: 'GET',
    }).then(function (data) {
      
    })

  }

  //获取所有数据字典常量
  @action getDictionarys() {
    request({
      url: '/fm/dictionary/all',
      method: 'GET',

    }).then(json => {
      if (json.code * 1 === 1) {
        this.dictionarys = json.data;
      }
    })
  }

  //验证登录是否成功
  @action Authorization({ param, ucode, uname, upassword, success, errorReturn }) {

    if(localStorage.getItem('account')){

      //已经登陆， 登陆前先调用退出接口 
      this.Cancell({
        success: ()=>{

          request({
            url: '/fm/me.json',
            method: 'GET',
            headers: {
              'Authorization': param,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }).then(json => {
            let account = {
              ucode: ucode,
              uname: uname,
              upassword: upassword,
              param: param,
              ...json
            };
      
            localStorage.setItem('account', JSON.stringify(account)); 
      
            // 商户预设数据初始化
            request({
              url: '/fm/merchantCurrencyInfo/init',
              method: 'GET',
            }).then(json => {
              success && success();
            })
          }).catch(error => {
            errorReturn && errorReturn(error.msg);
            console.log(error.msg);
          })

        }
      });
    }else{
      request({
        url: '/fm/me.json',
        method: 'GET',
        headers: {
          'Authorization': param,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(json => {
        let account = {
          ucode: ucode,
          uname: uname,
          upassword: upassword,
          param: param,
          ...json
        };
  
        localStorage.setItem('account', JSON.stringify(account)); 
  
        // 商户预设数据初始化
        request({
          url: '/fm/merchantCurrencyInfo/init',
          method: 'GET',
        }).then(json => {
          success && success();
        })
       
      }).catch(error => {
        errorReturn && errorReturn(error.msg);
        console.log(error.msg);
      })
    }
  }

  //注销
  @action Cancell({success}) {
    request({
      url: '/fm/logout',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      success&&success();
    }).catch(error => {
      success&&success();
    })
  }

  //注销
  @action Cancellation() {
    request({
      url: '/fm/logout',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      localStorage.clear();
      window.location.assign('/');
    }).catch(error => {
      console.log(error);
    })
  }


  //修改密码 
  @action Loginpassword({ param, password, success }) {
    request({
      url: '/auth/resetpassword.json',
      method: 'POST',
      data: { password },
      headers: {
        'Authorization': param,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).then(json => {
      success && success();
    }).catch(error => {
      console.log(error);
    })
  }

  //个人信息
  @action Userinfo({ userid, param }) {
    request({
      url: '/auth/general/userinfo/' + userid + '.json',
      method: 'GET',
      headers: {
        'Authorization': param,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      this.userobj = {
        employeeCode: json.employeeCode,
        logoUrl: json.logoUrl,
        userName: json.userName,
        gender: json.gender,
        responsibility: json.responsibility,
        phone: json.phone,
        email: json.email,
        postalAddress: json.postalAddress,
      }

    }).catch(error => {
      console.log(error);
    })
  }


}

export default new appStore();
