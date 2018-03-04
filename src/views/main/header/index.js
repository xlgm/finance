import React from 'react';
import './header.less';
import { Tabs } from 'element-react';
import { Menu, Dropdown, Icon } from 'antd';
import logoimg from 'assets/images/logo.png';
import UserInformation from '../../login/user-information/index.js';
import ModifyPassword from '../../login/modify-password/index.js';
import { inject, observer } from 'mobx-react';
import Modal from 'components/modal/index.js';

 
@inject('appStore') @observer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: '',//个人信息
      modifyPassword: '',//修改密码
      modal: ''//注销
    };
  }


  handleCommand=({ key })=> {
    let { appStore } = this.props;
    let account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : { ucode: '', uname: '', upassword: '' };

    switch (key) {
      case "1": //用户信息  
        appStore.Userinfo({
          userid: account.id,
          param: account.param,
        })
        this.setState({
          userInformation:
          <UserInformation
            handleCancel={() => {
              this.setState({ userInformation: '' })
            }}
          >
          </UserInformation>
        })
        break;
      case "2": //修改密码 
        this.setState({
          modifyPassword:
          <ModifyPassword
            handleCancel={() => {
              this.setState({ modifyPassword: '' })
            }}
            okmodify={() => {
              this.setState({ modifyPassword: '' })
            }}>
          </ModifyPassword>
        })
        break;
      case "3": //注销
        this.setState({
          modal:
          <Modal
            title="注销"
            toast="确定要注销当前登录吗？"
            onCancel={() => {
              this.setState({ modal: '' });
            }}
            onOk={() => {
              //执行注销action
              appStore.Cancellation();
            }}>
          </Modal>
        })
        break;
      default:
    }
  }

  
  
  render() {
    let account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : { ucode: '', uname: '', upassword: '' };
    // console.log(account);
    const menu = (
      <Menu style={{width:100}} onClick={this.handleCommand}>
        <Menu.Item key="1">
            用户信息
        </Menu.Item>
        <Menu.Item key="2">
            修改密码    
        </Menu.Item>
        <Menu.Item key="3">
            注销
        </Menu.Item>
      </Menu>
    );  
    return <div id='root_top'>
      <div id="root_header">
        <div className="img-span">
          <img src={logoimg} />
          <span className="header_span">不用等商家管理后台  2017-10-26 12:00</span>
        </div>
        <em>{account&&account.firm ? account.firm.name : ''}</em>
        <Dropdown overlay={menu}>
          <em className="ant-dropdown-link">
          {account&&account.name ? account.name : ''} <Icon type="caret-down" />
          </em>
        </Dropdown>
      </div>
      <div id="root-function">
        <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name)}>
          <Tabs.Pane
            label={<div className="function-div">
              <div className="icon-div">
                 <i className="iconfont icon-zongzhang"></i> 
              </div>
              <span>总账</span>

            </div>}
            name="1"
          >
          </Tabs.Pane>
        </Tabs>

      </div>
      {this.state.userInformation}
      {this.state.modifyPassword}
      {this.state.modal}
    </div>
  }

}

export default Header;