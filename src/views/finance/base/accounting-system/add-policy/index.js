import React from 'react';
import { Modal, Table, Input } from 'antd';
import { WhiteButton, PurpleButton }   from 'components/Button.js'  
import { inject, observer } from 'mobx-react'; 
import { message } from 'antd';
import { isInArray } from 'common/utils'

import './add-policy.less';
message.config({
    top: 200,
    duration: 2,
});

@inject('systemStore') @observer
class AddPolicyDialog extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selectedRowKeys: '',
            selectRows: [],
            accPolicyName: ''
        }

        let { systemStore } = this.props;
        systemStore.queryCommonAccuunt({accPolicyName: ''}); 

    }

    render(){
        let  { onCancel, onOk, systemStore, accPolicyIDs } = this.props;

        const columns = [{
            title: '适用会计政策',
            dataIndex: 'accPolicyName',
            key: 'accPolicyName',
        }];

        let commonAccList=[];
        if(systemStore.commonAccList){
            commonAccList = systemStore.commonAccList.map((item)=>{
                let {accPolicyID, accPolicyName} = item;
                return {accPolicyID, accPolicyName}
            })
        }

        commonAccList = commonAccList.filter((item)=>{
            return !isInArray( accPolicyIDs, item.accPolicyID )
        })

        return <Modal
            title="添加适用会计政策"
            visible={true}
            width={550}
            height={400}
            footer={null}
            maskClosable={false}   
            wrapClassName='organization-add-policy'
            onCancel={()=>{
                onCancel&&onCancel();
            }}
         >
        <div className="search-name">
            <Input 
                size="large" 
                placeholder="请输入名称查询" 
                onChange={(e)=>{
                    this.setState({accPolicyName: e.target.value.trim()})
                }}
                onPressEnter={()=>{
                    systemStore.queryCommonAccuunt({accPolicyName: this.state.accPolicyName}); 
                }}
            />
            <PurpleButton height={'32px'} onClick={()=>{
                systemStore.queryCommonAccuunt({accPolicyName: this.state.accPolicyName}); 
            }}>查询</PurpleButton>
        </div>
        <div className="add-table"> 
            <Table 
                bordered
                size='middle'
                dataSource={commonAccList} 
                columns={columns} 
                rowSelection={{
                    onChange: (selectedRowKeys,selectRows)=>{
                        this.setState({ selectedRowKeys,selectRows });
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
                let selectRows = this.state.selectRows;
                let accPolicyIDs, accPolicyName,accPolicyNameArr;
                if(selectRows.length>0){
                    accPolicyIDs= selectRows.map((item)=>{
                        return item.accPolicyID
                    })

                    accPolicyNameArr = selectRows.map((item)=>{
                        let accPolicyID=item.accPolicyID;
                        let accPolicyName = item.accPolicyName;
                        return { accPolicyID, accPolicyName }
                     });
                    accPolicyName= selectRows.map((item)=>{
                       
                        return item.accPolicyName
                    }).toString();

                    onOk&&onOk(accPolicyIDs,accPolicyNameArr,accPolicyName);
                }else{
                    message.destroy();
                    message.info('请选择数据');
                }
            }}>确定</PurpleButton>
        </div>
        {this.state.loading}
      </Modal>
    }
}

export default AddPolicyDialog;