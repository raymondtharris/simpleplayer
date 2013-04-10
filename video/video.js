$(document).ready(function(){
	var fullscreen=false;
	var secs=0, mins=0;
	var t=0;
	var newPercent=0;
	
	//$("video").get(0).src="../../media/11600973.mp4";
	$("video").get(0).src="../../media/11600973.mp4";

	//$("video").get(0).src="https://vimeo.com/7464329/download?t=1353569920&v=11601243&s=c3356057d5efc2728e3520939c50ed50";
	
	function determinDuration(){
		var minutes =Math.floor($("video").get(0).duration/60);
		var seconds= Math.floor($("video").get(0).duration%60);
		$("#videoDuration").html("/"+minutes +":"+seconds);
	}
	function calculateMinutes(){
		mins = Math.floor($("video").get(0).currentTime/60);
			return mins;
	}
	function calculateSeconds(){
		secs = $("video").get(0).currentTime;
		if(calculateMinutes()>=1){
			if(Math.floor(secs)-60*calculateMinutes()<10){
			return "0"+(Math.floor(secs)-60*calculateMinutes());
			}
			else{
			secs= Math.floor(secs)-60*calculateMinutes();
			return secs ;
			}
		}
		if( (Math.floor(secs)-60*calculateMinutes()) <10){
			return "0"+(Math.floor(secs)-60*calculateMinutes());
		} 
		if(secs >10 && secs <60){
			return Math.floor(secs);
		}
	}
	
	function determineCurrentTime(){
		var sec= Math.floor($("video").get(0).currentTime);
		$("#videoCurrentTime").html(calculateMinutes()+ ":"+ calculateSeconds());
	}
	function fullscreenCheck(){
		if(	$("#videoContainer").get(0).webkitRequestFullScreen){
			return $("#videoContainer").get(0).webkitRequestFullScreen();
		}
		if(	$("#videoContainer").get(0).mozRequestFullScreen){
			return $("#videoContainer").get(0).mozRequestFullScreen();
		}
		else{
			$("videoContainer").get(0).requestFullScreen();
		}
	}
	function fullscreenExitCheck(){
		if(	document.webkitCancelFullScreen){
			return document.webkitCancelFullScreen();
		}
		if(	document.mozCancelFullScreen){
			return document.mozCancelFullScreen();
		}
		else{
			document.cancelFullScreen();
		}
	}
	
	function enterFullscreen(){ // function to complete fullscreen handling 
		if(fullscreen==false){
			fullscreen=true;
			fullscreenCheck(); 
			$("#videoContainer").css("width", "100%");
			$("#videoContainer").css("height","100%");
			$("#videoControlsContainer").css("bottom","100px");
		}
		else{
			fullscreen=false;
			$("#videoControlsContainer").css("bottom","50px");
			$("#videoContainer").css("width", "960px");
			$("#videoContainer").css("height","540px");
			
			fullscreenExitCheck(); 
			
		}
	}
	
	function videoCurrentProgressUpdate(){
		var percent = ($("video").get(0).currentTime/$("video").get(0).duration) *100;
		$("#videoCurrentProgress").css("width", percent+"%");
		$("#videoCurrentMarker").css("margin-left", "auto");
		$("#videoCurrentMarker").css("margin-right", "-2px");

	}
	function videoScrubbingProgressUpdate(change){
		change = ((e.pageX - $(this).parent().offset().left)/$("#videoProgressionContainer").width());
		$("video").get(0).currentTime=$("video").get(0).duration* newPercent;

		$("#videoCurrentProgress").css("width", change*100+"%");
		//$("#videoCurrentMarker").css("margin-left", "auto");
		$("#videoCurrentMarker").css("margin-right", "-2px");


	}
	
	function videoLoadedProgressUpdate(){
		var loaded = ($("video").get(0).buffered.end(0)/$("video").get(0).duration)*100;
		$("#videoLoadedProgress").css("width", loaded+"%");
	}	
	
	function videoLoadedProgress(){
		$("video").get(0).buffered.end(0);
		setInterval(videoLoadedProgressUpdate, 30);
	}
	function videoPlayPause(){
		if($("video").get(0).paused==true){
			$("video").get(0).paused=true;
			$("video").get(0).play();
			/*$("#videoPlayPauseButton").css("background","url('../plugins/video/videoControls@2x.png')");
			$("#videoPlayPauseButton").css("background-repeat","no-repeat");
			$("#videoPlayPauseButton").css("background-position","-30px 0");
			$("#videoPlayPauseButton").css("background-size","32px 24px");
			*/
			$("#videoPlayPauseButton").removeClass("PlayButton");
			$("#videoPlayPauseButton").addClass("PauseButton");
			
			setInterval(determineCurrentTime , 10);
			setInterval(videoCurrentProgressUpdate, 30);
			
		}
		else{
			$("video").get(0).paused=false;
			$("video").get(0).pause();
			determineCurrentTime();
			/*
			$("#videoPlayPauseButton").css("background","url('../plugins/video/videoControls@2x.png')");
			$("#videoPlayPauseButton").css("background-repeat","no-repeat");
			$("#videoPlayPauseButton").css("background-position","0 0");
			$("#videoPlayPauseButton").css("background-size","32px 24px");
			*/
			$("#videoPlayPauseButton").removeClass("PauseButton");
			$("#videoPlayPauseButton").addClass("PlayButton");

		}
	}
	

	// play pause messenger
	$("#videoPlayPauseButton").click(function(){
		determinDuration();
		videoLoadedProgress();
		videoPlayPause();
	});
	
	// fullscreen messenger
	$("#videoFullscreenButton").click(function(){
		enterFullscreen();
	});
	
	$("#videoProgressionContainer").click(function(e){
		newPercent = (e.pageX- $(this).offset().left)/$("#videoProgressionContainer").width();
		$("video").get(0).currentTime= $("video").get(0).duration* newPercent;
		$("#videoCurrentProgress").css("width",newPercent*100+"%");
		$("#videoCurrentMarker").css("margin-right", "-2px");

	});
	
	$("#videoCurrentMarker").draggable({axis:"x", containment:"#videoProgressionContainer", drag:function(e){
		newPercent = ((e.pageX - $(this).parent().offset().left)/$("#videoProgressionContainer").width());
		$("video").get(0).currentTime=$("video").get(0).duration* newPercent;
		videoScrubbingProgressUpdate(newPercent);		
		}, start:function(e){
				$("video").get(0).volume=0;
		}, stop:function(e){
			  	$("video").get(0).volume=1;
		}
	});
	
	
	$("#videoContainer").hover(function(){
		$("#videoControlsContainer").fadeIn(100);
	},	function(){
		$("#videoControlsContainer").fadeOut(300);
	});

});