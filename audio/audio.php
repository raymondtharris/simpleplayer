<!--
	myGreytCMS Audio Player
	Version 1.0
	Created by Raymond Harris
-->
<link rel="stylesheet" href="audio.css"/>
<script type="text/javascript" src="../js/jquery-1.8.2.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.9.1.custom.js"></script>
<script type="text/javascript" src="audio.js"></script>

<div id="audioContainer">
	<audio></audio>
	<div id="audioControlsContainer">
		<div id="audioPlayPauseButton"></div>
		<div id="audioProgressionContainer">
			<div id="audioCurrentProgress">
				<div id="audioCurrentMarker"></div>
			</div>
			<div id="audioLoadedProgress"></div>
		</div>
		<div id="audioTimeContainer">
			<div style="margin:auto;max-width:100%;height:100%;margin-top:2px;margin-left:12px;">
				<div id="audioCurrentTime">-:--</div>
				<div id="audioDuration">/-:--</div>
			</div>
		</div>
	</div>
</div>
