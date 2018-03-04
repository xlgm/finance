import React from 'react';
import { Modal, Table, Input } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import { message } from 'antd';



message.config({
  top: 200,
  duration: 2,
});

@inject('subjectStore') @observer
class Cash extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: '',
      selectedRows: [],
      accountingCaptionTypeName: '',
      pageNum: 1,
      pageSize: 10,
      status: '1003',
    }

    let { subjectStore } = this.props;



  }

  render() {
    let { onCancel, onOk, subjectStore } = this.props;




    const columns = [
      {
        title: "序号",
        dataIndex: "accCaptionTypeName",
        key: 'accCaptionTypeName',
        width: '5%',
      },
      {
        title: "编码",
        dataIndex: "accCaptionCode",
        key: 'accCaptionCode',
        width: '15%',
      },
      {
        title: "名称",
        dataIndex: "accCaptionName",
        key: 'accCaptionName',
        width: '10%',

      },
      {
        title: "现金流量项目全名",
        dataIndex: "lendingDirectionName",
        key: 'lendingDirectionName',
        width: '20%',
      },

      {
        title: "类型",
        dataIndex: "changeRate",
        key: 'changeRate',
        width: '10%',
      },
      {
        title: "方向",
        dataIndex: "currencyNames",
        key: 'currencyNames',
        width: '15%',

      },
      {
        title: "数据状态",
        dataIndex: "accLatitudeNames",
        key: 'accLatitudeNames',
        width: '10%',
      },
      {
        title: "禁用状态",
        dataIndex: "status",
        key: 'status',
      },
    ];
    const data = [
      {
        accCaptionTypeName: '1',
        accCaptionCode: 'CI01.01.01',
        accCaptionName: '税费返还',
        lendingDirectionName: '提供劳务收到的现金',
        changeRate: '主表项目',
        currencyNames: '现金流入/增加',
        accLatitudeNames: '已审核',
        status: '否',
        index: 1,
      },
      {
        accCaptionTypeName: '2',
        accCaptionCode: 'CI01.01.02',
        accCaptionName: '税费返还',
        lendingDirectionName: '提供劳务收到的现金',
        changeRate: '主表项目',
        currencyNames: '现金流入/增加',
        accLatitudeNames: '已审核',
        status: '否',
        index: 2,
      }
    ]
    let datas = data.map((item) => {
      item.key = item.index
      return item;
    })
    return (
      <Modal
        title="现金流量项目表"
        visible={true}
        width={1000}
        height={400}
        footer={null}
        maskClosable={false}
        wrapClassName='organization-cash-modal'
        onCancel={() => {
          onCancel && onCancel();
        }}
      >
        <div className="search-name">
          <Input
            size="large"
            placeholder="请输入名称查询"
            style={{ width: 200 }}
            onChange={(e) => {

            }}
            onPressEnter={(e) => {

            }}
          />
          <PurpleButton
            style={{ marginLeft: 20 }}
            height={'32px'}
            onClick={() => {

            }}>查询</PurpleButton>
        </div>
        <div >
          <Table
            bordered
            dataSource={datas}
            columns={columns}
            style={{ marginTop: 20 }}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                // console.log(selectedRows);
                this.setState({ selectedRowKeys, selectedRows });
              }
            }}
            scroll={{ y: 200 }}
            pagination={{
              // total: '100',
              pageSize: this.state.pageSize,
              current: this.state.pageNum,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onShowSizeChange: (current, pageSize) => {

                this.setState({
                  pageSize,
                  pageNum: 1,
                  selectedRowKeys: []
                });





              },
              onChange: (pageNum) => {
                this.setState({
                  pageNum,
                  selectedRowKeys: []
                });



              },
              showTotal: function () {  //设置显示一共几条数据
                return '从1至1共100条数据';
              }
            }}
          />
        </div>
        <div className="add-buttons" style={{ textAlign: 'center' }}>
          <WhiteButton onClick={() => {
            onCancel && onCancel();
          }}>取消</WhiteButton>
          <PurpleButton style={{ marginLeft: 20 }} onClick={() => {

          }}>确定</PurpleButton>
        </div>
        {this.state.loading}
      </Modal>
    )
  }
}

export default Cash;