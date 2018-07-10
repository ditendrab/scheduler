import classnames from 'classnames';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TimeColumn from './TimeColumn';
import ScheduleGrid from './ScheduleGrid';
import Agenda from './Agenda';
import helper from './utils/helper';

 @DragDropContext(HTML5Backend)
 class TimeGrid extends Component{
    render() {
      
      const {header, startTime, endTime, interval} = this.props; 
      const startTimes= helper.splitTime(startTime);
      const endTimes= helper.splitTime(endTime);
      const rowCount = helper.countGridRow(startTime, endTime, interval);

    return (
     <div>
         <div className={classnames('inline')}>
             <TimeColumn startHour={startTimes.hour} endHour={endTimes.hour} startMinute={startTimes.minute}  endMinute={endTimes.minute}
          startMeridiem={startTimes.meridiem} endMeridiem={endTimes.meridiem} interval={interval}/></div>
         <div className={classnames('inline agenda-container')}>
           <ScheduleGrid  {...this.props} chairCount={header.length} rowCount={rowCount} />
           <Agenda {...this.props} />
         </div>
     </div>
    );
  }
 } 
 
 export default TimeGrid;