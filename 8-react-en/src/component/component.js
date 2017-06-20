import React from 'react'

function formatDate(date) {
  return date.toLocaleDateString();
}

function UserInfo(props){
  return (
    <div className="UserInfo">
      <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name} />
      <div className="UserInfo-name">
        {props.author.name}
      </div>
    </div>
  )
}

class Comment extends React.Component {
  render(){
    return (
      <div className="Comment">
        <UserInfo author={this.props.author}/>
        <div className="Comment-text">
          {this.props.text}
        </div>
        <div className="Comment-date">
          {formatDate(this.props.date)}
        </div>
      </div>
    );
  }
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

class C extends React.Component{
  render(){
    return (
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />
    )
  }
}

export default C