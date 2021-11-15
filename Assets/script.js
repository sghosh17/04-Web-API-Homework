var startEl = document.querySelector("#start");

startEl.addEventListener("click", function (event) {
  var infoEl = startEl.closest(".info_box");
  infoEl.classList.remove("visible");
  infoEl.classList.add("hidden");

  var nextinfoEl = infoEl.nextElementSibling;
  nextinfoEl.classList.remove("hidden");
  nextinfoEl.classList.add("visible");
});
