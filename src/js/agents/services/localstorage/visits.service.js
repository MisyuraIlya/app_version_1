export function chooseAreaLocalStorage(area) {
    localStorage.setItem("area", JSON.stringify(area));
  }

export function fetchAreaLocalStorage() {
    return JSON.parse(localStorage.getItem("area")) || '';
}  