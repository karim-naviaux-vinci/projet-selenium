import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Component from './Components/Component'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Component/>
    </div>
  )
}

export default App
