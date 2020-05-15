import React from 'react'

import DatePicker from 'react-nepali-datepicker'
import 'react-nepali-datepicker/dist/index.css'
import './index.css'

const App = () => {
  const [dateDetails, setDateDetails] = React.useState({})
  return (
    <div className='container'>
      <h1>React Nepali DatePicker Example</h1>
      <DatePicker
        placeholderText='From Date'
        dateFormat={'%y %M, %d'}
        onDateChange={(date) => setDateDetails(date)}
      />
      <p>Date Format : '%y %M, %d'</p>
      {Object.keys(dateDetails).length > 0 && (
        <>
          <p>
            <strong>onDateChange Response:</strong>
          </p>{' '}
          {JSON.stringify(dateDetails)}
        </>
      )}
    </div>
  )
}

export default App
