import React, { Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import helper from './utils/helper';
import classnames from 'classnames';


 const Types = {
   AGENDA_DETAIL: 'AgendaDetail'
 };

 const cardSource = {
   canDrag(props) {
     return true;
   },

   isDragging(props, monitor) {
    return true;
   },

   beginDrag(props, monitor, component) {
      return {id: props.id};
   },

   endDrag(props, monitor, component) {
  
   }
};


@DragSource(Types.AGENDA_DETAIL, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))


 class AgendaDetail extends Component{
    
    constructor(){
      super();
      this.state = { viewMask: false, y: 0 };
      this.mouseDownForResize = this.mouseDownForResize.bind(this);
      this.mouseUpForResize = this.mouseUpForResize.bind(this);
      this.resizeAgenda = this.resizeAgenda.bind(this);
      this.mouseLeaveForResize  = this.mouseLeaveForResize.bind(this);
    }  

   resizeAgenda(ev){
        ev.preventDefault();
        let oldY = this.state.y;
        let newY = ev.pageY;
        console.log("oldY=",oldY);
        console.log("newY=",newY);
        if(oldY - newY == 0){
         // newY = newY -25;
        }
        if(newY > oldY){
          if(newY - oldY > 23){
            this.setState({ maskHeight: this.state.maskHeight + 25, y: newY });
          }
        }else{
           if(oldY - newY > 23){
           this.setState({ maskHeight: this.state.maskHeight - 25, y: newY });
          }
        }
        console.log("-----------------------------------------------------------")
         
    }
    renderMask(direction, height){
      let style = {height: `${this.state.maskHeight}px`};
      console.log(direction);
      console.log("###################",style);
       if(direction == 'top'){
         style.bottom = 0;
       }else{
         style.top = 0;
       }
      return(
        <div 
          onMouseMove={this.resizeAgenda} 
          onMouseUp={this.mouseUpForResize}
         // onMouseLeave={this.mouseLeaveForResize}
          className={classnames('agenda-resize-mask')}
          style = {style}></div>
      )
    }
    mouseDownForResize(direction, ev){
      console.log("---",ev);
      console.log("---",direction);
      ev.preventDefault();
      const { height } = this.props;
      console.log("---",height);
      if(direction == 'bottom'){
        this.setState({viewMask: true, y: ev.pageY, maskHeight: height + 25, direction: direction });
      }else{
        this.setState({viewMask: true, y: ev.pageY, maskHeight: height - 25, direction: direction });
      }
    }
    mouseUpForResize(){
      
     let {agenda} = this.props;
     this.setState({viewMask: false});
      agenda.Duration = this.state.maskHeight;
      props.changeState(0, agenda);
    }
    mouseLeaveForResize(){
     let {agenda} = this.props;
     this.setState({viewMask: false});
      agenda.Duration = this.state.maskHeight;
      props.changeState(0, agenda);
    }
    render(){
      console.log( "viewMask=",this.state.viewMask);
        const { connectDragSource, id, top, height, left, agenda } = this.props;
        let timeSlotLabel = helper.getTimeIntervalLabel(agenda.ScheduledDate, agenda.Duration);

        return connectDragSource(
            <div id={id} 
                 draggable="true" 
                 className={classnames('agenda-container-cell')}
                 style = {{
                    top : `${top}px`,
                    height: `${height}px`,
                    left: `${left}px`
                }}>
                <div className={classnames('sc-agenda-details')}>{timeSlotLabel}</div>
                <span onMouseDown={(ev) => this.mouseDownForResize('top' ,ev)} className={classnames('resize resize-top')}></span>
                <span onMouseDown={(ev) => this.mouseDownForResize('bottom', ev)}  className={classnames('resize resize-bottom')}></span>
                    {this.state.viewMask && this.renderMask(this.state.direction, height)}
              </div>
        );
    }
 }
AgendaDetail.propTypes= {
 connectDragSource: PropTypes.func.isRequired
}
export default AgendaDetail;
