## 静态文件的例子

你可以通过 index.html 文件，直接在网页中访问它们

### [jsx 的用法](https://songjinzhong.github.io/react-learning/4-static/jsx)

jsx 语法的特点，html 便捷使用和数组返回

```javascript
var array = ['shanghai', 'beijing', 'nanjing']
ReactDOM.render(
  <div>
    <h1>Hello, world!</h1>
    <ol>
    {
      array.map(function(p){
        return <li>hello, {p}</li>
      })
    }
    </ol>
  </div>,
  document.getElementById('example')
);
```

可以看出，直接在 js 里面写 html ，手感还是不错的，另外，`array.map` 函数实际返回了一个数组，而这个数组的每一项元素都是一个 jsx 型的 Object 对象，具体对象的特性，不知道。

当然也可以直接返回一个已经准备好的数组：

```javascript
var array = [
  <h1>Hello</h1>,
  <h2>World</h2>
]
ReachDOM.render(
  <div>{array}</div>,
  document.getElementById('examples')
)
```

### [component 组件](https://songjinzhong.github.io/react-learning/4-static/component)

吃过亏，组件首字母必须要大些。并且 react component 必须只能有一个顶层节点。

React.Children.map 是一个处理 children 的函数，可以通过 this.props.children 获得 children：

```
var HelloChildren = React.createClass({
  render: function(){
    return (
      <ol>
      {
        React.Children.map(this.props.children, function(data){
          return <li>{data}</li>
        })
      }
      </ol>
    )
  }
});
ReactDOM.render(
  <HelloChildren>
    <span>Hello</span>
    <span>Child</span>
  </HelloChildren>,
  document.getElementById('example2')
);
```

### [PropTypes](https://songjinzhong.github.io/react-learning/4-static/PropTypes)

有时候需要对一些属性设置类型，或者设置默认值，可以通过 PropTypes 来设置默认类型，通过 getDefaultProps 来设置默认值：

```javascript
var data = 123;

var MyTitle = React.createClass({
  // 默认属性集合
  propTypes: {
    title: React.PropTypes.number.isRequired,
  },
  // 默认值集合
  getDefaultProps: function(){
    return {
      text: 'default Text'
    }
  },

  render: function() {
    return <div> <h1>{this.props.title} </h1>
      <p>{this.props.text}</p>
      </div>;
  }
});

ReactDOM.render(
  <MyTitle title={data} />,
  document.getElementById('example')
);
```

### [state](https://songjinzhong.github.io/react-learning/4-static/state)

在 react 中，this 有两个对象，props 用来处理 stable 的属性，而 state 用来处理可变的属性，而且 state 会自动改变，无需用户进行其他操作：

```javascript
var ClickButton = React.createClass({
  getInitialState: function() {
    return {
      times: 0,
      value: 'hello'
    };
  },
  handleClick: function(event) {
    this.setState({times: this.state.times + 1});
  },
  handleChange: function(event){
    this.setState({
      value: event.target.value
    })
  },
  render: function() {
    return (
      <div>
        <span onClick={this.handleClick}>
          You have clicked this {this.state.times} times.
        </span>
        <div>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          <p>{this.state.value}</p>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ClickButton />,
  document.getElementById('example')
);
```

对于一些 input 表单来所，onChange 用于监听是否改变。

### [lifeCycle](https://songjinzhong.github.io/react-learning/4-static/lifeCycle)

组件的生命周期，每个组件都有一个生命周期，从大的范围来讲，组件有三种状态，mount（已插入真实 DOM），update（更新插入的 DOM），unmount（移除真实 DOM），但是函数有五个时间段：

1. componentWillMount()
2. componentDidMount()
3. componentWillUpdate(object nextProps, object nextState)
4. componentDidUpdate(object prevProps, object prevState)
5. componentWillUnmount()

will 表示还没执行，did 表示已经执行。

```javascript
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },
  componentWillMount: function(){
    console.log('component will mount')
  },
  componentDidMount: function () {
    console.log('component did mount')
    this.timer = setInterval(() => {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }, 100);
  },
  componentWillUpdate: function(){
    console.log('component will update')
  },
  conponentDidUpdate: function(){
    console.log('component did update')
  },
  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.getElementById('example')
);
```

从输出的结果来看，执行的顺序就是按照上面的顺序，而且会发现 `componentWillUpdate`、`componentDidUpdate`函数会重复执行，因为 100 毫秒透明度就变化了一次。

### [ajaxAndPromise](https://songjinzhong.github.io/react-learning/4-static/ajaxAndPromise)

通过 ajax 可以获取来自服务器的数据，比如：

```javascript
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    this.getData = $.get(this.props.source, function(result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  componentWillUnmount: function(){
    this.getData.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('example')
);
```

之前使用 isMounted() 函数，貌似后来被取消了，然后使用 componentWillUnmount 函数来 abort 之前的 ajax 请求。

不过感觉 ES6 提供了 Promise 之后，貌似方便多了。

```javascript
var PromiseDemo = React.createClass({
  getInitialState: function(){
    return {
      loading: true,
      data: null,
      error: null
    }
  },
  componentDidMount: function(){
    this.props.promise.then(
      value => this.setState({loading: false, data: value}),
      error => this.setState({loading: false, error: error})
    )
  },
  render: function(){
    if(this.state.loading){
      return <div>loading...</div>
    }
    else if(this.state.error != null){
      return <div>error...{this.state.error.message}</div>
    }
    else{
      var p = this.state.data[0].html_url
      return <div>
        <h1>the URL is:</h1>
        <p>{p}</p>
      </div>
    }
  }
});
ReactDOM.render(
  <PromiseDemo promise={$.getJSON('https://api.github.com/users/octocat/gists')} />,
  document.getElementById('example2')
);
```

学好 ES6 真的很重要。

## 参考

>[https://github.com/reactjs/react-router-tutorial](https://github.com/reactjs/react-router-tutorial)