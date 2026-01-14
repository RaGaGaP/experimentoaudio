let player;
let currentVolume = 50;
let progressInterval;

function getVideoId(url) {
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/ 
  );
  return match ? match[1] : null;
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "1",
    width: "1",
    videoId: "",
    playerVars: {
      controls: 0,
      modestbranding: 1,
      rel: 0
    }
  });
}

document.getElementById("load").onclick = () => {
  const url = document.getElementById("youtubeUrl").value;
  const videoId = getVideoId(url);

  if (!videoId) {
    alert("URL de YouTube no válida");
    return;
  }

  player.loadVideoById(videoId);
  player.setVolume(currentVolume);
  startProgress();
};

document.getElementById("play").onclick = () => {
  player.playVideo();
};

document.getElementById("pause").onclick = () => {
  player.pauseVideo();
};

document.getElementById("mute").onclick = () => {
  player.isMuted() ? player.unMute() : player.mute();
};

document.getElementById("volUp").onclick = () => {
  currentVolume = Math.min(100, currentVolume + 10);
  player.setVolume(currentVolume);
};

document.getElementById("volDown").onclick = () => {
  currentVolume = Math.max(0, currentVolume - 10);
  player.setVolume(currentVolume);
};

function startProgress() {
  clearInterval(progressInterval);

  progressInterval = setInterval(() => {
    if (!player || !player.getDuration) return;

    const current = player.getCurrentTime();
    const duration = player.getDuration();
    const percent = (current / duration) * 100;

    document.getElementById("progress").style.width = `${percent}%`;
  }, 500);
}
