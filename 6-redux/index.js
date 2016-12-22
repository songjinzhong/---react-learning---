import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import Counter from './components/counter'

import createLogger from 'redux-logger'

const logger = createLogger()

let fn = (state = 2, action) => {
  switch (action.type){
    case 'ADD':
      return state + 1
    case 'SUB':
      return state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}

const stone = createStore(fn, applyMiddleware(logger))

const r = () => ReactDOM.render(
  <Counter
    value = {stone.getState()}
    add = {() => {stone.dispatch({ type: 'ADD' })}}
    sub = {() => {stone.dispatch({ type: 'SUB' })}}
    reset = {() => {stone.dispatch({ type: 'RESET' })}}
  />,
  document.getElementById('example')
)

r()

stone.subscribe(r)