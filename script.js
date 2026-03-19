function togglePlay(id, btn) {
  let audio = document.getElementById(id);

  // Stop all others
  document.querySelectorAll("audio").forEach(a => {
    if (a !== audio) {
      a.pause();
      a.currentTime = 0;
    }
  });

  if (audio.paused) {
    audio.play();
    btn.innerText = "⏸";
  } else {
    audio.pause();
    btn.innerText = "▶";
  }

  updateProgress(audio, id);
}

function updateProgress(audio, id) {
  let num = id.replace("audio", "");

  let progress = document.getElementById("progress" + num);
  let current = document.getElementById("current" + num);
  let duration = document.getElementById("duration" + num);

  audio.ontimeupdate = () => {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
      current.innerText = formatTime(audio.currentTime);
      duration.innerText = formatTime(audio.duration);
    }
  };
}

function seekSong(id, slider) {
  let audio = document.getElementById(id);
  if (audio.duration) {
    audio.currentTime = (slider.value / 100) * audio.duration;
  }
}

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}