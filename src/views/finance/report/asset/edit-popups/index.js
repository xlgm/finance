import React from 'react';
import { Modal, Form, Input, Select, Table, AutoComplete, Icon, message } from 'antd';
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react';
import ChoiceSubjectModal from 'components/choice-subject-modal';

import './add.less';
const Option = AutoComplete.Option;


@inject('subjectEntryStore') @observer
class EditDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      result: [],
      choiceSubject: '',
      dataList: [
        {
          key: '1',
          subject: '啦啦啦啦啦啦啦啦啦啦啦',
          symbol: '222',
          ruleFetch: '43333',
          finalNumber: 1,
          yearBeginning: 2,
        },
      ],
      finalNumberList: [],
      yearBeginningList: []
    }

  }

  componentWillMount() {
    this.sumNumberList();
  }

  sumNumberList = () => {
    let finalNumberList = [];
    let yearBeginningList = [];
    this.state.dataList.forEach(function (obj, i) {
      finalNumberList.push(obj.finalNumber);
      yearBeginningList.push(obj.yearBeginning);
    });

    this.setState({ finalNumberList, yearBeginningList });
  }



  handleChange = (value) => {
    let result;
    result = ['哈哈哈', '啦啦啦啦', '嘻嘻嘻'];
    this.setState({ result });
  }

  //求和
  sum = (list) => {
    let listcount = list.length;
    return listcount > 0 ? eval(list.join("+")).toFixed(2) : 0;
  }


  //判断是否有重复的数据
  isRepeat = (subject, ruleFetch) => {
    let flagt = false;
    this.state.dataList.forEach(function (obj, i) {
      if (obj.subject === subject && obj.ruleFetch === ruleFetch) {
        flagt = true;
      }
    });
    return flagt;
  }


  //提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
        };
        let dataList = this.state.dataList;

        if (!this.isRepeat(values.subject, values.ruleFetch)) {
          dataList.push({
            key: (dataList.length + 1) + "",
            subject: values.subject,
            symbol: values.symbol,
            ruleFetch: values.ruleFetch,
            finalNumber: 1.1,
            yearBeginning: 2,
          });

          this.sumNumberList();

          this.setState({ dataList });
        } else {
          message.destroy();
          message.warn("科目、取数规则组合不能重复");
        } 
      }
    });
  }


  //删除一行数据
  delTr = (index) => {
    let dataList = this.state.dataList;
    dataList.splice(index, 1);
    this.setState({ dataList });
    this.sumNumberList();
  }

  //科目的点击事件
  selectSubject = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      choiceSubject:
      <ChoiceSubjectModal
        onCancel={() => {
          this.setState({
            choiceSubject: '',
          })
        }}
        onOk={()=>{

        }}>
      </ChoiceSubjectModal>
    })
  }


  render() {
    let { onCancel, paramText } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = null;
    const { result } = this.state;
    const children = result.map((email) => {
      return <Option key={email}>{email}</Option>;
    });

    let columns = [
      {
        title: '科目',
        dataIndex: 'subject',
        key: "subject",
        width: '20%'
      },
      {
        title: '运算符号',
        dataIndex: 'symbol',
        key: "symbol",
        width: '15%'
      },
      {
        title: '取数规则',
        dataIndex: 'ruleFetch',
        key: "ruleFetch",
        width: '15%'
      },
      {
        title: '期末数',
        dataIndex: 'finalNumber',
        key: "finalNumber",
        width: '20%'
      },
      {
        title: '年初数',
        dataIndex: 'yearBeginning',
        key: "yearBeginning",
        width: '20%'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: "operation",
        render: (text, record, index) => {
          return (
            <i className="iconfont icon-tubiaoguanbishanchu" onClick={(e) => { this.delTr.call(this, index) }}></i>
          )
        }
      }
    ]
    return <Modal
      title={`编辑公式-${paramText}`}
      visible={true}
      width={800}
      height={600}
      maskClosable={false}
      footer={null}
      wrapClassName='editcc-dialog'
      onCancel={() => {
        onCancel && onCancel();
      }}>
      <div className="content-main">
        <div className="add-content">
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="科目" >
              {getFieldDecorator('subject', {
                rules: [{ required: true, message: '请输入科目名称/编码查询!' }],
              })(
                <AutoComplete style={{ "width": "180px" }}
                  onChange={this.handleChange}
                  placeholder="请输入科目名称/编码查询"
                  dataSource={children}>
                  <Input suffix={<Icon type="search" className="certain-category-icon" onClick={(e) => { this.selectSubject.call(this, e) }} />} />
                </AutoComplete>
                )}
            </Form.Item>
            <Form.Item {...formItemLayout}
              label="运算符号">
              {getFieldDecorator('symbol', {
                initialValue: '+' || '',
              })(
                <Select placeholder="选择一个选项" style={{ "width": "100px" }}>
                  <Select.Option value="+">+</Select.Option>
                  <Select.Option value="-">-</Select.Option>
                </Select>
                )}
            </Form.Item>
            <Form.Item
              label="取数规则" {...formItemLayout} >
              {getFieldDecorator('ruleFetch', {
                initialValue: '余额' || '',
              })(
                <Select placeholder="选择一个选项" style={{ "width": "100px" }}>
                  <Select.Option value="余额">余额</Select.Option>
                  <Select.Option value="借方余额">借方余额</Select.Option>
                  <Select.Option value="贷方余额">贷方余额</Select.Option>
                </Select>
                )}
            </Form.Item>
            <Form.Item  {...formItemLayout} >
              <PurpleButton onClick={this.handleSubmit}>添加</PurpleButton>
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.dataList}
          bordered
          size="middle"
          scroll={{ y: 300 }}
          pagination={false}
          footer={() => <div className="footer-total">
            <span>合计</span>
            <span></span>
            <span></span>
            <span>{this.sum(this.state.finalNumberList)}</span>
            <span>{this.sum(this.state.yearBeginningList)}</span>
            <span></span>
          </div>}
        />
      </div>
      <div className="add-buttons">
        <WhiteButton onClick={() => {
          onCancel && onCancel();
        }}>取消</WhiteButton>
        <PurpleButton >确定</PurpleButton>
      </div>
      {this.state.choiceSubject}
    </Modal>
  }
}

const WrappedRegistrationForm = Form.create()(EditDialog);
export default WrappedRegistrationForm;  