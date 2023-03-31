const toggleBtn = document.querySelector('.navbar__toogleBtn');
const menu = document.querySelector('.navbar__menu');
const loginBox = document.querySelector('.navbar__account');


toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    loginBox.classList.toggle('active');
});