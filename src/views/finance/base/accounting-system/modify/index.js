import React from 'react';    
import { inject, observer } from 'mobx-react'; 
import {  WhiteButton, PurpleButton }   from 'components/Button.js'  
import { Input, Switch, Table, Select, Tabs } from 'antd';
import AddOrganization from '../add-organization';
import AddSubordinateDialog from '../add-subordinate';
import AddPolicyDialog from '../add-policy';
import { isInArray } from 'common/utils';
import { message } from 'antd';
import Modal from 'components/modal';

import './modify.less';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Option = Select.Option;
message.config({
    top: 200,
    duration: 2,
});

@inject('systemStore') @observer
class SystemModify extends React.Component{


    constructor(props) {
        super(props);
        
        let { systemStore } = this.props;

        let defaultAccPolicyIDs = [];
        if(systemStore.modDetail.accSystemOrgInfos){
            defaultAccPolicyIDs = systemStore.modDetail.accSystemOrgInfos.map((item)=>{
                return item.accPolicyIDs;
            })
        }
        this.state={

            stateDialog: '',

            accSystemID: systemStore.modDetail.accSystemID,
            accSystemName: systemStore.modDetail.accSystemName,
            defaultAccSystem: false,
            legalPersonAccSystem: systemStore.modDetail.legalPersonAccSystem,
            currentIndex: 0,
            parentRows: [],
            parSelectedItem: [],
            subRows: [],
            subSelectItem: [],
            defaultAccPolicyIDs: defaultAccPolicyIDs,
            accSystemOrgInfos : systemStore.modDetail.accSystemOrgInfos
            
            /*[
                 // {   
                //     key:orgID,
                 //    index:1,
                //     accOrgID:'',//组织id    修改时用的字段
                //     orgName:'组织名字',//组织名字
                //     accPolicyIDs:[], //通用会计政策
                //     accPolicyNameArr:[], //通用会计政策名称数组
                //     accPolicyName:'',//通用会计政策名称字符串
                //     defaultAccPolicyID:'',//默认会计政策id
                //     defaultAccPolicyName:'',
                   
                //     childs: [
                //         {
                //             key: '0-orgID',
                //             index: 1,
                //             mappingID:'',
                //             orgID: '', 
                //             orgName: '下级组织名称',  // 组织名称
                //             orgDescription: '下级组织描述' //组织描述
                //         },
                //         {
                //             key: '0-orgID',
                //             index: 2,
                //             mappingID:'',
                //             orgID: '', 
                //             orgName: '下级组织名称1',  // 组织名称
                //             orgDescription: '下级组织描述1' //组织描述
                //         }
                        
                //     ]
                // },
                
            ]*/
        }
    }

