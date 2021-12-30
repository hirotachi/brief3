const search = document.location.search;
const id = new URLSearchParams(search).get("id") ?? 0;

const reserve = document.querySelector(".reserve");

const { type, model, name } = vehiclesArr[id];
reserve.textContent = `this is page for ${id} vehicle ${type} - ${model} - ${name}`;
