import React from 'react'
import styles from '../styles.module.css'
import { calendarData } from '../helpers/calendardata'
import { calendarFunctions } from '../helpers/secondaryHelpers'

interface Interface {
  bsMonth: number
  bsYear: number
  changeMonth: Function
}

const CalendarHeader: React.SFC<Interface> = ({
  bsMonth,
  bsYear,
  changeMonth
}) => {
  const [monthYearText, setMonthYearText] = React.useState<string>('')
  React.useEffect(() => {
    bsMonth > 0 && bsYear > 0 && getMonthYearText()
  }, [bsMonth])
  const getMonthYearText = () => {
    var monthName = calendarData.bsMonths[bsMonth - 1]
    var year = calendarFunctions.getNepaliNumber(bsYear)
    setMonthYearText(`${monthName} ${year}`)
  }
  return (
    <div className={styles.topContainer}>
      <a className={styles.routeButton} onClick={() => changeMonth('prev')}>
        &#x25C0;
      </a>
      <div className={styles.monthIndicator}>{monthYearText}</div>
      <a className={styles.routeButton} onClick={() => changeMonth('next')}>
        &#x25B6;
      </a>
    </div>
  )
}

export default React.memo(CalendarHeader)
