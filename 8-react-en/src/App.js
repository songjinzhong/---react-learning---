import React, { Component } from 'react';
import './App.css';
import Comment from './component/component'
import Clock from './component/clock'
import Button from './component/Button'
import Login from './component/Login'
import Number from './component/Number'
import Form from './component/Form'
import Select from './component/Select'
import Water from './component/Water'
import Child from './component/Children'

var Baobab = require("baobab")

class Hello extends React.Component {
  render(){
    return (
      <div>
        Hello {this.props.name}
      </div>
    )
  }
}

class App extends Component {
  constructor(p){
    super(p)
    this.state = {
      scale : "c"
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({
      scale: e.target.value
    })
  }
  render() {
    var tree = new Baobab({
      timer: 0
    })
    return (
      <div>
        <Hello name="songjz" />
        <Comment />
        <Clock baobab={tree}/>
        <Button baobab={tree}/>
        <Login />
        <Number />
        <Form />
        <br/>
        <Select />
        <br />
        <Water scale={this.state.scale}/>
        <label>
          Pick your scale:
          <select value={this.state.scale} onChange={this.handleChange}>
            <option value="f">Fahrenheit</option>
            <option value="c">Celsius</option>
          </select>
        </label>
        <br/>
        <Child/>
      </div>
    );
  }
}

export default App;
