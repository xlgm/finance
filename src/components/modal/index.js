import React, { Component } from 'react';
import { Dialog } from 'element-react';
import  { WhiteButton, PurpleButton }  from 'components/Button.js';
import Loading from 'components/loading';
import './modal.less';

/*
    可传参数
    props: {
        title: 默认 '操作提示'  可以设置
        toast:  confirm 输入的提示语
        onCancel: 取消回掉事件
        onOk： 确定回掉事件

    }
*/
class Modal extends Component{

    render(){

        let { title, toast, onCancel, onOk } = this.props;

        return <Dialog
            closeOnClickModal={false}
            visible={true}
            size="tiny"
            top={'40%'}
            title={ title ? title : "确认删除？" }
            onCancel={()=>{
                onCancel&&onCancel();
            }} 
            customClass='my-dialog'
        >
        <Dialog.Body>
             { toast ? toast : "确认删除选中的记录吗" }
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
            <WhiteButton onClick={()=>{
                onCancel&&onCancel()
            }}>取消</WhiteButton>
            <PurpleButton onClick={()=>{
                onOk&&onOk();
            }}>确定</PurpleButton>
        </Dialog.Footer>
       
        </Dialog>
    }
}

export default Modal