let audio_actual = new Audio();

function reproducir_cancion(src){
	audio_actual.src = src;
	audio_actual.load();
	play();
}

function togglePlay(){
	if(!audio_actual.src){
		return false;
	}

	const play_status = audio_actual.paused ? audio_actual.play() : audio_actual.pause();
	if(play_status){
		$("#play_button").html("&nbsp;►&nbsp;");
	}
	else{
		$("#play_button").html("&nbsp;⏸️&nbsp;");
	}

	//return audio_actual.paused ? audio_actual.play() : audio_actual.pause();
}

function play(){
	$("#play_button").html("&nbsp;⏸️&nbsp;");
	audio_actual.play()
	  .then(() => {
	    // Audio is playing.
	  })
	  .catch(error => {
	    console.log(error);
	  });
}

function pause(){
	$("#play_button").html("&nbsp;►&nbsp;");
	audio.pause();
}
