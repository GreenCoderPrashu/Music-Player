const Songs = [
    {
        Title: "Adiga Adiga",
        Artist: "Sid Sriram",
        src: "assets/songs/1.mp3",
        Cover: "assets/cover/1.jpg"
    },
    {
        Title: "Yaakinge",
        Artist: "All Ok",
        src: "assets/songs/2.mp3",
        Cover: "assets/cover/2.jpg"
    },
    {
        Title: "Almost Padipoyinde Pilla",
        Artist: "",
        src: "assets/songs/3.mp3",
        Cover: "assets/cover/3.jpg"
    },
    {
        Title: "Emo Emo Emo",
        Artist: "Sid Sriram",
        src: "assets/songs/4.mp3",
        Cover: "assets/cover/4.jpg"
    },
    {
        Title: "Evarevaro",
        Artist: "",
        src: "assets/songs/5.mp3",
        Cover: "assets/cover/5.jpg"
    },
    {
        Title: "Mayavi",
        Artist: "Sanjith Hegade",
        src: "assets/songs/6.mp3",
        Cover: "assets/cover/6.jpg"
    },
    {
        Title: "Nijame Ne Chaputhuna",
        Artist: "Sid Sriram",
        src: "assets/songs/7.mp3",
        Cover: "assets/cover/7.jpg"
    },
    {
        Title: "Obbane",
        Artist: "Rahul Dit-o",
        src: "assets/songs/8.mp3",
        Cover: "assets/cover/8.jpg"
    },
    {
        Title: "So So Ga",
        Artist: "Sid Sriram",
        src: "assets/songs/9.mp3",
        Cover: "assets/cover/9.webp"
    },
    {
        Title: "Undiporadhe Sad Version",
        Artist: "Sid Sriram",
        src: "assets/songs/10.mp3",
        Cover: "assets/cover/10.webp"
    }
];
let SongIndex = 0;
const Audio = document.getElementById('Audio');
const Cover = document.getElementById('Cover');
const Title = document.getElementById('Title');
const Artist = document.getElementById('Artist');
const PlayBtn = document.getElementById('Play');
const PrevBtn = document.getElementById('Prev');
const NextBtn = document.getElementById('Next');
const Progress = document.getElementById('Progress');
const ProgressContainer = document.getElementById('Progress-Container');
const CurrentTimeEl = document.getElementById('Current');
const DurationEl = document.getElementById('Duration');

//
function LoadSong(Song) {
    Title.textContent = Song.Title;
    Artist.textContent = Song.Artist;
    Audio.src = Song.src;
    Cover.src = Song.Cover;
}
LoadSong(Songs[SongIndex]); 

function PlaySong() {
    Audio.play();
    PlayBtn.textContent = '⏸';
}

function PauseSong() {
    Audio.pause();
    PlayBtn.textContent = '▶';
}

function PrevSong() {
    SongIndex = (SongIndex - 1 + Songs.length) % Songs.length;
    LoadSong(Songs[SongIndex]);
    PlaySong();
}

function NextSong() {
    SongIndex = (SongIndex + 1) % Songs.length;
    LoadSong(Songs[SongIndex]);
    PlaySong();
}

function UpdateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const ProgressPercent = (currentTime / duration) * 100;
    Progress.style.width = `${ProgressPercent}%`; 
    DurationEl.textContent = FormatTime(duration);
    CurrentTimeEl.textContent = FormatTime(currentTime);
}

function SetProgress(e) {
    const Width = this.clientWidth;
    const ClickX = e.offsetX;
    const Duration = Audio.duration;
    Audio.currentTime = (ClickX / Width) * Duration;
}

function FormatTime(time) {
    if (isNaN(time)) return '0:00';
    const Mins = Math.floor(time / 60);
    const Secs = Math.floor(time % 60).toString().padStart(2, '0');
    return `${Mins}:${Secs}`; 
}

PlayBtn.addEventListener('click', () => {
    Audio.paused ? PlaySong() : PauseSong();
});

PrevBtn.addEventListener('click', PrevSong);
NextBtn.addEventListener('click', NextSong);
Audio.addEventListener('timeupdate', UpdateProgress);
Audio.addEventListener('ended', NextSong);
ProgressContainer.addEventListener('click', SetProgress);