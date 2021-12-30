const initialFilterState = { search: "", types: [] };
const filterState = new State(initialFilterState, (state, prev) => {
  showVehicles(state);
});
const list = document.querySelector(".list");

showVehicles(filterState.state);

function showVehicles(state) {
  const tester = document.createElement("div");
  let { types, search } = state;
  search = search.trim().toLowerCase();
  Object.entries(vehicles).forEach(([type, list]) => {
    list.forEach((item) => {
      const { name, model } = item;
      const isSearchedFor =
        !search ||
        name.toLowerCase().includes(search) ||
        model.toLowerCase().includes(search);
      const isVisible = isSearchedFor;
      if (!isVisible) return;
      const div = document.createElement("div");
      div.innerHTML = `${type} - ${model} - ${name}`;
      tester.appendChild(div);
    });
  });
  list.innerHTML = tester.innerHTML;
}

const searchInput = document.querySelector(".search input");
searchInput.addEventListener("input", (e) => {
  const search = e.target.value;
  filterState.state = { ...filterState.state, search };
});
