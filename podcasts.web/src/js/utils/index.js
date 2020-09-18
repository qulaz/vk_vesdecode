export const secToDuration = (sec) => {
  let dur = new Date(sec * 1000).toISOString().substr(11, 8)
  if (dur.startsWith("00:")) {
    dur = dur.slice(3)
  }
  return dur
}