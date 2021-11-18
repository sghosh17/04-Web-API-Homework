var startEl = document.querySelector("#start");
var questionEl = document.querySelector("#qz-question");
var optionEl = document.querySelector("#opt-list");
var outcomeEl = document.querySelector("#outcome");
var timer = 20;
var set_interval;
var score = 0;

startEl.addEventListener("click", function (event) {
  var infoEl = startEl.closest(".info_box");
  infoEl.classList.remove("visible");
  infoEl.classList.add("hidden");

  var nextinfoEl = infoEl.nextElementSibling;
  nextinfoEl.classList.remove("hidden");
  nextinfoEl.classList.add("visible");

  display = document.querySelector("#time");
  startTimer(display);
  displayQuestions();
});

// Timer
function startTimer(display) {
  var minutes, displayedMinutes;
  var seconds, displayedSeconds;
  set_interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    displayedMinutes = minutes < 10 ? "0" + minutes : minutes;
    displayedSeconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = displayedMinutes + ":" + displayedSeconds;

    if (--timer < 0) {
      outcomeEl.textContent = "Time out...GAME OVER";
      clearInterval(set_interval);
    }
  }, 1000);
}

// Create an  array of questions
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title:
      "There are 3 different ways in which a JavaScript code can be involved in an HTML file. Selct the one that's not correct.",
    choices: ["Inline", "Import", "External", "Internal"],
    answer: "Import",
  },
  {
    title: "How to create an array in js ?",
    choices: ["var A[]=", "var A{}=", "var A=[]", "var A={}"],

    answer: "var A=[]",
  },
  {
    title:
      "HTML element that can be accessed in a Javascript code: Chose the one that will return an array of elements",
    choices: [
      "getElementById(‘idname’)",
      "getElementsByClass(‘classname’)",
      "getElementsByTagName(‘tagname’)",
      "querySelectorAll()",
    ],
    answer: "querySelectorAll()",
  },
];

/**Create next questions to be added to the HTML document dynamically*/
var i = 0;
function displayQuestions() {
  var holdquestion = questions[i].title;
  questionEl.textContent = holdquestion;
  var holdChoice1 = questions[i].choices[0];
  var holdChoice2 = questions[i].choices[1];
  var holdChoice3 = questions[i].choices[2];
  var holdChoice4 = questions[i].choices[3];

  optionEl.innerHTML = "";

  var btn1 = document.createElement("button");
  btn1.setAttribute("class", "info option");
  btn1.textContent = holdChoice1;
  optionEl.appendChild(btn1);

  var btn2 = document.createElement("button");
  btn2.setAttribute("class", "info option");
  btn2.textContent = holdChoice2;
  optionEl.appendChild(btn2);

  var btn3 = document.createElement("button");
  btn3.setAttribute("class", "info option");
  btn3.textContent = holdChoice3;
  optionEl.appendChild(btn3);

  var btn4 = document.createElement("button");
  btn4.setAttribute("class", "info option");
  btn4.textContent = holdChoice4;
  optionEl.appendChild(btn4);

  var allBtnEl = document.querySelectorAll(".info");
  allBtnEl.forEach(function (event) {
    event.addEventListener("click", onclickHandler);
  });
}

var i = 0;
function onclickHandler(event) {
  if (timer <= 0) {
    clearInterval(set_interval);
    outcomeEl.textContent = "Time out...GAME OVER";
    //displayResult();
  }

  var answerText = event.target.textContent;

  if (answerText === questions[i].answer) {
    timer = timer;
    score = score + 5;
    outcomeEl.setAttribute("style", "color: green");
    outcomeEl.textContent = "Correct";
  } else {
    outcomeEl.setAttribute("style", "color: red");
    outcomeEl.textContent = "Wrong";
    timer = timer - 3;
  }

  if (i < questions.length - 1) {
    i++;

    setTimeout(function () {
      displayQuestions();
      outcomeEl.textContent = "";
    }, 1000);
  } else {
    setTimeout(function () {
      outcomeEl.textContent = "";
      questionEl.textContent = "";
      var head2 = document.createElement("h2");
      head2.setAttribute("style", "color: red");
      head2.textContent = "All Done!";
      questionEl.appendChild(head2);

      displayoutput();
      clearInterval(set_interval);
    }, 500);
  }
}

function displayoutput() {
  optionEl.innerHTML = "";

  var head3 = document.createElement("h3");
  head3.setAttribute("style", "color: red");
  head3.textContent = "Your Score:" + " " + score;
  optionEl.appendChild(head3);

  var head4 = document.createElement("h4");
  head4.setAttribute("style", "color: black");
  head4.textContent = "Type your initials: ";
  optionEl.appendChild(head4);

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  optionEl.appendChild(input);

  var btn1 = document.createElement("button");
  btn1.setAttribute("class", "info option");
  btn1.textContent = "Submit";
  optionEl.appendChild(btn1);

  btn1.addEventListener("click", function () {
    localStorage.setItem("Initial", input.value);
    localStorage.setItem("Score", score);
    renderMessage();
  });
}

function renderMessage() {
  var Initial = localStorage.getItem("Initial");
  var Score = localStorage.getItem("Score");

  questionEl.innerHTML = "";
  optionEl.innerHTML = "";

  var head2 = document.createElement("h2");
  head2.setAttribute("style", "color: red");
  head2.textContent = "Highscore";
  questionEl.appendChild(head2);

  var head3 = document.createElement("h3");
  head3.setAttribute("style", "color: red");
  head3.textContent = Initial + "   " + Score;
  optionEl.appendChild(head3);

  var back = document.createElement("button");
  back.setAttribute("class", "info option");
  back.textContent = " Go Back";
  optionEl.appendChild(back);

  var cl_score = document.createElement("button");
  cl_score.setAttribute("class", "info option");
  cl_score.textContent = " Clear Highscore";
  optionEl.appendChild(cl_score);

  back.addEventListener("click", function () {
    location.reload();
  });

  cl_score.addEventListener("click", function () {
    localStorage.clear();
    head3.textContent = "";
  });
}
