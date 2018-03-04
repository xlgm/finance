import React from 'react';
import { inject, observer } from 'mobx-react';
import './loading.less';

@inject('appStore') @observer
class Loading extends React.Component{

    render(){
        return <div id="loadin-main"> 
               <div className="loading-div">
                    <div id="loading">
                        <div className="yuan-div"></div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span> 
                        <span></span>
                        <span></span> 
                        <span></span> 
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span>数据加载中</span>
               </div>
                 
        </div>
    }

}

export default Loading;