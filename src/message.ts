import {
  Monday,
  // Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
  // Sunday,
} from './date';

// TODO: Objectにする
const infos = [
  {
    message: '明日は「燃えるゴミ」を捨てる日です！',
    days: [Monday, Friday]
  },
  {
    message: '明日は「プラスチックゴミ」を捨てる日です！',
    days: [Saturday]
  },
  {
    message: '明日は「ペットボトル、ビン、缶ゴミ」を捨てる日です！',
    days: [Thursday]
  },
  {
    message: '明日は「資源ゴミ」を捨てる日です！',
    days: [Wednesday]
  }
];

const isTrashDay = (date: moment.Moment, days: number[]) => {
  return days.includes(date.day());
};

const getMessage = (date: moment.Moment): string => {
  let message = '';

  infos.map((info) => {
    if (isTrashDay(date, info.days)) message = info.message;
  });

  return message;
};

export { getMessage };
