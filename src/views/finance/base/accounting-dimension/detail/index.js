import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton, WhiteButton } from 'components/Button.js'
import { Input, Form, Select,  Message } from 'element-react';
import { message, Table, Popconfirm, Tabs, } from 'antd';
import './detail.less';

const TabPane = Tabs.TabPane;

@inject('dimensionStore') @observer
class DimensionDetail extends React.Component {

  constructor(props) {
    super(props);
    let { dimensionStore } = this.props;
    this.state = {

      count: 1,
      detiled: [],
      form: dimensionStore.currencyDetail.form,
      accLatituDedetailInfos: dimensionStore.currencyDetail.accLatituDedetailInfos.map((item) =>{return item}),
      selectedRowKeys: ''
    };
    this.columns = [

      {
        title: "编码",
        dataIndex: "accLatitudeDetailCode",
        key: 'accLatitudeDetailCode',
        width: '30%',
      }, {
        title: "名称",
        dataIndex: "accLatitudeDetailName",
        key: 'accLatitudeDetailName',
        width: '30%',
      }, {
        title: "描述",
        dataIndex: "accLatitudeDetailDesc",
        key: 'accLatitudeDetailDesc',
        width: '40%',
      }

    ]
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  render() {
    let { dimensionStore } = this.props;
    const { dataSource } = this.state;
    const columns = this.columns;

    // let accLatituDedetailInfos = []
    // if (dimensionStore.currencyDetail.accLatituDedetailInfos) {
    //   accLatituDedetailInfos = dimensionStore
    //     .currencyDetail
    //     .accLatituDedetailInfos
    //     .map((item) => {
    //       let { accLatitudeDetailCode, accLatitudeDetailName, accLatitudeDetailDesc } = item
    //       return { accLatitudeDetailCode, accLatitudeDetailName, accLatitudeDetailDesc }
    //     })

    // }

    return (
      <div className="dimension-add">
        <div className="add-top">
          <WhiteButton
            onClick={() => {
              dimensionStore.changePageControl('DimensionMain');
            }}>返回</WhiteButton>

        </div>
        <div className="add-main">
          <div className="main-content">
            <Tabs defaultActiveKey="1">
              <TabPane tab="基本信息" key="1">
                <div className="base-info">
                  <Form
                    ref="form"
                    labelPosition="right"
                    labelWidth="120"
                    model={this.state.form}
                    rules={this.state.rules}>
                    <Form.Item prop="uName" label="名称">

                      <Input
                        type="text"
                        style={{
                          width: '245px',
                          height: '36px',
                        }}
                        value={this.state.form.accountLatitudeName}
                        onChange={(event) => {
                          this.onChange('accountLatitudeName', event.target.value)
                        }}
                        placeholder="请输入名称"
                        disabled />
                    </Form.Item>
                    <Form.Item prop="describe" label="描述">
                      <Input
                        style={{
                          width: '245px',
                          height: '100px',
                        }}
                        type="textarea"
                        value={this.state.form.accountLatitudeDescr}
                        onChange={(event) => {
                          this.onChange('accountLatitudeDescr', event.target.value)
                        }}
                        disabled></Input>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="明细数据" key="2">
                <div className="detail-info">

                  <div className="detail-table">
                    <Table
                      columns={columns}
                      dataSource={this.state.accLatituDedetailInfos}
                      bordered
                      pagination={false} />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>

        </div>
      </div>
    )
  }

}

export default DimensionDetail;