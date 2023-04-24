'use strict';

const container = document.querySelector('.container');
const fillSize = document.querySelector('.size');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');
const modes = document.getElementById('color-mode');
const color = document.getElementById('colorPicker');
const drawChoice = document.querySelectorAll('input[name="choice"]');
const typewriterAudio = document.getElementById('typewriter');
const clickAudio = document.getElementById('click');

// Store user latest input (Default value)
let latestUserSizeNum = 16;
let userSelectMode = 'single';
let userDrawType = 'hover';

// Define box value in order to add box color
let allBox;

// mouse action
let mousePress = false;
document.body.addEventListener('mousedown', e => {
  e.stopPropagation(); // stop input[type=number] continuously increase
  mousePress = true;
});
document.body.addEventListener('mouseup', e => {
  e.stopPropagation();
  mousePress = false;
});

// Color Mode & Draw Type
const selectMode = function (mode, drawType) {
  // For rainbow mode
  const randomRgb = function () {
    const numR = Math.trunc(Math.random() * 255);
    const numG = Math.trunc(Math.random() * 255);
    const numB = Math.trunc(Math.random() * 255);
    return `rgb(${numR}, ${numG}, ${numB})`;
  };

  // Color mode
  const modeColor = function (mode, e) {
    if (mode === 'single') {
      e.target.style.backgroundColor = `${color.value}`;
    } else if (mode === 'rainbow') {
      e.target.style.backgroundColor = randomRgb();
    } else if (mode === 'erase') {
      e.target.style.backgroundColor = 'rgb(233, 239, 243)';
    }
  };

  // Clear previous Event Listener
  allBox.forEach(el => {
    el.removeEventListener('mouseover', e => {
      if (!mousePress || mousePress) {
        modeColor(mode, e);
      }
    });
  });

  // Draw Type
  if (drawType === 'hover') {
    allBox.forEach(el => {
      el.addEventListener('mouseover', e => {
        if (!mousePress) {
          modeColor(mode, e);
        }
      });
    });
  } else if (drawType === 'press') {
    allBox.forEach(el => {
      el.addEventListener('mouseover', e => {
        if (mousePress) {
          modeColor(mode, e);
        }
      });
    });
  }
};
// Set grid dimension
const createGrid = function (
  size = latestUserSizeNum,
  mode = userSelectMode,
  drawType = userDrawType
) {
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
  selectMode(mode, drawType);
};

createGrid(16); // First play

// Return grid Size value
const calcSize = function (e, num = e.target.value) {
  e.preventDefault();
  latestUserSizeNum = num;
  return createGrid(num, userSelectMode, userDrawType);
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
    typewriterAudio.currentTime = 0;
    typewriterAudio.play();
  }
};
submitBtn.addEventListener('click', submitInput);

// Reset grid without animation effect
const resetGrid = function (e) {
  e.preventDefault();
  createGrid();
  fillSize.value = '';

  typewriterAudio.currentTime = 0;
  typewriterAudio.play();
};
resetBtn.addEventListener('click', resetGrid);

// Add event listener on color modes
modes.addEventListener('change', e => {
  const modeColor = e.target.value;
  userSelectMode = modeColor;

  selectMode(modeColor, userDrawType);

  clickAudio.currentTime = 0;
  clickAudio.play();
});

// Add event listener on draw types
drawChoice.forEach(el => {
  el.addEventListener('change', e => {
    const modeDraw = e.target.value;
    userDrawType = modeDraw;

    createGrid(latestUserSizeNum, userSelectMode, modeDraw);

    clickAudio.currentTime = 0;
    clickAudio.play();
  });
});
