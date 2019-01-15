//1 -- 得到画布
var myCanvas = document.getElementById('canvas');
//2 -- 使用画布上下文
var ctx = myCanvas.getContext('2d');
//3 -- 设置画布满屏
myCanvas.width = document.documentElement.clientWidth;
myCanvas.height = document.documentElement.clientHeight;

//小球类
function Ball(x, y) {
    this.x = x; //圆心坐标
    this.y = y;
    this.r = 15; // 半径
    this.color = 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + Math.random() * 2 + ')';
    this.dx = parseInt(Math.random() * 8) - 4;
    this.dy = parseInt(Math.random() * 8) - 4; // x,y的变化值
    ballsArr.push(this); //让自己进入数组
}
Ball.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.r--; //半径减小 ，为0时删除自己
    if (this.r < 0) {
        this.godie();
    }
};
Ball.prototype.render = function () {

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
};
// 自杀
Ball.prototype.godie = function () {
    for (var i = 0; i < ballsArr.length; i++) {
        if (ballsArr[i] === this) {
            ballsArr.splice(i, 1);
        }
    }
};
// var ball = new Ball(100,100)
// ball.render()
var ballsArr = [];
setInterval(function () {
    //1 -- 清屏
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    //2 -- 更新，渲染
    for (var i = 0; i < ballsArr.length; i++) {
        ballsArr[i].update();
        //因为update方法可能会删除这个球，render的时候需要存在才行
        ballsArr[i] && ballsArr[i].render();
    }
    new Ball(myCanvas.width / 2, myCanvas.height / 2); //生成小球
}, 20);
// myCanvas.onmousemove =function (e) {
//     new Ball(e.clientX,e.clientY)
// }