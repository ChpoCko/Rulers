import server_back from './auth.js';
import { blueAlert, redAlert } from './alert.js';

const server = new server_back();

const logSignHeaderBtns = document.querySelectorAll(`.log-sign-btn`);
const accItems = document.querySelectorAll(`.account-item`);
const accGemsAmountEl = document.querySelector(`.gems-amount-icon`);
const userGems = document.querySelector(`.user-gems-amount`);

const openSignupModalButtons = document.querySelectorAll('[data-modal-target]');
const closeSignupModalButtons = document.querySelectorAll(
  '[data-signup-close-button]'
);
const openLoginModalButtons = document.querySelectorAll('[data-modal-target]');
const closeLoginModalButtons = document.querySelectorAll(
  '[data-login-close-button]'
);

const overlayLogSignModal = document.getElementById('signup-modal-overlay');

// Functions to open the signup/login modals
openSignupModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModalLogSign(modal);
  });
});

openLoginModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModalLogSign(modal);
  });
});

// Functions to close signup/login modals from button ands overlay

closeSignupModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.signup-modal-content');
    closeModalLogSign(modal);
    clearSignUp();
  });
});

closeLoginModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.login-modal-content');
    closeModalLogSign(modal);
    clearLogin();
  });
});

overlayLogSignModal.addEventListener('click', () => {
  const modals = document.querySelectorAll('.signup-modal-content.active');
  modals.forEach(modal => {
    closeModalLogSign(modal);
    clearSignUp();
  });
});

overlayLogSignModal.addEventListener('click', () => {
  const modals = document.querySelectorAll('.login-modal-content.active');
  modals.forEach(modal => {
    closeModalLogSign(modal);
    clearLogin();
  });
});

function openModalLogSign(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlayLogSignModal.classList.add('active');
}

function closeModalLogSign(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlayLogSignModal.classList.remove('active');
}

function clearSignUp() {
  const usernameInput = document.getElementById('signup-modal-username');
  usernameInput.value = '';
  const passInput = document.getElementById('signup-modal-password');
  passInput.value = '';
}

function clearLogin() {
  const usernameInput = document.getElementById('login-modal-username');
  usernameInput.value = '';
  const passInput = document.getElementById('login-modal-password');
  passInput.value = '';
}

// Showpassword global function
function showPassword(password) {
  if (password.type === 'password') {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
}

// SIGNUP SHOW PASSWORD
const showPasswordSignup = document.getElementById('signup-modal-showPassword');

showPasswordSignup.addEventListener('click', () => {
  const passStatus = document.getElementById('signup-modal-password');
  showPassword(passStatus);
});

// LOGIN SHOW PASSWORD

const showPasswordLogin = document.getElementById('login-modal-showPassword');

showPasswordLogin.addEventListener('click', () => {
  const passStatus = document.getElementById('login-modal-password');
  showPassword(passStatus);
});

//Open login from the signup modal
function closeModalLink(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
}

function openModalLink(modal) {
  if (modal == null) return;
  modal.classList.add('active');
}

const alreadyAcc = document.getElementById('modal-login-link');

alreadyAcc.addEventListener('click', () => {
  const openLogin = document.querySelector(alreadyAcc.dataset.modalTarget);
  const closeSignup = document.querySelector('.signup-modal-content');
  closeModalLink(closeSignup);
  openModalLink(openLogin);
});

// Open Signup from Login
const registerHere = document.getElementById('modal-register-link');

registerHere.addEventListener('click', () => {
  const openRegister = document.querySelector(registerHere.dataset.modalTarget);
  const closeLogin = document.querySelector('.login-modal-content');
  closeModalLink(closeLogin);
  openModalLink(openRegister);
});

server.renderUserGems(userGems);
server.renderUserState(logSignHeaderBtns, accItems, accGemsAmountEl);

// ****************** SIGNUP FUNCTION ******************

const signupform = document.querySelector('.signup-form');

const signUpUrl = `${server.BACKEND_URL}/api/user/sign-up`;

signupform.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');

  //Alert if username or password is empty
  if (!username || !password) {

    redAlert('Please enter both an username and a password.');

    return;
  } else if (password.length < 4) {
    //Alert password is too short
    redAlert('Password must be at least 4 characters long.');

    return;
  }

  const data = { username, password };

  try {
    const response = await fetch(signUpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      blueAlert('Signup successful! Welcome to Rulers.');

      //close modal and empty
      const modal = document.querySelector('.signup-modal-content');
      closeModalLogSign(modal);
      clearSignUp();

      //If the user already exists
    } else if (
      result.error.includes(
        'duplicate key value violates unique constraint "users_username_key"'
      )
    ) {
      redAlert('Username is already in use. Please choose another username.');
    } else {
      alert(`Please try again. Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

/* ////////////////////////////////// */
/* LOG IN FUNCTION */
/* ////////////////////////////////// */

const LogInURL = `${server.BACKEND_URL}/api/user/login`;

const logInForm = document.querySelector('.login-form');

logInForm.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');

  console.log(username, password);
  //Alert if username or password is empty
  if (!username || !password) {
    redAlert('Please enter both a username and password.');
    return;
  }

  const data = { username, password };

  const response = await fetch(LogInURL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (result.error) {
    return redAlert(result.error);
  }

  location.reload();

  // close and clear login modal
  const modal = document.querySelector('.login-modal-content');
  closeModalLogSign(modal);
  clearLogin();
});
