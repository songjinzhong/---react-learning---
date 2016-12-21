import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/counter'

let fn = (state = 2, action) => {
  switch (action){
    case 'ADD':
      return state + 1
    case 'SUB':
      return state - 1
    default:
      return state
  }
}

const stone = createStore(fn)

const r = () => render(
  <Counter
    value = {stone.getState()}
    onIncrement = {() => {stone.dispatch({ type: 'ADD' })}}
    onDecrement = {() => {stone.dispatch({ type: 'SUB' })}}
  />,
  document.getElementById('example')
)

r()

stone.subscribe(r)