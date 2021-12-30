const list = document.querySelector(".list");
const gallery = document.querySelector(".gallery");
const filterTypes = document.querySelector(".types");
const vehicleTypes = [];

const initialFilterState = { search: "", types: [] };

const filterState = new State(initialFilterState, (state, prev) => {
  showVehicles(state);
  showSearchResult(state);
});

showVehicles(filterState.state);
showTypesList();

const resultCount = document.createElement("span");
const resultCountClass = "result";
resultCount.classList.add(resultCountClass);
function showSearchResult(state) {
  const { search, types } = state;
  const element = gallery.querySelector(`.${resultCountClass}`);
  const count = list.childElementCount;
  if (!count) {
    list.innerHTML = ` 
    <div class="notFound">
      <i class= "fas fa-exclamation-triangle"></i>
      <p class="notFound__intro">We looked high and low, but…</p>
      <p class="notFound__term">"tester" isn't here!</p>
    </div>
  `;
  }
  if ((!search && !types.length) || !count) {
    if (element) gallery.removeChild(element);
    return;
  }
  gallery.insertBefore(resultCount, list);
  resultCount.innerText = `${count} vehicles found`;
}

function showVehicles(state) {
  const newList = document.createElement("div");
  let { types, search } = state;
  search = search.trim().toLowerCase();
  Object.entries(vehicles).forEach(([type, list]) => {
    vehicleTypes.push(type);
    list.forEach((item) => {
      const { name, model } = item;
      const isChosenType = !types.length || types.includes(type);
      const isSearchedFor =
        !search ||
        name.toLowerCase().includes(search) ||
        model.toLowerCase().includes(search);
      const isVisible = isSearchedFor && isChosenType;
      if (!isVisible) return;
      newList.appendChild(buildCarElement({ ...item, type }));
    });
  });
  list.innerHTML = newList.innerHTML;
}

function showTypesList() {
  vehicleTypes.forEach((type) => {
    const span = document.createElement("span");
    span.classList.add("type");
    span.innerText = type === "edc" ? "engin de chantier" : type;
    span.addEventListener("click", () => {
      const { state } = filterState;
      const { types } = state;
      const hasType = types.includes(type);
      if (hasType) {
        filterState.state = {
          ...state,
          types: state.types.filter((t) => t !== type),
        };
        span.classList.remove("type--active");
      } else {
        filterState.state = { ...state, types: [...types, type] };
        span.classList.add("type--active");
      }
    });
    filterTypes.appendChild(span);
  });
}

function buildCarElement(data) {
  const { model, name, type } = data;
  const div = document.createElement("div");
  const imgLink = `${model} ${name}`.replace(/\s+/g, "_").toUpperCase();
  div.innerHTML = `
            <div class="preview">
              <img src="assets/vehicles/${imgLink}.png" alt="${model} ${name}"/>
            </div>
            <p class="type">${model}</p>
            <p class="name">${name}</p>
            <p class="price">${allTypes[type].pricePerDay}£/day</p>
            <a href="#" class="fetch">book now</a>
`;
  div.classList.add("car", "car--card");
  return div;
}

// event listeners

const searchInput = document.querySelector(".gallery__search input");
searchInput.addEventListener("input", (e) => {
  const search = e.target.value;
  filterState.state = { ...filterState.state, search };
});

const toggleSearchFocused = () => {
  searchInput.parentElement.classList.toggle("gallery__search--focused");
};
searchInput.addEventListener("focus", toggleSearchFocused);
searchInput.addEventListener("blur", toggleSearchFocused);
