import React, { Component } from 'react';
import classnames from 'classnames';
import HeaderNew from './HeaderNew';
import TimeGrid from './TimeGrid';


class Day extends Component {
  renderCalender(props){
     return (<div><TimeGrid {...props}/></div>);
  }
  render() {
    return (
     <div>  
         <HeaderNew header={this.props.header} view={this.props.view}/>  
          {this.renderCalender(this.props)}
      </div>
    );
  }
}
export default Day;