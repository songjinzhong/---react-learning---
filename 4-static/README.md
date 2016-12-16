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

## 参考

>[https://github.com/reactjs/react-router-tutorial](https://github.com/reactjs/react-router-tutorial)