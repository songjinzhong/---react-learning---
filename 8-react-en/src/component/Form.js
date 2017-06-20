import React from 'react'

class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: "",
      textArea: "please write something!"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    console.log('A name was submitted: ' + this.state.value);
    console.log('A textarea was submitted: ' + this.state.textArea)
  }
  handleChange(e){
    const name = e.target.nodeName.toLowerCase();
    if(name === "input"){
      this.setState({
        value: e.target.value
      })
    }
    else{
      this.setState({
        textArea: e.target.value
      })
    }
    console.log("value change")
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: 
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <label>
          <textarea value={this.state.textArea} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="submit"/>
      </form>
    )
  }
}

export default Form