import React from 'react'; 
import { message, Table, Input,Modal } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import './add-subject.less';

@inject('settlementStore') @observer
class AddMethodDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finalDatas: [],//纪录最后选中的数值
      rowSelection: [],
      selectedRowKeys: [],
      searchName: '',
      pageSize: 10,
      current: 1,
      addcolumns: [
        {
          title: '结算方式',
          dataIndex: 'paymentName',
          key: 'paymentName',
        }
      ]
    }
  }

  clickdetermine = () => {
    let { settlementStore } = this.props;
    if (this.state.selectedRowKeys.length === 0) {
      message.destroy();
      message.warn("请选中数据");
    } else {
      let finalDatas = this.state.finalDatas;
      finalDatas = finalDatas.map((item) => {
        let { sortNo, paymentName, appType, isOnline, paymentMethodID } = item;
        return { sortNo, paymentName, appType, isOnline, paymentMethodID }
      });
      settlementStore.batchAdd({
        form: finalDatas,
        success: () => {
          if (this.props.clickdetermine) {
            this.props.clickdetermine();
          }
        },
        showLoading: () => {
          settlementStore.showLoading();
        },
        closeLoading: () => {
          settlementStore.closeLoading();
        }
      })

    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });

  }

  //查询
  selectQuery = () => {
    this.props.settlementStore.paymentmethodinfoPlatform({
      paymentname: this.state.searchName.trim(),
      success: () => {
      }
    });
  }


  render() {
    let { onCancel, settlementStore } = this.props;
    let { selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: (record, selected, selectedRows) => {
        let lempdata = this.state.finalDatas;
        if (selected) {
          lempdata.push(record);

        } else {
          lempdata = lempdata.filter(function (element, index, self) {
            return record.key !== element.key;
          });
        }
        this.setState({ finalDatas: lempdata });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.setState({
          finalDatas: selectedRows,
        });

      }

    };



    let ItemsList = settlementStore.ItemsList;
    let paymentnameList = settlementStore.paymentnameList;
    paymentnameList.forEach(function (obj, i) {//过滤重复
      ItemsList = ItemsList.filter(function (element, index, self) {
        return obj !== element.paymentname;
      });
    })

    let datalist = [];


    ItemsList.forEach(function (obj, i) {
      datalist.push({
        key: obj.paymentmethodid,
        sortNo: obj.sortno,
        isOnline: obj.isonline === true ? 1 : 0,
        appType: obj.apptype,
        paymentName: obj.paymentname,
        paymentMethodID: obj.paymentmethodid

      });
    });

    return (
      <Modal
      title="添加平台结算方式"
      visible={true}
      width={550}
      height={400}
      maskClosable={false}            
      footer={null}
      wrapClassName='jsfs-add'
      onCancel={()=>{
        onCancel&&onCancel();
      }}>
        <div className="currency_search">
          <Input
            style={{ width: 270, height: 36 }}
            type="text"
            placeholder="请输入名称查询"
            onChange={(e) => {
              this.setState({ searchName: e.target.value });
            }}
            onPressEnter={(e) => {
              this.selectQuery();
            }}
          />
          <PurpleButton onClick={this.selectQuery}>查询</PurpleButton>
        </div>
        <div className="currency-add-table">
          <Table
            rowSelection={rowSelection}
            bordered
            scroll={{ y: 250 }}
            pagination={false}
            dataSource={datalist} columns={this.state.addcolumns}

          />
        </div>
        <div className="add-buttons">
          <WhiteButton onClick={()=>{
              onCancel&&onCancel();
          }}>取消</WhiteButton>
          <PurpleButton  onClick={this.clickdetermine}>确定</PurpleButton>
        </div>
      </Modal> 
    )
  }
}

export default AddMethodDialog;