     //保存
     addSave=()=>{
        
        let { systemStore } = this.props;
        let { accSystemName, defaultAccSystem, legalPersonAccSystem, accSystemOrgInfos} = this.state;
        
        let mAccSystemOrgInfos = accSystemOrgInfos.map((item)=>{
            let { accOrgID,orgID, orgName,accPolicyIDs,defaultAccPolicyID, childs } = item;
            let mChilds =  childs.map((child)=>{
                let { mappingID, orgID, orgName, orgDescription } = child;
                return { mappingID, orgID, orgName, orgDescription }
            })

            return { accOrgID, orgID, orgName, accPolicyIDs, defaultAccPolicyID, childs: mChilds }
        })

        let isAccSystemName=true, isAccSystemOrgInfos = true, mIndex = false;

        if(accSystemName){
            isAccSystemName = true
        }else{
            isAccSystemName = false;
            message.destroy();
            message.info('请输入名称');
        }

        if(isAccSystemName){

            if(mAccSystemOrgInfos.length>0){
                isAccSystemOrgInfos = true;
                mAccSystemOrgInfos.forEach((item,index)=>{
                    
                    if(item.accPolicyIDs.length===0){
                        isAccSystemOrgInfos=false;
                        message.destroy();
                        message.info('第'+(index+1)+'行请选择适用会计政策');
    
                        return;
                    }
        
                    if(item.defaultAccPolicyID){
    
                    }else{
                        isAccSystemOrgInfos=false;
                        message.destroy();
                        message.info('第'+(index+1)+'行请选择默认会计政策');
    
                        return;
                    }
    
                    if(item.childs.length===0){
                        isAccSystemOrgInfos=false;
                        message.destroy();
                        message.info('第'+(index+1)+'行没有下级组织');
    
                        return;
                    }
    
                    if(index===mAccSystemOrgInfos.length-1){
                        mIndex = true;
                    }
        
                })
            }else{
                isAccSystemOrgInfos = false;
                message.destroy();
                message.info('请添加核算组织');
            }
            
        }

        if(isAccSystemName && isAccSystemOrgInfos && mIndex ){

            let accSystemOrgInfo = {
                accSystemID: this.state.accSystemID,
                accSystemName,
                defaultAccSystem,
                legalPersonAccSystem,
                accSystemOrgInfos: mAccSystemOrgInfos
            };
            this.setState({stateDialog:<Modal
                title='保存核算体系'
                toast='核算组织与下级组织保存后将不能修改，是否继续？'
                onCancel={()=>{
                    this.setState({stateDialog:''})
                }}
                onOk={()=>{
                    this.setState({stateDialog:''})
                    systemStore.modAccountingSystem({
                        accSystemOrgInfo,
                        success: ()=>{
                          systemStore.changePageControl('SystemMain');
                        }
                    })
                }}
            />})
            
        }
    }
    

  //添加核算组织
  addOrgan=()=>{
    let accSystemOrgInfos = this.state.accSystemOrgInfos;
    let orgIDs = accSystemOrgInfos.map((item)=>{
        if(item.orgID){
            return item.orgID
        }
    });

    this.setState({stateDialog: <AddOrganization 
        onCancel={()=>{
            this.setState({stateDialog:''});
        }}
        orgIDs={orgIDs}
        onOk={(orgIDs, orgNames)=>{
            let accSystemOrgInfos = this.state.accSystemOrgInfos;
            let mIndex = accSystemOrgInfos.length;
           
            this.setState({stateDialog:''})

            orgIDs.forEach((item,index)=>{
                accSystemOrgInfos.push({
                    key:orgIDs[index],
                    index: index+mIndex+1,
                    orgID: orgIDs[index],//组织id
                    orgName: orgNames[index],//组织名字
                    accPolicyIDs:[], //通用会计政策
                    accPolicyNameArr:[], //通用会计政策名称数组
                    accPolicyName:'',//通用会计政策名称字符串
                    defaultAccPolicyID:'',//默认会计政策id
                    defaultAccPolicyName:'',
                    childs:[]
                })
            })
            this.setState({accSystemOrgInfos});
        }}
    />});

}

