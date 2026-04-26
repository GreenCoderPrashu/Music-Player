const Songs = [
    {
        title: "Adiga Adiga",
        artist: "Sid Sriram",
        src: "Assets/Songs/1.mp3",
        cover: "Assets/Cover/Pic1.jpg"
    },
    {
        title: "Yaakinge",
        artist: "All Ok",
        src: "Assets/Songs/2.mp3",
        cover: "Assets/Cover/Pic2.jpg"
    },
    {
        title: "Almost Padipoyinde Pilla",
        artist: "",
        src: "Assets/Songs/3.mp3",
        cover: "Assets/Cover/Pic3.jpg"
    },
    {
        title: "Emo Emo Emo",
        artist: "Sid Sriram",
        src: "Assets/Songs/4.mp3",
        cover: "Assets/Cover/Pic4.jpg"
    },
    {
        title: "Evarevaro",
        artist: "",
        src: "Assets/Songs/5.mp3",
        cover: "Assets/Cover/Pic5.jpg"
    },
    {
        title: "Mayavi",
        artist: "Sanjith Hegade",
        src: "Assets/Songs/6.mp3",
        cover: "Assets/Cover/Pic6.jpg"
    },
    {
        title: "Nijame Ne Chaputhuna",
        artist: "Sid Sriram",
        src: "Assets/Songs/7.mp3",
        cover: "Assets/Cover/Pic7.jpg"
    },
    {
        title: "Obbane",
        artist: "Rahul Dit-o",
        src: "Assets/Songs/8.mp3",
        cover: "Assets/Cover/Pic8.jpg"
    },
    {
        title: "So So Ga",
        artist: "Sid Sriram",
        src: "Assets/Songs/9.mp3",
        cover: "Assets/Cover/Pic9.jpg"
    },
    {
        title: "Undiporadhe Sad Version",
        artist: "Sid Sriram",
        src: "Assets/Songs/10.mp3",
        cover: "Assets/Cover/Pic10.jpg"
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
    const { Duration, CurrentTime } = e.srcElement;
    const ProgressPercent = (CurrentTime / Duration) * 100;
    Progress.style.width = `${ProgressPercent}%`; 
    DurationEl.textContent = FormatTime(Duration);
    CurrentTimeEl.textContent = FormatTime(CurrentTime);
}

function SetProgress(e) {
    const Width = this.ClientWidth;
    const ClickX = e.OffsetX;
    const Duration = Audio.Duration;
    Audio.CurrentTime = (ClickX / Width) * Duration;
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
Audio.addEventListener('ended', nextSong);
ProgressContainer.addEventListener('click', SetProgress);