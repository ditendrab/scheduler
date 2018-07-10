import React, { Component } from 'react';
import helper from './utils/helper';
import classnames from 'classnames';
import {layout} from './utils/constants';
import AgendaDetail from './AgendaDetail';

 class Agenda extends Component {
   
    renderAgendaList(props){
     const {startTime, endTime, interval, agendaList, header, chairFieldName} = props;   
     let gridStartMinutes = helper.getMinutesFromTimeString(startTime);
     let gridEndMinutes = helper.getMinutesFromTimeString(endTime);
     
     return agendaList.map((agenda, index)=> {
         const startMinute =  helper.getMinutesFromDate(agenda.ScheduledDate);
     
         if(gridStartMinutes <= startMinute  &&  gridEndMinutes >= startMinute){
           let slot =  (startMinute - gridStartMinutes) / interval;
           let height = (agenda.Duration / interval ) *  layout.CELL_HEIGHT;
           let chairIndex = helper.getIndexOfMatchedField(header, agenda.OperatoryID, chairFieldName);
           let left = chairIndex * layout.CELL_WIDTH; 
         
           return(
           <td>
             <AgendaDetail
               top = {slot * layout.CELL_HEIGHT}
               height = {height}
               left = {left}
               id = {agenda.id}
               agenda = {agenda}
               {...props}
              />
              
              
           </td>
           );
         }
        }
     )
    }
    render() {
    return (
       <table  className={classnames('agenda-container-table')}>
           <tbody>
               {this.renderAgendaList(this.props)}
             </tbody>
         </table>
    );
   }
 } 

 export default Agenda;