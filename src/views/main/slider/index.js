import React from 'react';
import { Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { isInString } from 'common/utils';

import './slider.less';
const SubMenu = Menu.SubMenu;

@inject('appStore') @observer
class Slider extends React.Component {

  render() {

    let { menus, appStore } = this.props;
    return <div id="slider">
      
      <Menu
        onClick={this.handleClick}
        selectedKeys={[appStore.activedTab]}
        defaultOpenKeys={['sub#menu_base_0']}
        mode="inline"
        onSelect={({ item, key, selectedKeys })=>{
         
          //屏蔽掉点击submenu事件
          if (!isInString(key, 'sub#menu')) {
            if (this.props.onSelect) {
              this.props.onSelect(key);
            }
          }
        }}
      >
      {
        menus.map((menu,index)=>{
          return <SubMenu key={menu.node.key} title={menu.node.title}>
            {
              menu.childs.map((item,index)=>{
                return <Menu.Item key={item.key}>{item.name}</Menu.Item>
              })
            }
          </SubMenu>
        })
      }     
      </Menu>
      
    </div>
  }

}

export default Slider;