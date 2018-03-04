import React, { Component } from 'react'
import { Form, Input, Button } from 'element-react';
import loginIcons from '../../assets/images/login_icons.png';
import { browserHistory } from 'react-router';
import { Base64 } from 'js-base64';
import { inject, observer } from 'mobx-react';
import './login.less';


@inject('appStore') @observer
class Login extends Component {

  constructor(props) {
    super(props);
    let account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : { ucode: '', uname: '', upassword: '' };
    this.state = {
      errorPrompt: '',//错误提示语
      loading: false,
      form: {
        ucode: account ? account.ucode : '',
        uname: account ? account.uname : '',
        upassword: account ? account.upassword : '',
      }
    };
  }

  componentWillMount() {
    document.onkeydown = (e) => {
      if (e.which === 13) {
        this.handleSubmit();
      }
    }
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }


  handleSubmit = (e) => {
    if (this.state.loading === false) {
      if (this.state.form.ucode === "") {
        this.setState({
          errorPrompt: '请输入商家编码!'
        });
      } else if (this.state.form.uname === "") {
        this.setState({
          errorPrompt: '请输入用户名!'
        });
      } else if (this.state.form.upassword === "") {
        this.setState({
          errorPrompt: '请输入密码!'
        });
      } else if (this.state.form.ucode !== "") {
        let { appStore } = this.props;
        let codename = this.state.form.ucode + "_" + this.state.form.uname; //商家编码_用户名 
        let sha1 = require('sha1');
        let passwordsha1 = sha1(this.state.form.upassword);
        let param = 'Basic ' + Base64.encode(codename + ':' + passwordsha1);
        this.setState({ loading: true });
        appStore.Authorization({
          param: param,
          ucode: this.state.form.ucode,
          uname: this.state.form.uname,
          upassword: this.state.form.upassword,
          success: () => {
            browserHistory.push('/');
            this.setState({ loading: false });
          },
          errorReturn: (returnvalue) => {
            this.setState({
              errorPrompt: returnvalue + ""
            });
            this.setState({ loading: false });
          }

        });
      } else {
        this.setState({
          errorPrompt: ""
        });
      }
    }

  }



  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value }),
      errorPrompt: '',
    });
  }

  render() {
    return (
      <div id="login-bg">
        <div id="login-container">
          <div className="login-logo">
            <div className="input-main-logo">
              <img src={loginIcons} />
            </div>
          </div>
          <div className="login-main">
            <div className="login-title">
              <p>不用等商家后台管理系统</p>
              <span>不用等餐饮管理系统2.1</span>
            </div>
            <div className="input-main-div">
              <div className="input-main">
                <Form ref="form" >
                  <div className="prompt-span">
                    {this.state.errorPrompt}
                  </div>
                  <Form.Item style={{ width: 320 }}>
                    <Input
                      type="text"
                      value={this.state.form.ucode}
                      onChange={this.onChange.bind(this, 'ucode')}
                      placeholder="请输入商家编码"
                    />
                    <i className="iconfont icon-bianmaguanli"></i>
                  </Form.Item>
                  <Form.Item style={{ width: 320 }}>
                    <Input
                      type="text"
                      value={this.state.form.uname}
                      onChange={this.onChange.bind(this, 'uname')}
                      placeholder="请输入用户名"
                    />
                    <i className="iconfont icon-login_yonghu"></i>
                  </Form.Item>
                  <Form.Item style={{ width: 320 }}>
                    <Input
                      type="password"
                      value={this.state.form.upassword}
                      onChange={this.onChange.bind(this, 'upassword')}
                      placeholder="请输入登录密码"
                    />
                    <i className="iconfont icon-login_mima"></i>
                  </Form.Item>
                  <Button type="primary" style={{ "width": "320px", "height": "36px" }} loading={this.state.loading} onClick={this.handleSubmit}>登录</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="login-footer">© 2016-2017 深圳市拓润计算机软件公司版权所有</div>
      </div>
    )
  }
}
export default Login;