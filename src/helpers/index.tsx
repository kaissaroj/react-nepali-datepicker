import { calendarFunctions } from './secondaryHelpers'
import { calendarData } from './calendardata'

export const _getCalendarInitialDetails = (
  currentMonthIndex: number,
  dateFormat: any
) => {
  const currentDate = new Date()
  const currentBsDate = calendarFunctions.getBsDateByAdDate(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  )
  const bsYear = currentBsDate.bsYear
  const bsMonth = currentBsDate.bsMonth + currentMonthIndex
  const bsDate = currentBsDate.bsDate
  const minBsDate = calendarFunctions.getBsMonthInfoByBsDate(
    bsYear,
    bsMonth,
    bsDate,
    dateFormat
  )
  return minBsDate
}
export const _renderNextMonthCalendar = (
  bsMonth: number,
  bsYear: number,
  bsDate: number,
  dateFormat: any
) => {
  var nextMonth = bsMonth + 1 <= 12 ? bsMonth + 1 : 1
  var nextYear = nextMonth !== 1 ? bsYear : bsYear + 1
  var nextDate = bsDate

  const minBsDate = calendarFunctions.getBsMonthInfoByBsDate(
    nextYear,
    nextMonth,
    nextDate,
    dateFormat
  )
  return minBsDate
}
export const _renderPreviousMonthCalendar = (
  bsMonth: number,
  bsYear: number,
  bsDate: number,
  dateFormat: any
) => {
  var prevMonth = bsMonth - 1 > 0 ? bsMonth - 1 : 12
  var prevYear = prevMonth !== 12 ? bsYear : bsYear - 1
  var prevDate = bsDate
  const minBsDate = calendarFunctions.getBsMonthInfoByBsDate(
    prevYear,
    prevMonth,
    prevDate,
    dateFormat
  )
  return minBsDate
}

export const _getCalendarBody = function (datePickerData: any) {
  var weekCoverInMonth = Math.ceil(
    (datePickerData.bsMonthFirstAdDate.getDay() + datePickerData.bsMonthDays) /
      7
  )

  var preMonth =
    datePickerData.bsMonth - 1 !== 0 ? datePickerData.bsMonth - 1 : 12
  var preYear =
    preMonth === 12 ? datePickerData.bsYear - 1 : datePickerData.bsYear
  var preMonthDays: any =
    preYear >= calendarData.minBsYear
      ? calendarFunctions.getBsMonthDays(preYear, preMonth)
      : 30
  var calendarBody: any = { other: [], current: [], rawDates: [] }

  for (var i = 0; i < weekCoverInMonth; i++) {
    for (var k = 1; k <= 7; k++) {
      var calendarDate = i * 7 + k - datePickerData.bsMonthFirstAdDate.getDay()
      calendarBody.rawDates.push(calendarDate)
      var isCurrentMonthDate = true
      if (calendarDate <= 0) {
        calendarDate = preMonthDays + calendarDate
        isCurrentMonthDate = false
      } else if (calendarDate > datePickerData.bsMonthDays) {
        calendarDate = calendarDate - datePickerData.bsMonthDays
        isCurrentMonthDate = false
      }

      if (isCurrentMonthDate) {
        calendarBody.current.push(
          calendarFunctions.getNepaliNumber(calendarDate)
        )
      } else {
        calendarBody.other.push(calendarFunctions.getNepaliNumber(calendarDate))
      }
    }
  }

  return calendarBody
}
