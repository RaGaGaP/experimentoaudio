let player;
let currentVolume = 50;

// Extrae el videoId desde una URL de YouTube
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
};

document.getElementById("play").onclick = () => {
  player.playVideo();
};

document.getElementById("pause").onclick = () => {
  player.pauseVideo();
};

document.getElementById("mute").onclick = () => {
  if (player.isMuted()) {
    player.unMute();
  } else {
    player.mute();
  }
};

document.getElementById("volUp").onclick = () => {
  currentVolume = Math.min(100, currentVolume + 10);
  player.setVolume(currentVolume);
};

document.getElementById("volDown").onclick = () => {
  currentVolume = Math.max(0, currentVolume - 10);
  player.setVolume(currentVolume);
};
