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

const fuel = document.querySelector(".fuel");
const startDateInput = document.querySelector("#start");
const endDateInput = document.querySelector("#end");

const checkoutState = new State(
  {
    fuel: undefined,
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
  //   change summary text to indicate new stuff
}

function getAfterDays(date, days = 1) {
  const copy = new Date(date);
  return new Date(copy.setHours(copy.getHours() + days * 24));
}

startDateInput.min = parseDate(checkoutState.state.startDate);
startDateInput.value = parseDate(checkoutState.state.startDate);

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

// build fuel select
// build gear box options
// duration input

// events listeners
const handleDateChange = (e) => {
  checkoutState.state = {
    ...checkoutState.state,
    [e.target.name]: e.target.valueAsDate,
  };
};
startDateInput.addEventListener("input", handleDateChange);
endDateInput.addEventListener("input", handleDateChange);
