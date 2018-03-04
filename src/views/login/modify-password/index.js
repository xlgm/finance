import React, { Component } from 'react'
import { Dialog, Form, Input } from 'element-react';
import { WhiteButton, PurpleButton } from 'components/Button.js';
import { inject, observer } from 'mobx-react';
import {message} from 'antd';
import './modifypassword.less';

@inject('appStore') @observer
class ModifyPassword extends Component {

  constructor(props) {
    super(props);
    let account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : { ucode: '', uname: '', upassword: '' };
    this.state = {
      userNumber: account.uname,//用户
      maxlength: 12,
      form: {
        originalPassword: '',//原密码
        newPassword: '',//新密码
        confirmPassword: '',//确认密码 
      },
      rules: {
        originalPassword: [
          { required: true, message: '请输入原密码!', validateTrigger: ['change', "blur"], },
          {
            validator: (rule, value, callback) => {
              if (account.upassword !== value) {//失去焦点原密码是否正确
                callback(new Error('原密码错误!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ],
        newPassword: [
          { required: true, message: '请输入新密码!', validateTrigger: ['change', "blur"], },
          {
            validator: (rule, value, callback) => {
              if (value.length > 12) {
                callback(new Error('密码长度不能超过12位!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码!', validateTrigger: ['change', "blur"], },
          {
            validator: (rule, value, callback) => {
              if (value !== this.state.form.newPassword) {//失去焦点原密码是否正确
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      }
    };
  }

  handleCancel = () => {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }

  handleSubmit(e) {
    let { appStore } = this.props;
    let account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : { ucode: '', uname: '', upassword: '' };
    let sha1 = require('sha1');
    let password = sha1(this.state.form.newPassword);
    e.preventDefault();
    this.refs.form.validate((valid) => {
      if (valid) {
        appStore.Loginpassword({
          param: account.param,
          password: password.toUpperCase(),
          success: () => {
            message.destroy();
            message.warn("修改成功"); 
            if (this.props.okmodify) {
              this.props.okmodify();
            }
          }
        })
      } else {
        return false;
      }
    });
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  render() {
    return (
      <div id="modifypassword-Dialog">
        <Dialog
          title="修改密码"
          visible={true}
          onCancel={this.handleCancel}
          customClass="modifypassword-popup-modal">
          <Dialog.Body>
            <Form ref="form" labelWidth="82" model={this.state.form} rules={this.state.rules}>
              <Form.Item label="用户" >
                <Input
                  type="text"
                  value={this.state.userNumber}
                  disabled>
                </Input>
              </Form.Item>
              <Form.Item prop="originalPassword" label="原密码">
                <Input
                  type="password"
                  value={this.state.form.originalPassword}
                  onChange={this.onChange.bind(this, 'originalPassword')}
                  placeholder="请输入原密码"
                >
                </Input>
              </Form.Item>
              <Form.Item prop="newPassword" label="新密码" >
                <Input
                  type="password"
                  value={this.state.form.newPassword}
                  onChange={this.onChange.bind(this, 'newPassword')}
                  placeholder="请输入新密码"
                >
                </Input>
              </Form.Item>
              <Form.Item prop="confirmPassword" label="确认密码" >
                <Input
                  type="password"
                  value={this.state.form.confirmPassword}
                  onChange={this.onChange.bind(this, 'confirmPassword')}
                  placeholder="请确认密码"
                >
                </Input>
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <WhiteButton width='114px' onClick={this.handleCancel}>取消</WhiteButton>
            <PurpleButton width='114px' onClick={this.handleSubmit.bind(this)}>确定</PurpleButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    )
  }
}
export default ModifyPassword;