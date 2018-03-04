import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { isInArray } from 'common/utils';
import Header from './header';
import Slider from './slider';
import Content from './content';
import Popover from './popover';
import {message} from 'antd';
import './main.less';
message.config({top: 200, duration: 2});


@inject('appStore') @observer
class Main extends Component {

  constructor(props) {
    super(props);

    let { appStore } = this.props;

    //获取所有数据字典常量
    
    appStore.getDictionarys();

  }

  onSelect = (item) => {
    let { appStore } = this.props;
    let menuContainers = appStore.menuContainers;
    
    if (isInArray(menuContainers, item)) {
      
      appStore.tabClick(item);
      appStore.changeMenus(menuContainers);

    } else {
      // if(menuContainers.length<=10){
        menuContainers.push(item);
        appStore.changeMenus(menuContainers);
        appStore.tabClick(item);
      //}else{
      //   message.destroy();
      //   message.info('最多打开10个页签,请先关闭页签');
      //}
    }

  }

  //移除当前tab
  removeTab = (tabName) => {

    let { appStore } = this.props;
    let menuContainers = appStore.menuContainers;
    let index = menuContainers.indexOf(tabName);
    menuContainers.splice(index, 1);
    let preKey = menuContainers[index - 1];
    appStore.changeMenus(menuContainers);
    appStore.tabClick(preKey);

  }

  componentWillUnmount() {
    let { appStore } = this.props;
    appStore.tabClick('main_page');
  }

  render() {

    let { appStore } = this.props;
    return <div id='root_main'>
      <Header />
      <div id="container">
        <Slider
          menus={appStore.menus}
          onSelect={(item) => {
            this.onSelect(item);
          }} />
        <Content
          menuContainers={appStore.menuContainers}
          removeTab={(tabName) => {
            this.removeTab(tabName);
          }}
        />
        <Popover
          closeItem={(tabName) => {
            this.removeTab(tabName);
          }}
          closeAll={() => {

            appStore.changeMenus([
              'main_page'
            ]);
            appStore.tabClick("main_page");
          }}
          closeOthers={() => {
            let activedTab = appStore.activedTab;

            if (activedTab === "main_page") {
              appStore.changeMenus([
                'main_page'
              ]);
            } else {
              appStore.changeMenus([
                'main_page',
                activedTab
              ]);
            }
          }}
          itemClick={(tabName) => {
            appStore.tabClick(tabName);
          }}
        />
      </div>
    </div>
  }
}

export default Main;