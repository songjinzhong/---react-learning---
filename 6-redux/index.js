import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import Counter from './components/counter'
import Fetch from './components/fetch'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

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

const fn2 = (state = '', action) => {
  switch (action.type){
    case 'fetching':
      return state = 'loading...'
    case 'success':
      return state = action.data
    case 'error':
      return state = action.error
    default:
      return state
  }
}
const store2 = createStore(fn2, applyMiddleware(thunk))

function getJSON(){
  return fetch('https://api.github.com/users/songjinzhong');
}

function r_success(data){
  return {
    type: 'success',
    data: data
  }
}

function r_error(error){
  return{
    type: 'error',
    error: error
  }
}

function FetchData() {

  return function (dispatch) {
    dispatch({type: 'fetching'})
    return getJSON().then(
      response => {
        if(response.status >= 400){
          r_error('error happen')
        }
        return response.json()
      }
    ).then(
      data => {
        dispatch(r_success(JSON.stringify(data)))
      }
    )
  };
}

const r2 = () => ReactDOM.render(
  <Fetch
    data = {store2.getState()}
    getData = {() => store2.dispatch(FetchData())}
  />,
  document.getElementById('example2')
)

r2()
store2.subscribe(r2)