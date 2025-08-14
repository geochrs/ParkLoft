import moment from 'moment-timezone';

export function formatBookingTime(date, timeZone = 'UTC') {
  return moment.utc(date).tz(timeZone).format('YYYY-MM-DD HH:mm');
}

export function shiftBookingTime(date, daysToAdd = 1) {
  return moment.utc(date).add(daysToAdd, 'day').seconds(0);
}
