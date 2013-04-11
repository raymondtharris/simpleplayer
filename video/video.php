<!--
	myGreytCMS Video Player
	Version 1.0
	Created by Raymond Harris
-->
<link rel="stylesheet" href="video.css"/>
<script type="text/javascript" src="../js/jquery-1.8.2.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.9.1.custom.js"></script>
<script type="text/javascript" src="video.js"></script>


<div id="videoContainer">
	<video></video>
	<div id="videoControlsContainer">
		<div id="videoPlayPauseButton" class="PlayButton"></div>
		<div id="videoProgressionContainer">
			<div id="videoCurrentProgress">
				<div id="videoCurrentMarker"></div>
			</div>
			<div id="videoLoadedProgress"></div>
		</div>
		<div id="videoTimeContainer">
			<div style="margin:auto;max-width:100%;height:100%;margin-top:2px;margin-left:12px;"><div id="videoCurrentTime">-:--</div>
			<div id="videoDuration">/-:--</div>
			</div>
		</div>
		<div id="videoFullscreenButton"></div>
	</div>
</div>
