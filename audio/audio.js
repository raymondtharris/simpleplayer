$(document).ready(function(){
	var fullscreen=false;
	var secs=0, mins=0;
	var t=0;
	var newPercent=0;
	
	//$("video").get(0).src="../../media/11600973.mp4";
	$("audio").get(0).src="../../media/02_Hargrove.m4a";

	//$("video").get(0).src="https://vimeo.com/7464329/download?t=1353569920&v=11601243&s=c3356057d5efc2728e3520939c50ed50";
	
	function determinDuration(){
		var minutes =Math.floor($("audio").get(0).duration/60);
		var seconds= Math.floor($("audio").get(0).duration%60);
		$("#audioDuration").html("/"+minutes +":"+seconds);
	}
	function calculateMinutes(){
		mins = Math.floor($("audio").get(0).currentTime/60);
			return mins;
	}
	function calculateSeconds(){
		secs = $("audio").get(0).currentTime;
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
		var sec= Math.floor($("audio").get(0).currentTime);
		$("#audioCurrentTime").html(calculateMinutes()+ ":"+ calculateSeconds());
	}
	
	function audioCurrentProgressUpdate(){
		var percent = ($("audio").get(0).currentTime/$("audio").get(0).duration) *100;
		$("#audioCurrentProgress").css("width", percent+"%");
		$("#audioCurrentMarker").css("margin-left", "auto");
		$("#audioCurrentMarker").css("margin-right", "-2px");

	}
	function audioScrubbingProgressUpdate(change){
		change = ((e.pageX - $(this).parent().offset().left)/$("#audioProgressionContainer").width());
		$("audio").get(0).currentTime=$("audio").get(0).duration* newPercent;

		$("#audioCurrentProgress").css("width", change*100+"%");
		//$("#videoCurrentMarker").css("margin-left", "auto");
		$("#audioCurrentMarker").css("margin-right", "-2px");


	}
	
	function audioLoadedProgressUpdate(){
		var loaded = ($("audio").get(0).buffered.end(0)/$("audio").get(0).duration)*100;
		$("#audioLoadedProgress").css("width", loaded+"%");
	}	
	
	function audioLoadedProgress(){
		$("audio").get(0).buffered.end(0);
		setInterval(audioLoadedProgressUpdate, 30);
	}
	function audioPlayPause(){
		if($("audio").get(0).paused==true){
			$("audio").get(0).paused=true;
			$("audio").get(0).play();
			$("#audioPlayPauseButton").css("content","url('PauseButton.png')");

			
			setInterval(determineCurrentTime , 10);
			setInterval(audioCurrentProgressUpdate, 30);
			
		}
		else{
			$("audio").get(0).paused=false;
			$("audio").get(0).pause();
			determineCurrentTime();
			$("#audioPlayPauseButton").css("content","url('PlayButton.png')");

		}
	}
	

	// play pause messenger
	$("#audioPlayPauseButton").click(function(){
		determinDuration();
		audioLoadedProgress();
		audioPlayPause();
	});
	
	
	$("#audioProgressionContainer").click(function(e){
		newPercent = (e.pageX- $(this).offset().left)/$("#audioProgressionContainer").width();
		$("audio").get(0).currentTime= $("audio").get(0).duration* newPercent;
		$("#audioCurrentProgress").css("width",newPercent*100+"%");
		$("#audioCurrentMarker").css("margin-right", "-2px");

	});
	
	$("#audioCurrentMarker").draggable({axis:"x", containment:"#audioProgressionContainer", drag:function(e){
		newPercent = ((e.pageX - $(this).parent().offset().left)/$("#audioProgressionContainer").width());
		$("audio").get(0).currentTime=$("audio").get(0).duration* newPercent;
		audioScrubbingProgressUpdate(newPercent);		
		}, start:function(e){
				$("audio").get(0).volume=0;
		}, stop:function(e){
			  	$("audio").get(0).volume=1;
		}
	});
	
	

});