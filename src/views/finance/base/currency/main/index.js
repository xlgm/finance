import React from 'react';   
import { inject, observer } from 'mobx-react'; 

import { PurpleButton, GreenButton, RedButton } from 'components/Button.js' 
import { Table, Input } from 'antd';
import Modal from 'components/modal';
import AddDialog from '../add';

import './main.less';
import { message } from 'antd';
message.config({ 
    top: 200,
    duration: 2,
});

@inject('currencyStore','appStore') @observer
class CurrencyMain extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pageSize: 10,
            pageNum: 1,
            pages: 1,
            stateDialig: '',
            searchName: '',
            selectedRowKeys: []          
        }
       
    }

    componentWillMount() {

      let { currencyStore } = this.props;
      let currentPage = currencyStore.currentPage;
     
      this.setState({
        pageNum: currentPage.pageNum,
        searchName: currentPage.searchName,
        pageSize: currentPage.pageSize
      })
  
      currencyStore.getCurrencyList({
        searchName: currentPage.searchName,
        pageSize: currentPage.pageSize,
        pageNum: currentPage.pageNum
      });
  
      currencyStore.clearCurrentPage();
    }
    

    refreshData=()=>{
        let { currencyStore } = this.props;
        currencyStore.getCurrencyList(
          {
              pageNum: this.state.pageNum,
              pageSize: this.state.pageSize,
              searchName: this.state.searchName
          });

    }

    render(){
        let { currencyStore } = this.props;
        let { selectedRowKeys } = this.state; 
        let columns= [
            {
                title: '名称',
                dataIndex: 'currencyName',
                key: 'currencyName',
                width: '30%',
                render: (text,record)=>{
                    return <div className="currency-name" onClick={()=>{
                        let currentPage = {
                          pageNum: this.state.pageNum,
                          pageSize: this.state.pageSize,
                          searchName: this.state.searchName
                        }
                        currencyStore.changeCurrentPage(currentPage);
                        currencyStore.changePageControl('CurrencyDetail');
                        currencyStore.getDetail(record);
                    }}>{text}</div>
                }
            },  
            {
                title: "代码",
                dataIndex: "shortName",   
                width: '30%',
            },
            {
                title: "货币符号",
                dataIndex: "currencySymbol",
                key: 'currencySymbol',
                width: '30%',
            },
            {
                title: "启用/禁用",
                dataIndex: "currencyStatus",
                key: 'currencyStatus',
                width: '10%',
                render: (text)=>{
                    let name = "";
                    switch(text){
                        case 1005:
                            name = '启用'
                        break;
                        case 1006:
                            name = '禁用'
                        break;
                        default:
                    }
                    return <div>{name}</div>
                }

            }
            ] 

        let currencyList = [];
        if(currencyStore.currencyList){
            currencyList = currencyStore
            .currencyList
            .map((item)=>{
                let {
                  key, 
                  mercCurrencyID, 
                  currencyID,
                  currencyName, 
                  currencySymbol, 
                  shortName, 
                  currencyStatus
                } = item;
               
                return {
                  key, 
                  mercCurrencyID, 
                  currencyID, 
                  currencyName, 
                  currencySymbol, 
                  shortName, 
                  currencyStatus 
                }
            })
        }
            
        return <div id='currency-main'>
            <div className="currency-top">
                 <PurpleButton 
                    onClick={()=>{
                        this.setState({stateDialig:<AddDialog
                            onCancel={()=>{
                                this.setState({stateDialig:''});
                            }}
                            onOk={()=>{
                                this.setState({
                                  stateDialig:'',
                                  pageNum: 1, 
                                  pageSize:10 
                                });
                                
                                this.refreshData(); //添加成功刷新数据
                            }}
                        />});
                    }}
                 >添加</PurpleButton>
                 <GreenButton onClick={()=>{

                    let selectedRowKeys = this.state.selectedRowKeys;
                    if(selectedRowKeys.length>0){
                        this.setState({
                            stateDialig:<Modal 
                              title="启用"
                              toast="确定要启用选中的记录吗？" 
                              onCancel={()=>{
                                  this.setState({stateDialig:''});
                              }}
                              onOk={()=>{
                                this.setState({stateDialig:'',selectedRowKeys: []});
                                  if(selectedRowKeys.length>0){
                                        currencyStore.enabale({
                                            selectedRowKeys,
                                            success: ()=>{
                                              this.refreshData(); //成功刷新数据
                                            }
                                          });
                                  }else{
                                      message.destroy();
                                      message.info("请选择数据");
                                  }                                  
                              }}
                            ></Modal>
                        });

                    }else{
                        message.destroy();
                        message.info('请选择数据');
                    }
                        
                 }}>启用</GreenButton>
                 <RedButton onClick={()=>{
                    let selectedRowKeys = this.state.selectedRowKeys;
                    if(selectedRowKeys.length>0){
                        this.setState({
                            stateDialig:<Modal 
                              title="禁用"
                              toast="确定要禁用选中的记录吗？" 
                              onCancel={()=>{
                                  this.setState({stateDialig:''});
                              }}
                              onOk={()=>{
                                  
                                if(selectedRowKeys.length>0){
                                    this.setState({stateDialig:'',selectedRowKeys: []});
                                      currencyStore.disable({
                                          selectedRowKeys,
                                          success: ()=>{
                                           
                                            this.refreshData(); //成功刷新数据
                                        }
                                    });
                                }else{
                                    message.destroy();
                                    message.info("请选择数据");
                                }
                              }}                               
                            />
                        });
                    }else{
                      message.destroy();
                      message.info('请选择数据');
                    }
                   
                 }}>禁用 </RedButton>
                 <Input 
                    style={{width:270,height:36}}
                    type="text"  
                    placeholder="请输入名称查询"
                    value={this.state.searchName}
                    icon="search" 
                    onChange={(e)=>{
                      let value= e.target.value.trim();
                      this.setState({searchName: value});
                    }}
                    onPressEnter={(e)=>{
                      this.setState({pageNum: 1, selectedRowKeys: []})
                      let searchName = e.target.value.trim();
                      currencyStore.getCurrencyList(
                      {
                          searchName,
                          pageNum: 1,
                          pageSize: this.state.pageSize,
                      }
                      );
                    }}
                 />
                 <PurpleButton onClick={()=>{
                    let { searchName, pageSize } = this.state;
                    this.setState({pageNum: 1, selectedRowKeys: []})
                    currencyStore.getCurrencyList(
                      {
                          searchName,
                          pageNum: 1,
                          pageSize,
                      }
                    );

                 }}>查询</PurpleButton>
            </div>
            <div className="currency-table">
                <Table 
                    rowSelection={{
                      selectedRowKeys,
                      onChange: (selectedRowKeys)=>{
                        this.setState({ selectedRowKeys });
                      }
                    }}   
                    scroll={{ y: 400 }}
                    columns={columns} 
                    bordered
                    dataSource={currencyList} 
                    pagination = {{  //分页
                      total: currencyStore.currencyMain.total, 
                      pageSize: this.state.pageSize ,  
                      current: this.state.pageNum,
                      showSizeChanger: true, 
                      showQuickJumper: true,
                      pageSizeOptions:['10','20','50','100'],
                      onShowSizeChange:(current, pageSize)=> {  

                          this.setState({
                              pageSize,
                              pageNum: 1,
                              selectedRowKeys:[]
                          });
                          currencyStore.getCurrencyList(
                              {
                                  searchName: this.state.searchName,
                                  pageNum: 1,
                                  pageSize: pageSize
                              },
                          );
                      },
                      onChange:(pageNum)=> {  
                          this.setState({
                              pageNum,
                              selectedRowKeys:[]
                          });
                          currencyStore.getCurrencyList(
                              {
                                  searchName: this.state.searchName,
                                  pageNum,
                                  pageSize: this.state.pageSize,
                              }
                          );
                      },                                         
                      showTotal: function () {  //设置显示一共几条数据
                          return '从 1 到 '+currencyStore.currencyMain.pages+' 页 共 '+ currencyStore.currencyMain.total + ' 条数据'; 
                      }
                    }}
                />                   
            </div>         
            {this.state.stateDialig}
        </div>
    }
}

export default CurrencyMain;