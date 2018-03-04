import React from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Switch, Table } from 'antd';
import { WhiteButton } from 'components/Button.js'
import { Tabs } from 'antd';
import './detail.less';
const TabPane = Tabs.TabPane;

@inject('systemStore') @observer
class SystemDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    }

  }
  componentWillUnmount() {
    let { systemStore } = this.props;
    systemStore.clearDetail();
  }

  render() {

    let { systemStore } = this.props;

    let columnsLeft = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 50,
      },
      {
        title: <div><i className="xing">*</i>核算组织</div>,
        dataIndex: 'orgName',
        key: 'orgName',
        width: 120,

      },
      {
        title: <div><i className="xing">*</i>适用会计政策</div>,
        dataIndex: 'accPolicyName',
        key: 'accPolicyName',
        width: 120,

      },
      {
        title: <div><i className="xing">*</i>默认会计政策</div>,
        dataIndex: 'defaultAccPolicyName',
        key: 'defaultAccPolicyName',
      }
    ]

    let columnsRight = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        width: 50
      },
      {
        title: <div><i className="xing">*</i>下级组织</div>,
        dataIndex: 'orgName',
        key: 'orgName',
        width: 120
      },
      {
        title: '描述',
        dataIndex: 'orgDescription',
        key: 'orgDescription',

      }
    ]
    let accSystemOrgInfos;
    if (systemStore.systemDetail.accSystemOrgInfos) {
      accSystemOrgInfos = systemStore.systemDetail.accSystemOrgInfos.map((item) => {
        let { key, orgName, accPolicyName, defaultAccPolicyName, childs } = item;
        return { key, orgName, accPolicyName, defaultAccPolicyName, childs }
      })
    } else {
      accSystemOrgInfos = [];
    }


    let currentIndex = this.state.currentIndex;

    return (
      <div className='system-detail'>
        <div className="return-button">
          <WhiteButton onClick={() => {
            systemStore.changePageControl('SystemMain');
          }}>返回</WhiteButton>
        </div>
        <div className="tabs-block">
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <div className="add-toast">
                说明：一个集团（商家）必须有一个默认的核算体系，系统通过默认核算体系业务组织所属核算组织的默认会计政策，获取币别、汇率等信息。
              </div>
              <div className="add-toggle">
                <div className="input">
                  <span><i className="xing">*</i>名称</span>
                  <Input 
                    style={{height: 36}}
                    value={systemStore.systemDetail ? systemStore.systemDetail.accSystemName : ''} 
                    readOnly 
                  />
                </div>
                {
                  systemStore.systemDetail && systemStore.systemDetail.defaultAccSystem && <div className="default">
                    <span>默认核算体系</span>
                  </div>
                }

                <div className="default">
                  <span>法人核算体系</span>
                  <Switch 
                    checkedChildren="是" 
                    unCheckedChildren="否"
                    checked={systemStore.systemDetail ? systemStore.systemDetail.legalPersonAccSystem : false} 
                    disabled 
                  />
                </div>

              </div>
              <div className="add-table">
                <div className="table-left">
                  <div className="table">
                    <Table
                      bordered
                      size='middle'
                      dataSource={accSystemOrgInfos}
                      columns={columnsLeft}
                      onRowClick={(record, index, event) => {
                        this.setState({ currentIndex: index });
                      }}
                      rowClassName={(record, index) => {
                        if (this.state.currentIndex * 1 === index) {
                          return 'row-selected'
                        } else {
                          return '';
                        }
                      }}
                      scroll={{ y: 250 }}
                      pagination={false}
                    />
                  </div>
                </div>
                <div className="table-right">
                  <div className="table">
                    <Table
                      bordered
                      size='middle'
                      dataSource={accSystemOrgInfos.length > 0 ? accSystemOrgInfos[currentIndex].childs : []}
                      columns={columnsRight}
                      scroll={{ y: 250 }}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="操作记录" key="2">
              暂无操作记录
            </TabPane>
          </Tabs>
        </div>

      </div>
    )
  }
}

export default SystemDetail;