import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import {  Row, Col, Button, Input, Icon } from 'antd';
import Keyboard from '../../components/keyboard';

import './voucher_detail.less';

@inject('voDirectorStore')@observer
class VoucherDirector extends Component {

  constructor(props) {
    super(props);

  }

  
  render() {
    
    return <div 
      className='voucher_director_detail'
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
      <div className="director_detail_content">
        <div className="btn_group">
        <Row>
          <Col span={20}>
            <PurpleButton>主管复核</PurpleButton>
            <PurpleButton className='btn'>取消复核</PurpleButton>
            <WhiteButton className='btn'>打印</WhiteButton>
            <WhiteButton className='btn'>导出</WhiteButton>
          </Col>
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
      <div className="dir_title">
        <h2>记账凭证</h2>
        <div className='entry-title-label'>
          <div className='review-name'>张三</div>
          <div className='icon iconfont icon-pingzheng_yishenhe'></div>
        </div>
      </div>
      <div className="dir_header">
        <Row>
          <Col span={5}>
            <span className='h-label'><i className="xing">*</i>账簿</span>
            <Input style={{ width: 180}} readOnly/>
            
          </Col>
          <Col span={5} className="org-line">
            <span className='h-label'>核算组织</span>
            <span className='account-org'>研发中心研发中心研发中心研发中心研发中心</span>
          </Col>
          <Col span={5}>
            <span className='h-label'>凭证字</span>
            <Input style={{ width: 100}} readOnly/>
            <Input style={{ width: 70}} readOnly/>
          </Col>
          <Col span={5}>
            <span className='h-label'>凭证日期</span>
            <Input style={{ width: 180}} readOnly/>
          </Col>
          <Col span={4} className='header-right'>
            <span className='h-label'>附件数</span>
            <Input style={{width:50, marginRight:6}} value="3" readOnly/>
            <span>张</span>
            <Icon 
              style={{fontSize:"16px",marginLeft: 10, cursor:'pointer'}} 
              type="paper-clip" 
              onClick={()=>{
              
              }}
            />
          </Col>
        </Row>
      </div>
      <div className="dir_table">
        <table>
          <thead>
            <tr>
              <th className="col_index">序号</th>
              <th className="col_summary">摘要</th>
              <th className="col_subject">会计科目</th>
              <th className='col_currency'>币别</th>
              <th className="col_money">
                <div className="money_title">借方金额</div>
              </th>
              <th className="col_money">
                <div className="money_title">贷方金额</div>
              </th>
              <th className='col_settlement'>结算方式</th>
              <th className='col_settlement_number'>结算号</th>
            </tr>
          </thead>
          <tbody>
            <tr className='entry-table-row'>
              <td className="col_index">{ 1 }</td>
              <td className="col_summary">111</td>
              <td className="col_subject">222</td>
              <td className='col_currency'>222</td>
              <td className="col_money">222</td>
              <td className="col_money">222</td>
              <td className='col_settlement'>222</td>
              <td className='col_settlement_number'>222</td>
            </tr>
            <tr className='entry-table-row'>
              <td className="col_index">{ 2 }</td>
              <td className="col_summary">3333</td>
              <td className="col_subject">333</td>
              <td className='col_currency'>333</td>
              <td className="col_money">333</td>
              <td className="col_money">333</td>
              <td className='col_settlement'>333</td>
              <td className='col_settlement_number'>3333</td>
            </tr>
           
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Sum</td>
              <td>$180</td>
              <td>Sum</td>
              <td></td>
              <td></td>
            </tr>  
          </tfoot>
        </table>
      </div>
      <div className="dir_footer">
        <Row>
          <Col span={6}>
            <span>制单人：</span>
            <span>操作用户</span>
          </Col>
          <Col span={6}>
            <span>审核人：</span>
            <span>操作用户</span>
          </Col>
          <Col span={6}>
            <span>过账：</span>
            <span>操作用户</span>
          </Col>
          <Col span={6}>
            <span>出纳：</span>
            <span>操作用户</span>
          </Col>
        </Row>      
      </div>

      </div>
    </div>

  }
}

export default VoucherDirector;