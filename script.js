'use strict';

const container = document.querySelector('.container');
const fillSize = document.querySelector('.size');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');
const modes = document.querySelector('#color-mode');
const color = document.querySelector('#colorPicker');
const sound = document.querySelector('audio.typewriter');

// Store user latest input
// Default value
let latestUserSizeNum = 16;
let userSelectMode = 'single';

// Define box value in order to add box color
let allBox;

// Color Mode
const selectMode = function (mode) {
  // For rainbow mode
  const randomRgb = function () {
    const numR = Math.trunc(Math.random() * 255);
    const numG = Math.trunc(Math.random() * 255);
    const numB = Math.trunc(Math.random() * 255);
    return `rgb(${numR}, ${numG}, ${numB})`;
  };

  // Set mode condition
  if (mode === 'single') {
    allBox.forEach(el => {
      el.addEventListener(
        'mouseover',
        () => (el.style.backgroundColor = `${color.value}`)
      );
    });
  } else if (mode === 'rainbow') {
    allBox.forEach(el => {
      el.addEventListener(
        'mouseover',
        () => (el.style.backgroundColor = randomRgb())
      );
    });
  }
};

// Set grid dimension
const createGrid = function (size = latestUserSizeNum, mode = userSelectMode) {
  // Clear container
  container.innerHTML = '';

  // Build grid
  // Dimension depends on size
  for (let i = 0; i < size; i++) {
    // Create row
    const row = document.createElement('div');
    row.classList.add('row');
    // Adjusting grid size
    row.style.height = `${100 / size}%`;

    // Create box inside per row
    for (let j = 0; j < size; j++) {
      const box = document.createElement('div');
      box.classList.add('box');
      row.appendChild(box);
    }
    container.appendChild(row);
  }

  // Send the value outside the function
  allBox = document.querySelectorAll('.box');

  // Set mode condition
  selectMode(mode);
};
createGrid(16); // First play

// Return grid Size value
const calcSize = function (e, num = e.target.value) {
  e.preventDefault();
  latestUserSizeNum = num;
  return createGrid(num);
};

// Add event Listener on input box
fillSize.addEventListener('change', calcSize);

// Add event Listener on submit and link with input box
const submitInput = function (e) {
  if (e) {
    e.preventDefault();
    if (fillSize.value === '') {
      calcSize(e, 16);
    } else {
      calcSize(e, fillSize.value);
    }
    fillSize.value = '';
  }
};
submitBtn.addEventListener('click', submitInput);

// Reset grid without animation effect
const resetGrid = function (e) {
  e.preventDefault();
  createGrid();
  fillSize.value = '';
};
resetBtn.addEventListener('click', resetGrid);

// Add event listener on modes
modes.addEventListener('change', e => {
  userSelectMode = e.target.value;
  selectMode(userSelectMode);
});

sound.play();
sound.play();
sound.play();
sound.play();
// Add sound on animation
let i = 0;
if ((i = 0)) {
  setTimeout(function () {
    sound.currentTime = 0;
    sound.play();
  }, 5000);
} else if ((i = 11)) {
  audio.pause();
} else {
  sound.currentTime = 0;
  sound.play();
}
for (let i = 0; i < 11; i++) {
  if ((i = 0)) {
    setTimeout(() => sound.play(), 5000);
  } else {
    sound.play();
  }
}
