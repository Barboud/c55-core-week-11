const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_DAY = 86400;

export class Time {
  #secondsFromMidnight = 0;

  constructor(hours, minutes, seconds) {
    const totalSeconds =
      hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;

    if (totalSeconds < 0 || totalSeconds >= SECONDS_IN_DAY) {
      throw new Error('Invalid time');
    }

    this.#secondsFromMidnight = totalSeconds;
  }

  getHours() {
    return Math.floor(this.#secondsFromMidnight / SECONDS_IN_HOUR);
  }

  getMinutes() {
    return Math.floor((this.#secondsFromMidnight % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  }

  getSeconds() {
    return this.#secondsFromMidnight % SECONDS_IN_MINUTE;
  }

  addSeconds(seconds) {
    this.#secondsFromMidnight =
      (this.#secondsFromMidnight + seconds) % SECONDS_IN_DAY;
    if (this.#secondsFromMidnight < 0) {
      this.#secondsFromMidnight += SECONDS_IN_DAY;
    }
  }

  addMinutes(minutes) {
    this.addSeconds(minutes * SECONDS_IN_MINUTE);
  }

  addHours(hours) {
    this.addSeconds(hours * SECONDS_IN_HOUR);
  }

  toString() {
    const HH = String(this.getHours()).padStart(2, '0');
    const mm = String(this.getMinutes()).padStart(2, '0');
    const ss = String(this.getSeconds()).padStart(2, '0');
    return `${HH}:${mm}:${ss}`;
  }
}
