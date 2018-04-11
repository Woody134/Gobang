window.onload = function () {
   // var supportCanvas = document.createElement('canvas').getContext;//是否支持canvas

    /**
     * 画点
     * el 元素 画点的位置元素
     * x y num 坐标
     * type string 棋子颜色
     * r num 棋子半径
     * return 节点位置信息
     */
    function drawNode(el, x, y, type) {
        var piecesBox = document.createElement('div');            
        var pieces = document.createElement('div');
        piecesBox.className = 'pieces-box';
        pieces.className = 'pieces';
        piecesBox.style.top = y - 7 + 'px';
        piecesBox.style.left = x - 7 + 'px';
        pieces.style.borderColor = type;
        piecesBox.appendChild(pieces);
        el.appendChild(piecesBox);
        return {
            info: [x, y, type],
            bLoca: [],
            node: pieces,
            nodeBox: piecesBox
        };
        
    }
    /**
     * 画网格
     * el  元素  画网格的位置元素
     * num num 网格的数量
     * return num 棋盘网格每个格子的宽度/高度
     */
    function drawGrid(el,num) {
        num = num || 18;
        var width = (el.offsetWidth - 4) / num,
            grid = document.createElement('div'),
            node = null,
            border = '2px solid #000';

        grid.style.display = 'inline-block';
        grid.style.width = grid.style.height = (width - 1) + 'px';
        grid.style.borderRight = grid.style.borderBottom = '1px solid #000';

        for (var i = 0; i < num; i++) {
            for (var j = 0; j < num; j++) {
                node = grid.cloneNode(true);

                if (i == 0) node.style.borderTop = border;
                else if (i == num - 1) node.style.borderBottom = border;
                if (j == 0) node.style.borderLeft = border;
                else if (j == num - 1) node.style.borderRight = border;

                el.appendChild(node);
            }
            el.appendChild(document.createElement('br'));
        }
        return parseFloat(node.style.width) + 1;
    }
    /**
     * 悔棋操作
     */
    function forgetIt() {
        game.forgetIt(function (node) {
            node && $(node.nodeBox).remove();   
        });
    }
    /**
     * 撤销悔棋操作
     */
    function rememberIt() {
        game.rememberIt(function (node, el) {
            node && el.appendChild(node.nodeBox);
        });
    }
    /**
     * 开始游戏
     * return Game Game对象
     */
    function start() {
        return new Game(initGame, drawNode, 1, '#demo-dom');
    }
    /**
     * 重新开始游戏
     */
    function reStart() {
        game = start();
    }
    /**
     * 初始化游戏
     * el 元素 网格位置
     * num num  网格数量
     */
    function initGame(el, num) {
        document.getElementById('demo-dom').style.display = '';
        el.innerHTML = ''; 
        return drawGrid(el,num);
    }

    EventUtil.addHandler(document.getElementById('forgetIt'), 'click', forgetIt);
    EventUtil.addHandler(document.getElementById('rememberIt'), 'click', rememberIt);
    EventUtil.addHandler(document.getElementById('reStart'), 'click', reStart);
    EventUtil.addHandler(document.getElementById('readMe'), 'click', function(){
        Tip.alert('作者：woody'
            + '\n邮箱：m15150685530@163.com');
    });
    
    var game = start();//启动游戏
}
