import React from 'react';
import { Modal, Table, Input } from 'antd';
import { WhiteButton, PurpleButton }   from 'components/Button.js'  
import { inject, observer } from 'mobx-react'; 
import { message } from 'antd';
import { isInArray } from 'common/utils'

import './add-organization.less';
message.config({
    top: 200,
    duration: 2,
});

@inject('systemStore') @observer
class AddOrganizationDialog extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selectedRowKeys: '',
            selectedRows: [],
            orgName: ''
        }

        let { systemStore } = this.props;

        systemStore.queryOrganization({orgName:''}); 
    }

    render(){
        let  { onCancel, onOk, systemStore, orgIDs } = this.props;

        let parentOrgList = systemStore.parentOrgList.filter((item)=>{

            return !isInArray(orgIDs,item.orgID)
        })

        const columns = [{
            title: '组织',
            dataIndex: 'orgName',
            key: 'orgName',
        }];
        return <Modal
            title="添加核算组织"
            visible={true}
            width={550}
            height={400}
            maskClosable={false}   
            footer={null}
            wrapClassName='organization-add-modal'
            onCancel={()=>{
                onCancel&&onCancel();
            }}
         >
        <div className="search-name">
            <Input 
                size="large" 
                placeholder="请输入名称查询" 
                onChange={(e)=>{
                    this.setState({orgName: e.target.value.trim()})
                }}
                onPressEnter={()=>{
                    let orgName = this.state.orgName;
                    systemStore.queryOrganization({orgName}); 
                }}
            />
            <PurpleButton height={'32px'} onClick={()=>{
                let orgName = this.state.orgName;
                systemStore.queryOrganization({orgName}); 
            }}>查询</PurpleButton>
        </div>
        <div className="add-table"> 
            <Table 
                bordered
                size='middle'
                dataSource={parentOrgList} 
                columns={columns} 
                rowSelection={{
                    onChange: (selectedRowKeys,selectedRows)=>{
                        this.setState({ selectedRowKeys, selectedRows });
                    }
                }}
                scroll={{ y: 200 }}
                pagination={false}
            />
        </div>
        <div className="add-buttons">
            <WhiteButton onClick={()=>{
                onCancel&&onCancel();
            }}>取消</WhiteButton>
            <PurpleButton onClick={()=>{
              let selectedRows = this.state.selectedRows;
              let orgIDs=selectedRows.map((item)=>{
                 return item.orgID;
              })
              let orgNames = selectedRows.map((item)=>{
                 return item.orgName;
              })
              if(selectedRows.length>0){
                onOk&&onOk(orgIDs,orgNames);
              }else{
                 message.destroy();
                 message.info("请选择数据");
              }
            }}>确定</PurpleButton>
        </div>
        {this.state.loading}
      </Modal>
    }
}

export default AddOrganizationDialog;