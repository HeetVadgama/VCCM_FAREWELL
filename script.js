function togglePlay(id, btn) {
  let audio = document.getElementById(id);

  // Stop others WITHOUT resetting UI
  document.querySelectorAll("audio").forEach(a => {
    if (a !== audio) {
      a.pause();
    }
  });

  // Remove glow from all cards
  document.querySelectorAll(".music-card").forEach(card => {
    card.classList.remove("active");
  });

  let card = btn.closest(".music-card");

  if (audio.paused) {
    audio.play();
    btn.innerText = "⏸";

    if (card) card.classList.add("active");
  } else {
    audio.pause();
    btn.innerText = "▶";

    if (card) card.classList.remove("active");
  }

  updateProgress(audio, id);

  // Reset ONLY when song ends
  audio.onended = () => {
    audio.currentTime = 0;

    if (card) card.classList.remove("active");
    btn.innerText = "▶";
  };
}

function updateProgress(audio, id) {
  let num = id.replace("audio", "");

  let progress = document.getElementById("progress" + num);
  let current = document.getElementById("current" + num);
  let duration = document.getElementById("duration" + num);

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
      current.innerText = formatTime(audio.currentTime);
      duration.innerText = formatTime(audio.duration);
    }
  });
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