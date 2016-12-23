## redux 数据流

[demo](https://songjinzhong.github.io/react-learning/6-redux/)

Store 是容器，用来保存数据，可以通过函数 `const store = createStore(fn)` 来建立一个新的 store，fn 是一个函数，放到后面讲。store 有状态 state，表示当前数据流，数据变了，state 就会改变。

store 现在有三个函数：

```javascript
store.getState() // 获取当前 state
store.dispatch() // 执行 action
store.subscribe() // 订阅，用于刷新
```

一般的 redux 流程如下：

```javascript
const store = createStore(fn)
// action 表示 view 发出的动作
const action = {
  type: 'ADD',
  info: 'ADD state'
}
store.dispatch( action )
store.getState() // state 改变了
const render = ReactDOM.render(
  <h1>{store.getState()}</h1>,
  document.getElementById('id')
)
render() // 初始化
store.subscribe(render) // 更新
```

现在开始来谈谈 fn 函数的问题，当用户通过 view 发送 action 给 store 之后，store 该如何处理？fn 应该如下：

```javascript
const fn = function(state = 0, action){
  switch (action.type){
    case 'ADD':
      return state + 1
    default:
      return state
  }
}

store.dispatch( action )// 执行 ADD 操作，更新 state

store.subscribe(render) // 更新 view
```

### 添加异步 redux-thunk 操作

对于异步操作，必须要有回掉函数，因为 dispatch 只能接受 含有 type 的对象，可以通过 中间件 `redux-thunk` 来改变，能接受函数参数：

```javascript
// 启用中间件
const store2 = createStore(
  fn2, 
  applyMiddleware(thunk)
)
```

编写异步 fetch 函数：

```javascript
function r_success(data){
  return {
    type: 'success',
    data: data.status
  }
}

function r_error(error){
  return{
    type: 'error',
    error: error
  }
}

function FetchData() {
  dispatch({type: 'fetching'})
  return function (dispatch) {
    return fetch('https://api.github.com/users/songjinzhong').then(
      response => {
        if(response.status >= 400){
          r_error('error happen')
        }
        return response.json()
      }
    ).then(
      data => {
        dispatch(r_success(JSON.stringify(data)))
      }
    )
  };
}
```

接下来是 reducer ，这里对于 state，我用的是 bug 很多的简单写法（这个 bug 是可以多次点击获取按钮，而未对当前状态进行判断）：

```javascript
const reducer2 = (state = '', action) => {
  switch (action.type){
    case 'fetching':
      return state = 'loading...'
    case 'success':
      return state = action.data
    case 'error':
      return state = action.error
    default:
      return state
  }
}
```

简单的异步操作就实现了。

### 参考

>[https://github.com/reactjs/redux/tree/master/examples/counter](https://github.com/reactjs/redux/tree/master/examples/counter)
>[http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)