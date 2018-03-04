import React from 'react';
import { Modal, Table } from 'antd';
import { WhiteButton, PurpleButton }   from 'components/Button.js'  
import { inject, observer } from 'mobx-react'; 
import { message } from 'antd';
import Loading from 'components/loading';

import './add.less';
message.config({
    top: 200,
    duration: 2,
});

@inject('currencyStore') @observer
class AddDialog extends React.Component{

    constructor(props){
        super(props);

        this.state={
            selectedRowKeys: '',
            loading: ''
        }
        let { currencyStore } = this.props;

        currencyStore.queryForInsert(); //查询列表数据

    }

    render(){
        let  { onCancel, onOk, currencyStore } = this.props;

        const columns = [{
            title: '名称',
            dataIndex: 'currencyName',
            key: 'currencyName',
        }];

        let currencyAddList 
        
        if(currencyStore.currencyAddList){
            currencyAddList = currencyStore.currencyAddList.map((item)=>{
                let {key, currencyID, currencyName} = item;
                return {key, currencyID, currencyName}
            })
        }else{
            currencyAddList = [];
        }
       

        return <Modal
            title="添加币别"
            visible={true}
            width={550}
            height={400}
            maskClosable={false}            
            footer={null}
            wrapClassName='currency-add-modal'
            onCancel={()=>{
              onCancel&&onCancel();
            }}
         >
        <div className="add-table"> 
            <Table 
              bordered
              size='middle'
              dataSource={currencyAddList} 
              columns={columns} 
              rowSelection={{
                  onChange: (selectedRowKeys)=>{
                      this.setState({ selectedRowKeys });
                  },                 
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
               let selectedRowKeys =  this.state.selectedRowKeys;
               if(selectedRowKeys.length>0){
                    currencyStore.currencySubmitAdd({
                    selectedRowKeys,
                    showLoading: ()=>{
                      this.setState({loading: <Loading />});
                    },
                    closeLoading: (success)=>{
                      this.setState({loading: ''});
                      if(success){
                          onOk&&onOk();
                      }
                    }
               })
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

export default AddDialog;