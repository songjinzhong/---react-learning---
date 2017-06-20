import React, { Component } from 'react';
import './App.css';
import Comment from './component/component'
import Clock from './component/clock'
import Button from './component/Button'
import Login from './component/Login'
import Number from './component/Number'
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
      </div>
    );
  }
}

export default App;
