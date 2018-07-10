import React, { Component } from 'react';
import Header from './Header';
import classnames from 'classnames';

class Week extends Component {
   weeks = ["Sun", "Mon", "Tus", "Wed", "Tus", "Sat"];
  renderWeekHeader = (props)=> {
    return(
      <div>
        {
          this.weeks.map(date =>
          <div  className={ classnames(`sc-week-root-header`) }>
           <div className={ classnames(`sc-week-day-label`) } >{date}</div>
            <Header header={props.header} view={props.view}/> 
            </div> 
          )
        }
      </div>
    );
  }
  render() {
    return (
     <div>

       {this.renderWeekHeader(this.props)}
      </div>
    );
  }
}
export default Week;