const title = document.getElementById("music-name");
const author = document.getElementById("author-name");
const audio = document.querySelector("audio");
const imgAlbum = document.querySelector(".img-album");

const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");

let initTime = document.querySelector(".init");
let finalTime = document.querySelector(".finish");
let progressBar = document.querySelector("progress");

const songsList = [
    {
        path: "./musics/Chuck-Berry-Johnny-B-Good.mp3",
        name: "Johnny B. Good",
        artist: "Chuck Berry",
        img: "./images/chuck.jpg",
    },
    {
        path: "./musics/Creedence-Clearwater-Revival-Susie-Q.mp3",
        name: "Susie Q",
        artist: "Creedence Clearwater Revival",
        img: "./images/creedence.jpg",
    },
    {
        path: "./musics/Dion-The-Belmonts-Runaround-Sue.mp3",
        name: "Runaround Sue",
        artist: "Dion & The Belmonts",
        img: "./images/dion.jpg",
    },
    {
        path: "./musics/The-Beatles-Dont-Let-Me-Down.mp3",
        name: "Don't Let Me Down",
        artist: "The Beatles",
        img: "./images/beatles1.jpg",
    },
    {
        path: "./musics/The-Kinks-Stop-Your-Sobbin.mp3",
        name: "Stop Your Sobbin'",
        artist: "The Kinks",
        img: "./images/kinks.jpg",
    },
    {
        path: "./musics/The-Rolling-Stones-Monkey-Man.mp3",
        name: "Monkey Man",
        artist: "The Rolling Stones",
        img: "./images/rolling-stones.jpg",
    },
    {
        path: "./musics/The-Beatles-Strawberry-Fields-Forever.mp3",
        name: "Strawberry Fields Forever",
        artist: "The Beatles",
        img: "./images/beatles2.jpg",
    },
    {
        path: "./musics/Otis-Redding-Stand-by-Me.mp3",
        name: "Stand by Me",
        artist: "Otis Redding",
        img: "./images/otis.jpg",
    },
    {
        path: "./musics/Dire-Straits-Why-Worry.mp3",
        name: "Why Worry",
        artist: "Dire Straits",
        img: "./images/dire-straits.jpg",
    },
    {
        path: "./musics/Jerry-Lee-Lewis-Be-bop-a-lula.mp3",
        name: "Be-Bop-a-Lula",
        artist: "Jerry Lee Lewis",
        img: "./images/jerry.jpg",
    },
];

const secondsToMinute = (seconds) => {
    let minutesField = Math.floor(seconds / 60);
    let secondsField = seconds % 60;

    minutesField < 10
        ? (minutesField = "0" + minutesField)
        : minutesField;

    secondsField < 10
        ? (secondsField = "0" + secondsField)
        : secondsField;

    return `${minutesField}:${secondsField}`;
};

const duration = () => {
    audio.onloadedmetadata = function () {
        return audio.duration;
    };
};

const updateBar = () => {
    progressBar.style.width =
        Math.floor(
            (audio.currentTime / audio.duration) * 100
        ) + "%";
    initTime.textContent = secondsToMinute(
        Math.floor(audio.currentTime)
    );
};

audio.onloadedmetadata = function () {
    finalTime.textContent = secondsToMinute(
        Math.floor(audio.duration)
    );
};

const playSong = () => {
    audio.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
};

const pauseSong = () => {
    audio.pause();
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";
};

playBtn.addEventListener("click", () => {
    playSong();
});

pauseBtn.addEventListener("click", () => {
    pauseSong();
});

const loadSongs = (songsList) => {
    title.textContent = songsList.name;
    author.textContent = songsList.artist;
    audio.src = songsList.path;
    imgAlbum.src = songsList.img;
};

let i = 1;

const prevSong = () => {
    i--;
    if (i < 0) {
        i = songsList.length - 1;
    }
    loadSongs(songsList[i]);
    playSong();
};

prevBtn.addEventListener("click", prevSong);

const nextSong = () => {
    i++;
    if (i > songsList.length - 1) {
        i = 0;
    }
    loadSongs(songsList[i]);
    playSong();
};

nextBtn.addEventListener("click", nextSong);
loadSongs(songsList[i]);
audio.addEventListener("timeupdate", updateBar);

const bar = document.querySelector(".bar");
bar.addEventListener("click", (ev) => {
    const barWidth = parseInt(
        window.getComputedStyle(bar).width
    );

    const amountComplete =
        (ev.clientX -
            progressBar.getBoundingClientRect().left) /
        barWidth;

    audio.currentTime =
        (audio.duration || 0) * amountComplete;
});
