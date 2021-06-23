import React from 'react';

function SlideControl(slides){	
	var count = 1;
	slides[count].style.display = "grid";
	slides[0].style.display = "grid";
	slides[0].style.position = "absolute";
	process_1(afterProcess);
	function afterProcess(){
		setTimeout(function(){
			count++;
			process_1(afterProcess);

		},2000);	
	}
	function process_1(callback){
		if(slides.length==0){return;}
		count = (count>slides.length - 1)? 0 : count;
		var previousIndex = (count - 1 <0)? (slides.length - 1) : (count-1);
		slides[previousIndex].style.zIndex = "0";
		slides[count].style.zIndex = "1";
		slides[count].style.display = "grid"
		slides[count].style.position = "absolute";
		var a = slides[count].clientWidth*(- 1);
		slides[count].style.right= a+ "px";
		//node.style.display= "none";	
		var i=0;
		var swipe = setInterval(function(){
			if(slides[count]==undefined){
				clearInterval(swipe);
				return;
			}
			i=i+2;
			slides[count].style.right= (a + i) + "px" ;
			if(slides[count].offsetLeft<=0){
				clearInterval(swipe);
				slides[previousIndex].style.display = "none";
				callback();
			}
		},1)		
	}
	
}
export default SlideControl;