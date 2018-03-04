//只是一个容器组件 用来处理要加载的模块
import React from 'react'
import { inject, observer } from 'mobx-react'
import DimensionMain from './main'
import DimensionAdd from './add'
import DimensionModify from './modify'
import DimensionDetail from './detail'
import Loading from 'components/loading'


@inject('dimensionStore') @observer
class DimensionContainer extends React.Component {


  componentWillUnmount() {
    let { dimensionStore } = this.props;
    dimensionStore.changePageControl('DimensionMain')
  }

  render() {

    let { dimensionStore } = this.props;
    let pageControl = dimensionStore.pageControl;

    let dimensionPage
    switch (pageControl) {
      case "DimensionMain": //列表页 
        dimensionPage = <DimensionMain> </DimensionMain>
        break;
      case "DimensionAdd":
        dimensionPage = <DimensionAdd> </DimensionAdd>
        break;
      case "DimensionModify":
        dimensionPage = <DimensionModify> </DimensionModify>
        break;
      case "DimensionDetail":
        dimensionPage = <DimensionDetail> </DimensionDetail>
        break;
      default:
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {dimensionPage}
        {dimensionStore.isShowLoading && <Loading />}
      </div>
    )
  }

}

export default DimensionContainer;