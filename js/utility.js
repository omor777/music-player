function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

function getInnerText(id) {
  return document.getElementById(id).innerText;
}

function showElementById(id) {
  document.getElementById(id).classList.remove("hidden");
}

function hideElementById(id) {
  document.getElementById(id).classList.add("hidden");
}
