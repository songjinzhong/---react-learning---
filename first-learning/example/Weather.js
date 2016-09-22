/** @jsx React.DOM */

var Label = React.createClass({
    getInitialState : function(){
        return {value : ''}
    },
    handleChange : function(){
        var num = this.refs.myTextInput.getDOMNode().value;
        if(isNaN(num)){
            alert("please input a Number!")
            this.refs.myTextInput.getDOMNode().value = ""
        }else{
            this.setState({value : num});
        }
    },
    render : function(){
        var value = this.state.value;
        return(
            <div>
                <label>请输入{this.props.text}今天空气质量：
                    <input ref="myTextInput" type="text" onBlur={this.handleChange}/>
                </label>
                <p>北京今天天气质量 ：{value}</p>
            </div>
        );
    }
});
module.exports = React.createClass({
    render : function(){
        return <Label text="北京"/>
    }
})