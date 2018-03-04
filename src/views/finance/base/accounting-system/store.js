import {observable, action} from 'mobx';
import request from 'common/request.js';
import {message} from 'antd';
message.config({top: 200, duration: 2});

class systemStore {
  @observable pageControl; //页面控制
  @observable isShowLoading; //是否显示loading
  @observable systemList; //主页列表
  @observable systemMain; //主页数据
  @observable parentOrgList; //核算组织
  @observable commonAccList; //通用会计政策
  @observable childOrgList; //下级组织
  @observable systemDetail; //详情数据
  @observable modDetail; //修改时根据id获取的详情数据
  @observable checkDefaultSystem; //是否为默认核算体系

  @observable currentPage;  //修改时当前页
  

  constructor() {

    this.pageControl = "SystemMain";
    this.isShowLoading = false;
    this.systemList = [];
    this.systemMain = '';
    this.parentOrgList = [];
    this.commonAccList = [];
    this.childOrgList = [];
    this.systemDetail = '';
    this.modDetail = '';
    this.checkDefaultSystem = '';

    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      accSystemName: ''
    };
    
  }

  //控制显示的页面
  @action changePageControl(page) {
    this.pageControl = page;
  }

  @action showLoading() {
    this.isShowLoading = true;
  }

  @action closeLoading() {
    this.isShowLoading = false;
  }

  @action clearCurrentPage(){
    this.currentPage = {
      pageNum: 1,
      pageSize: 10,
      accSystemName: ''
    };
  }

  @action changeCurrentPage(currentPage){
    this.currentPage = currentPage;
  }

  //获取数据
  @action queryAccountingSystemList(data,success) {

    this.isShowLoading = true;
    request({
      url: '/fm/accountingSystem/queryAccountingSystemList',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then((json) => {
      this.isShowLoading = false;
      if (json.code * 1 === 1) {
        success&&success(json.data);
        this.systemMain = json;
        this.systemList = json
          .data
          .map((item) => {
            item.key = item.accSystemID;
            return item;
          });
      }
    }).catch((error) => {
      this.isShowLoading = false;
    })
  }

  /**********************************添加**************************************************/

  //检测switch是否能够选择
  @action checkAddSwitch() {

    request({
      url: '/fm/accountingSystem/getAccSystemMessage',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((json) => {
      if (json.code * 1 === 1) {
        this.checkDefaultSystem = json.data;
      }
    })
  }
  //查询核算组织
  @action queryOrganization(data) {
    request({
      url: '/fm/organization/queryAll',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then((json) => {

      if (json.code * 1 === 1) {

        this.parentOrgList = json
          .data
          .map((item) => {
            item.key = item.orgID;
            return item;
          });
      }
    }).catch((error) => {})
  }

  //查询通用会计政策
  @action queryCommonAccuunt(data) {
    request({
      url: '/fm/accountingPolicy/queryEnabledAccPolicyInfoList',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then((json) => {
      if (json.code * 1 === 1) {
        this.commonAccList = json
          .data
          .map((item) => {
            item.key = item.accPolicyID
            return item;
          });
      }
    }).catch((error) => {})

  }

  //查询下级组织
  @action queryChildOranization(data) {

    request({
      url: '/fm/organization/queryAll',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then((json) => {
      if (json.code * 1 === 1) {
        this.childOrgList = json
          .data
          .map((item) => {
            item.key = item.orgID;
            return item;
          });
      }
    }).catch((error) => {})

  }

  //添加
  @action addAccountingSystem({accSystemOrgInfo, success}) {

    this.isShowLoading = true;
    request({
      url: '/fm/accountingSystem/addAccountingSystem',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(accSystemOrgInfo)
    }).then((json) => {
      this.isShowLoading = false;
     
      if (json.code * 1 === 1) {
        success && success();
        message.destroy();
        message.success("添加成功");
      }else{
        message.destroy();
        message.info(json.message);
  
      }
    }).catch((error) => {
      this.isShowLoading = false;
    })
  }

  //修改
  @action modAccountingSystem({accSystemOrgInfo, success}) {
    this.isShowLoading = true;
    request({
      url: '/fm/accountingSystem/modAccountingSystem',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(accSystemOrgInfo)
    }).then((json) => {
      this.isShowLoading = false;
     

      if (json.code * 1 === 1) {
        success && success();
        message.destroy();
        message.success("修改成功");
      }else{
        message.destroy();
        message.info(json.message);
      }
    }).catch((error) => {
      this.isShowLoading = false;
    })
  }
  //修改  根据id查询详情

  @action modQueryDetail({accSystemID, success}) {
   
    request({
      url: '/fm/accountingSystem/queryAccountingSystem',
      method: 'GET',
      data: {
        accountingSystemID: accSystemID
      }
    }).then((json) => {
      if (json.code * 1 === 1) {
        let detail = json.data;
        let {accSystemID, accSystemName, legalPersonAccSystem, defaultAccSystem, accSystemOrgInfos} = detail;
        let mAccSystemOrgInfos = accSystemOrgInfos.map((item, mIndex) => {
          let mKey = mIndex + 1;
          let {
            accPolicyInfoList,
            accOrgID,
            orgID,
            defaultAccPolicyID,
            defaultAccPolicyName,
            orgName,
            childs
          } = item;
          let mPoliceNames = accPolicyInfoList.map((police) => {
            return police.accPolicyName
          })

          let accPolicyNameArr = accPolicyInfoList.map((item) => {
            let {accPolicyID, accPolicyName} = item;

            return {accPolicyID, accPolicyName}
          })
          let accPolicyIDs = accPolicyInfoList.map((item) => {
            return item.accPolicyID;
          })

          let mChilds = childs.map((child, index) => {
            let key = mIndex + '-' + child.orgID;
            let subIndex = index + 1;
            let {orgName, orgDescription, orgID, mappingID} = child;
            return {
              key,
              index: subIndex,
              orgID,
              orgName,
              orgDescription,
              mappingID
            }
          })

          return {
            key: accOrgID,
            index: mKey,
            accOrgID,
            orgID,
            orgName,
            accPolicyIDs,
            accPolicyNameArr,
            accPolicyName: mPoliceNames.toString(),
            defaultAccPolicyID,
            defaultAccPolicyName,
            childs: mChilds
          }
        })
        let accSystemOrgInfo = {
          accSystemID,
          accSystemName,
          legalPersonAccSystem,
          defaultAccSystem,
          accSystemOrgInfos: mAccSystemOrgInfos
        }

        this.modDetail = accSystemOrgInfo;
        if (accSystemOrgInfo.accSystemID) {

          success && success();
        }
      }
    }).catch((error) => {})
  }

  /*******************************************************************************************/

  //查看详情 根据id查询详情
  @action queryDetail({accSystemID, success}) {
    request({
      url: '/fm/accountingSystem/queryAccountingSystem',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        accountingSystemID: accSystemID
      }
    }).then((json) => {
      if (json.code * 1 === 1) {
        let detail = json.data;
        let {accSystemID, accSystemName, legalPersonAccSystem, defaultAccSystem, accSystemOrgInfos} = detail;
        let mAccSystemOrgInfos = [];
        if (accSystemOrgInfos.length > 0) {
          mAccSystemOrgInfos = accSystemOrgInfos.map((item, mIndex) => {
            let mKey = mIndex + 1;
            let {accPolicyInfoList, defaultAccPolicyName, orgName, childs} = item;
            let mPoliceNames = accPolicyInfoList.map((police) => {
              return police.accPolicyName
            })
            let mChilds = childs.map((child, index) => {
              let key = index + 1;
              let {orgName, orgDescription} = child;
              return {key, orgName, orgDescription}
            })
            return {
              key: mKey,
              orgName,
              accPolicyName: mPoliceNames.toString(),
              defaultAccPolicyName,
              childs: mChilds
            }
          })
        }

        let accSystemOrgInfo = {
          accSystemID,
          accSystemName,
          legalPersonAccSystem,
          defaultAccSystem,
          accSystemOrgInfos: mAccSystemOrgInfos
        }

        this.systemDetail = accSystemOrgInfo;

        if (accSystemOrgInfo.accSystemID) {

          success && success();
        }
      } else {
        message.destroy();
        message.info(json.message);
      }
    }).catch((error) => {})
  }

  //清空详情数据
  @action clearDetail() {
    this.systemDetail = '';
  }
  //禁用
  @action disable({accSystemIDs, success}) {

    request({
      url: '/fm/accountingSystem/batchDisableAccountingSystem',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        accSystemIDs: accSystemIDs
      }
    }).then((json) => {
     
      if (json.code * 1 === 1) {
        success && success();
        message.destroy();
        message.success("禁用成功");
      }else{
        message.destroy();
        message.info(json.message);

      }
    }).catch((error) => {})

  }

  //启用
  @action enable({accSystemIDs, success}) {

    request({
      url: '/fm/accountingSystem/batchEnableAccountingSystem',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        accSystemIDs: accSystemIDs
      }
    }).then((json) => {
     
      if (json.code * 1 === 1) {
        success && success();
        message.destroy();
        message.success("启用成功");
      }else{
        message.destroy();
        message.info(json.message);
      }
    }).catch((error) => {})

  }

  //删除
  @action delete({accSystemIDs, success}) {
    request({
      url: '/fm//accountingSystem/batchDeleteAccountingSystem',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        accSystemIDs: accSystemIDs
      }
    }).then((json) => {
     
      if (json.code * 1 === 1) {
        success && success();
        message.destroy();
        message.success("删除成功");
      }else{
        message.destroy();
        message.info(json.message);
      }
    }).catch((error) => {})
  }

}

export default new systemStore();