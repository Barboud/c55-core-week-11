import { Time } from './Time.js';

const myTime = new Time(12, 35, 0);
console.log(myTime.toString()); // 12:35:00
console.log(myTime.getHours()); // 12
console.log(myTime.getMinutes()); // 35
console.log(myTime.getSeconds()); // 0

myTime.addMinutes(25);
console.log(myTime.toString()); // 13:00:00

myTime.addHours(12);
console.log(myTime.toString()); // 01:00:00
