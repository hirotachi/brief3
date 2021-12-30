const search = document.location.search;
const id = new URLSearchParams(search).get("id");

const reserve = document.querySelector(".reserve");

if (id) {
  const { type, model, name } = vehiclesArr[id];
  reserve.textContent = `this is page for ${id} vehicle ${type} - ${model} - ${name}`;
}
