import { createStore, combineReducers } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

describe('redux', () => {
  test('should create a new store', () => {
    const counterReducer = function (state = { value: 0 }, action) {
      if (action.type === 'increment') {
        return { value: state.value + 1 }
      }

      return state
    }

    const store = createStore(counterReducer)

    expect(store.getState()).toEqual({ value: 0 })

    store.dispatch({ type: 'increment' })

    expect(store.getState()).toEqual({ value: 1 })
  })
})

describe('oop goodness', () => {
  test('should work better', () => {
    const counterSlicer = createSlice({
      name: 'counter',

      initialState: { value: 0 }, // constructor

      reducers: {
        // methods analogue

        // IMMER
        increment(state, action) {
          state.value++
          return state
        },

        //        return {value: state.value + 1}

        decrement(state) {
          return { value: state.value - 1 }
        },
      },
    })

    const store = createStore(counterSlicer.reducer)

    expect(store.getState()).toBe({ value: 0 })

    store.dispatch(counterSlicer.actions.increment())

    expect(store.getState()).toBe({ value: 1 })
  })
})

describe('redux toolkit test2', () => {
  function createSliceWithId(id) {
    const counterSlice = createSlice({
      name: 'counter' + id,
      initialState: { value: 0 },
      reducers: {
        increment(state) {
          state.value = state.value + 1
        },
        decrement(state) {
          state.value = state.value - 1
        },
        incrementBy(state, action) {
          console.log(action)
          state.value = state.value + action.payload
        },
      },
    })
    return counterSlice
  }
  test('should create a reducer', () => {
    const counterSlice = createSliceWithId(0)
    const store = createStore(counterSlice.reducer)
    expect(store.getState()).toEqual({ value: 0 })
    store.dispatch(counterSlice.actions.increment())
    expect(store.getState()).toEqual({ value: 1 })
    store.dispatch(counterSlice.actions.decrement())
    expect(store.getState()).toEqual({ value: 0 })

    store.dispatch(counterSlice.actions.incrementBy(3))
    expect(store.getState()).toEqual({ value: 3 })
  })

  test('should create a reducer with 2 counters', () => {
    const counterSlice1 = createSliceWithId(1)
    const counterSlice2 = createSliceWithId(2)

    const store = createStore(
      combineReducers({
        counter1: counterSlice1.reducer,
        counter2: counterSlice2.reducer,
      })
    )

    expect(store.getState()).toEqual({
      counter1: { value: 0 },
      counter2: { value: 0 },
    })

    store.dispatch(counterSlice1.actions.increment())

    expect(store.getState()).toEqual({
      counter1: { value: 1 },
      counter2: { value: 0 },
    })
  })
})
