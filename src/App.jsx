import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmailForm from './EmailForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmailForm/>
    </>
  )
}

export default App
