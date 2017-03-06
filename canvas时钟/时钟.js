window.onload = function(){
    var dom = document.getElementById("clock");
    var clk = dom.getContext('2d');//获取绘图区域
    var width = clk.canvas.width;
    var height = clk.canvas.height;
    var r  = width / 2;
    var rem = width/400;  //定义一个变量，存放一个粗细比例，以便于改变画布大小时可以智能调节全局粗细大小
    function drawBackground(){
        clk.save();//保存了当前的状态   
        clk.translate(r,r);//重定向坐标原点为绘图中心
        clk.beginPath();
        clk.lineWidth = 10*rem;
        clk.arc(0,0,r-clk.lineWidth/2,0,2*Math.PI,false);//以坐标0，0为中心，r-5为半径，0弧度为起始角度，2π为结束角，顺时针画圆
        clk.stroke();//绘制定义好的路径
        var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
        clk.font = 18*rem+'px Arial';//对字体也有一个比例问题
        clk.textAlign = "center"; //使文本上下左右对齐
        clk.textBaseline = "middle";//左右对齐
        hourNumbers.forEach(function(number,i){
            var rad = 2*Math.PI/12*i; //数字对应的弧度
            var x = Math.cos(rad)*(r-30*rem);   //数字的x轴
            var y = Math.sin(rad)*(r-30*rem);     //数字的y轴
            clk.fillText(number,x,y);//这里要注意：如何填充文字
        })
        for(i=0;i<=60;i++){
            var rad = 2*Math.PI/60*i;
            var x = Math.cos(rad)*(r-16*rem);
            var y = Math.sin(rad)*(r-16*rem);
            clk.beginPath();
            if(i%5==0){
                clk.fillStyle = "#000";//fillStyle即填充的样式
                clk.arc(x,y,2*rem,0,2*Math.PI,false);  //如果是小时对应的点，则为黑色
            }else{
                clk.fillStyle = "#ccc";//fillStyle即填充的样式
                clk.arc(x,y,2*rem,0,2*Math.PI,false);  //如果是分钟对应的点，则为灰色
            }
            clk.fill();
        }
    }

    function drawHours(hour,minute){
        clk.save();
        clk.beginPath();
        var rad = 2*Math.PI/12*hour;
        var mrad = 2*Math.PI/12/60*minute;
        clk.rotate(rad+mrad);
        clk.strokeStyle="pink";
        clk.lineWidth = 5*rem;
        clk.lineCap = 'round';
        clk.moveTo(0,5*rem);
        clk.lineTo(0,-r/2-10*rem);
        clk.stroke();
        clk.restore();
    }

    function drawMinutes(minute){
        clk.save();
        clk.beginPath();
        var rad = 2*Math.PI/60*minute;
        clk.rotate(rad);
        clk.strokeStyle="#00ff00";
        clk.lineWidth = 3*rem;
        clk.lineCap = 'round';
        clk.moveTo(0,5*rem);
        clk.lineTo(0,-r/2-40*rem);
        clk.stroke();
        clk.restore();
    }

    function drawSeconds(second){
        clk.save();
        clk.beginPath();
        clk.fillStyle = "#f00";
        var rad = 2*Math.PI/60*second;
        clk.rotate(rad);
        clk.moveTo(-2*rem,20*rem);
        clk.lineTo(2*rem,20*rem);
        clk.lineTo(1,-r+30*rem);
        clk.lineTo(-1,-r+30*rem);
        clk.fill();
        clk.restore();
    }

    function drawDot(){      //画时钟中心的原点
        clk.beginPath();
        clk.fillStyle = "#fff";
        clk.arc(0,0,3*rem,0,2*Math.PI,false);
        clk.fill();
    }

    function draw(){
        clk.clearRect(0,0,width,height);
        drawBackground();
        drawDot();
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        drawHours(hour,minute);
        drawMinutes(minute);
        drawSeconds(second);
        clk.restore();
    }
    draw();
    setInterval(draw,1000);
};