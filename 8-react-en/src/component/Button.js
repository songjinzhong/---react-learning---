import React from 'react'

class Button extends React.Component{
  handClick(e){
    let tree = this.props.baobab;
    e.preventDefault();
    tree.set("timer", 0)
  }
  render(){
    return (
      <button onClick={this.handClick.bind(this)}>
        Clear
      </button>
    )
  }
}

export default Button