(function(win, doc) {
	function change() {
		doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 320 * 20 + 'px';
	}
	change();
	win.addEventListener('resize', change, false);
})(window, document)
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}
window.onload  = function() {
	var oBox2 = document.querySelector('.box2');
	var oBox21 = document.querySelector('.box21');
	var oBox22 = document.querySelector('.box22');
	var oBox1 = document.querySelector('.box1');
	var oBox23 = document.querySelector('.box23');
	var oBox0 = document.querySelector('.box0');
	var oBox13 = document.querySelector('.box13');
	var oBox11_1 = document.querySelector('.box11-1');
	var oBox11_2 = document.querySelector('.box11-2');
	var oBox11_3 = document.querySelector('.box11-3');
	var oBox11_4 = document.querySelector('.box11-4');
	var oBtn = document.querySelector('.box11').children;
	var oQh = document.querySelectorAll('.qh')
	oBox2.style.height = document.documentElement.clientHeight + 'px';
	oBox1.style.height = document.documentElement.clientHeight + 'px';
	var str = "无尽的星空，带给了世人的希望与梦想。推开了星空的大门，希望与梦想就在前方！"
	oBox23.onclick = function() {
		var timer = null;
		oBox21.style.boxShadow = '10px 10px 10px 40px #036';
		oBox22.style.boxShadow = '10px 10px 10px 40px #036';
		oBox21.style.transform = 'perspective(800px) rotateY(180deg)';
		oBox22.style.transform = 'perspective(800px) rotateY(0deg)';
		oBox23.style.opacity = 0;
		for(var i = 0; i < str.length; i++) {
			var oSpan = document.createElement('span');
			oSpan.innerHTML = str[i];
			oBox0.appendChild(oSpan);
		}
		var i = 0;
		var aSpan = oBox0.children;
		timer = setInterval(function() {
			aSpan[i].style.opacity = 1;
			aSpan[i].style.textShadow = '0 0 0px #FFF';
			i++;
			if(i == str.length) {
				clearInterval(timer);
			}
		}, 100)
		oBox22.addEventListener('transitionend', function() {
			oBox13.style.display = 'block';
			oBox23.style.animation = 'null';
			oBox2.style.display = 'none';
		}, false);

	}
	var aLi = oBox13.children[0].children;
	for(var i = 0; i < aLi.length; i++) {
		aLi[i].bOk=true;
		aLi[i].onmouseover = function() {
			this.style.WebkitBoxReflect = 'below 0px linear-gradient(rgba(0,0,0,0)70%,rgba(0,0,0,1))';
		}
		aLi[i].onmouseout = function() {
			this.style.WebkitBoxReflect = 'below 10px linear-gradient(rgba(0,0,0,0)70%,rgba(0,0,0,1))';
		}
		aLi[i].onclick = function() {
			if(!this.bOk){return};
			this.bOk=false
			if(this.className == '') {
				this.className = 'rot';
			} else {
				this.className = '';
			}
		}
		aLi[i].addEventListener('transitionend', function() {
			this.bOk=!this.bOk;
		}, false);
	}
	for(var i = 0; i < oBtn.length; i++) {
		oBtn[i].index = i;
		oBtn[i].onclick = function() {
			for(var j = 0; j < oBtn.length; j++) {
				oQh[j].style.display = "none";
				oBtn[j].style.color="#fff";
				oBtn[j].style.textShadow='3px -2px 4px #fff, 5px -4px 8px #fff';
			}
			oQh[this.index].style.display = "block";
			this.style.color='skyblue';
			this.style.textShadow='3px -2px 4px blue, 5px -4px 8px blue';
		}
	}
	var oC=document.querySelector('canvas');
	var gd=oC.getContext('2d');
	var oCw=document.documentElement.clientWidth;
	var oCh=document.documentElement.clientHeight;
	oC.width=oCw;
	oC.height=oCh;
	var w=2;
	var h=2;
	var N=5;
	var aPoint=[];
	var LEN =30;
	var oldArr=[];
	for(var i=0;i<N;i++){
		aPoint.push({
			x:rnd(0,oCw-w),
			y:rnd(0,oCh-h),
			speedX:rnd(-10,-10),
			speedY:rnd(-10,10)
		})
	}
	setInterval(function(){
		gd.clearRect(0,0,oC.width,oC.height)
		for(var i=0;i<aPoint.length;i++){
			aPoint[i].x+=aPoint[i].speedX;
			aPoint[i].y+=aPoint[i].speedY;
			if(aPoint[i].x<0){
				aPoint[i].x=0;
				aPoint[i].speedX*=-1;
			}
			if(aPoint[i].x>oCw-w){
				aPoint[i].x=oCw-w;
				aPoint[i].speedX*=-1;
			}
			if(aPoint[i].y<0){
				aPoint[i].y=0;
				aPoint[i].speedY*=-1;
			}
			if(aPoint[i].y>oCh-h){
				aPoint[i].y=oCh-h;
				aPoint[i].speedY*=-1;
			}
			createRect(aPoint[i])
		}
		gd.beginPath();
		gd.moveTo(aPoint[0].x,aPoint[0].y)
		for(var i=1;i<aPoint.length;i++){
			gd.lineTo(aPoint[i].x,aPoint[i].y)
		}
		gd.fillStyle='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
		gd.fill();
		gd.closePath();
		gd.stroke();
		var arr=[];
		for(var i=0;i<aPoint.length;i++){
			arr[i]={x:aPoint[i].x,y:aPoint[i].y}
		}
		oldArr.push(arr)
		if(oldArr.length>LEN){
			oldArr.shift();
		}
		for(var i=0;i<oldArr.length;i++){
			gd.beginPath();
			gd.moveTo(oldArr[i][0].x,oldArr[i][0].y)
			var scale=i/oldArr.length;
			gd.strokestyle='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+','+scale+')';
			for(var j=1;j<oldArr[i].length;j++){
				gd.lineTo(oldArr[i][j].x,oldArr[i][j].y)
			}
			gd.closePath();
			gd.stroke();
		}
	},16)
	function createRect(oPoint){
		gd.fillRect(oPoint.x,oPoint.y,w,h)
	}
}