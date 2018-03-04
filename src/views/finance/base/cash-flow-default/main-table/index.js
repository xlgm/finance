import React from 'react';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message, Table, Modal, Input, Icon, Button, Popconfirm, AutoComplete } from 'antd';
import { isInArray } from 'common/utils'
import MainTable from '../main-model'

import "./schedule.less"
message.config({
  top: 200,
  duration: 2,
});

@inject('cashFlowDefaultStore') @observer

class Schedule extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      dataSource: [{
        id: 0,
        accCaptionCode: '10010101',
        lendingDirectionName: '借方',
        accCaptionName: '库存现金',
        accCaptionTypeName: 4,
        changeRate: 5,
        currencyNames: 6,
        accLatitudeNames: 7,
      },
      {
        id: 1,
        accCaptionCode: '10010101',
        lendingDirectionName: '借方',
        accCaptionName: '库存现金',
        accCaptionTypeName: 41,
        changeRate: 51,
        currencyNames: 61,
        accLatitudeNames: 71,
      }],

      stateDialog: '',
    };
  }


  render() {
    const { dataSource } = this.state;
    const Option = AutoComplete.Option;
    const OptGroup = AutoComplete.OptGroup;

    const dataMum = [{
      title: '代码',
      children: [
        {
          title: 'CI02.02.03',
          count: '投资支付的现金',
        }, {
          title: 'CI02.02.06',
          count: '资产减值准备',
        },
        {
          title: 'CI02.02.09',
          count: '偿还债务支付的现金',
        },
      ],
    }];

    function renderTitle(title) {
      return (
        <span style={{ marginLeft: 10 }}>
          {title}
          <span style={{ position: 'absolute', right: 15 }}>名称</span>
        </span>
      );
    }

    const options = dataMum.map((group, index) =>
      <OptGroup
        key={index}
        label={renderTitle(group.title)}
      >
        {group.children.map((opt, index) =>
          <Option key={index} value={opt.count}>
            <div>
              <span className="base-cash-flow-defalut-main-table-title" >{opt.title}</span>
              <span className="base-cash-flow-defalut-main-table-count" >{opt.count} </span>
            </div>
            <div className="clear"></div>
          </Option>)
        }
      </OptGroup>);
      
    const columns = [{
      title: "编码",
      dataIndex: "accCaptionCode",
      key: 'accCaptionCode',
      width: '10%',
      render: (text) => {
        return <div className="cash-table-tr-td">{text}</div>
      }
    },
    {
      title: "余额方向",
      dataIndex: "lendingDirectionName",
      key: 'lendingDirectionName',
      width: '10%',
      render: (text) => {
        return <div className="cash-table-tr-td">{text}</div>
      }
    },
    {
      title: "科目名称",
      dataIndex: "accCaptionName",
      key: 'accCaptionName',
      width: '20%',
      render: (text) => {
        return <div className="cash-table-tr-td">{text}</div>
      }
    },
    {
      title: "主表项目(流入)",
      dataIndex: "accCaptionTypeName",
      key: 'accCaptionTypeName',
      width: '15%',
      render: (text, record, index) => {
        return <div className="editable-cell-input-wrapper-div">
          <AutoComplete
            className="certain-category-search-div"
            dropdownClassName="certain-category-search-dropdown-div"
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 200 }}
            style={{ width: '100%', height: '100%', border: 'none' }}
            dataSource={options}
            optionLabelProp="value"
            filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
            onChange={(value) => {

            }}

          >
            <Input suffix={<Icon type="search" className="certain-category-icon-default" onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.setState({
                stateDialog: <MainTable
                  onCancel={() => {
                    this.setState({ stateDialog: '' });
                  }}
                  onOk={() => {


                  }}
                />
              })
            }} />} />
          </AutoComplete>
        </div>

      }
    },
    {
      title: "主表项目(流出)",
      dataIndex: "changeRate",
      key: 'changeRate',
      width: '15%',
      render: (text, record, index) => {
        return <div className="editable-cell-input-wrapper-div">
          <AutoComplete
            className="certain-category-search-div"
            dropdownClassName="certain-category-search-dropdown-div"
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 200 }}
            style={{ width: '100%', height: '100%', border: 'none' }}
            dataSource={options}
            optionLabelProp="value"
            filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
            onChange={(value) => {

            }}

          >
            <Input suffix={<Icon type="search" className="certain-category-icon-default" onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.setState({
                stateDialog: <MainTable
                  onCancel={() => {
                    this.setState({ stateDialog: '' });
                  }}
                  onOk={() => {


                  }}
                />
              })
            }} />} />
          </AutoComplete>
        </div>

      }
    },
    {
      title: "附表项目(流入)",
      dataIndex: "currencyNames",
      key: 'currencyNames',
      width: '15%',
      render: (text, record, index) => {
        return <div className="editable-cell-input-wrapper-div">
          <AutoComplete
            className="certain-category-search-div"
            dropdownClassName="certain-category-search-dropdown-div"
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 200 }}
            style={{ width: '100%', height: '100%', border: 'none' }}
            dataSource={options}
            optionLabelProp="value"
            filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
            onChange={(value) => {

            }}

          >
            <Input suffix={<Icon type="search" className="certain-category-icon-default" onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.setState({
                stateDialog: <MainTable
                  onCancel={() => {
                    this.setState({ stateDialog: '' });
                  }}
                  onOk={() => {


                  }}
                />
              })
            }} />} />
          </AutoComplete>
        </div>

      }
    },
    {
      title: "附表项目(流出)",
      dataIndex: "accLatitudeNames",
      key: 'accLatitudeNames',
      render: (text, record, index) => {
        return <div className="editable-cell-input-wrapper-div">
          <AutoComplete
            className="certain-category-search-div"
            dropdownClassName="certain-category-search-dropdown-div"
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 200 }}
            style={{ width: '100%', height: '100%', border: 'none' }}
            dataSource={options}
            optionLabelProp="value"
            filterOption={(inputValue, option) => option.props.value.indexOf(inputValue) !== -1}
            onChange={(value) => {

            }}

          >
            <Input suffix={<Icon type="search" className="certain-category-icon-default" onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              this.setState({
                stateDialog: <MainTable
                  onCancel={() => {
                    this.setState({ stateDialog: '' });
                  }}
                  onOk={() => {


                  }}
                />
              })
            }} />} />
          </AutoComplete>
        </div>

      }
    }];
    return (
      <div className="cash-flow-default-table">
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: 330 }}
        />
        {this.state.stateDialog}
      </div>
    );
  }

}

export default Schedule;