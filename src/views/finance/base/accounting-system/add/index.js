import React from 'react';    
import { WhiteButton, PurpleButton }   from 'components/Button.js'  
import { inject, observer } from 'mobx-react'; 
import { Input, Switch, Table, Select } from 'antd';
import AddOrganization from '../add-organization';
import AddSubordinateDialog from '../add-subordinate';
import AddPolicyDialog from '../add-policy';
import { isInArray } from 'common/utils';
import Modal from 'components/modal';
import { message } from 'antd';


import './add-body.less';
const Search = Input.Search;
const Option = Select.Option;
message.config({
    top: 200,
    duration: 2,
});

@inject('systemStore') @observer
class SystemAdd extends React.Component{

    constructor(props) {
        super(props);
        this.state={

            stateDialog: '',

            accSystemName: '',
            defaultAccSystem: false,
            legalPersonAccSystem: false,
            currentIndex: 0,

            parentRows: [],
            subRows: [],

            accSystemOrgInfos : [
               /* {   
                    key:orgID,
                    index:1,
                /////////////    accOrgID:'',//组织id    修改时用的字段
                    orgID:'',
                    orgName:'组织名字',//组织名字
                    accPolicyIDs:[], //通用会计政策
                    accPolicyNameArr:[], //通用会计政策名称数组
                    accPolicyName:'',//通用会计政策名称字符串
                    defaultAccPolicyID:'',//默认会计政策id
                    defaultAccPolicyName:'',
                   
                    childs: [
                        {
                            key: '0-orgID',
                            index: 1,
                            orgID: '', 
                            orgName: '下级组织名称',  // 组织名称
                            orgDescription: '下级组织描述' //组织描述
                        },
                        {
                            key: '0-orgID',
                            index: 2,
                            orgID: '', 
                            orgName: '下级组织名称1',  // 组织名称
                            orgDescription: '下级组织描述1' //组织描述
                        }
                        
                    ]
                },
                {   
                    key:2,
                    accOrgID:'',//组织id
                    orgName:'组织名字1',//组织名字
                    accPolicyIDs:[], //通用会计政策
                    accPolicyNameArr:[], //通用会计政策名称数组
                    accPolicyName:'',//通用会计政策名称字符串
                    defaultAccPolicyID:'',//默认会计政策id
                    defaultAccPolicyName:'',
                                    
                    childs: [{
                        key: '1-orgID',
                        index: 1,
                        orgID: '',
                        orgName: '下级组织名称1111',  // 组织名称
                        orgDescription: '下级组织描述1111' //组织描述
                    },
                    {
                        key: '1-orgID',
                        index: 2,
                        orgID: '', 
                        orgName: '下级组织名称10111',  // 组织名称
                        orgDescription: '下级组织描述11111' //组织描述
                    }
                    ]
                }*/
            ]
        }
    }


    clearState=()=>{
        this.setState({

          stateDialog: '',     
          accSystemName: '',
          defaultAccSystem: false,
          legalPersonAccSystem: false,
          currentIndex: 0,

          parentRows: [],
          subRows: [],

          accSystemOrgInfos : []

        })
    }

