'use strict';

// const new1 = document.querySelectorAll(`.filtering-option--input`);

// new1.forEach(element => {
//   element.addEventListener('input', () => {
//     console.log(element.name);
//   });
// });

const slider = document.querySelector(`.filter-slider`);
const sytleTag = document.querySelector(`.style-for-slider`);
const filterBtn = document.querySelector(`.filter-btn`);
const filterOptionsBox = document.querySelector(`.filtering-options-box`);
const filterInnerSectionBox = document.querySelectorAll(
  '.filter-inner-section'
);

filterBtn.addEventListener('click', () => {
  if (filterOptionsBox.classList.contains('filter-options-hidden')) {
    filterOptionsBox.classList.remove('filter-options-hidden');
  } else {
    filterOptionsBox.style.animation = 'filterReduce 0.6s ease-in';

    filterInnerSectionBox.forEach(innerBox => {
      innerBox.style.animation = 'filterInnerSectionOut 0.2s ease-in';
    });

    setTimeout(() => {
      filterOptionsBox.style.animation = '';
      filterInnerSectionBox.forEach(innerBox => {
        innerBox.style.animation = '';
      });

      filterOptionsBox.classList.add('filter-options-hidden');
    }, 590);
  }
});

slider.addEventListener('input', () => {
  sytleTag.innerHTML = `.filter-slider::after {content: '${slider.value}';z-index: 3;heigth: 6px;}`;
});
