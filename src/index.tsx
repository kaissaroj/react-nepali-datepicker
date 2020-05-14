import * as React from 'react'
import styles from './styles.module.css'
import './style.css'
import CalendarHeader from './components/calendarHeader'
import CalendarWeek from './components/calendarWeek'
import CalendarDates from './components/calendarDates'
import { calendarFunctions } from './helpers/secondaryHelpers'

import {
  _getCalendarInitialDetails,
  _renderNextMonthCalendar,
  _renderPreviousMonthCalendar
} from './helpers'
interface Interface {
  dateFormat: string | undefined
  onDateChange(date: object): void
}

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

const DatePicker: React.SFC<Interface> = ({ dateFormat, onDateChange }) => {
  const dateFormatted = dateFormat || '%D, %M %d, %y'
  const [selectedDate, setSelectedDate] = React.useState<string>('')
  const [_showDatePicker, setDatePicker] = React.useState<boolean>(false)
  const [selectedDayMonth, setSelectedDay] = React.useState<any>({
    day: -1,
    month: -1
  })
  const [calendarDetails, setCalendarDetails] = React.useState<
    CalendarDetailsInterface
  >({
    bsYear: 0,
    bsMonth: 0,
    bsDate: 0,
    weekDay: 0,
    formattedDate: undefined,
    adDate: undefined,
    bsMonthFirstAdDate: undefined,
    bsMonthDays: undefined
  })
  const { bsMonth, bsYear, bsDate } = calendarDetails
  React.useEffect(() => {
    const details = _getCalendarInitialDetails(0, dateFormatted)
    setCalendarDetails(details)
  }, [])
  const changeMonth = (type: string) => {
    let details: any = calendarDetails
    if (type === 'next') {
      details = _renderNextMonthCalendar(bsMonth, bsYear, bsDate, dateFormatted)
    }
    if (type === 'prev') {
      details = _renderPreviousMonthCalendar(
        bsMonth,
        bsYear,
        bsDate,
        dateFormatted
      )
    }
    setCalendarDetails(details)
  }
  const onDateClick = (day: number) => {
    const selectedDateDetails: any = calendarFunctions.getBsMonthInfoByBsDate(
      bsYear,
      bsMonth,
      day,
      dateFormatted
    )
    setSelectedDate(selectedDateDetails.formattedDate)
    setDatePicker(false)
    onDateChange(selectedDateDetails)
    setSelectedDay({
      day: day,
      month: bsMonth
    })
  }
  const selectedDay =
    selectedDayMonth.month === calendarDetails.bsMonth
      ? selectedDayMonth.day
      : undefined
  return bsYear == 0 ? (
    <React.Fragment></React.Fragment>
  ) : (
    <div className={styles.dateContainer}>
      <div className={styles.container}>
        <div className={styles.rel}>
          <input
            type='text'
            readOnly={true}
            placeholder='Select Date'
            onClick={() => setDatePicker(!_showDatePicker)}
            className={styles.dateinput}
            value={selectedDate}
          />
        </div>
        <div className={styles.rel}>
          <div
            className={`${styles.nepdatemain} ${
              !_showDatePicker ? styles.hide : ''
            }`}
          >
            <div className={styles.calendar}>
              <CalendarHeader {...{ bsMonth, bsYear, changeMonth }} />
              <CalendarWeek />
              <CalendarDates
                {...{ calendarDetails, onDateClick, selectedDay }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DatePicker
