import { observable, action } from 'mobx';
import request from 'common/request.js'
import { message } from 'antd';

class subjectStore {

  @observable pageControl; //页面控制
  @observable subjectlist; //
  @observable accCaptionCode;
  @observable accCaptionTableID;
  @observable parentAccCaptionName;//检查上一级科目名称
  @observable parentAccCaptionID;
  @observable currencyDetail;//详情页数据
  @observable mainData;
  @observable accCaptionID;//修改id
  @observable isShowLoading;//是否加载动画
  @observable accElementName
  @observable addLatitudeInfoList;//添加核算维度
  @observable currentPage //当前页
  @observable parentDetial




  @observable accCaptionTypes// 科目类别列表
  @observable accountLatitudeList//查询核算维度
  @observable currencyList;//币别列表
  @observable myAccCaptionTableID;// 主页的 accCaptionTableID;
  @observable subjectDetail;// 详情页数据
  @observable modifyDetial;//修改页详情数据

  constructor() {
    this.pageControl = "SubjectMain";
    this.accCaptionTableID = ''
    this.currencyDetail = null;
    this.accCaptionID = ''
    this.parentAccCaptionID = ''
    this.mainData = '';
    this.accElementName = '';
    this.addLatitudeInfoList = [];

    this.parentDetial = '';


    this.accCaptionTypes = [];
    this.accountLatitudeList = [];
    this.currencyList = [];
    this.myAccCaptionTableID = '';
    this.subjectDetail = "";
    this.modifyDetial = '';
    this.currentPage = {
      accCaptionTableID: 1,
      accountingCaptionName: '',
      accElementID: '',
      accCaptionTypeID: '',
      pageNum: 1,
      pageSize: 10,
      status: '',
    }
  }

  @action clearCurrentPage() {
    this.currentPage = {
      accCaptionTableID: 1,
      accountingCaptionName: '',
      accElementID: '',
      accCaptionTypeID: '',
      pageNum: 1,
      pageSize: 10,
      status: '',
    }
  }
  @action changeCurrentPage(currentPage) {
    this.currentPage = currentPage 
  }

  //显示动画
  @action showLoading() {
    this.isShowLoading = true;
  }

  //关闭加载页面
  @action closeLoading() {
    this.isShowLoading = false;
  }


  //控制显示的页面
  @action changePageControl(page) {
    this.pageControl = page;
  }

  //获取页面详情
  @action getDetail(detail) {
    this.currencyDetail = detail;
  }

  //获取页面详情
  @action alertMsg(text) {
    message.destroy()
    message.info(text)
  }

  //加载下拉选项列表
  @action accountsubject() {
    request({
      url: '/fm/accountingCaption/getAccountCaptionTableList',
      method: 'GET',
    }).then(json => {
      // console.log(json.data)
      if (json.code * 1 === 1) {
        this.subjectlist = json.data.map((item) => {
          item.key = item.accCaptionTableID;
          // console.log(item.key)
          return item;
        })
      }


    })
  }

  // 获取树形图 /fm/accountingCaption/getAccountingCaptionConditionList
  @action queryTreeData(accCaptionTableID, success) {
    request({
      url: '/fm/accountingCaption/getAccountingCaptionConditionList',
      method: 'GET',
      data: { accCaptionTableID: accCaptionTableID },
    }).then(json => {
      if (json.code - 1 === 0) {
        this.accElementName = json.data.map((item) => {
          return item;
        })
        success && success(this.accElementName)
      }
    })
  }

 
  // 删除 /accountingCaption/delAccountingCaption
  @action delAccountingCaption(accCaptionIDs, success) {
    request({
      url: '/fm/accountingCaption/delAccountingCaption',
      method: 'GET',
      data: { accCaptionIDs: accCaptionIDs },
    }).then(json => {
      if (json.code * 1 === 1) {
        success && success();
        this.alertMsg('删除成功')
      } else {
        this.alertMsg(json.message)
      }
    })
  }


  // 启用禁用 GET /accountingCaption/operateAccountingCaptionStatus 待调
  @action operateAccountingCaptionStatus(accCaptionIDs, status, success) {
    request({
      url: '/fm/accountingCaption/operateAccountingCaptionStatus',
      method: 'GET',
      data: { accCaptionIDs: accCaptionIDs, status: status },
    }).then(json => {
      if (json.code * 1 === 1) {
        success && success();
        if (status === 1005) {
          message.destroy();
          message.info('启用成功')
        } else {
          message.destroy();
          message.info('禁用成功')
        }
      } else {
        message.destroy();
        message.info(json.message);
      }

    })
  }



  // // 添加核算维度
  @action getAddLatitudeInfoList(accountLatitudeName, pageNum, pageSize, callback) {
    request({
      url: '/fm/accountLatitude/query',
      method: 'GET',
      data: {
        accountLatitudeName: accountLatitudeName,
        pageNum: pageNum,
        pageSize: pageSize
      },
    }).then(json => {
      if (json.data == null) {
        message.destroy();
        message.info(json.message);
      } else {
        this.addLatitudeInfoList = json.data.map((item) => {
          item.key = item.accountLatitudeID
          return item;
        });
        // console.log(this.addLatitudeInfoList);
        callback();
      }


    })
  }

