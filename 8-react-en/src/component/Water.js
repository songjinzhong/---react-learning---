import React from 'react'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function IsBoiling(props){
  if((props.temperature >= 100 && props.scale === "c")||(props.temperature >= 230 && props.scale === "f")){
    return <p>the water would boil.</p>
  }else{
    return <p>the water would not boil.</p>
  }
}

class Water extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      temperature: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({
      temperature: e.target.value
    })
  }
  render(){
    const scale = this.props.scale;
    return (
      <div>
        <span>Enter the temperature in {scaleNames[scale]}: </span>
        <input type="text" value={this.state.temperature} onChange={this.handleChange}/>
        <IsBoiling temperature={parseFloat(this.state.temperature)} scale={scale}/>
      </div>
    )  
  }
}

export default Water