import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('should increment the counter', () => {
  function Counter() {
    const [count, setCount] = React.useState(0)
    return (
      <div>
        Count is {count}.
        <button onClick={(e) => setCount(count + 1)}>Increment</button>
      </div>
    )
  }
  const x = render(<Counter />)

  expect(x.getByText(/Count is 0./)).toBeInTheDocument()

  fireEvent.click(screen.getByText('Increment'))

  expect(x.getByText(/Count is 1./)).toBeInTheDocument()
})