  @action inspectid(accCaptionTableID) {

    this.accCaptionTableID = accCaptionTableID ? accCaptionTableID : 1
  }


  // 根据科目类别查询 /accountingCaption/queryAccountingCaptionList
  @action queryAccountingCaptionList(args,success) {

    this.isShowLoading = true;
    request({
      url: '/fm/accountingCaption/queryAccountingCaptionList',
      method: 'GET',
      data: {
        accCaptionTableID: args.accCaptionTableID,
        accElementID: args.accElementID,
        accCaptionTypeID: args.accCaptionTypeID,
        accountingCaptionName: args.accountingCaptionName,
        pageNum: args.pageNum,
        pageSize: args.pageSize,
        status: args.status
      },
    }).then(json => {
      this.isShowLoading = false;
      if (json.code - 1 == 0) {
        success && success(json.data);
        this.mainData = json
      } else {
        this.alertMsg(json.message)
      }
    }).catch(() => {
      this.isShowLoading = false;
    })
  }




  /************************************************************************************** */
  //获取科目类别列表
  @action queryAccountingCaptionType(data) {
    request({
      url: '/fm/accountingCaptionType/queryAccountingCaptionType',
      method: 'GET',
      data,
    }).then(json => {

      if (json.code * 1 === 1) {
        this.accCaptionTypes = json.data.map((item) => {
          item.key = item.accCaptionTypeID;
          return item;
        })
      }

    })
  }

  // 添加查询 核算维度
  @action queryAccountLatitude(data) {

    request({
      url: '/fm/accountLatitude/query',
      method: 'GET',
      data: data,
    }).then(json => {

      if (json.code * 1 === 1) {
        this.accountLatitudeList = json.data.map((item) => {
          item.key = item.accountLatitudeID;
          return item;
        })
      }

    })

  }
  //添加查询币别
  @action queryCurrency(data) {
    request({
      url: '/fm/merchantCurrencyInfo/query',
      method: 'GET',
      data: data,
    }).then(json => {

      if (json.code * 1 === 1) {
        this.currencyList = json.data.map((item) => {
          item.key = item.businessCurrencyID;
          return item;
        })
      }

    })
  }

  //获取主页的 accCaptionTableID

  @action getAccCaptionTableID(accCaptionTableID) {

    this.myAccCaptionTableID = accCaptionTableID;

  }

  //检测上一级科目
  @action checkAccountingCaptionParent({ data, success }) {
    request({
      url: '/fm/accountingCaption/checkAccountingCaptionParent',
      method: 'GET',
      data: data,
    }).then(json => {
      
      if (json.code * 1 === 1) {
        success && success(json);

      } else {
        success && success(json);
      }
    })
  }

  //添加科目
  @action addAccountingCaption({ obj, success }) {
    request({
      url: '/fm/accountingCaption/addAccountingCaption',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(obj),
    }).then(json => {

      if (json.code * 1 === 1) {
        success && success();
        message.info('添加成功');
      } else {
        message.destroy();
        message.info(json.message);  
      }    
      
    })
  }

  @action getSubjectDetail({ accCaptionID, success }) {
    request({
      url: '/fm/accountingCaption/getAccountingCaption',
      method: 'GET',
      data: { accCaptionID: accCaptionID },
    }).then(json => {
      // console.log(json.data)
      if (json.code * 1 === 1) {


        let target = {
          captionAccountLatitudeInfoList: [],
          captionCurrencyInfoList: [],
          accCaptionID: '',
          form: {
            accCaptionCode: '',
            accCaptionName: '',
            accCaptionTypeName: '',
            parentAccCaptionName: '',
            lendingDirectionName: '',
          },
          changeRate: '',
          currencyAccAll: '',
        };
        let obj = json.data;

        let captionAccountLatitudeInfoList = obj.captionAccountLatitudeInfoList || [];
        let captionCurrencyInfoList = obj.captionCurrencyInfoList || [];

        target.captionAccountLatitudeInfoList = []

        if (captionAccountLatitudeInfoList.length > 0) {
          target.captionAccountLatitudeInfoList = captionAccountLatitudeInfoList.map((item, index) => {
            let { accLatitudeID, accLatitudeName, nassary } = item;
            return { index: index + 1, key: accLatitudeID, accLatitudeName, nassary }
          })
        }


        target.captionCurrencyInfoList = [];
        if (captionCurrencyInfoList.length > 0) {
          target.captionCurrencyInfoList = captionCurrencyInfoList.map((item, index) => {
            let { businessCurrencyID, currencyName } = item;

            return { index: index + 1, key: businessCurrencyID, currencyName }
          })

        }
        target.accCaptionID = obj.accCaptionID;
        target.form.accCaptionCode = obj.accCaptionCode;
        target.form.accCaptionName = obj.accCaptionName;
        target.form.accCaptionTypeName = obj.accCaptionTypeName;
        target.form.parentAccCaptionName = obj.parentAccCaptionName;
        target.form.lendingDirectionName = obj.lendingDirectionName;
        target.changeRate = obj.changeRate;
        target.currencyAccAll = obj.currencyAccAll;

        if (target.accCaptionID) {
          this.subjectDetail = target;
          success && success();
        }
      }

    })



  }
  


