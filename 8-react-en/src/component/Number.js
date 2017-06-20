import React, { Component } from 'react'
import './index.css'

const arr = [2,4,6,8,10];

const List = arr.map(n => {
  return <li>{n}</li>
})

class ListDemo extends Component{
  render(){
    return (
      <ul className="center-ul">{List}</ul>
    )
  }
}

export default ListDemo