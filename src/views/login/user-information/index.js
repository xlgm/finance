import React, { Component } from 'react'
import { Dialog, Form, Input } from 'element-react';
import { inject, observer } from 'mobx-react';
import './user.less';

@inject('appStore') @observer
class UserInformation extends Component {

  constructor(props) {
    super(props);
    let account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : { ucode: '', uname: '', upassword: '' }; 
    let responsibility ="";
    if (account.roles && account.roles.length > 1) {  
      account.roles.forEach(function (obj, i) {
        responsibility += obj.name+"、";
      });
    }else if(account.roles && account.roles.length === 1){
      account.roles.forEach(function (obj, i) {
        responsibility = obj.name;
      });
    }
    this.state = {
      responsibility: responsibility,
    } 
  }
  handleCancel = () => {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }

  render() {
    let { appStore } = this.props;
    let userobj = appStore.userobj;   
    return (
      <div id="user-Dialog">
        <Dialog
          title="个人信息"
          visible={true}
          onCancel={this.handleCancel}
          customClass="user-information-popup-modal" >
          <Dialog.Body>
            <Form labelWidth="68">
              <Form.Item label="工号" >
                <Input
                  value={userobj.employeeCode}
                  disabled>
                </Input>
                <div className="img-div">
                  <Form.Item label="头像"  >
                    <div className="user-img">
                      <img src={userobj.logoUrl} />
                    </div>
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item label="姓名">
                <Input
                  value={userobj.userName}
                  disabled>
                </Input>
              </Form.Item>
              <Form.Item label="性别" >
                <Input
                  value={userobj.gender*1 === 2 ? "男" : "女"}
                  disabled>
                </Input>
              </Form.Item>
              <Form.Item label="岗位" >
                <Input
                  value={this.state.responsibility}
                  disabled>
                </Input>
              </Form.Item>
              <Form.Item label="电话" >
                <Input
                  value={userobj.phone}
                  disabled>
                </Input>
                <div className="img-div">
                  <Form.Item label="邮箱">
                    <Input
                      value={userobj.email}
                      disabled>
                    </Input>
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item label="通讯地址" >
                <Input type="textarea"
                  value={userobj.postalAddress}
                  disabled>
                </Input>
              </Form.Item>
            </Form>
          </Dialog.Body>
        </Dialog>
      </div>
    )
  }
}
export default UserInformation;