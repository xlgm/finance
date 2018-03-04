import React, { Component } from 'react'; 
 import { Form,Input,Button} from 'element-react';
 
class Finance extends Component {
  constructor(props) {
    super(props);

    this.state = {
        form: {
            pass: '',
            checkPass: '',
            age: ''
        },
        rules: {
        
        age: [
            { required: true, message: '请填写年龄', trigger: 'blur' },
            { validator: (rule, value, callback) => {
            var age = parseInt(value, 10);

            setTimeout(() => {
                if (!Number.isInteger(age)) {
                callback(new Error('请输入数字值'));
                } else{
                if (age < 18) {
                    callback(new Error('必须年满18岁'));
                } else {
                    callback();
                }
                }
            }, 1000);
            }, trigger: 'change' }
        ]
        }
    };
    }


     handleSubmit(e) {
        e.preventDefault();

        this.refs.form.validate((valid) => {
            if (valid) {
            alert('submit!');
            } else {
            console.log('error submit!!');
            return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();

        this.refs.form.resetFields();
    }

    onChange(key, value) {
            this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    

    render() { 
       
        return  <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
            <Form.Item prop="pass" style={{width:320}}>
                <Input
                    type="text" 
                    value={this.state.form.pass} 
                    onChange={this.onChange.bind(this, 'pass')} 
                    autoComplete="off"
                    icon="time"
                     />
            </Form.Item>
        
            </Form>
    }
}

export default Finance;