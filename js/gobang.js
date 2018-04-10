window.onload = function () {
    var supportCanvas = document.createElement('canvas').getContext;//是否支持canvas

    var edge = 20;//画布边框长度
    /**
     * 画点
     * el 元素 画点的位置元素
     * x y num 坐标
     * type string 棋子颜色
     * r num 棋子半径
     * return 节点位置信息
     */
    function drawNode(el, x, y, type, r) {
        if (supportCanvas) {
            r = r || 8;
            var context = el.getContext('2d');
            context.beginPath();
            context.arc(x + edge, y + edge, r, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = type;
            context.fill();
            return { 
                info: [x, y, type],
                bLoca: [] 
            };
        }
        else {
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
        
    }
    /**
     * 画网格
     * el  元素  画网格的位置元素
     * num num 网格的数量
     * return num 棋盘网格每个格子的宽度/高度
     */
    function drawGride(el,num) {
        if (supportCanvas) {
            var gridEl = document.querySelector('#demo-canvas');
            num = num || 18;
            el.width = el.height = gridEl.width = gridEl.height = 460;
            var context = gridEl.getContext('2d'),
                width = gridEl.width - 2 * edge,
                unit = width / num,
                loca = 0;
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(edge, edge);
            context.lineTo(edge, width + edge);
            context.lineTo(width + edge, width + edge);
            context.lineTo(width + edge, edge);
            context.closePath();
            context.stroke();
            context.lineWidth = 1;            
            context.beginPath();
            for (var i = 1; i < num; i++) {
                loca = i * unit + edge;
                context.moveTo(loca, edge);
                context.lineTo(loca, width + edge);
                context.moveTo(edge, loca);
                context.lineTo(width + edge, loca);
            }
            context.closePath();
            context.stroke();

            return unit;
        }
        else {
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
    }
    /**
     * 清除制定位置的棋子
     * el 元素 画点的位置元素
     * x y num 坐标
     * width height num 宽度 高度
     */
    function clear(el, x, y, width, height) {
        var context = el.getContext('2d');
        context.clearRect(x-width/2-1+edge,y-height/2-1+edge,width+1,height+1);
    }
    /**
     * 悔棋操作
     */
    function forgetIt() {
        if (supportCanvas) {
            game.forgetIt(function (loca, el) {
                loca && clear(el, loca.info[0], loca.info[1], 17, 17);
            });
        }
        else {
            game.forgetIt(function (node) {
                node && $(node.nodeBox).remove();   
            });
        }
    }
    /**
     * 撤销悔棋操作
     */
    function rememberIt() {
        if (supportCanvas) {        
            game.rememberIt(function (loca, el) {
                loca && drawNode(el, loca.info[0], loca.info[1], loca.info[2]);
            });
        }
        else {
            game.rememberIt(function (node, el) {
                node && el.appendChild(node.nodeBox);
            });
        }
    }
    /**
     * 开始游戏
     * return Game Game对象
     */
    function start() {
        if(supportCanvas){
            return new Game(initGame, drawNode, 1, '#demo-chess');
        }
        else {
            return new Game(initGame, drawNode, 1, '#demo-dom');
        }
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
        if(!supportCanvas){
            document.getElementById('demo-dom').style.display = '';
            el.innerHTML = ''; 

        }
        return drawGride(el,num);
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
