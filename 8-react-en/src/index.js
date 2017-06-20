import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(
//   <h1>Hello React</h1>,
//   document.getElementById("root")
// )
/*function formatName(user){
  return user.fName + "-" + user.lName;
}
const song = {
  fName: "song",
  lName: "jinzhong"
}

const imageSrc = "http://localhost:3000/favicon.ico";

const h1 = <h1>Hello {formatName(song)}</h1>;
const image = <img src={imageSrc}/>
const element = (
  <h1 className="hello">
    Hello {formatName(song)}
  </h1>
)

ReactDOM.render(
  element,
  root
)*/
registerServiceWorker();
