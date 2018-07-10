import moment from 'moment';
import {clock, dateFormat} from './constants';

let helper = {
  splitTime(time, delimiter) {
    const del = delimiter === undefined ? ':' : delimiter; 
    const times = time.split(del);
    const hour = parseInt(times[0]);
    const minute = parseInt(times[1]);
    const meridiem = times[2];
    return { hour: hour, minute: minute, meridiem: meridiem }
},
  addTime(timeStr, hr, min){
    let totalMin = 0;
    let times = helper.splitTime(timeStr);
    if(times.meridiem == 'PM'){
        times.hour+= times.hour + 12;
    }
    totalMin =  (( hr + times.hour) * clock.MINUTE)   + times.minute + min; 
    return totalMin;
  },
  countGridRow (startTime, endTime, interval){
    const startTimeObj =  helper.splitTime(startTime);
    const endTimeObj =  helper.splitTime(endTime);
    let rowCount = 0;
    
    if (startTimeObj.meridiem !== endTimeObj.meridiem){
      rowCount = 12 - startTimeObj.hour === 0 ? 12 :  12 - startTimeObj.hour
      rowCount+=  endTimeObj.hour;
    } else {
      rowCount =  (endTimeObj.hour - startTimeObj.hour);
    }
      rowCount = rowCount * (60 / interval);
      return rowCount;
},
  getIndexOfMatchedField(list, id, fieldName){
    let index = 0; 
    for (index = 0; index < list.length; index++) {
     if(list[index][fieldName] == id){
        break;
     }
    }
    return index;
  },
  getLocalTime(date, formatStr = dateFormat.DATE_TIME_FORMAT){
      let localDateTime  = moment.utc(date).toDate();
      localDateTime = moment(localDateTime).format(formatStr);
      return localDateTime;
  },
  getTimeFromDateString(date, formatStr='hh:mm:a'){
        return  helper.getLocalTime(date, formatStr);
  },
  getMinutesFromDate(date){
     let localDateTime = helper.getLocalTime(date);
     return moment.duration(localDateTime).asMinutes();
     
  },
  getMinutesFromTimeString(timeStr){
     let times = helper.splitTime(timeStr);
     if(times.meridiem === 'AM'&& times.hour === 12){
         times.hour = 0;
     }
     let hour = times.meridiem === 'PM' ? 12 + times.hour : times.hour;
     let minute = times.minute;
     return moment.duration(hour+':'+minute, "hh:mm").asMinutes();
  },
  subTimeToDateByMinute(date, minute){
     let hr = minute !==0 ? parseInt(minute / clock.MINUTE) : minute;
     let min = minute !==0 ? minute % clock.MINUTE : minute;
     let localDateTime = moment.utc(date).format(dateFormat.DATE_TIME_FORMAT);
     return moment(localDateTime).subtract(hr, 'hours').subtract(min, 'minute').format(dateFormat.DATE_TIME_FORMAT_WITH_ZONE)
  },
   addTimeToDateByMinute(date, minute, formatStr = dateFormat.DATE_TIME_FORMAT_WITH_ZONE){
     let hr = minute !==0 ? parseInt(minute / clock.MINUTE) : minute;
     let min = minute !==0 ? minute % clock.MINUTE : minute;
     let localDateTime = moment.utc(date).format(dateFormat.DATE_TIME_FORMAT);
     return moment(localDateTime).add(hr, 'hours').add(min, 'minute').format(formatStr);
  },
  getTimeIntervalLabel(date, duration){
     let startDateTime = helper.getTimeFromDateString(date, dateFormat.TIME_FORMAT);
     let localDateTime = helper.getLocalTime(date);
     let endDateTime = helper.addTimeToDateByMinute(localDateTime, duration, dateFormat.TIME_FORMAT);
     return startDateTime+" -- "+endDateTime;
     
  }

}

export default helper;

