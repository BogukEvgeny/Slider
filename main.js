const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const leftBtn = document.querySelector('.left-button');
const rightBtn = document.querySelector('.right-button');
const sidebar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');
const slideCount = mainSlide.querySelectorAll('div').length;
const container = document.querySelector('.container');
const sideSlideRock = document.querySelector('.side-slide-rock');
const sideSlideDog = document.querySelector('.side-slide-dog');
const sideSlideCat = document.querySelector('.side-slide-cat');

// Array to easily access slides by index
const sidesSlides = [sideSlideCat, sideSlideDog, sideSlideRock];

let verticalIndex = 0;
let horizontalIndexes = [0, 0, 0]; // Track horizontal position for each vertical slide

// Scrolling effect 
sidebar.style.top = `-${(slideCount - 1) * 100}vh`;

//Reaction for click on the buttons
upBtn.addEventListener('click', () => {
    changeSlide('up');
});

downBtn.addEventListener('click', () => {
    changeSlide('down');
});

leftBtn.addEventListener('click', () => {
    changeSlide('left');
});

rightBtn.addEventListener('click', () => {
    changeSlide('right');
});

//Function for changing slides
function changeSlide(direction) {
    if (direction === 'down') { 
        verticalIndex++;
        if (verticalIndex === slideCount) {
            verticalIndex = 0;
        }
    } else if (direction === 'up') {
        verticalIndex--;
        if (verticalIndex < 0) {
            verticalIndex = slideCount - 1;
        }
    } else if (direction === 'left') {
        horizontalIndexes[verticalIndex]--;
        if (horizontalIndexes[verticalIndex] < 0) {
            horizontalIndexes[verticalIndex] = 3;
        }
    } else if (direction === 'right') {
        horizontalIndexes[verticalIndex]++;
        if (horizontalIndexes[verticalIndex] > 3) {
            horizontalIndexes[verticalIndex] = 0;
        }
    }
    // Getting the screen height and width values
    const height = container.clientHeight;
    const width = container.clientWidth * 0.65;

    // Update main slide and sidebar
    mainSlide.style.transform = `translateY(-${verticalIndex * height}px)`;
    sidebar.style.transform = `translateY(${verticalIndex * height}px)`;

    // Update all horizontal slides
    sidesSlides.forEach((slide, index) => {
        if (index === verticalIndex) {
            slide.style.opacity = '1';
            const translateX = -horizontalIndexes[index] * width;
            slide.style.transform = `translateX(${translateX}px)`;
        } else {
            slide.style.opacity = '0';
        }
    });
}

// Initialize the slider
changeSlide('');

// Adding a reaction to clicking the arrow buttons
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        changeSlide('up');
    } else if (event.key === 'ArrowDown') {
        changeSlide('down');
    } else if (event.key === 'ArrowLeft') {
        changeSlide('left');
    } else if (event.key === 'ArrowRight') {
        changeSlide('right');
    }
});