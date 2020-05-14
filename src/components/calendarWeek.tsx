import React from 'react'
import styles from '../styles.module.css'
import { calendarData } from '../helpers/calendardata'

interface Interface {}

const CalendarWeek: React.SFC<Interface> = ({}) => {
  const { bsDays } = calendarData
  return (
    <div className={styles.dayofweek}>
      {bsDays.map((name, index) => {
        return (
          <div key={`week-${index}`} className={styles.dayofweekchild}>
            {name}
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(CalendarWeek)
