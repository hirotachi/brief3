const search = document.location.search;
const id = new URLSearchParams(search).get("id") ?? 0;

const reserve = document.querySelector(".reserve");
const infoType = reserve.querySelector(".info__type");
const infoName = reserve.querySelector(".info__name");
const infoImg = reserve.querySelector(".info__preview img");

const startDateInput = document.querySelector("#start");
const endDateInput = document.querySelector("#end");

const fuel = document.querySelector(".fuel");

const { type, model, name } = vehiclesArr[id] ?? vehiclesArr[0];
const img = `${model} ${name}`.replace(/\s+/g, "_").toUpperCase();

infoName.textContent = name;
infoType.textContent = `${type} - ${model}`;
infoImg.src = `assets/vehicles/${img}.png`;
infoImg.alt = `${model} ${name}`;

const fuelTypes = ["electric", "essence", "diesel", "hybrid"];
const vehicleType = allTypes[type];
const fuelSelect = document.createElement("select");
const availableOptions = fuelTypes.filter((t) => vehicleType[t]);
fuelSelect.disabled = availableOptions.length <= 1;

const sumFuelData = document.querySelector(".fuelType .data");
const sumPricePerDayData = document.querySelector(".price .data");
const sumTransmissionData = document.querySelector(".transmission .data");
const sumDurationData = document.querySelector(".duration .data");
const sumTotalData = document.querySelector(".total .data");

const checkoutState = new State(
  {
    fuel: availableOptions[0],
    duration: 1,
    startDate: new Date(),
    endDate: getAfterDays(new Date(), 1),
  },
  handleStateChange
);
handleStateChange(checkoutState.state);

function handleStateChange(state) {
  setEndDate(state);
  checkoutState.state.duration = diffInDays(state.startDate, state.endDate);
  const { duration, fuel } = state;
  const price = vehicleType.pricePerDay;
  function getPercentage(keyName) {
    return optionsPercentage[keyName] ?? 0;
  }
  function calcPercentage(keyName) {
    return (price * getPercentage(keyName)) / 100;
  }
  const transmission = vehicleType.manual ? "manual" : "automatic";
  const transBonus = calcPercentage(transmission);
  const fuelBonus = calcPercentage(fuel);
  const total = duration * (price + transBonus + fuelBonus);
  //   change summary text to indicate new stuff
  sumFuelData.textContent = fuel;
  sumDurationData.textContent = `${duration} days`;
  sumPricePerDayData.textContent = `${price}£`;
  sumTransmissionData.textContent = transmission;
  sumTotalData.textContent = `${total.toFixed(2)}£`;
}

function getAfterDays(date, days = 1) {
  const copy = new Date(date);
  return new Date(copy.setHours(copy.getHours() + days * 24));
}

// duration handlers

startDateInput.min = parseDate(checkoutState.state.startDate);
startDateInput.value = parseDate(checkoutState.state.startDate);
endDateInput.value = parseDate(checkoutState.state.endDate);

function setEndDate(state) {
  const { startDate, endDate } = state;
  if (!startDate || !endDate) return;
  const nextDay = getAfterDays(startDate);
  const date = parseDate(nextDay);
  endDateInput.min = date;
  if (parseDate(endDate) > parseDate(startDate)) return;
  endDateInput.value = date;
  checkoutState.state.endDate = nextDay;
}

// fuel handlers

availableOptions.forEach((o) => {
  const option = document.createElement("option");
  option.value = o;
  option.textContent = o;
  fuelSelect.appendChild(option);
});
fuelSelect.addEventListener("change", (e) => {
  checkoutState.state = { ...checkoutState.state, fuel: e.target.value };
});
fuel.appendChild(fuelSelect);

// events listeners
const handleDateChange = (e) => {
  checkoutState.state = {
    ...checkoutState.state,
    [e.target.name]: e.target.valueAsDate,
  };
};
startDateInput.addEventListener("input", handleDateChange);
endDateInput.addEventListener("input", handleDateChange);
