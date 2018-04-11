# Gobang
五子棋游戏
# 文件介绍
文件主要包括gobang.html common.js gobang.js 和 common.css
## common.js
文件内包含四个对象：Board, Record, Tip, Game
### Board
存储棋盘各个节点信息的对象。
节点对象结构为：
```
{
  x: x,//节点横向坐标
  y: y,//节点纵向坐标
  type: null,//节点上棋子类型
  //节点周围节点的情况 属性名：l:左 r:右 t:上 b:下 属性值：对应位置节点type
  connect: {
    lt: null,
    t: null,
    rt：null,
    l: null,
    r: null,
    lb: null,
    b: null,
    rb: null
  }
}
```
游戏结束的判断：遍历'l', 'lt', 't', 'rt'，'r', 'rb', 'b', 'lb'八个方向，统计这八个方向上连续相同棋子数量，大于4时游戏结束。
### Record
用两个堆存储游戏记录，实现悔棋与撤销悔棋。
### Tip
实现弹出框和选择框
## gobang.js
包含drawNode,drawGrid,initGame等方法，实现了绘制棋子，棋盘，初始化游戏的功能，在支持canvas的浏览器中采用canvas进行绘制，在不支持canvas的浏览器中采用DOM方法进行实现。
