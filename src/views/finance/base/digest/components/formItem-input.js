import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

class FormItemInput extends React.Component {
  render() {
    const {label, className, type, value, disabled, style, formItemLayout} = this.props
    return (
      <FormItem {...formItemLayout} label={label} className={className}>
        <Input style={{...style}} type={type} value={value} disabled={disabled} />
      </FormItem>
    )
  }
}

export default FormItemInput;