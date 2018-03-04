import React from 'react';
import { inject, observer } from 'mobx-react';
import { PurpleButton } from 'components/Button.js';
import moment from 'moment';
import { Table, Input, DatePicker } from 'antd';
import './main.less';



@inject('paritiesFloatStore') @observer
class ParitiesFloatMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      pageNum: 1,
      pages: 1,
      searchName: '',
      formattime: moment(Date.now())
    }
  }

  componentWillMount() {

  }

  render() {
    let { paritiesFloatStore } = this.props;
    let datalist = [{
      key: '1',
      sourceCurrencyName: '人名币',
      targetCurrencyName: '人名币',
      realExchangeRate: 1,
    }];
    let columns = [
      {
        title: '原币',
        dataIndex: 'sourceCurrencyName',
        key: 'sourceCurrencyName',
        width: '35%',
        render: (text, record) => {
          return <div className="currency-name" onClick={() => {
            paritiesFloatStore.changePageControl("ParitiesFloatDetails");

          }}>{text}</div>
        }
      },
      {
        title: "目标币",
        dataIndex: "targetCurrencyName",
        key: "targetCurrencyName",
        width: '35%',
        render: (text, record) => {
          return <div className="currency-name" onClick={() => {
            paritiesFloatStore.changePageControl("ParitiesFloatDetails");
          }}>{text}</div>
        }
      },
      {
        title: "浮动汇率",
        dataIndex: "realExchangeRate",
        key: 'realExchangeRate',
      }
    ];

    return (
      <div className="paritiesfloat_main">

        <div className="parities-top">
          日期: <DatePicker defaultValue={this.state.formattime} />
          <Input
            style={{ width: 270, height: 36 }}
            type="text"
            placeholder="请输入币别名称查询"
            value={this.state.searchName}
            onChange={(e) => {
              this.setState({ searchName: e.target.value });
            }}
            onPressEnter={(e) => {
              this.selectClick();
            }}
          />
          <PurpleButton onClick={this.selectClick}>查询</PurpleButton>
        </div>
        <div className="parities-table">
          <Table
            rowSelection={null}
            columns={columns}
            bordered
            scroll={{ y: 400 }}
            dataSource={datalist}
            onRowClick={(record, index) => {
            }}
            pagination={{  //分页
              total: 400,
              pageSize: this.state.pageSize,
              current: this.state.pageNum,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              showQuickJumper: true,
              onShowSizeChange: (current, pageSize) => {
                this.setState({
                  pageSize,
                  pageNum: 1,
                });
              },
              onChange: (pageNum) => {
                this.setState({
                  pageNum,
                });
              },
              showTotal: function () {  //设置显示一共几条数据
                return '从 1 到 ' + 10 + ' 页 共 ' + 400 + ' 条数据';
              }
            }}
          />
        </div>
      </div>
    )
  }
}

export default ParitiesFloatMain;