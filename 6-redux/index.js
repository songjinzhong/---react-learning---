import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/counter'

let fn = (state = 2, action) => {
  switch (action.type){
    case 'ADD':
      return state + 1
    case 'SUB':
      return state - 1
    default:
      return state
  }
}

const stone = createStore(fn)

const r = () => ReactDOM.render(
  <Counter
    value = {stone.getState()}
    add = {() => {stone.dispatch({ type: 'ADD' })}}
    sub = {() => {stone.dispatch({ type: 'SUB' })}}
  />,
  document.getElementById('example')
)

r()

stone.subscribe(r)