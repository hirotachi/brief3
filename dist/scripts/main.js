console.log("hello world");

// nav handling
const navOpenBtn = document.querySelector(".open");
const navCloseBtn = document.querySelector(".close");
const mobileNav = document.querySelector(".mobile");
const handeNavClick = (e) => {
  mobileNav.classList.toggle("mobile--open");
};

navCloseBtn.addEventListener("click", handeNavClick);
navOpenBtn.addEventListener("click", handeNavClick);
