import React  from 'react';
import { inject, observer } from 'mobx-react'; 
import { Input, Form } from 'element-react';
import { Tabs } from 'antd';
import { WhiteButton }   from 'components/Button.js' 
import './detail.less';

const TabPane = Tabs.TabPane;

@inject('currencyStore') @observer
class CurrencyDetail extends React.Component{

    constructor(props){
        super(props);

        this.state={

        }

    }

    render(){

        let { currencyStore } = this.props;
        let columns= [ 
            {
                label: "序号",
                prop: "serialNumber",
                width: 100
            },
            {
                label: "操作类型",
                prop: "operationType",
                width: 100
            },
            {
                label: "操作人",
                prop: "operator",
                width: 100 
            },
            {
                label: "操作时间",
                prop: "operatingTime",
                width: 100 
            },
            {
                label: "操作内容",
                prop: "operationContent",
                width:300
            } 
        ] 
        let testlist=[{
            serialNumber: '1',
            operationType: '导出',
            operator: '[0109]张先锋',
            operatingTime: '2017-08-10 16:33:42',
            operationContent: '导出列表' 
        } ];

        return<div className="currency-detail">
            <div className="add-top"> 
                <WhiteButton onClick={()=>{
                    currencyStore.changePageControl('CurrencyMain');
                }}>返回</WhiteButton>
            </div>
            <div className="add-main">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="基本信息" key="1"> 
                        <div className="modify-form"> 
                            <Form ref="form" labelPosition="right" labelWidth="120" model={this.state.form}  rules={this.state.rules} >
                                <Form.Item  label="代码" > 
                                    <Input
                                        type="text" 
                                        value={currencyStore.currencyDetail.shortName} 
                                        disabled={true} 
                                    /> 
                                </Form.Item> 
                                <Form.Item  label="名称" > 
                                    <Input
                                        type="text" 
                                        value={currencyStore.currencyDetail.currencyName} 
                                        disabled={ true } 
                                    /> 
                                </Form.Item> 
                                <Form.Item label="货币符号"> 
                                    <Input
                                        type="text" 
                                        value={currencyStore.currencyDetail.currencySymbol } 
                                        disabled={ true } 
                                    /> 
                                </Form.Item> 
                            </Form>
                                
                        </div>
                    </TabPane>
                    <TabPane tab="操作纪录" key="2"> 
                        <div className="records">
                          
                        </div>                        
                    </TabPane> 
                </Tabs>
            </div>
        </div>
    }
}

export default CurrencyDetail;