import React, { useEffect } from 'react'
import io from 'socket.io-client'

const App = () => {

    useEffect(() => {
        const socket = io('http://localhost:5000')
    }, [])

  return (
      <div>

      </div>
  )
}

export default App