  //修改获取详情页数据
  @action modifyGetDetail({ accCaptionID, success }) {
    request({
      url: '/fm/accountingCaption/getAccountingCaption',
      method: 'GET',
      data: { accCaptionID: accCaptionID },
    }).then(json => {

      if (json.code * 1 === 1) {


        // {   index:'1',
        //     key: 'businessCurrencyID',
        //     "businessCurrencyID": 0, //商户币别编号 (必填),
        //     "currencyName": "string" //货币名称 (不需要) 
        // } 
        let {
          accCaptionID,
          captionAccountLatitudeInfoList,
          captionCurrencyInfoList,
          changeRate,
          currencyAccAll,
          accCaptionCode,
          accCaptionName,
          accCaptionTypeID,
          accCaptionTypeName,
          parentAccCaptionID,
          parentAccCaptionName,
          accCaptionTableID,
          lendingDirection,
          lendingDirectionName
        } = json.data;

        let mCaptionAccountLatitudeInfoList = captionAccountLatitudeInfoList.map((item, index) => {

          let { accLatitudeID, accLatitudeName, nassary } = item;

          return { index: index + 1, key: accLatitudeID, accLatitudeID, accLatitudeName, nassary }

        })

        let mCaptionCurrencyInfoList = captionCurrencyInfoList.map((item, index) => {
          let { businessCurrencyID, currencyName } = item;
          return { index: index + 1, key: businessCurrencyID, businessCurrencyID, currencyName }
        })

        let form = {
          accCaptionCode, //编码
          accCaptionName,//名称
          accCaptionTypeID,
          accCaptionTypeName,
          parentAccCaptionID, //上级科目  
          parentAccCaptionName,
          accCaptionTableID, //会计科目表ID
          lendingDirection, //借贷方向id
          lendingDirectionName, //借贷方向名称
        }

        if (accCaptionID) {
          this.modifyDetial = {
            captionAccountLatitudeInfoList: mCaptionAccountLatitudeInfoList,
            captionCurrencyInfoList: mCaptionCurrencyInfoList,
            changeRate,
            currencyAccAll,
            form,
            accCaptionID
          }
          success && success();
        }

      }

    })

  }
  //父级科目详情
  @action parentGetDetail({ accCaptionID, success }) {
    request({
      url: '/fm/accountingCaption/getAccountingCaption',
      method: 'GET',
      data: { accCaptionID: accCaptionID },
    }).then(json => {

      if (json.code * 1 === 1) {


        // {   index:'1',
        //     key: 'businessCurrencyID',
        //     "businessCurrencyID": 0, //商户币别编号 (必填),
        //     "currencyName": "string" //货币名称 (不需要) 
        // } 
        let {
          accCaptionID,
          captionAccountLatitudeInfoList,
          captionCurrencyInfoList,
          changeRate,
          currencyAccAll,
          accCaptionCode,
          accCaptionName,
          accCaptionTypeID,
          accCaptionTypeName,
          parentAccCaptionID,
          parentAccCaptionName,
          accCaptionTableID,
          lendingDirection,
          lendingDirectionName
        } = json.data;

        let mCaptionAccountLatitudeInfoList = captionAccountLatitudeInfoList.map((item, index) => {

          let { accLatitudeID, accLatitudeName, nassary } = item;

          return { index: index + 1, key: accLatitudeID, accLatitudeID, accLatitudeName, nassary }

        })

        let mCaptionCurrencyInfoList = captionCurrencyInfoList.map((item, index) => {
          let { businessCurrencyID, currencyName } = item;
          return { index: index + 1, key: businessCurrencyID, businessCurrencyID, currencyName }
        })

        let form = {
          accCaptionCode, //编码
          accCaptionName,//名称
          accCaptionTypeID,
          accCaptionTypeName,
          parentAccCaptionID, //上级科目  
          parentAccCaptionName,
          accCaptionTableID, //会计科目表ID
          lendingDirection, //借贷方向id
          lendingDirectionName, //借贷方向名称
        }

        if (accCaptionID) {
          this.parentDetial = {
            captionAccountLatitudeInfoList: mCaptionAccountLatitudeInfoList,
            captionCurrencyInfoList: mCaptionCurrencyInfoList,
            changeRate,
            currencyAccAll,
            form,
            accCaptionID
          }
          success && success();
        }

      }

    })

  }


  //修改科目提交

  @action modifySubjectSubmit({ obj, success }) {
    request({
      url: '/fm/accountingCaption/modAccountingCaption',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(obj),
    }).then(json => {

      if (json.code * 1 === 1) {
        success && success();
        message.destroy();
        message.info('修改成功');
      } else {
        message.destroy();
        message.info(json.message);
      }

      

    })

  }

}

export default new subjectStore();