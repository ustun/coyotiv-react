import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './app/store'
import App from './App'

import { createStore } from 'redux'

let c = { count: 100 }

c = { count: 1000 }

c.count = 100000

let a = 0

function add(b) {
  a = 1
  a = a + 1
  // a? 1
  return a + b + c.count
}

function subtract() {
  a = a - 1
}

add(2, 3)

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})

test('a redux store', () => {
  // count, setCount = useState(0)

  class Counter {
    constructor() {
      this.state = 0
    }

    setState(state) {
      this.state = state
      // this.informView()
      // MVC model view controller
    }
    increment() {
      this.setState(this.state + 1)
    }

    decrement() {
      this.state -= 1
    }
  }

  const counter = new Counter()

  console.log(counter.state)

  counter.state = 1000

  expect(counter.state).toBe(0)

  counter.increment()

  console.log(counter.state)
  expect(counter.state).toBe(1)

  const counterReducer = (state = 0, action) => {
    if (action.type == 'increment') {
      return state + 1
    } else if (action.type == 'decrement') {
      return state - 1
    } else if (action.type == 'double') {
      return state * 2
    }
    return state
  }

  const store = createStore(counterReducer)

  expect(store.getState()).toBe(0)

  store.subscribe(() => {
    console.log(store.getState())
  })

  store.subscribe(() => {
    console.log(store.getState())
  })

  store.dispatch({ type: 'increment' })

  expect(store.getState()).toBe(1)

  store.dispatch({ type: 'double' })

  expect(store.getState()).toBe(2)
  store.dispatch({ type: 'double' })
  expect(store.getState()).toBe(4)
})
