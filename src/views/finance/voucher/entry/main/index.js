import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import {  Row, Col, Button } from 'antd';
import Title from './title';
import Header from './header';
import Footer from './footer';
import VoucherTable from './table';
import Keyboard from '../../components/keyboard';

import CashFlow from '../modal-cashFlow';
import './index.less';

@inject('voEntryStore') @observer
class VoucherEntryMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stateDialog: ''

    }
  }

  //保存并新增
  saveAndAdd = () => {

  }
  //保存 
  save = () =>{

  }
  //点击现金流量
  cashFlowClick = () => {
    
  }
  //新增
  add = () =>{

  }
  //提交
  submit = () =>{

  }
  //作废
  invalidClick = () =>{

  }
  //反作废
  fanInvalid = ()=>{

  }
  //删除
  delete = () =>{

  }
  //打印
  print = () =>{

  }
  //导出
  export = () =>{

  }
  //撤回
  withdraw = () =>{

  }
  //审核通过
  passAudit = () =>{

  }
  //审核不通过
  disAudit = () =>{

  }
  //反审核
  fanAudit = () =>{

  }
  //上一张凭证
  preClick = () =>{

  }
  //下一张凭证
  nextClick = () =>{
    
  }
    
  render() {
    let { voEntryStore } = this.props;
    const voucherState = voEntryStore.voucherState;
   
    return (
      <div className="voucher-typein-main">
        <div className="voucher-entry-btnGroup">

        <Row>
          { voucherState==="CREATE" && 
            <Col span={20} className="btn-group">
              <PurpleButton onClick={()=>{
                this.saveAndAdd();
              }}>
                保存并新增
              </PurpleButton>
              <PurpleButton onClick={()=>{
                this.save();
              }}>
                保存
              </PurpleButton>
              <WhiteButton onClick={()=>{
                this.cashFlowClick();
              }}>
                现金流量
              </WhiteButton>
            </Col>
          }

          {  voucherState==="EDIT" &&
            <Col span={20} className="btn-group">
              <PurpleButton onClick={()=>{
                this.add();
              }}>
                新增
              </PurpleButton>
              <PurpleButton onClick={()=>{
                this.save();
              }}>
                保存
              </PurpleButton>
              <WhiteButton onClick={()=>{
                this.submit();
              }}>提交</WhiteButton>
              <WhiteButton  onClick={()=>{
                this.cashFlowClick();
              }}>
                现金流量
              </WhiteButton>
              <WhiteButton onClick={()=>{
                this.invalidClick();
              }}>作废</WhiteButton>
              <WhiteButton onClick={()=>{
                this.delete();
              }}>删除</WhiteButton>
              <WhiteButton onClick={()=>{
                this.print();
              }}>打印</WhiteButton>
              <WhiteButton onClick={()=>{
                this.export();
              }}>导出</WhiteButton>
            </Col>
          }

          { voucherState==="CHECK" &&
            <Col span={20} className="btn-group">
              <PurpleButton onClick={()=>{
                this.add();
              }} >
                新增
              </PurpleButton>
              
              <WhiteButton onClick={()=>{
                this.withdraw();
              }}>撤回</WhiteButton>
              
              <WhiteButton onClick={()=>{
                this.passAudit();
              }}>审核通过</WhiteButton>
              <WhiteButton onClick={()=>{
                this.disAudit();
              }}>审核不通过</WhiteButton>
              <WhiteButton onClick={()=>{
                this.print();
              }}>打印</WhiteButton>
              <WhiteButton onClick={()=>{
                this.export();
              }}>导出</WhiteButton>
            </Col>
          }

          { voucherState==="HAS_CHECKED" &&
            <Col span={20} className="btn-group">
              <PurpleButton onClick={()=>{
                this.add();
              }}>新增</PurpleButton>
              <WhiteButton onClick={()=>{
                this.fanAudit();
              }}>反审核</WhiteButton>
              <WhiteButton onClick={()=>{
                this.print();
              }}>打印</WhiteButton>
              <WhiteButton onClick={()=>{
                this.export();
              }}>导出</WhiteButton>
            </Col>
          }

          { voucherState==="HAS_INVALOID" &&
            <Col span={20} className="btn-group">
              <PurpleButton onClick={()=>{
                this.add();
              }}>新增</PurpleButton>
              <WhiteButton onClick={()=>{
                this.fanInvalid();
              }}>反作废</WhiteButton>
              <WhiteButton onClick={()=>{
                this.delete();
              }}>删除</WhiteButton>
              <WhiteButton onClick={()=>{
                this.print();
              }}>打印</WhiteButton>
              <WhiteButton onClick={()=>{
                this.export();
              }}>导出</WhiteButton>
            </Col>
          }
          <Col span={4} className="keyboard_col">
            <Button icon='left' onClick={()=>{
              this.preClick();
            }}/>
            <Button icon='right' onClick={()=>{
              this.nextClick();
            }}/>
            <div className="keyboard">
              <Keyboard/>
            </div>
          </Col>
        </Row>

        </div>
        <div className="voucher-entry-content">
          <Title/>
          <Header/>
          <VoucherTable/>
          <Footer/>
        </div>
        { this.state.stateDialog }
      </div>
    )
  }
}

export default VoucherEntryMain;