    render(){
        let { systemStore } = this.props;
        let { parentRows, subRows } = this.state;

        let columnsLeft=[
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 50,
            },
            {
                title: <div><i className="xing">*</i>核算组织</div>,
                dataIndex: 'orgName',
                key: 'orgName',
                width: 120,
                render: (text,record,index)=>{
                    
                    return <div>{text}</div>
                }
            },
            {
                title: <div><i className="xing">*</i>适用会计政策</div>,
                dataIndex: 'accPolicyName',
                key: 'accPolicyName',
                width: 120,
                render: (text,record,index)=>{
                    //存在的核算组织不能删除   新加的可以删除
                    if(record.accOrgID){
                        return <Search value={record.accPolicyName} onClick={()=>{
                            let accSystemOrgInfos = this.state.accSystemOrgInfos;
                            let defaultAccPolicyIDs = this.state.defaultAccPolicyIDs;
                            let accPolicyIDs =  defaultAccPolicyIDs[index]||[];
    
                            this.setState({stateDialog: <AddPolicyDialog 
                                accPolicyIDs={ accPolicyIDs }
                                onCancel={()=>{
                                    this.setState({stateDialog:''});
                                }}
                                onOk={(accPolicyIDs,accPolicyNameArr,accPolicyName)=>{
                                    this.setState({stateDialog:''});
                                    let mAccPolicyIDs = defaultAccPolicyIDs[index];
                                    accSystemOrgInfos[index].accPolicyIDs = mAccPolicyIDs.concat(accPolicyIDs);
    
                                    let mAccPolicyNameArr = accSystemOrgInfos[index].accPolicyNameArr.filter((item)=>{
                                        return isInArray(mAccPolicyIDs, item.accPolicyID);
                                    });
                                    accSystemOrgInfos[index].accPolicyNameArr = mAccPolicyNameArr.concat(accPolicyNameArr);
    
                                    let mAccPolicyName = mAccPolicyNameArr.map((item)=>{
                                        return item.accPolicyName
                                    }).toString();
                                    accSystemOrgInfos[index].accPolicyName = mAccPolicyName.concat(','+accPolicyName);
    
                                    this.setState({accSystemOrgInfos});
                                }}
                            />})
                        }} />
                    }else{
                        return <Search value={record.accPolicyName} onClick={()=>{
                            
                            this.setState({stateDialog: <AddPolicyDialog 
                                accPolicyIDs={[]}
                                onCancel={()=>{
                                    this.setState({stateDialog:''});
                                }}
                                onOk={(accPolicyIDs,accPolicyNameArr,accPolicyName)=>{
                                    this.setState({stateDialog:''});
                                    let accSystemOrgInfos = this.state.accSystemOrgInfos;
                                    accSystemOrgInfos[index].accPolicyIDs=accPolicyIDs;
                                    accSystemOrgInfos[index].accPolicyNameArr = accPolicyNameArr;
                                    accSystemOrgInfos[index].accPolicyName=accPolicyName;
                                    accSystemOrgInfos[index].defaultAccPolicyID='';//清空默认会计政策
                                    accSystemOrgInfos[index].defaultAccPolicyName='';//清空默认会计政策名称
                                    this.setState({accSystemOrgInfos});
                                }}
                            />})
                        }} />
                    }
                   
                }

            },
            {
                title: <div><i className="xing">*</i>默认会计政策</div>,
                dataIndex: 'defaultAccPolicyName',
                key: 'defaultAccPolicyName',
                render: (text,record,index)=>{
                    //存在的核算组织  默认的不能修改
                    if(record.accOrgID){
                        return <div>{record.defaultAccPolicyName}</div>
                    }else{
                        let accSystemOrgInfos = this.state.accSystemOrgInfos;
                        let currentIndex = this.state.currentIndex;
                        return  <Select 
                            value={accSystemOrgInfos[index]?accSystemOrgInfos[index].defaultAccPolicyID:''}
                            style={{ width: 150 }} 
                            onSelect={(value,option)=>{
                                
                                accSystemOrgInfos[currentIndex].defaultAccPolicyID = value;
                                
                                this.setState({accSystemOrgInfos});
                            }}>
                            {record.accPolicyNameArr.map((item,index)=>{
                                return  <Option key={index} value={item.accPolicyID+''}>{item.accPolicyName}</Option>
                            })}
                        </Select>
                    }
                    
                }
            }
        ]
        
