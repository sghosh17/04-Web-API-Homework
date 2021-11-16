var startEl = document.querySelector("#start");

startEl.addEventListener("click", function (event) {
  var infoEl = startEl.closest(".info_box");
  infoEl.classList.remove("visible");
  infoEl.classList.add("hidden");

  var nextinfoEl = infoEl.nextElementSibling;
  nextinfoEl.classList.remove("hidden");
  nextinfoEl.classList.add("visible");

  var max_time = 15;
  display = document.querySelector("#time");
  startTimer(max_time, display);
});

// Timer
function startTimer(duration, display) {
  var timer = duration;
  var minutes, displayedMinutes;
  var seconds, displayedSeconds;
  var set_interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    displayedMinutes = minutes < 10 ? "0" + minutes : minutes;
    displayedSeconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = displayedMinutes + ":" + displayedSeconds;

    if (--timer < 0) {
      timer = duration;
    }

    if (seconds === 0) {
      alert("Game Over!");
      clearInterval(set_interval);
    }
  }, 1000);
}
