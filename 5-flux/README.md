## 理解 react 中的 flux

[demo 地址](https://songjinzhong.github.io/react-learning/5-flux/)，这个例子，理解了 react 中的数据流，View，Action，Store，Dispatcher。具体可参考阮老师的[这篇文章](http://www.ruanyifeng.com/blog/2016/01/flux.html)。

1. View： 视图层
2. Action（动作）：视图层发出的消息（比如mouseClick）
3. Dispatcher（派发器）：用来接收Actions、执行回调函数
4. Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016011503.png)

可以看到，当用户在 view 上执行一些操作的时候，会先触发 action，action 告诉 dispatcher，触发 store，来更新数据。

### 参考

>[https://github.com/reactjs/react-router-tutorial](https://github.com/reactjs/react-router-tutorial)