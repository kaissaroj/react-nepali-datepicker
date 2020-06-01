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
}

const CalendarWeek: React.SFC<Interface> = ({
  calendarDetails,
  onDateClick,
  selectedDay
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

  const { bsDate } = calendarDetails
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
        return (
          <button
            className={`${styles.dategridbutton} ${
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

export default React.memo(CalendarWeek)
