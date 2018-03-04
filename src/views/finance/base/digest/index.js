import React from 'react'
import { inject, observer } from 'mobx-react'
import DigestMain from './main'
import DigestDetail from './detail'
import DigestAdd from './add'
import DigestModify from './modify'
import DigestSideBarAdd from './sideBar/sideBarAdd'
import DigestSideBarEdit from './sideBar/sideBarEdit'
import AbstractType from './abstractTypeDetail'
import AbstractName from './abstractNameDetail'
import Loading from 'components/loading'

@inject('digestStore') @observer
class DigestContainer extends React.Component {
	componentWillUnmount() {
		let { digestStore } = this.props
		digestStore.changePageControl('DigestMain')
	}
	render() {
		let { digestStore } = this.props
		let pageControl = digestStore.pageControl
		let digestPage
		switch (pageControl) {
			case "DigestMain": //列表页 
				digestPage = <DigestMain></DigestMain>;
				break
			case "DigestDetail": //详情页面 
				digestPage = <DigestDetail></DigestDetail>;
				break
			case 'DigestAdd': //添加页面
				digestPage = <DigestAdd></DigestAdd>
				break
			case 'DigestModify': //修改页面
				digestPage = <DigestModify></DigestModify>
				break
			case 'DigestSideBarAdd': //侧边栏新增页面
				digestPage = <DigestSideBarAdd></DigestSideBarAdd>
				break
			case 'DigestSideBarEdit': //侧边栏修改页面
				digestPage = <DigestSideBarEdit></DigestSideBarEdit>
				break
			case 'AbstractType': // 摘要类型详情
				digestPage = <AbstractType></AbstractType>
				break
			case 'AbstractName': // 摘要名称详情
				digestPage = <AbstractName></AbstractName>
				break
			default: digestPage = <DigestMain></DigestMain>;
		}
		return <div style={{ width: '100%', height: '100%' }}>
			{digestPage}
			{!digestStore.loaded && <Loading></Loading>}
		</div>
	}
}

export default DigestContainer