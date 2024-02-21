const musics = [
  {
    name: "unhealthy",
    description: "Anne-Marie, Shania Twain",
    img: "../images/img1.jpg",
    song: "../audio/song.mp3",
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
  {
    name: "work from home",
    description: "fifth harmony, ty dolla $sing",
    img: "../images/img6.jpg",
    song: "../audio/song6.mp3",
  },
  // {
  //   name: "unhealthy",
  //   description: "Anne-Marie, Shania Twain",
  //   img: "../images/img1.jpg",
  // },
  // {
  //   name: "unhealthy",
  //   description: "Anne-Marie, Shania Twain",
  //   img: "../images/img1.jpg",
  // },
  // {
  //   name: "unhealthy",
  //   description: "Anne-Marie, Shania Twain",
  //   img: "../images/img1.jpg",
  // },
];

window.onload = () => {
  main();
};
//global
const audio = new Audio("../audio/song.mp3");
const id = (id) => document.getElementById(id);

function main() {
  const playBtn = id("play-btn");
  const musicProgress = id("music-progress");
  const startSecond = id("start-second");
  const startMin = id("start-min");
  const endSecond = id("end-second");
  const endMin = id("end-min");

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
  playBtn.addEventListener("click", playMusic);

  // change music range value
  musicProgress.max = Math.round(audio.duration);

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

  function updateMusicEndTime() {
    const timeObj = convertSecToMin(Math.round(audio.duration));
    endMin.innerText = timeObj.min.toString().padStart(2, 0);
    endSecond.innerText = timeObj.leftSec.toString().padStart(2, 0);
  }
  updateMusicEndTime();

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
