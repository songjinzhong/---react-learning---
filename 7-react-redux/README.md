## redux 数据流

[demo](https://songjinzhong.github.io/react-learning/7-react-redux/)

关于 react-redux 的使用，理解起来更容易些：

```javascript
class Counter extends Component{
  render(){
    const {value, addClick, subClick} = this.props
    return (
      <div>
        <span>{value}</span>
        <div>
          <button onClick={addClick}>+</button>
          <button onClick={subClick}>-</button>
        </div>
      </div>
    )
  }
}

import { Provider, connect } from 'react-redux'

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

`Counter` 是一个普通的 react 的组件，继承 Component，react-redux 提供了 connect ，mapStateToProps 和 mapDispatchToProps 表示数据的方向，前者表示 view 从 store 获取数值，后者表示 view 向 store 发送 action 命令。

```javascript
function mapStateToProps(state){
  return {
    value: state.count
  }
}
const addAction = {
  type: 'add'
}

const subAction = {
  type: 'sub'
}
function mapDispatchToProps(dispatch){
  return {
    addClick: () => dispatch(addAction),
    subClick: () => dispatch(subAction)
  }
}
```

最后在搞定一个 reducer：

```javascript
const counter = (state = {count: 0}, action) => {
  const count = state.count
  switch (action.type){
    case 'add':
      return {count: count + 1}
    case 'sub':
      return {count: count - 1}
    default:
      return state
  }
}
```

渲染的话使用 Provider：

```javascript
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('example')
)
```

### 参考

>[http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
>[https://github.com/jackielii/simplest-redux-example/blob/master/index.js](https://github.com/jackielii/simplest-redux-example/blob/master/index.js)