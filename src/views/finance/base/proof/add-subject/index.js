import React from 'react'; 
import { message, Table, Input ,Modal} from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { isInArray } from 'common/utils'
import Loading from 'components/loading';
import './add-subject.less';

@inject('proofStore') @observer
class AddSubjectDialog extends React.Component {
  constructor(props) {
    super(props);
    let { proofStore } = this.props; 

    this.state = {
      finalDatas: [],//纪录最后选中的数值
      rowSelection: [],
      selectedRowKeys: [],
      searchName: '',
      accCaptionTableID: proofStore.getChangeId,//添加科目表传参 
      loading: '',
      addcolumns: [
        {
          title: '科目',
          dataIndex: 'accCaptionName',
          key: 'accCaptionName',
        }
      ]
    } 

  }

  componentWillMount(){
    let { proofStore } = this.props; 
    proofStore.getAccountCaptionList({
      accCaptionTableID: this.props.accCaptionTableID,
      showLoading: () => {  
        this.setState({
          loading: <Loading />
        })
      },
      closeLoading: () => { 
        this.setState({
          loading: ''
        })
      }
    });
  }

  clickdetermine = () => {
    if (this.state.selectedRowKeys.length === 0) {
      message.destroy();
      message.warn("请选中数据");
    } else {
      if (this.props.clickdetermine) {
        this.props.clickdetermine(this.state.finalDatas);
      }
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  queryClick = () => {
    let { proofStore } = this.props;
    proofStore.getAccountCaptionList({
      accCaptionTableID: this.state.accCaptionTableID,
      accountingCaptionName: this.state.searchName.trim(),
      success: () => {

      }

    })
  }


  render() {
    let { onCancel } = this.props;
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
        this.setState({ finalDatas: lempdata })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.setState({
          finalDatas: selectedRows,
        })
      }

    };


    let { proofStore, accCaptionIDs } = this.props;
    let accCaptionList = proofStore.accCaptionList;
    let datalist = [];
    accCaptionList.forEach(function (obj, i) {
      datalist.push({
        key: obj.accCaptionID,
        accCaptionID: obj.accCaptionID,
        accCaptionName: obj.accCaptionName,
      });
    });

    let filterList = datalist.filter((item) => {
      return !isInArray(accCaptionIDs, item.accCaptionID)
    })

    return (
      <Modal
      title="选择科目"
      visible={true}
      width={550}
      height={400}
      maskClosable={false}            
      footer={null}
      wrapClassName='organization-add'
      onCancel={()=>{
        onCancel&&onCancel();
      }}
      >
      <div className="add-table">
        <div className="currency_search">
          <Input
            style={{ width: 270, height: 36 }}
            type="text"
            placeholder="请输入名称查询"
            onChange={(e) => {
              this.setState({ searchName: e.target.value });
            }}
            onPressEnter={(e) => {
              this.queryClick();
            }}
          />
          <PurpleButton onClick={this.queryClick}>查询</PurpleButton>
        </div>
        <div className="currency-add-table">
          <Table
            rowSelection={rowSelection}
            pagination={false}
            bordered
            scroll={{ y: 200 }}
            dataSource={filterList} columns={this.state.addcolumns}
          />
        
        </div> 
      </div>
      <div className="add-buttons">
        <WhiteButton onClick={() => { onCancel && onCancel(); }}>取消</WhiteButton>
        <PurpleButton onClick={this.clickdetermine}>确定</PurpleButton>
      </div>
      
      {this.state.loading}  
    </Modal>
    )
  }
}

export default AddSubjectDialog;