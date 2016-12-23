import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import { Provider, connect } from 'react-redux'

class Counter extends Component{
  render(){
    const {value, addClick, subClick} = this.props
    return (
      <div>
        <span>{value}</span>
        <div>
          <button onClick={addClick}>+</button>
          <button onClick={subClick}>-</button>
        </div>
      </div>
    )
  }
}

const addAction = {
  type: 'add'
}

const subAction = {
  type: 'sub'
}

// Reducer
const counter = (state = {count: 0}, action) => {
  const count = state.count
  switch (action.type){
    case 'add':
      return {count: count + 1}
    case 'sub':
      return {count: count - 1}
    default:
      return state
  }
}

const store = createStore(counter)

function mapStateToProps(state){
  return {
    value: state.count
  }
}

function mapDispatchToProps(dispatch){
  return {
    addClick: () => dispatch(addAction),
    subClick: () => dispatch(subAction)
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('example')
)