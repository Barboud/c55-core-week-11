export class Time {
  #secondsFromMidnight = 0;

  constructor(hours, minutes, seconds) {
    // Avoid Magic Numbers - week 11 - clean code
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_MINUTE = 60;
    const totalSeconds =
      hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;

    if (totalSeconds < 0 || totalSeconds >= 86400) {
      throw new Error('Invalid time');
    }

    this.#secondsFromMidnight = totalSeconds;
  }

  getHours() {
    return Math.floor(this.#secondsFromMidnight / 3600);
  }

  getMinutes() {
    return Math.floor((this.#secondsFromMidnight % 3600) / 60);
  }

  getSeconds() {
    return this.#secondsFromMidnight % 60;
  }

  addSeconds(seconds) {
    const SECONDS_IN_DAY = 86400; // to avoid Magic Numbers
    this.#secondsFromMidnight =
      (this.#secondsFromMidnight + seconds) % SECONDS_IN_DAY;
    if (this.#secondsFromMidnight < 0) {
      this.#secondsFromMidnight += SECONDS_IN_DAY;
    }
  }

  addMinutes(minutes) {
    this.addSeconds(minutes * 60);
  }

  addHours(hours) {
    this.addSeconds(hours * 3600);
  }

  toString() {
    const HH = String(this.getHours()).padStart(2, '0');
    const mm = String(this.getMinutes()).padStart(2, '0');
    const ss = String(this.getSeconds()).padStart(2, '0');
    return `${HH}:${mm}:${ss}`;
  }
}

const myTime = new Time(12, 35, 0);
console.log(myTime.toString()); // 12:35:00
myTime.getHours(); // 12
myTime.getMinutes(); // 35
myTime.getSeconds(); // 0

myTime.addMinutes(25);
console.log(myTime.toString()); // 13:00:00

myTime.addHours(12);
console.log(myTime.toString()); // 01:00:00
