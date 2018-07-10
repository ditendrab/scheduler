import React, { Component } from 'react';
import ScheduleCalender from './schedule_calender/ScheduleCalender';
import classnames from 'classnames';

const agendaList = [{ id:1, "ScheduledDate": "2017-01-27T07:45:00Z", "Duration": 15,  "OperatoryID": "56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c0"},
     {id:2, "ScheduledDate": "2017-01-27T07:30:00Z", "Duration": 30,  "OperatoryID": "56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c1"},
     {id:3, "ScheduledDate": "2017-01-27T09:30:00Z", "Duration": 45, "OperatoryID": "56c7dae2-8f5c-442f-a0a5-2d88c2a7a1c1"},
     {id:4, "ScheduledDate": "2017-01-27T08:30:00Z", "Duration": 30, "OperatoryID": "56c7dae3-8f5c-442f-a0a4-2d88c2a7a1c1"},
     {id:5, "ScheduledDate": "2017-01-27T10:30:00Z", "Duration": 30, "OperatoryID": "58c7dae2-8f5c-442f-a0a4-2d88c2a7a1c2"}];

  

const headerList = [{name:"Dr Rustom", OperatoryID:"56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c0"}, 
   {name: "Dr Jhon", OperatoryID:"56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c1"}, {name: "Dr. Anna", OperatoryID:"56c7dae2-8f5c-442f-a0a5-2d88c2a7a1c1"},
   {name: "Dr. Bili", OperatoryID:"56c7dae3-8f5c-442f-a0a4-2d88c2a7a1c1"},
   {name: "Dr Rebelo", OperatoryID:"58c7dae2-8f5c-442f-a0a4-2d88c2a7a1c2"},
   {name:"Dr Holebrook", OperatoryID:"56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c2"},
   {name: "Dr. Simpley", OperatoryID:"56c7dae2-9f5c-442f-a0a4-2d88c2a7a1c2"}];

let current;   

class App extends Component {
   constructor(){
     super();
   this.state = { agendaList: agendaList, headerList: headerList};
   current=this;
  }  

  changeState(index, agenda){
    //this.setstate({agendaList: agendaList2});
    
     // alert('change state called');   
     current.myState();
  }

  myState(){
    current.setState({agendaList:agendaList})
  }

  render() {
    const headerList = [{name:"Dr Rustom", OperatoryID:"56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c0"}, 
   {name: "Dr Jhon", OperatoryID:"56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c1"}, {name: "Dr. Anna", OperatoryID:"56c7dae2-8f5c-442f-a0a5-2d88c2a7a1c1"},
   {name: "Dr. Bili", OperatoryID:"56c7dae3-8f5c-442f-a0a4-2d88c2a7a1c1"},
   {name: "Dr Rebelo", OperatoryID:"58c7dae2-8f5c-442f-a0a4-2d88c2a7a1c2"},
   {name:"Dr Holebrook", OperatoryID:"56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c2"},
   {name: "Dr. Simpley", OperatoryID:"56c7dae2-9f5c-442f-a0a4-2d88c2a7a1c2"}];

    const agendaList = [{ id:1, "ScheduledDate": "2017-01-27T04:45:00Z", "Duration": 15,  "OperatoryID": "56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c0"},
     {id:2, "ScheduledDate": "2017-01-27T05:30:00Z", "Duration": 30,  "OperatoryID": "56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c1"},
     {id:3, "ScheduledDate": "2017-01-27T06:30:00Z", "Duration": 45, "OperatoryID": "56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c2"},
     {id:4, "ScheduledDate": "2017-01-27T08:30:00Z", "Duration": 60, "OperatoryID": "56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c1"},
     {id:5, "ScheduledDate": "2017-01-27T01:30:00Z", "Duration": 60, "OperatoryID": "56c7dae2-8f5c-442f-a0a4-2d88c2a7a1c1"}];



    const startTime = '11:00:AM';
    const endTime = '9:00:PM';
    const interval = 15;
    
    return (
      
     <div>
        <ScheduleCalender changeState={this.changeState}
          startTime={startTime}
          endTime={endTime}
          interval={interval}
          view='day' 
          header={this.state.headerList} 
          chairFieldName='OperatoryID'
          agendaList={this.state.agendaList}/>

          
      </div>
    );
  }
}
export default App;