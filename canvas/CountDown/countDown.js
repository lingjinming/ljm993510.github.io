var CANVARSWIDTH = document.documentElement.clientWidth
var CANVARSHEIGHT = document.documentElement.clientHeight
var ballR = 8;//小球半径
var ballR = 8;//小球半径
var MARGIN_LEFT =120;//小球半径
var MARGIN_TOP = 30;//小球半径
window.onload = function () {
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = CANVARSWIDTH
    canvas.height = CANVARSHEIGHT
    
    var timer = setInterval(function () {
        render(ctx)
    },50)
}

function render(ctx) {
    ctx.clearRect(0,0,CANVARSWIDTH,CANVARSHEIGHT)
    var d = new Date();
    var hour = change(d.getHours());
    var minute = change(d.getMinutes());
    var second = change(d.getSeconds());

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),ctx)
    renderDigit(MARGIN_LEFT+15*(ballR+1),MARGIN_TOP,parseInt(hour%10),ctx)
    renderDigit(MARGIN_LEFT+30*(ballR+1),MARGIN_TOP,10,ctx)
    renderDigit(MARGIN_LEFT+39*(ballR+1),MARGIN_TOP,parseInt(minute/10),ctx)
    renderDigit(MARGIN_LEFT+54*(ballR+1),MARGIN_TOP,parseInt(minute%10),ctx)
    renderDigit(MARGIN_LEFT+69*(ballR+1),MARGIN_TOP,10,ctx)
    renderDigit(MARGIN_LEFT+78*(ballR+1),MARGIN_TOP,parseInt(second/10),ctx)
    renderDigit(MARGIN_LEFT+93*(ballR+1),MARGIN_TOP,parseInt(second%10),ctx)

}
/*
* 假设矩阵由i列j行方格组成,i和j从零计算;小圆球的半径是r,则方格款为2(r+1)
* 第j行第i 列的小球圆心坐标为 （r+1+j*2(r+1)，r+1+i*2(r+1)）
* @params:x 圆心横坐标
* @params:y 圆心纵坐标
* */
function renderDigit(x,y,num,ctx) {
    ctx.fillStyle = 'red';
    for (var i = 0 ;i < digit[num].length ; i++) {
        for (var j = 0 ;j < digit[num][i].length ; j++){

            if (digit[num][i][j] == 1){
                console.log(digit)
                console.log(num)
                console.log(digit[num][i])
                ctx.beginPath()
                ctx.arc(x+j*2*(ballR+1)+ballR+1,y+i*2*(ballR+1)+ballR+1,ballR,0,2*Math.PI)
                ctx.closePath()
                ctx.fill()
            }
        }
    }
    
}

function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}