import React, { Component } from 'react'

class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      name: "clock",
      counter: props.baobab.get("timer")
    }
  }
  componentDidMount(){
    this.timeId = setInterval(
      () => this.tick(),
      1000
    )
  }
  componentWillUnmount(){
    clearInterval(this.timeId);
  }
  tick(){
    var tree = this.props.baobab;
    const nowT = tree.get("timer");
    tree.set("timer", nowT + 1)
    this.setState({
      date: new Date()
    })
    this.setState((preStat, props)=>({
      counter: tree.get("timer")
    }))
  }
  render(){
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
        <p> {this.state.date.toLocaleTimeString()} </p>
        <p>seconds: {this.state.counter}</p>
      </div>
    )
  }
}

export default Clock