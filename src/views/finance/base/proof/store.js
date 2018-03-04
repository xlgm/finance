import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';

class proofStore {


  @observable pageControl; //页面控制
  @observable ifModifyDetails; //判断是修改还是查看详情
  @observable wordList;//凭证字列表 
  @observable temporaryPaging;//接收分页的返回值
  @observable isShowLoading;//是否加载动画
  @observable captionTableList;//科目表list
  @observable accCaptionList;//添加科目的list
  @observable certificateWordObj;//修改返回的对象
  @observable getChangeId;
  @observable defaultData;//判断是预设数据只能修改名字和是否多节多带
  @observable currentPage;  //修改时当前页


  constructor() {
    this.pageControl = "ProofMain";
    this.ifModifyDetails = "";
    this.wordList = [];
    this.temporaryPaging = {
      total: null,
      pages: null,
    };
    this.isShowLoading = false;
    this.captionTableList = [];
    this.accCaptionList = [];
    this.certificateWordObj = null;
    this.getChangeId = "";
    this.defaultData = false;
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      certificateWord: ''
    };
  }

  @action clearCurrentPage() {
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      certificateWord: ''
    };
  }

  @action changeCurrentPage(currentPage) {
    this.currentPage = currentPage;
  }

  //控制显示的页面
  @action changePageControl(page) {
    this.pageControl = page;
  }

  //修改或详情页面
  @action pifModifyDetails(parameter) {
    this.ifModifyDetails = parameter;
  }

  //显示动画
  @action showLoading() {
    this.isShowLoading = true;
  }

  //关闭加载页面
  @action closeLoading() {
    this.isShowLoading = false;
  }

  @action changedefaultData(obj) {
    this.defaultData = obj;
  }


  //根据凭证字名称查询凭证字列表
  @action queryCertificateWordList({ certificateWord = '', pageNum = 1, pageSize = 10,success, error, showLoading, closeLoading }) {
    showLoading && showLoading();
    request({
      url: '/fm/certificateWord/queryCertificateWordList',
      method: 'GET',
      data: {
        certificateWord,
        pageNum,
        pageSize
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      
      if (json.code === "1" && json.data.length > 0) {
        this.wordList = json.data.map((obj, i) => {
          return obj;
        });
        this.temporaryPaging = {
          total: json.total,
          pages: json.pages,
        }

      } else { 
        error && error(json.data === null && this.currentPage.pageNum);
        this.wordList = [];
        this.temporaryPaging = {
          total: null,
          pages: null,
        }
      } 
      
      success && success(json.data)
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }



  //获取科目表的下拉选项
  @action getAccountCaptionTableList() {
    request({
      url: '/fm/accountingCaption/getAccountCaptionTableList',
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      if (json.code === "1" && json.data.length) {
        this.captionTableList = json.data.map((obj, i) => {
          return obj;
        });

      } else {
        this.captionTableList = [];
      }
    }).catch(error => {
    })
  }


  //添加科目
  @action getAccountCaptionList({ accCaptionTableID, accountingCaptionName = "", success,showLoading, closeLoading  }) {
    showLoading && showLoading();
    request({
      url: '/fm/accountingCaption/getAccountingCaptionList.json',
      method: 'GET',
      data: { accCaptionTableID, accountingCaptionName },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1" && json.data.length > 0) {
        this.accCaptionList = json.data.map((obj, i) => {
          return obj;
        });
        success && success();
      } else {

        this.accCaptionList = [];
        success && success();

      }
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }



  //添加凭证
  @action addCertificateWord({ certificateWordInfo, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    let WordInfo = JSON.stringify(certificateWordInfo);
    request({
      url: '/fm/certificateWord/addCertificateWord',
      method: 'POST',
      data: WordInfo,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("添加成功!");
      } else {
        message.destroy();
        message.warn(json.message);
      }

    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //删除凭证
  @action delCertificateWord({ certificateWordID, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/certificateWord/delCertificateWord',
      method: 'GET',
      data: { certificateWordID },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("删除成功!");
      } else if (json.code === "30001" || json.code === "30003") {
        message.destroy();
        message.warn(json.message)
      }
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //启用禁用
  @action modCertificateWordStatus({ certificateWordID, status, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/certificateWord/modCertificateWordStatus',
      method: 'GET',
      data: { certificateWordID, status },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
      } else {
        message.destroy();
        message.warn(json.message);
      }
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  //查看凭证字
  @action getCertificateWord({ certificateWordID, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    request({
      url: '/fm/certificateWord/getCertificateWord',
      method: 'GET',
      data: { certificateWordID },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(json => {
      closeLoading && closeLoading();
      this.certificateWordObj = json.data;
      success && success();
    }).catch(error => {
      closeLoading && closeLoading();
    })

  }


  //修改凭证字
  @action modCertificateWord({ certificateWordInfo, showLoading, closeLoading, success }) {
    showLoading && showLoading();
    let WordInfo = JSON.stringify(certificateWordInfo)
    request({
      url: '/fm/certificateWord/modCertificateWord',
      method: 'POST',
      data: WordInfo,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(json => {
      closeLoading && closeLoading();
      if (json.code === "1") {
        success && success();
        message.destroy();
        message.warn("修改成功!");
      } else {
        message.destroy();
        message.warn(json.message)
      }
    }).catch(error => {
      closeLoading && closeLoading();
    })
  }


  @action changeId(id) {
    this.getChangeId = id;
  }



}

export default new proofStore();