const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const mute = document.getElementById('mute');
const voldec = document.getElementById('voldec');
const volinc = document.getElementById('volinc');

// Play and Pause video
function toggleVideoStatus() {
  if(video.paused) { 
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause icon
function updatePlayIcon() {
  if(video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
  }
}

// Update progress and timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  // keep progress indicator moving along progress bar

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if(mins < 10) {
    mins = '0' + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  timestamp.innerHTML = `${mins}:${secs}`
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Check the volume
function checkVolume(dir) {
  if (dir) {
    var currentVolume = Math.floor(video.volume * 10) / 10;
    if (dir === '+') {
      if (currentVolume < 1) {
        video.volume += 0.1;
      }
    }
    else if (dir === '-') {
      if (currentVolume > 0) {
        video.volume -= 0.1;
      }
    }
    if (currentVolume <= 0) {
      video.muted = true;
    } else {
      video.muted = false;
    }
  }
}

// Change the volume
function alterVolume(dir) {
  checkVolume(dir);
}

// Update mute/unmute
function updateVolumeIcon() {
  if (video.muted) {
    mute.innerHTML = '<i class="fa fa-volume-off fa-2x"></i>'
  } else {
    mute.innerHTML = '<i class="fa fa-volume-up fa-2x"></i>'
  }
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('volumechange', checkVolume);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

volinc.addEventListener('click', alterVolume('+'));

voldec.addEventListener('click', alterVolume('-'));