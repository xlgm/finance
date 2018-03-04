import { observable, action } from 'mobx';
import request from 'common/request.js';
import { message } from 'antd';
import moment from 'moment';
message.config({ top: 200, duration: 2 });

class voEntryStore {
  @observable loading;
  @observable colums;//所有的列
  @observable voucherState;//当前凭证状态
  @observable currentRow;//当前的行
  @observable currentPosition;//当前的位置
  @observable voucher; //凭证所有信息
  @observable allLeadgers//所有账簿信息
  @observable allCertificateWords;//所有凭证字信息
  @observable allDigests//所有摘要信息


  constructor() {
    this.loading = true;
    this.currentRow='';
    this.currentPosition='';
    this.voucherState = 'CREATE';//  CREATE 创建  EDIT 编辑  CHECK 审核  HAS_CHECKED 已审核  HAS_INVALOID 已作废 

    this.colums = [
     '序号', '摘要', '会计科目', '借方金额', '贷方金额'
    ]

    this.voucher = {
      booksID: '',//账簿ID
      accOrgName: '', //账簿对应核算组织名称
      certificateWordID: '',//凭证字ID
      accCaptionTableID: '',//科目表ID
      elementTableID: '', //会计要素表ID
      certificateOrder: 1,//凭证字号
      certificateDate: moment(), //凭证日期
      attachmentNum: '',//附件数
    }
    this.allLeadgers = [];
    this.allCertificateWords = [];
    this.allDigests = [];

  }

 /***************************基础数据接口*************************************/

  //查询账簿
  @action queryLedger() {
    request({
      url: '/fm/common/queryBooks',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((json) => {
      if(json.code*1===1){
        this.allLeadgers = json.data.map((item,index)=>{
          let { booksID, booksName, accOrgName} = item;
          let myBooksID = booksID+'';
          return { booksID:myBooksID, booksName, accOrgName }
        })
        //设置第1条为默认值
        if(this.allLeadgers.length>0){
          this.voucher.booksID = this.allLeadgers[0].booksID;
          this.voucher.accOrgName = this.allLeadgers[0].accOrgName;
        }
      }
    }).catch((error) => {})
  }

  //账簿onChange事件
  @action ledgerOnChange(booksID){
    this.voucher.booksID = booksID;
    let target = [];
    if(this.allLeadgers.length>0){
      target  = this.allLeadgers.filter((item)=>{
        return item.booksID===booksID;
      })
    }
    this.voucher.accOrgName = target[0].accOrgName;
  }


  //查询凭证字
  @action queryProof() {
    request({
      url: '/fm/common/queryCertificateword',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((json) => {
      if(json.code*1===1){
        this.allCertificateWords = json.data.map((item)=>{
          let { certificateWordID, certificateWord } = item;
          let myId = certificateWordID+'';
          return { certificateWordID: myId, certificateWord }
        });
        if(this.allCertificateWords.length>0){
          this.voucher.certificateWordID = this.allCertificateWords[0].certificateWordID;
        }
      }
    }).catch((error) => {})
  }

  //凭证字onChange事件
  @action certificateWordOnChange(certificateWordID){
    this.voucher.certificateWordID = certificateWordID;
  }

  //凭证字号onChange事件
  @action certificateOrderOnChange(certificateOrder){
    this.voucher.certificateOrder = certificateOrder;
  }

  //凭证日期onChange事件
  @action certificateDateOnChange(date){
    this.voucher.certificateDate = date;
  }
  //附件数
  @action attachmentNumOnChange(number){
    this.voucher.attachmentNum = number;
  }

  //查询摘要
  @action queryDigest() {
    request({
      url: '/fm/common/queryAbstract',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((json) => {
      if(json.code*1===1){
        this.allDigests.map((item,index)=>{
          let { abstractID, abstractName } = item;
          let myId = abstractID+'';
          return { abstractID:myId, abstractName }
        })
      }
      
    }).catch((error) => {})
  }

  //查询科目
  @action querySubject() {
    request({
      url: '/fm/common/queryBooks',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((json) => {
      
    }).catch((error) => {})
  }

  
  

}

export default new voEntryStore();