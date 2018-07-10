import React, { Component } from 'react';
import classnames from 'classnames';

class HeaderNew extends Component {

 renderHeader = (props) => {
  let clsPrefix =    props.view &&  props.view.toLowerCase() == 'week' ? 'sc-week' :'sc-day';
 
  return (

      <tbody>
          <tr  key={props.view} className={classnames('sc-header-row')}>
             <td className={classnames('sc-header-timeslot-col sc-header-col')}></td>
            {props.header.map((head, i)=><td key={head+i} className={classnames('sc-header-col')}>
                 <div   className={classnames('sc-header-cell')}>
                   <div   className={classnames('sc-header-innercell')}>
                   { props.view &&  props.view.toLowerCase() == 'week' ? head.name.substring(0,2): head.name}
                   </div>
                   </div>
                </td> )  
          }</tr>
    </tbody>
   
  );
};

render() {
    return (
        <div>
         <div className={classnames('inline')}> <table  cellSpacing="0" cellPadding="0" border="0"  className={classnames('sc-header-container')}>{this.renderHeader(this.props)}</table></div>
      </div>
    );
  }
}
export default HeaderNew;