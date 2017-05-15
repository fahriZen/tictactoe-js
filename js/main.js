window.onload = function(){
	document.addEventListener('tizenhwkey', function(e){
		if(e.keyName==="back"){
			try{
				tizen.application.getCurrentApplication().exit();
			} catch(ignore){}
		}
	});




var count = 0;
var turn = 1;
var p1 = [];
var p2 = [];
var tersedia = [1,2,3,4,5,6,7,8,9];
var win = false;
var audio = document.getElementById("audio");

function result(){
	var t=setTimeout("alertMsg()",500);
}
function alertMsg(){
	alert('gameOver');	
	win = true;
	$('.game').fadeOut(500);
	$('.game').css('display', 'none');
	reset();
	$('#main').fadeIn(500);
	$('#main').css('display', 'block');
}


function reset(){
	$('.gambar').remove();
	win = false;
	tersedia = [1,2,3,4,5,6,7,8,9]
	count = 0;
	p1 = [];
	p2 = [];
	turn = 1;
}

function blink(){
	setInterval(function(){
		$('#start').fadeOut(400);
		$('#start').fadeIn(500);
	}, 2000)	
}

function move() {
	  var elem = document.getElementById("progress-bar");	  
	  var width = 10;	  
	  var id = setInterval(frame, 100);
	  function frame() {		
	    if (width >= 100) {	    		    	
	    	$('#loading').delay(300).fadeOut(500);
			$('#loading').css('display', 'none');
			$('#main').fadeIn(500);
			$('#main').css('display', 'block');
			audio.play();
	    	clearInterval(id);	      
	    } else {
	      width++; 
	      elem.style.width = width + '%';	      
	      elem.innerHTML = width * 1  + '%';
	    }	    
	  }	  
}

$(document).ready(function(){
	$('#exit').on('click', function(){
		tizen.application.getCurrentApplication().exit();
	})
	
	blink();
	move();		
	$('#press').on('click', function(){
		$('.body').fadeOut(500);
		$('.body').css('display', 'none');
		$('.game').fadeIn(500);
		$('.game').css('display', 'block');		
	})
	
	$('#sound-btn').on('click', function(){		
		if($('#sound-btn img').attr('src')=="assets/sound_enable.png"){
			$('#sound').remove();						
			$('#sound-btn').append('<img src="assets/sound_disable.png" id="sound"/>');
			audio.pause();			
		} else if($('#sound-btn img').attr('src')=="assets/sound_disable.png"){
			$('#sound').remove();
			$('#sound-btn').append('<img src="assets/sound_enable.png" id="sound"/>');
			audio.currentTime = 0;
			audio.play();
		}		
	})
	
	$('.board').on('click', function(){
		var ganti = true;
		if(!win && count<9){
			var temp = parseInt($(this).attr('id'));			
			if(turn==1){
				var kembar = false;
				for(var i = 0; i<tersedia.length; i++){
					if(temp != tersedia[i])
						kembar = true;
					else{
						kembar = false;
						tersedia[i] = -1;
						break;
					}
				}
				console.log(tersedia);
				if(!kembar){
					p1.push(parseInt(temp));					
					$(this).append('<p class="gambar"><img src="assets/O.gif"></p>');
				}
				else{
					alert('board ini sudah diklik!');
					ganti = false;
					count --;
				}
			}
			
			if(turn==-1){
				var kembar = false;
				for(var i=0; i<tersedia.length; i++){
					if(temp != tersedia[i])
						kembar = true;
					else{
						kembar = false;
						tersedia[i] = -1;
						break;
					}
				}
				if(!kembar){
					p2.push(parseInt(temp));
					$(this).append('<p class="gambar"><img src="assets/X.gif"></p>');
				}
				else{
					alert('board ini sudah diklik');
					ganti = false;
					count--;
				}
			}
			
			for(var x=1;x<=7;x+=3){
				var syarat = [x,x+1,x+2]
				if(gameOver(syarat,p2)){
					result();
				}
				if(gameOver(syarat,p1)){
					result();
				}
				
			}
			
			for(var x=1; x<=3; x++){
				var syarat = [x, x+3, x+6];
				if(gameOver(syarat,p2)){
					result();					
				}
				if(gameOver(syarat,p1)){
					result();
				}
			}
			
			var syarat1 = [1,5,9];
			var syarat2 = [3,5,7];
			if(gameOver(syarat1, p1)){
				result();
			}
			if(gameOver(syarat1, p2)){
				result();
			}
			if(gameOver(syarat2, p1)){
				result();
			}
			if(gameOver(syarat2, p2)){
				result();
			}
			
			function gameOver(syarat, arrayPlayer){
				var sama = [];
				for (var i = 0; i < syarat.length; i++) {
					var s = syarat[i];
					for (var j = 0; j < arrayPlayer.length; j++) {
						var a = arrayPlayer[j];
						if (a === s) {
							sama.push(parseInt(a));
						}
					}
				}
				console.log("sama: "+sama);
				console.log("syarat: "+syarat);
				if (sama.length===syarat.length) {
					return true;
				}
			}			
			count++;		
			if(ganti)
				turn *= -1;			
		}
	});	
});


( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "main" && !activePopup ) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } else {
                window.history.back();
            }
        }
    } );
} () );

}