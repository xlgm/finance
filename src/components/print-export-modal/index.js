import React, { Component } from 'react';
import { Dialog ,Radio} from 'element-react';
import  { WhiteButton, PurpleButton }  from 'components/Button.js'
import './print-export-modal.less';

/*
    可传参数
    props: {
        title: 打印/导出
        selectedData:  是否有选中的数据
        onCancel: 取消回掉事件
        onOk： 确定回掉事件

    }
*/
class PrintExportModal extends Component{
    constructor(props) {
        super(props);
        let { selectedData } = this.props; 
        let checkValue = selectedData === true ? "1" : ""; 
        this.state = {
            value: checkValue
        }
    }

    onChange(value) { 
        this.setState({ value : value});
    }

    onCancel=()=>{
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    onOk=()=>{
        if(this.state.value !== ""){
            if(this.props.onOk){
                this.props.onOk(this.state.value);
            }
        }
       
    }



    render(){

        let { title, selectedData } = this.props;

        return <Dialog
            visible={true}
            size="tiny"
            top={'40%'}
            title={title}
            onCancel={this.onCancel} 
            customClass='Print-dialog'
        >
        <Dialog.Body> 
            <p>请选择{title}哪些数据？</p> 
            <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
                <Radio value="1"  disabled={!selectedData}>只{title}选中的数据</Radio>
                <Radio value="2">{title}当前页</Radio>
                <Radio value="3">{title}全部页</Radio>
            </Radio.Group> 
            {(this.state.value === "") && <span className="prompt-text">请选择一项</span>}
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
            <WhiteButton onClick={this.onCancel}>取消</WhiteButton>
            <PurpleButton onClick={this.onOk}>确定</PurpleButton>
        </Dialog.Footer>
           
        </Dialog>
    }
}

export default PrintExportModal