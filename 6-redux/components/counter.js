import React from 'react'

export default React.createClass({
  render(){
    return(
      <div>
        <p>{this.props.value}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.sub}>-</button>
        <div>
          <button onClick={this.props.reset}>归零</button>
        </div>
      </div>
    )
  }
})