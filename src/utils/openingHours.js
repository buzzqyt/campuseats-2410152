export function getOpenStatus(openHours, timestamp) {
  const match = openHours?.match(
    /^\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*$/i
  )

  if (!match) return null

  const [, openingHourText, openingMinuteText = '0', openingPeriod, closingHourText, closingMinuteText = '0', closingPeriod] = match
  const toMinutes = (hourText, minuteText, period) => {
    const hour = Number(hourText)
    const minute = Number(minuteText)
    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return null
    return (hour % 12 + (period.toLowerCase() === 'pm' ? 12 : 0)) * 60 + minute
  }

  const openingTime = toMinutes(openingHourText, openingMinuteText, openingPeriod)
  const closingTime = toMinutes(closingHourText, closingMinuteText, closingPeriod)
  if (openingTime === null || closingTime === null || openingTime === closingTime) return null

  const localTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(timestamp))
  const [hour, minute] = localTime.split(':').map(Number)
  const currentTime = hour * 60 + minute

  if (openingTime < closingTime) {
    return currentTime >= openingTime && currentTime < closingTime
  }
  return currentTime >= openingTime || currentTime < closingTime
}
