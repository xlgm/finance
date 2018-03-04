//只是一个容器组件 用来处理要加载的模块
import React from 'react';
import { inject, observer } from 'mobx-react';
import SubjectMain from './main';
import SubjectAdd from './add';
import SubjectModify from './modify';
import SubjectDetail from './detail';
import Loading from 'components/loading';

@inject('subjectStore') @observer
class SubjectContainer extends React.Component {

  componentWillUnmount() {
    let { subjectStore } = this.props;
    subjectStore.changePageControl('SubjectMain');
  }

  render() {
    let { subjectStore } = this.props;
    let pageControl = subjectStore.pageControl;
    let subjectPage
    switch (pageControl) {
      case "SubjectMain":
        subjectPage = <SubjectMain></SubjectMain>;
        break;
      case "SubjectAdd":
        subjectPage = <SubjectAdd></SubjectAdd>;
        break;
      case "SubjectModify":
        subjectPage = <SubjectModify></SubjectModify>;
        break;
      case "SubjectDetail":
        subjectPage = <SubjectDetail> </SubjectDetail>;
        break;
      default:
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {subjectPage}
        {subjectStore.isShowLoading && <Loading />}
      </div>
    )
  }

}

export default SubjectContainer;