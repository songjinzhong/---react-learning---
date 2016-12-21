import React from 'react'

export default React.createClass({
  render(){
    return(
      <div>
        <p>{this.props.value}</p>
        <button onClick={this.props.onIncrement}>+</button>
        <button onClick={this.props.onDecrement}>-</button>
      </div>
    )
  }
})