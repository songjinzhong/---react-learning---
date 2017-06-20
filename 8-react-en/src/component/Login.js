import React, { Component } from 'react'

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

function Greeting(props){
  if(props.isLoginIn){
    return <h1>please loginout</h1>
  }else{
    return <h1>please loginin</h1>
  }
}

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoginIn: false
    }
  }
  handleLogoutClick(){
    this.setState({
      isLoginIn: !this.state.isLoginIn
    })
  }
  render(){
    const isLoginIn = this.state.isLoginIn;
    let button = null;
    if(isLoginIn){
      button = <LogoutButton onClick={this.handleLogoutClick.bind(this)}/>
    }else{
      button = <LoginButton onClick={this.handleLogoutClick.bind(this)}/>
    }
    return (
      <div>
        <Greeting isLoginIn={isLoginIn}/>
        {button}
      </div>
    )
  }
}

export default Login