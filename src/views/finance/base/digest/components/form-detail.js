import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import FormItemInput from './formItem-input.js';

class FormDetailClass extends React.Component {
  render() {
    let { FormItemArray } = this.props;
    if (!FormItemArray) {
      FormItemArray = []
    }
    return (
      <div>
        <Form>
          {this.props.children}
        </Form>
      </div>
    )
  }
}

FormDetailClass.PropTypes = {
  FormItemArray: PropTypes.array
}

const FormDetail = Form.create()(FormDetailClass);
export default FormDetail;