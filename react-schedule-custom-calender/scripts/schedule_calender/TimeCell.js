import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import helper from './utils/helper';
import {clock, layout} from './utils/constants';
import classnames from 'classnames';

const Types = {
  AGENDA_DETAIL: 'AgendaDetail'
};

const squareTarget = {
  canDrop(props) {
    return !props.forbidDrag;
  },
 hover(props, monitor, component) {
    
 },
  drop(props, monitor, component) {
   const index =  monitor.getItem().id;
   const rowIndex = props.rowIndex;
   const interval = props.interval;
   const totalMin = rowIndex * interval;
   let hr = parseInt(totalMin / clock.MINUTE);
   let min = totalMin % clock.MINUTE;
   let totalNewMinute =   helper.addTime(props.startTime, hr, min);
   let agenda = props.agendaList[index-1];
   let totalOldMinute = helper.getMinutesFromDate(agenda.ScheduledDate);
   agenda.OperatoryID = props.header[props.chairIndex].OperatoryID;
    
   if(totalNewMinute > totalOldMinute){
    agenda.ScheduledDate = helper.addTimeToDateByMinute(agenda.ScheduledDate, (totalNewMinute - totalOldMinute));
   }else{
    agenda.ScheduledDate = helper.subTimeToDateByMinute(agenda.ScheduledDate, (totalOldMinute - totalNewMinute));
   }
   props.changeState(index, agenda);
  }
};



@DropTarget(Types.AGENDA_DETAIL, squareTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))



 class TimeCell extends Component{

renderOverlay(color){
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: color,
        }}
      />
    );
  };

  render(){
        let current = this;
        const { connectDropTarget, chairIndex, rowIndex, isOver } = this.props;
        return connectDropTarget(
           <td  onDragEnd={current.dragEnd} onDrop={current.drop} id={ rowIndex +'_'+chairIndex} onDragOver={current.allowDrop} className={classnames('sc-grid-col')}><div draggable="true" className={classnames('sc-grid-cell')}><div className={classnames('sc-grid-innercell')}></div>
            {isOver && this.renderOverlay(layout.BACKGROUND_COLOR)}
           </div></td>
        );
    }
 }

TimeCell.propTypes= {
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  forbidDrag: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired
}
TimeCell.defaultProps = {
  connectDropTarget: true,
  isDragging: true,
  forbidDrag: false
}
export default TimeCell;
