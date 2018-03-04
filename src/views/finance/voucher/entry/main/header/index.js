import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {  Row, Col, Select, Input, InputNumber, DatePicker, Icon } from 'antd';
import './voucher-entry-header.less';
import FileModal from '../../modal-addFile';

const Option = Select.Option;


@inject('voEntryStore') @observer
class Header extends Component {

    constructor(props){
      super(props);

      this.state={
        stateDialog:''

      }
      let { voEntryStore } = this.props;
      voEntryStore.queryLedger();//查询账簿
      voEntryStore.queryProof();//查询凭证字

    }

    render(){
      let { voEntryStore } = this.props;

      return <div className='entry-header'>
          <Row>
            <Col span={5}>
              <span className='h-label'><i className="xing">*</i>账簿</span>
              <Select 
                className="h-ledger" 
                style={{ width: 180}} 
                value={voEntryStore.voucher.booksID} 
                defaultValue={voEntryStore.voucher.booksID} 
                onChange={(booksID)=>{
                  voEntryStore.ledgerOnChange(booksID);
                }}>
               
                {voEntryStore.allLeadgers.map((item,index)=>{
                  return <Option key={item.booksID} value={item.booksID}>{item.booksName}</Option>
                })}
              </Select>
            </Col>
            <Col span={5} className="org-line">
              <span className='h-label'>核算组织</span>
              <span className='account-org'>{voEntryStore.voucher.accOrgName}</span>
            </Col>
            <Col span={5}>
              <span className='h-label'>凭证字</span>
              <Select 
                style={{ width: 100 }} 
                value={voEntryStore.voucher.certificateWordID} 
                defaultValue={voEntryStore.voucher.certificateWordID} 
                onChange={(certificateWordID)=>{
                  voEntryStore.certificateWordOnChange(certificateWordID);
                }}>
                {
                  voEntryStore.allCertificateWords.map((item,index)=>{
                    return <Option key={item.certificateWordID} value={item.certificateWordID}>{item.certificateWord}</Option>
                  })
                }
              </Select>
              <InputNumber 
                min={1} 
                max={99999} 
                defaultValue={1} 
                style={{ width: 70 }}
                onChange={(certificateOrder)=>{
                  voEntryStore.certificateOrderOnChange(certificateOrder);
                }}
              />
            </Col>
            <Col span={5}>
              <span className='h-label'>凭证日期</span>
              <DatePicker 
                value={voEntryStore.voucher.certificateDate}
                onChange={(date)=>{
                  voEntryStore.certificateDateOnChange(date);
                }}/>
            </Col>
            <Col span={4} className='header-right'>
              <span className='h-label'>附件数</span>
              <Input 
              onChange={(e)=>{
                let number = e.target.value;
                if((/^\d*$/.test(number))&&number<100){
                  voEntryStore.attachmentNumOnChange(number);
                }
              }}
              style={{width:50, marginRight:6}} 
              value={voEntryStore.voucher.attachmentNum}/>
              <span>张</span>
              <Icon 
                style={{fontSize:"16px",marginLeft: 10, cursor:'pointer'}} 
                type="paper-clip" 
                onClick={()=>{
                  this.setState({
                    stateDialog: <FileModal
                    onOk={()=>{

                    }}
                    onCancel={()=>{
                      this.setState({stateDialog: ''})
                    }}
                    />
                  })
                }}
              />
            </Col>

          </Row>

          {this.state.stateDialog}
      </div>
    }
}

export default Header;