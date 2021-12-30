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

const optionsPercentage = {
  electric: 5,
  hybrid: 9,
  essence: 14,
  diesel: 21,
  automatic: 19,
};

const types = {
  compact: {
    manual: true,
    essence: true,
    hybrid: true,
    diesel: true,
    pricePerDay: 14,
  },
  berline: {
    automatic: true,
    essence: true,
    hybrid: true,
    diesel: true,
    pricePerDay: 20,
  },
  citadine: {
    manual: true,
    electric: true,
    essence: true,
    hybrid: true,
    diesel: true,
    pricePerDay: 12,
  },
  moto: { electric: true, essence: true, pricePerDay: 10 },
  camion: { automatic: true, diesel: true, pricePerDay: 250 },
  edc: {
    manual: true,
    essence: true,
    diesel: true,
    pricePerDay: 900,
  },
  utilitaire: { manual: true, diesel: true, pricePerDay: 16 },
};

// vehicles collections
const moto = [
  { name: "AEROX", model: "YAMAHA" },
  { name: "DACO", model: "BMW" },
];
const berline = [{ name: "corola le berline", model: "toyota" }];
const compact = [{ name: "civic", model: "honda" }];
const edc = [{ name: "volvo", model: "mac" }];
const camion = [{ name: "volvo", model: "cam" }];
const utilitaire = [{ name: "renault", model: "van" }];
const citadine = [
  { name: "500e cabriolet", model: "fiat" },
  { name: "A1 Sportback", model: "AUDI" },
];

const vehicles = {
  moto,
  citadine,
  compact,
  berline,
  edc,
  camion,
  utilitaire,
};
