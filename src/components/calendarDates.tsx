import React from 'react'
import styles from '../styles.module.css'
import { _getCalendarBody } from '../helpers/index'
import { calendarFunctions } from '../helpers/secondaryHelpers'
interface CalendarDetailsInterface {
  bsYear: number
  bsMonth: number
  bsDate: number
  weekDay: number
  formattedDate: string | undefined
  adDate: Date | undefined
  bsMonthFirstAdDate: Date | undefined
  bsMonthDays: number | undefined
}
interface Interface {
  calendarDetails: CalendarDetailsInterface
  onDateClick: Function
  selectedDay: number | undefined
  fromDate: string | undefined
  toDate: string | undefined
}

const CalendarWeek: React.SFC<Interface> = ({
  calendarDetails,
  onDateClick,
  selectedDay,
  fromDate,
  toDate
}) => {
  const [dateLists, setDateLists] = React.useState<any>({
    current: [],
    other: [],
    rawDates: []
  })
  React.useEffect(() => {
    const temp = _getCalendarBody(calendarDetails)
    setDateLists(temp)
  }, [calendarDetails])

  const { bsYear, bsMonth, bsDate } = calendarDetails
  const currentDay = calendarFunctions.getNepaliNumber(bsDate)
  const { current, rawDates } = dateLists
  const startFromDay = rawDates.filter((f: any) => f < 1).length + 1

  return (
    <div className={styles.dategrid}>
      {current.map((day: any, index: any) => {
        const customClassName = index === 0 ? `firstday${startFromDay}` : ''
        const customCurrentDay = day === currentDay ? `currentday` : ''
        const selectedButtonClass =
          !!selectedDay && selectedDay === index + 1 ? `selected` : ''

        const isDisabled = checkIfDateIsDisable(
          bsYear,
          bsMonth,
          index + 1,
          fromDate,
          toDate
        )
        const disbledClass = isDisabled ? styles.disabled : ''

        return (
          <button
            className={`${disbledClass} ${styles.dategridbutton} ${
              styles[selectedButtonClass]
            } ${styles[customClassName] ? styles[customClassName] : ''}`}
            key={`${day}-${index}`}
            onClick={() => onDateClick(index + 1)}
          >
            <time className={styles[customCurrentDay]}>{day}</time>
          </button>
        )
      })}
    </div>
  )
}

const checkIfDateIsDisable = (
  bsYear: any,
  bsMonth: any,
  bsDay: any,
  fromDate: any,
  toDate: any
) => {
  let check = { first: false, second: false }
  try {
    const selectedDate: any = `${bsYear}-${
      bsMonth < 10 ? '0' + bsMonth : bsMonth
    }-${bsDay < 10 ? '0' + bsDay : bsDay}`
    if (!!fromDate) {
      const isCorrectFromDate = fromDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)
      if (!isCorrectFromDate) {
        throw Error('Wrong From Date Format')
      } else {
        check.first = diffDate(selectedDate, fromDate) < 0
      }
    }
    if (!!toDate) {
      const isCorrectFromDate = toDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)
      if (!isCorrectFromDate) {
        throw Error('Wrong From Date Format')
      } else {
        check.second = diffDate(toDate, selectedDate) < 0
      }
    }
  } catch (e) {
    throw Error(e)
  }
  return check.first || check.second
}
const diffDate = (end_date: any, start_date: any) =>
  parseInt(end_date.replace(/-/g, '')) - parseInt(start_date.replace(/-/g, ''))
export default React.memo(CalendarWeek)
