'use strict';

const signUpBtn = document.querySelector(`.signup`);
const logInBtn = document.querySelector(`.login`);
const accountBtn = document.querySelector(`.account`);

const menuBtn = document.querySelector(`.menu-icon`);
const menuPopup = document.querySelector(`.header__menu-popup`);
const menuItemBtns = document.querySelectorAll(`.header__menu--item`);
const menuPageLink = document.querySelectorAll(`.menu-page-link`);

//Function on account icon button click
const accClick = () => {
  accountBtn.addEventListener('click', () => {
    // if signup and login contain hidden class > remove it and start animation to left
    if (
      logInBtn.classList.contains(`header-btn-hidden`) &&
      signUpBtn.classList.contains(`header-btn-hidden`)
    ) {
      logInBtn.classList.remove(`header-btn-hidden`);
      signUpBtn.classList.remove(`header-btn-hidden`);
      signUpBtn.classList.add(`toLeftL`);
      logInBtn.classList.add(`toLeftS`);
    } else {
      // if signup and login do not contain hidden class > add it, remove left animation class and
      // start animation to right
      signUpBtn.classList.remove(`toLeftL`);
      logInBtn.classList.remove(`toLeftS`);
      logInBtn.style.animation = `toRightS 0.8s ease-in`;
      signUpBtn.style.animation = `toRightL 0.8s ease-in`;
      // After animation run (a little bit earlier), remove any animation style and add hidden class
      setTimeout(() => {
        logInBtn.style.animation = ``;
        signUpBtn.style.animation = ``;
        logInBtn.classList.add(`header-btn-hidden`);
        signUpBtn.classList.add(`header-btn-hidden`);
      }, 790);
    }
  });
};
accClick(); //Call this function if user is NOT logged in

// This function to hide a menu
const hideMenu = () => {
  console.log(`Menu hidden`);
  menuPopup.style.animation = `menuReduce 0.8s ease-in`;
  menuPopup.classList.remove(`menuExpand`);
  menuItemBtns.forEach(menuItem => {
    menuItem.classList.remove(`menuItemToRight`);
  });
  menuItemBtns.forEach(menuItem => {
    menuItem.style.animation = 'menuItemToLeft 0.8s ease-in';
  });
  setTimeout(() => {
    menuItemBtns.forEach(menuItem => {
      menuItem.style.animation = ``;
    });
    menuPopup.style.animation = ``;
    menuPopup.classList.add(`no-display`);
  }, 790);
};

const openMenu = () => {
  menuPopup.classList.remove(`no-display`);
  menuPopup.classList.add(`menuExpand`);

  menuItemBtns.forEach(menuItem => {
    menuItem.classList.add(`menuItemToRight`);
  });
  console.log(`Menu opened`);
};

window.onclick = function (event) {
  if (event.target.matches(`.menu-icon`)) {
    if (menuPopup.classList.contains(`no-display`)) {
      openMenu();
    } else {
      hideMenu();
    }
  } else {
    hideMenu();
  }
};

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (
    prevScrollpos !== currentScrollPos &&
    !menuPopup.classList.contains(`no-display`)
  ) {
    hideMenu();
  }
  prevScrollpos = currentScrollPos;
};

// class Header {
//   accBtn;
//   menuBtn2;
//   constructor(accBtn, menuButton) {
//     this.accBtn = accBtn;
//     this.menuBtn2 = menuButton;
//   }
// }

// const header = new Header(accountBtn, menuBtn);

// console.log(header.accBtn);
