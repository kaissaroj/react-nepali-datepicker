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
  placeholderText: string | undefined
  selectedDefaultDate: string | undefined
  fromDate: string | undefined
  toDate: string | undefined
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

let containerRef: any = []

const DatePicker: React.SFC<Interface> = ({
  dateFormat,
  onDateChange,
  placeholderText,
  selectedDefaultDate,
  fromDate,
  toDate
}) => {
  const dateFormatted = dateFormat || '%D, %M %d, %y'
  const placeholder = placeholderText || 'Select Date'
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
    document.addEventListener('mousedown', handleClick, false)
    return () => document.removeEventListener('mousedown', handleClick, false)
  }, [])
  React.useEffect(() => {
    try {
      if (
        !!selectedDefaultDate &&
        calendarFunctions.isValidDate(selectedDefaultDate)
      ) {
        const updatedNepaliDate = selectedDefaultDate
          .split('-')
          .map((n: any) => calendarFunctions.getNepaliNumber(n))
          .join('-')
        setSelectedDate(updatedNepaliDate)
      }
    } catch (e) {}
  }, [selectedDefaultDate])
  const handleClick = (e: any) => {
    const isInsideContainer = containerRef
      ? containerRef.contains(e.target)
      : false
    !isInsideContainer && setDatePicker(false)
  }
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
    <div
      className={styles.dateContainer}
      ref={(e) => {
        containerRef = e
      }}
    >
      <div className={styles.container}>
        <div className={styles.rel}>
          <input
            type='text'
            readOnly={true}
            placeholder={placeholder}
            onClick={() => setDatePicker(!_showDatePicker)}
            className={styles.dateinput}
            value={selectedDate}
            id='nepali-datepicker-input'
          />
        </div>
        <div className={`${styles.rel}`} id='nepali-datepicker-container'>
          <div
            className={`${styles.nepdatemain} ${
              !_showDatePicker ? styles.hide : ''
            }  ${styles.zIndex}`}
          >
            <div className={styles.calendar}>
              <CalendarHeader {...{ bsMonth, bsYear, changeMonth }} />
              <CalendarWeek />
              <CalendarDates
                {...{
                  calendarDetails,
                  onDateClick,
                  selectedDay,
                  fromDate,
                  toDate
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(DatePicker)
