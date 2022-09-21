import React from 'react'
import logo from './logo.svg'
import { getMessage } from './service'
import './App.css'

const App = () => {
  const [message, setMessage] = React.useState<string>('Testing backend connection...')

  const init = async () => {
    try {
      const data = await getMessage()
      setMessage(data.message)
    } catch {
      setMessage('Could not fetch data from backend :(')
    }
  }

  React.useEffect(() => {
    setTimeout(() => init(), 1000)
  }, [])

  return (
    <div className='background'>
      <img src={logo} className='logo' alt='logo' />
      <p>{message}</p>
    </div>
  )
}

export default App
