import React, { Component } from 'react';
import { Icon, Input } from 'antd';

import './money.less';

class MoneyUnit extends Component {
    constructor(props){
      super(props);

      this.state={
        money:'',
        visiable: true
      }
    }

    render(){
      let money  = this.state.money*1;
      money = money.toFixed(2)+'';
      let reverseMoney = money.split("").reverse().join("");
      
      let num0,num1,num3,num4,num5,num6,num7,num8,num9,num10,num11;
      if(money==='0.00'){
        num0 = '';
      }else{
        num0 = reverseMoney.charAt(0);
      }

      if(money*1>=0.1){
        num1 = reverseMoney.charAt(1);
      }else{
        num1 = '';
      }

      if(money*1>=1){
        num3 = reverseMoney.charAt(3);
      }else{
        num3 = '';
      }
      num4 = reverseMoney.charAt(4);
      num5 = reverseMoney.charAt(5);
      num6 = reverseMoney.charAt(6);
      num7 = reverseMoney.charAt(7);
      num8 = reverseMoney.charAt(8);
      num9 = reverseMoney.charAt(9);
      num10 = reverseMoney.charAt(10);
      num11 = reverseMoney.charAt(11);
      
      return <div className='money_unit_compon'>
      {!this.state.visiable && 
      <Input 
        style={{height: 80}}
        value={this.state.money} 
        onChange={(e)=>{
          let value = e.target.value;
          if((/^\d*\.{0,1}\d{0,2}$/.test(value))&& Math.abs(value*1)<1000000000){
            this.setState({money: value})
          }
        }}
        onBlur={()=>{
          this.setState({visiable: true})
        }}
      />}
      {this.state.visiable &&
      <div className="money_unit"
        onClick={()=>{
          this.setState({visiable: false})
        }}
      >
        <span>{num11}</span> 
        <span>{num10}</span> 
        <span className="bai">{num9}</span> 
        <span>{num8}</span> 
        <span>{num7}</span> 
        <span className="qian">{num6}</span> 
        <span>{num5}</span> 
        <span>{num4}</span> 
        <span className="yuan">{num3}</span> 
        <span>{num1}</span> 
        <span className="last">{num0}</span>
      </div>}
    </div>
    }
}

export default MoneyUnit;