import React from 'react'
import logo from './logo.svg'
import './App.css'

function HelloWorld(params) {
  return <div>Hello</div>
}

function useCounter() {
  const [count, setCount] = React.useState(0)

  function increment() {
    setCount(count + 1)
  }

  return { count, increment }
}

function App() {
  // const count = 0

  const { count, increment } = useCounter()

  // JSX

  // React.createElement("div", )
  return (
    <div className="App">
      Hello Coyotiv
      <HelloWorld></HelloWorld>
      Count is {count}
      <br />
      <button onClick={(e) => increment()}>Increment</button>
    </div>
  )
}

export default App
