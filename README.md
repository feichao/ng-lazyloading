# lazyloading

angular 模板懒加载指令

**用途**

我们都知道，DOM 渲染是一个比较耗时间的操作，尤其是当一个页面含有大量数据的时候。通常的做法是使用 ng-if 先隐藏部分节点，待需要渲染的时候再延时渲染，但是 ng-if 的切换会频繁的删除和添加 DOM 节点，用户体验反而会不好。而 ng-show 则只是使用 display: none 在 DOM 渲染完毕后再隐藏节点，仍然需要在最开始时渲染。所以需要一种机制：在刚开始的时候不会渲染（既相当于 ng-if="false"），第一次显示时 ng-if="true"，等到切换显示隐藏的时候使用 display 属性（即相当于 ng-show 的功能）。

这个指令除了实现上述的功能外，还提供了简单的延时加载的功能。

**例子**

> demo/demo.html

**依赖**

> angularJS 最新版本

**安装**
bower install --save ng-lazyloading

**如何使用**

> 引入 src 目录下的 lazyloading.js 文件
> 导入 fc.lazyLoading
> 使用属性指令 lazy-loading，有两种取值：1、毫秒数，表示多少毫秒后加载模板；2、表达式，true 或者 false 或者 返回 true/false 的函数

