import React, { Component } from 'react';
import classnames from 'classnames';

class Header extends Component {

 renderHeader = (props) => {
  let clsPrefix =    props.view &&  props.view.toLowerCase() == 'week' ? 'sc-week' :'sc-day';
 
  return (
    <div  className={ classnames(`${clsPrefix}-header`) } >
      {
        props.header.map((head, i) =>
          <div  key= {head} className={ classnames(`${clsPrefix}-header-col`) }  >
            {
                props.view &&  props.view.toLowerCase() == 'week' ? head.substring(0,2): head
            }
          </div>
        )
      }
    </div>
  );
};

render() {
    return (
      <div  className={ classnames(`inline`) } >{this.renderHeader(this.props)}</div>
    );
  }
}
export default Header;