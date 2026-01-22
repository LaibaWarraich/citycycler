const KEY = "citycycler-theme";

export function loadTheme() {
  return localStorage.getItem(KEY) || "light";
}

export function saveTheme(theme) {
  localStorage.setItem(KEY, theme);
}

export function applyTheme(theme) {
  document.body.dataset.theme = theme;
}
