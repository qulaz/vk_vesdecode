const getTwoDigits = (value) => value < 10 ? `0${value}` : value;

const formatDate = (date) => {
  const day = getTwoDigits(date.getDate());
  const month = getTwoDigits(date.getMonth() + 1); // add 1 since getMonth returns 0-11 for the months
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export const getDateNextMonths = () => {
  const date = new Date()
  let newDate = new Date(date.setMonth(date.getMonth() + 1))
  return formatDate(newDate)
}

export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const rtf = new Intl.RelativeTimeFormat("ru");

export const millisecondsToHumanDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.round(minutes / 60)
  const days = Math.round(hours / 24)
  const months = Math.round(days / 30)
  const years = Math.round(months / 12)
  if (months > 12) {
    return rtf.format(years, "years")
  }
  if (days >= 31) {
    return rtf.format(months, "months")
  }
  if (hours > 24) {
    return rtf.format(days, "days")
  }
  if (minutes > 60) {
    return rtf.format(hours, "hours")
  }
  if (seconds > 60) {
    return rtf.format(minutes, "minutes")
  }
  return rtf.format(seconds, "seconds")
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