        let columnsRight = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                width: 50,
                render: (text)=>{
                    
                    return <div>{text}</div>
                }
            },
            {
                title: <div><i className="xing">*</i>下级组织</div>,
                dataIndex: 'orgName',
                key: 'orgName',
                width: 120
            },
            {
                title: '描述',
                dataIndex: 'orgDescription',
                key: 'orgDescription',
                render: (text,record,index)=>{
                    let accSystemOrgInfos = this.state.accSystemOrgInfos;
                    let currentIndex = this.state.currentIndex;
                    let childs = accSystemOrgInfos[currentIndex].childs;
                    
                    return <Input 
                    value = { accSystemOrgInfos[currentIndex] ? childs[index].orgDescription: ''}
                    placeholder="请输入描述"
                    onChange={(e)=>{
                        let value = e.target.value;
                        if(value.length<=200){
                            childs[index].orgDescription = value;
                            accSystemOrgInfos[currentIndex].childs = childs
                            this.setState({ accSystemOrgInfos });
                        }
                    }}
                    />
                }
            }
        ]
        return <div id='system-modify'>
            <div className="add-top"> 
                <WhiteButton  onClick={()=>{
                    systemStore.changePageControl("SystemMain"); 
                }}>返回</WhiteButton>  
                <PurpleButton onClick={()=>{
                    this.addSave();
                }}>保存</PurpleButton>  
                 
            </div> 
            <div className="add-main">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="基本信息" key="1">
                        <div className="add-toast">
                            说明：
                            一个集团（商家）必须有一个默认的核算体系，系统通过默认核算体系业务组织所属核算组织的默认会计政策，获取币别、汇率等信息。
                        </div>
                        <div className="add-toggle">
                            <div className="input">
                                <span><i className="xing">*</i>名称</span>
                                <Input 
                                    style={{height: 36}}
                                    value={this.state.accSystemName}
                                    placeholder="请输入名称" 
                                    onChange={(e)=>{
                                    let value = e.target.value;
                                    if(/^[0-9a-zA-Z\u4e00-\u9fa5]*$/.test(value) && value.length<=20){
                                        this.setState({ accSystemName: e.target.value });
                                    }
                                }}/>
                            </div>
                            {systemStore.modDetail &&systemStore.modDetail.defaultAccSystem && <div className="default">
                                默认核算体系
                            </div>}
                            <div className="default">
                                <span>法人核算体系</span>
                                <Switch 
                                  checkedChildren="是" 
                                  unCheckedChildren="否"
                                  defaultChecked={this.state.legalPersonAccSystem}
                                  onChange={(checked)=>{
                                      this.setState({legalPersonAccSystem: checked});
                                  }}
                                />
                            </div>
                            
                        </div>
                        <div className="add-table">
                            <div className="table-left">
            
                                <div className="btns">
                                    <PurpleButton 
                                        width={'120px'} 
                                        className="btn-item" 
                                        onClick={()=>{
            
                                            this.addOrgan(); //添加核算组织
                                        
                                        }}
                                    >添加核算组织</PurpleButton>
                                    <WhiteButton 
                                        width={'120px'}
                                        onClick={()=>{
                                           
                                            let accSystemOrgInfos = this.state.accSystemOrgInfos;
                                            let parSelectedItem = this.state.parSelectedItem;
            
                                            if(parSelectedItem.length>0){

                                                let parentRows=[];
                                                parSelectedItem.forEach((item)=>{
                                                    if(item.accOrgID){
                                                        message.destroy();
                                                        message.info('已经存在的数据不能删除');
                                                    }else{
                                                        parentRows.push(item.key)
                                                    }
                                                });
                                                accSystemOrgInfos = accSystemOrgInfos.filter((item)=>{
                                                    return !isInArray(parentRows,item.key)
                                                });
                                                accSystemOrgInfos = accSystemOrgInfos.map((item,index)=>{
                                                    item.index = index+1;
                                                    return item;
                                                });
                                                this.setState({ 
                                                    accSystemOrgInfos,
                                                    currentIndex: 0,
                                                    parentRows:[],
                                                    parSelectedItem: []

                                                 });
                                            }else{
                                                message.destroy();
                                                message.info('请选择数据');
                                            }
                                        
                                        }}
                                    >删除核算组织</WhiteButton>
                                </div>
                                <div className="table">
                                    <Table 
                                        bordered
                                        size='middle'
                                        dataSource={this.state.accSystemOrgInfos} 
                                        columns={columnsLeft} 
                                        rowClassName={(record,index)=>{
                                            if(this.state.currentIndex*1===index){
                                                return 'row-selected'
                                            }else{
                                                return '';
                                            }
                                        }}
                                        rowSelection={{
                                            selectedRowKeys:parentRows,
                                            onChange: (selectedRowKeys, selectedRow)=>{
                                                this.setState({ parentRows: selectedRowKeys, parSelectedItem: selectedRow  });
                                            },
                                        }}
                                        onRowClick={(record, index, event)=>{
                                          this.setState({currentIndex:index});
                                        }}
                                        scroll={{ y: 250 }}
                                        pagination={false}
                                    />                       
                                </div>
                            </div>
                            <div className="table-right">
                                <div className="btns">
                                    <PurpleButton 
                                        width={'120px'} 
                                        className="btn-item"
                                        onClick={()=>{
        
                                            let accSystemOrgInfos = this.state.accSystemOrgInfos;
                                
                                            if(accSystemOrgInfos.length>0){ 
                                                let currentIndex = this.state.currentIndex;
                                                let childs = accSystemOrgInfos[currentIndex].childs;
            
                                                let mOrgIDs = childs.map((item)=>{
                                                    return item.orgID
                                                });
                                                let orgID = accSystemOrgInfos[currentIndex].orgID;

                                                this.setState({stateDialog: <AddSubordinateDialog
                                                    orgID={orgID}
                                                    onCancel={()=>{
                                                        this.setState({stateDialog:''})
                                                    }} 
                                                    orgIDs={ mOrgIDs }
                                                    onOk={(orgIDs,orgNames)=>{
                                                        this.setState({stateDialog:''});
                                                        
                                                        let mLength = childs.length;
                                                        
                                                        orgIDs.forEach((ele,index)=>{
                                                            childs.push({
                                                                key: this.state.currentIndex+"-"+orgIDs[index],
                                                                index:index+1+mLength,
                                                                orgID: orgIDs[index], 
                                                                orgName: orgNames[index], 
                                                                orgDescription: '' 
                                                            })
                                                        })
                                                        accSystemOrgInfos[currentIndex].childs = childs;
                
                                                        this.setState({ accSystemOrgInfos });
                                                    
                                                    }}                                   
                                                />});
                                            }else{
                                                message.destroy();
                                                message.info('请先添加核算组织');
                                            }
                                        
                                        }}
                                    >添加下级组织</PurpleButton>
                                    <WhiteButton width={'120px'} onClick={()=>{
                                        let subSelectItem = this.state.subSelectItem;

                                        if(subSelectItem.length>0){
                                            let accSystemOrgInfos = this.state.accSystemOrgInfos;
                                            let currentIndex = this.state.currentIndex;
                                            let childs = accSystemOrgInfos[currentIndex].childs;
                                            
                                            let subRows=[];
                                            subSelectItem.forEach((item)=>{
                                                if(item.mappingID){
                                                    message.destroy();
                                                    message.info('已经存在的数据不能删除');
                                                }else{
                                                    subRows.push(item.orgID)
                                                }
                                            })
                                            childs = childs.filter((item)=>{
                                                return !isInArray(subRows,item.orgID)
                                            });
                                            childs = childs.map((item,index)=>{
                                                item.index = (index+1);
                                                return item;
                                            })
                                            accSystemOrgInfos[currentIndex].childs = childs;
            
                                            this.setState({accSystemOrgInfos, subRows:[], subSelectItem: []});
                                        }else{
                                            message.destroy();
                                            message.info('请选择数据');
                                        }
            
                                    }}>删除下级组织</WhiteButton>
                                </div>
                                <div className="table">
                                    <Table
                                        bordered
                                        size='middle'
                                        dataSource={this.state.accSystemOrgInfos[this.state.currentIndex] ? this.state.accSystemOrgInfos[this.state.currentIndex].childs : []} 
                                        columns={columnsRight} 
                                        rowSelection={{
                                            selectedRowKeys: subRows,
                                            onChange: (selectedRowKeys, selectedRows)=>{
                                                this.setState({ subRows: selectedRowKeys, subSelectItem: selectedRows});
                                            },
                                        }}
                                        scroll={{ y: 250 }}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </div>
                        {this.state.stateDialog}
                    </TabPane>


                    <TabPane tab="操作记录" key="2">
                        暂时没有操作记录
                    </TabPane>
                </Tabs>
            </div>
        </div>
    }
}

export default SystemModify;