import React from 'react'

class Select extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: "blue"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    console.log("a submit was to send: " + this.state.value)
  }
  handleChange(e){
    this.setState({
      value: e.target.value
    })
    console.log("value change: " + this.state.value)
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite color:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="black">black</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Select