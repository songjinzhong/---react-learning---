import React from 'react'

export default React.createClass({
  render(){
    return(
      <div>
        <p>{this.props.value}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.sub}>-</button>
      </div>
    )
  }
})