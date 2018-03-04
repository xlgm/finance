import React from 'react';
import { Modal ,Form, Input,Select,message} from 'antd'; 
import { WhiteButton, PurpleButton } from 'components/Button.js'
import { inject, observer } from 'mobx-react'; 

import './add.less'; 

@inject('subjectEntryStore') @observer
class AddDetailsDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
    } 

  }

  //提交
  handleSubmit = (e) => { 
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
    if (!err) { 
      const values = {
        ...fieldsValue, 
      }; 
      console.log('Received values of form: ', values);
      message.warn("执行接口action往数据库加入一条数据");
      if(this.props.onOK){
        this.props.onOK();
      }
    }
    });
  }

  render() {
    let { onCancel } = this.props;
    const { getFieldDecorator } = this.props.form;  
    
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 9 },
    };

    return <Modal
      title="添加明细"
      visible={true}
      width={500}
      height={400}
      maskClosable={false}
      footer={null}
      wrapClassName='add-details-dialog'
      onCancel={() => {
        onCancel && onCancel();
      }}>
      <div className="add-content"> 
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout}  label="科目" > 
            {getFieldDecorator('subject', {   
              initialValue:'11123' || '', 
            })(
              <Input 
                placeholder="请输入科目" 
                disabled 
              />
            )}
          </Form.Item>  
          <sapn className="select-title">辅助核算：</sapn> 
          <Form.Item {...formItemLayout} 
            label="客户">
            {getFieldDecorator('customer', { 
              rules: [{ required: true, message: '请选择客户!' }],
            })(
              <Select  placeholder="选择一个选项">
                <Select.Option  value="1">绿萝</Select.Option>
                <Select.Option value="2">菠萝</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="供应商" {...formItemLayout} >
            {getFieldDecorator('supplier', { 
              rules: [{ required: true, message: '请选择供应商!' }],
            })(
              <Select  placeholder="选择一个选项">
                <Select.Option  value="1">绿萝</Select.Option>
                <Select.Option value="2">菠萝</Select.Option>
              </Select>
            )}
          </Form.Item> 
        </Form>     
      </div>
      <div className="add-buttons">
        <WhiteButton onClick={() => {
          onCancel && onCancel();
        }}>取消</WhiteButton>
        <PurpleButton onClick={this.handleSubmit}>确定</PurpleButton>
      </div> 
    </Modal>
  }
}
 

const WrappedRegistrationForm = Form.create()(AddDetailsDialog);
export default WrappedRegistrationForm; 