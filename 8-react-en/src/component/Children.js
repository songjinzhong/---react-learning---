import React from 'react'

function Dialog(props){
    return (
        <div className={"father-" + props.color}>
            <h1 className="dialog-title">{props.title}</h1>
            <p className="dialog-message">
                {props.message}
            </p>
            {props.children}
        </div>
    )
}

class SearchDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchMessage: ""
        }
        this.handOnChange = this.handOnChange.bind(this)
        this.handOnClick = this.handOnClick.bind(this)
    }
    handOnChange(e){
        this.setState({
            searchMessage: e.target.value
        })
    }
    handOnClick(e){
        alert(`search info : ${this.state.searchMessage}!`)
    }
    render(){
        return (
            <Dialog color="red"
                title="Search Dialog"
                message="please input you search message">
                <input value={this.state.searchMessage} onChange={this.handOnChange}/>
                <button onClick={this.handOnClick}>Search</button>
            </Dialog>
        )
    }
}

export default SearchDialog