    //保存 显示确认 弹窗
    showAddSaveDialog=(flag)=>{
        let { systemStore } = this.props;
        let { accSystemName, defaultAccSystem, legalPersonAccSystem, accSystemOrgInfos } = this.state;
        
        let mAccSystemOrgInfos = accSystemOrgInfos.map((item)=>{
            let { orgID,orgName,accPolicyIDs,defaultAccPolicyID, childs } = item; 
            let mChilds =  childs.map((child)=>{
                let { orgID, orgName, orgDescription } = child;
                return { orgID, orgName, orgDescription }
            })

            return { orgID, orgName, accPolicyIDs, defaultAccPolicyID, childs: mChilds }
        })

        let isAccSystemName = true, isAccSystemOrgInfos = true, mIndex = false;

        if(accSystemName){
            isAccSystemName = true;
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
                         isAccSystemOrgInfos = false;
                         message.destroy();
                         message.info('第'+(index+1)+'行请选择适用会计政策');
     
                         return;
                    }
     
                     if(item.defaultAccPolicyID){
     
                     }else{
                         isAccSystemOrgInfos = false;
                         message.destroy();
                         message.info('第'+(index+1)+'行请选择默认会计政策');
     
                         return;
                     }
     
                     if(item.childs.length===0){
                         isAccSystemOrgInfos = false;
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
                accSystemName,
                defaultAccSystem,
                legalPersonAccSystem,
                accSystemOrgInfos: mAccSystemOrgInfos
            }
            
            this.setState({stateDialog:<Modal
                title='保存核算体系'
                toast='核算组织与下级组织保存后将不能修改，是否继续？'
                onCancel={()=>{
                    this.setState({stateDialog:''})
                }}
                onOk={()=>{
                    this.setState({stateDialog:''})
                    systemStore.addAccountingSystem({
                        accSystemOrgInfo,
                        success: ()=>{
                         
                          if(flag){
                             //保存 调到列表页
                            systemStore.changePageControl('SystemMain');
                          }else{
                            //保存并新增   不跳转 清空数据
                            this.clearState();
                          }
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
                width:50,
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
                            accSystemOrgInfos[index].accPolicyNameArr= accPolicyNameArr;
                            accSystemOrgInfos[index].accPolicyName=accPolicyName;
                            accSystemOrgInfos[index].defaultAccPolicyID='';//清空默认会计政策
                            accSystemOrgInfos[index].defaultAccPolicyName='';//清空默认会计政策名称
                            this.setState({accSystemOrgInfos});
                          }}
                        />})
                    }} />
                }
            },
            {
                title: <div><i className="xing">*</i>默认会计政策</div>,
                dataIndex: 'defaultAccPolicyName',
                key: 'defaultAccPolicyName',
                render: (text,record,index)=>{
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
        ]
        
        let columnsRight = [
            {
              title: '序号',
              dataIndex: 'index',
              key: 'index',
              width:50,
              render: (text)=>{
                  
                  return <div>{text}</div>
              }
            },
            {
              title: <div><i className="xing">*</i>下级组织</div>,
              dataIndex: 'orgName',
              key: 'orgName',
              width:120
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

        return <div className="add-main-body"> 
            <div className="add-top"> 
                <WhiteButton onClick={()=>{
                    systemStore.changePageControl("SystemMain"); 
                }}>返回</WhiteButton> 
                <PurpleButton onClick={()=>{
                  this.showAddSaveDialog(false);//保存并新增
                }}>保存并新增</PurpleButton>  
                <PurpleButton onClick={()=>{
                  this.showAddSaveDialog(true);//保存
                }}>保存</PurpleButton>  
            </div>
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
                    if(/^[A-Za-z0-9\u4e00-\u9fa5]*$/.test(value) && value.length<=20){
                        this.setState({ accSystemName: e.target.value });
                    }
                  }}/>
                </div>
               
                <div className="default">
                  <span>法人核算体系</span>
                  <Switch 
                    checked={this.state.legalPersonAccSystem}
                    checkedChildren="是" 
                    unCheckedChildren="否"
                    defaultChecked={false}
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
                                let parentRows = this.state.parentRows;
                                let accSystemOrgInfos = this.state.accSystemOrgInfos;

                                if(parentRows.length>0){
                                  accSystemOrgInfos = accSystemOrgInfos.filter((item)=>{
                                      return !isInArray(parentRows,item.key)
                                  });
                                  accSystemOrgInfos = accSystemOrgInfos.map((item,index)=>{
                                      item.index = index+1;
                                      return item;
                                  });

                                  this.setState({ 
                                      parentRows:[],
                                      accSystemOrgInfos,
                                      currentIndex: 0,
                                      
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
                                  return 'row-selected';
                                }else{
                                  return '';
                                }
                            }}
                            rowSelection={{
                              selectedRowKeys: parentRows,
                              onChange: (selectedRowKeys)=>{
                                this.setState({ parentRows: selectedRowKeys });
                              },
                            }}
                            onRowClick={(record, index, event)=>{
                               this.setState({currentIndex: index});
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
                                                    index: index+1+mLength,
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
                            let subRows = this.state.subRows;
                            if(subRows.length>0){
                                let accSystemOrgInfos = this.state.accSystemOrgInfos;
                                let currentIndex = this.state.currentIndex;
                                let childs = accSystemOrgInfos[currentIndex].childs;
                               
                                childs = childs.filter((item)=>{
                                  
                                    return !isInArray(subRows,item.key)
                                });
                                childs = childs.map((item,index)=>{
                                    item.index = (index+1);
                                    return item;
                                })
                                accSystemOrgInfos[currentIndex].childs = childs;

                                this.setState({accSystemOrgInfos, subRows:[]});
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
                                onChange: (selectedRowKeys)=>{
                                    this.setState({ subRows: selectedRowKeys });
                                },
                            }}
                            scroll={{ y: 250 }}
                            pagination={false}
                        />
                    
                    </div>
                </div>
            </div>
           {this.state.stateDialog}
        </div>
    }
}

export default SystemAdd;