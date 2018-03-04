import React from 'react';
import { Icon, Button } from 'antd';
import classnames from 'classnames';  
import './advanced-query.less';

class AdvancedQuery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     open: false
    }
  }

  render() {
    const { width=600, height=400, onCancel, onOk } = this.props;

    return (
      <div className="advanced_query_btn">
        <div 
          className="query_btn"
          onClick={()=>{
            let open = this.state.open;
            this.setState({open: !open});
          }}>高级查询<Icon className={classnames({
            rotate: this.state.open
          })}type="down" />
        </div>
        { this.state.open &&
        <div className="search_content" style={{width: width, height: height}}>
          {this.props.children}
          <div className="advanced_query_footer">
            <Button onClick={()=>{
              this.setState({open: false});
              onCancel()
            }}>取消</Button>
            <Button type="primary" onClick={()=>{
              this.setState({open: false});
              onOk()
            }}>确定</Button>
          </div>
        </div>
        }
      </div>      
    )
  }
}

export default AdvancedQuery;