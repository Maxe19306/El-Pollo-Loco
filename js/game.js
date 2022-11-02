let canvas;
let world;
let playMusic = false;
let fullscreenOn = false;



function init() {
    let keyboard = new Keyboard();
    document.getElementById('startimage').style.display = 'none';
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, playMusic);
    RemoveMakerFromButtons();
    HidePlayButton();
}

function HidePlayButton() {
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('restart').classList.add('d-none')
}

/**
 * opne or closes the fullscreen
 * 
 */
function fullscreen() {
    if (!fullscreenOn) {
        let element = document.getElementById('fullscreen');
        enterFullscreen(element);
    } else {
        closeFullscreen();
    }
}
/**
 * checks if the fullscreen active and adjusts images, class and function
 * 
 */
document.addEventListener("fullscreenchange", function() {
    if (document.fullscreenElement) {
        document.getElementById('fullscreenimage').src = 'img/icons/icons8-full-screen-24 (3).png';
        document.getElementById('fullscreen').classList.add('test4');
        fullscreenOn = true;
    } else {
        document.getElementById('fullscreenimage').src = 'img/icons/icons8-full-screen-24 (4).png';
        document.getElementById('fullscreen').classList.remove('test4');
        fullscreenOn = false;
    }
})


/*
document.addEventListener('keyup', function(event) {
    if (fullscreenOn && event.keyCode == 27) {
        closeFullscreen();

        console.log('test')
    }
})

/**
 * closes the fullscreen
 */
function closeFullscreen() {
    exitFullscreen();
}


function musicButton() {

    playMusic = JSON.parse(localStorage.getItem('playMusic'));
    if (playMusic) {
        document.getElementById('music').style = ``;

    } else {
        document.getElementById('music').style = "text-decoration: line-through "
    }
}

/**
 * determines whether music should be played
 */



function musicon() {
    if (playMusic) {
        playMusic = false;
        MusicAddLocalStorage();
        document.getElementById('music').style = "text-decoration: line-through "
    } else {
        playMusic = true;
        MusicAddLocalStorage();
        document.getElementById('music').style = ``;
    }
}

/**
 * music settings is added to the local storage
 */
function MusicAddLocalStorage() {
    let music = JSON.stringify(playMusic)
    localStorage.setItem('playMusic', music)
}

/**
 * opens the explanation for control with keyboard
 */

function openExplanationKeyboard() {
    document.getElementById('ExplanationKeyboard').classList.toggle('Explanation-close');
}


/**
 * opens the explanation for control with buttons
 */
function openExplanationButton() {
    document.getElementById('ExplanationButton').classList.toggle('Explanation-close')
}


/**
 * remove the markers on the buttons. Game would otherwise restart on jump
 */

function RemoveMakerFromButtons() {
    document.getElementById('startButton').addEventListener("keyup", function(event) {
        event.preventDefault()
    });
    document.getElementById('music').addEventListener("keyup", function(event) {
        event.preventDefault()
    });
    document.getElementById('restart').addEventListener("keyup", function(event) {
        event.preventDefault()
    })
}


/**
 * open the Fullscreen
 * 
 * @param {*} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // iOS Safari
        element.webkitRequestFullscreen();
    }
}


/**
 * closes the fullscreen
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}