const search = document.location.search;
const id = new URLSearchParams(search).get("id") ?? 0;

const reserve = document.querySelector(".reserve");
const infoType = reserve.querySelector(".info__type");
const infoName = reserve.querySelector(".info__name");
const infoImg = reserve.querySelector(".info__preview img");

const { type, model, name } = vehiclesArr[id] ?? vehiclesArr[0];
const img = `${model} ${name}`.replace(/\s+/g, "_").toUpperCase();

infoName.textContent = name;
infoType.textContent = `${type} - ${model}`;
infoImg.src = `assets/vehicles/${img}.png`;
infoImg.alt = `${model} ${name}`;

const inputs = document.querySelector(".inputs");

const checkoutState = new State({
  fuel: undefined,
  gearBox: undefined,
  duration: 1,
});

// build fuel select
// build gear box options
// duration input
