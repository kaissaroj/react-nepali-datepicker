import React from 'react'

import Picker from './Picker'

const App = () => {
  const [dateDetails, setDateDetails] = React.useState({})
  return (
    <div className='container'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>React Nepali DatePicker Example</h1>
        <Picker selectedDefaultDate='' set={setDateDetails} />
        <p>Date Format : '%y %M, %d'</p>
        {Object.keys(dateDetails).length > 0 && (
          <>
            <p>
              <strong>onDateChange Response:</strong>
            </p>{' '}
            {JSON.stringify(dateDetails)}
          </>
        )}
        <button onClick={() => setDateDetails({})}>Refresh</button>
      </form>
    </div>
  )
}

export default App
