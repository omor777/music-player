const musics = [
  {
    name: "unhealthy",
    description: "Anne-Marie, Shania Twain",
    img: "../images/img1.png",
    song: "../audio/song1.mp3",
  },
  {
    name: "old town road",
    description: "lil nas x, billy cyrus",
    img: "../images/img2.jpg",
    song: "../audio/song2.mp3",
  },
  {
    name: "break my heart",
    description: "dua lipa",
    img: "../images/img3.jpg",
    song: "../audio/song3.mp3",
  },
  {
    name: "senorita",
    description: "shawn mendes, camila cabello",
    img: "../images/img4.jpg",
    song: "../audio/song4.mp3",
  },
  {
    name: "worth it",
    description: "fifth harmony, kid ink",
    img: "../images/img5.jpg",
    song: "../audio/song5.mp3",
  },
];

window.onload = () => {
  main();
};

//global
let currentIndex = 0;

function main() {
  const id = (id) => document.getElementById(id);
  const playBtn = id("play-btn");
  const musicProgress = id("music-progress");
  const startSecond = id("start-second");
  const startMin = id("start-min");
  const endSecond = id("end-second");
  const endMin = id("end-min");
  const nextSong = id("next");
  const prevSong = id("prev");
  const img = id("img");
  const title = id("title");
  const desc = id("desc");
  const audio = id("song");

  audio.src = musics[currentIndex].song;

  function playMusic(e) {
    if (audio.paused) {
      audio.play();
      showElementById("pause");
      hideElementById("play");
    } else {
      audio.pause();
      showElementById("play");
      hideElementById("pause");
    }
  }

  //load img title desc
  function loadSongData() {
    img.src = musics[currentIndex].img;
    title.innerText = musics[currentIndex].name;
    desc.innerText = musics[currentIndex].description;
  }
  loadSongData();

  playBtn.addEventListener("click", playMusic);

  nextSong.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % musics.length;
    let nextSong = musics[currentIndex].song;
    audio.src = nextSong;
    audio.load();

    // check audio play or not
    let pauseState = playBtn.firstElementChild.classList.contains("hidden");
    if (pauseState) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  prevSong.addEventListener("click", function (e) {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = musics.length - 1;
    }
    let prevSong = musics[currentIndex].song;
    audio.src = prevSong;
    audio.load();

    // check audio play or not
    let pauseState = playBtn.firstElementChild.classList.contains("hidden");
    if (pauseState) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  function musicDurationChange(e) {
    musicProgress.value = audio.currentTime;
    const currentT = Math.round(audio.currentTime);
    let second = currentT % 60;
    let min = Math.floor(currentT / 60);
    startSecond.innerText = second.toString().padStart(2, 0);
    startMin.innerText = min.toString().padStart(2, 0);
  }
  audio.addEventListener("timeupdate", musicDurationChange);

  // handle progress input type range
  musicProgress.addEventListener("input", (e) => {
    e.preventDefault();
    audio.currentTime = e.target.value;
  });

  function updateMusicEndTime(e) {
    const timeObj = convertSecToMin(Math.round(audio.duration));
    endMin.innerText = timeObj.min.toString().padStart(2, 0);
    endSecond.innerText = timeObj.leftSec.toString().padStart(2, 0);
    musicProgress.max = Math.round(audio.duration);
  }
  audio.onloadedmetadata = updateMusicEndTime;

  function convertSecToMin(sec) {
    let min = Math.floor(sec / 60);
    let leftSec = sec - min * 60;
    return { min, leftSec };
  }

  //handle music end event
  audio.addEventListener("ended", () => {
    showElementById("play");
    hideElementById("pause");
  });

  // handle arrowRight and arrowLeft key
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      let musicCurrentTime = Math.round(audio.currentTime);
      let musicUpdatedTime = musicCurrentTime + 5;
      audio.currentTime = musicUpdatedTime;
    } else if (e.key === "ArrowLeft") {
      let musicCurrentTime = Math.floor(audio.currentTime);
      let musicUpdatedTime = musicCurrentTime - 5;
      audio.currentTime = musicUpdatedTime;
    }
  });
}
