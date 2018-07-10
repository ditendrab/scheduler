import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


 class TimeColumn extends Component{


   renderTimeSlot(index, timeLable){
       return(
        <tr className={classnames('sc-timeslot-row')} key={timeLable + index}>
            <td key={index} className={classnames('sc-timeslot-col')}>
                <div className={classnames('sc-timeslot-cell')}>
                     <div className={classnames('sc-timeslot-innercell')}>
                    {timeLable}
                    </div>
               </div>
            </td>
        </tr>
       );
   }

   renderTimeColumn(props){
     const hour = 12;
     const minute = 60;
     let renderSlots = [];
     let {startHour, endHour, startMinute, endMinute, startMeridiem, endMeridiem, interval} = props;
     let slotEnd = endHour;

    if(startMeridiem != endMeridiem){
        slotEnd += hour; 
    }

        for(let index = (startHour % hour); index < slotEnd; index++){
            for(let slot = 0; slot <= minute; slot = slot + interval){
              if (slot === 0) {
                  const time = (index % hour) === 0 ? hour : (index % hour);
                  const meridiem = index >= hour ? endMeridiem : startMeridiem;
                  renderSlots.push(this.renderTimeSlot(index, time + ' ' + meridiem))
                }else if(slot != minute){
                    renderSlots.push(this.renderTimeSlot(index, ':'+slot))
                }
            
            }
        }
        return(
           <tbody>{renderSlots}</tbody>
        ) 
    }

    render(){
        return(
            <table  cellSpacing="0" cellPadding="0" border="0"  className={classnames('sc-timeslot-container')}>{this.renderTimeColumn(this.props)}</table>
        );
    }
 } 

       
   TimeColumn.propTypes = {
        startHour: PropTypes.number,
        endHour: PropTypes.number,
        startMinute: PropTypes.number,
        endMinute: PropTypes.number,
        startMeridiem: PropTypes.string,
        endMeridiem: PropTypes.string,
        interval: PropTypes.number
    };

    TimeColumn.defaultProps = {
        startHour:12,
        endHour:12,
        startMinute:0,
        endMinute: 0,
        startMeridiem: 'AM',
        endMeridiem: 'PM',
        interval: 15
    };


 export default TimeColumn;