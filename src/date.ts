import moment from 'moment-timezone';

const Monday = 1;
const Tuesday = 2;
const Wednesday = 3;
const Thursday = 4;
const Friday = 5;
const Saturday = 6;
const Sunday = 7;

moment.tz('Asia/Tokyo').locale('ja');

function getMoment(date = new Date()): moment.Moment {
  return moment(date).tz('Asia/Tokyo').locale('ja');
}

export {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
  getMoment
};
