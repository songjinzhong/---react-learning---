import React from 'react'

export default React.createClass({
  render(){
    const {getData, data} = this.props
    return(
      <div>
        <div><button onClick={getData}>获取数据</button></div>
        <div>{data}</div>
      </div>
    )
  }
})