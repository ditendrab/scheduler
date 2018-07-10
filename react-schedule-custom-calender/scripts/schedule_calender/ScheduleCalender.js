import React, { Component, PropTypes } from 'react';
import {timeSlot, views} from './utils/constants';
import Day from './Day';
import Week from './Week';
import classnames from 'classnames';

class ScheduleCalender extends Component {

 renderView = (props) => {
   
   if(props.view == 'week'){
     return (
        <Week {...this.props} />
      );
   }else{
      return (
        <Day {...this.props}/>
      );
   }
};

render() {
    return (
     <div id="scheduleCalender" className={classnames('sc-container')}>
      {this.renderView(this.props)}
      </div>
    );
  }
}
 

ScheduleCalender.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  interval: PropTypes.number,
  view: PropTypes.string,
  header: PropTypes.array,
  agendaList: PropTypes.array,
  chairFieldName: PropTypes.string
};

ScheduleCalender.defaultProps = {
  startTime: timeSlot.START_TIME,
  endTime: timeSlot.END_TIME,
  interval: timeSlot.INTERVAL,
  view: views.DAY,
  header: [],
  agendaList: [],
  chairFieldName:'chairId'
};


export default ScheduleCalender;