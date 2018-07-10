import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import TimeCell from './TimeCell';

 class ScheduleGrid extends Component{
   
    renderAgendaGridCols(props, rowIndex){
        const {chairCount} = props;
        const renderGridCols = []; 
        for(var index = 0; index < chairCount; index++){
            renderGridCols.push(<TimeCell rowIndex={rowIndex} chairIndex={index} {...props}></TimeCell>);
        }
        return(renderGridCols);
    } 
    renderAgendaGridRows(props, rowIndex){
        return(
            <tr className={classnames('sc-grid-row')}>
               {this.renderAgendaGridCols(props, rowIndex)}
            </tr>
        )
    }
    render() {
        
        const renderGridRows = []; 
        const {rowCount} = this.props;
        for(var timeIndex = 0; timeIndex < rowCount; timeIndex++){
        renderGridRows.push(this.renderAgendaGridRows(this.props, timeIndex));
        }
        return (
        <table cellSpacing="0" cellPadding="0" border="0" className={classnames('sc-grid-container')}>
            <tbody>{renderGridRows}</tbody>
        </table>
        );
    }
 } 

ScheduleGrid.propTypes = {
  chairCount: PropTypes.number,
  rowCount: PropTypes.number

};

ScheduleGrid.defaultProps = {
  chairCount: 1,
  rowCount: 96
};

export default ScheduleGrid;