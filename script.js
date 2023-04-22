'use strict';

const container = document.querySelector('.container');
const fillSize = document.querySelector('.size');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');

// Set grid dimension
const createGrid = function (size = 16) {
  // Clear container
  container.innerHTML = '';

  // Build grid
  // Dimension depends on size
  for (let i = 0; i < size; i++) {
    // Create row
    const row = document.createElement('div');
    row.classList.add('row');
    // Adjusting grid size
    row.style.cssText = `flex: 1;
    width: 100%;
    height: ${100 / size}%;
    display: flex;
    justify-content: space-evenly;
    gap: 2px;
    row-gap: 2px;`;

    // Create box inside per row
    for (let j = 0; j < size; j++) {
      const div = document.createElement('div');
      div.classList.add('box');
      row.appendChild(div);
    }
    container.appendChild(row);
  }

  // Set hover effect on grid
  const allBox = document.querySelectorAll('.box');

  allBox.forEach(el => {
    el.addEventListener(
      'mousemove',
      () => (el.style.backgroundColor = 'black')
    );
  });
};
createGrid(); // First play

// Return grid Size value
const calcSize = function (e, num = e.target.value) {
  e.preventDefault();
  return createGrid(num);
};

// Add event Listener on input box
fillSize.addEventListener('change', calcSize);

// Add event Listener on submit and link with input box
const submitInput = function (e) {
  if (e) {
    e.preventDefault();
    calcSize(e, fillSize.value);
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
