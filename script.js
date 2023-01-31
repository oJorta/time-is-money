const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

const time = [hours, minutes, seconds];

const startCounting = document.querySelector("#startButton");
const pause = document.querySelector("#pauseButton");
const stop = document.querySelector("#stopButton");

preventNonIntegers();

startCounting.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputCheck()) {
    startCountdown();
    startCounting.disabled = true;
  }
});

function inputCheck() {
  let valid = true;
  time.forEach((item) => {
    let toInt = parseInt(item.value, 10);

    if (toInt === 0)
        item.value = "00";

    if ((item.id == "minutes" || item.id == "seconds") && (toInt < 0 || toInt > 59)) {
      alert(`Insira um valor entre 0 e 59 no campo de ${item.id}`);
      clearValues();
      valid = false;
    }
  });
  return valid;
}

function startCountdown() {
  const timer = setInterval(() => {
    if (parseInt(seconds.value, 10) || parseInt(hours.value, 10) || parseInt(minutes.value, 10)) {
      if (parseInt(seconds.value, 10)) {
        seconds.value -= 1;
      }

      if (parseInt(minutes.value, 10) && !parseInt(seconds.value, 10)) {
        minutes.value -= 1;
        seconds.value = 59;
      }

      if (parseInt(hours.value, 10) && !parseInt(minutes.value, 10)) {
        hours.value -= 1;
        minutes.value = 59;
        seconds.value = 59;
      }

    } else {
      stopCountdown(timer);
    }
  }, 1000);

  disableInputs();

  pause.addEventListener("click", (e) => {
    e.preventDefault();
    pauseCountdown(timer);
  });

  stop.addEventListener("click", (e) => {
    e.preventDefault();
    stopCountdown(timer);
  });
}

function pauseCountdown(timer) {
  clearInterval(timer);
  startCounting.disabled = false;
}

function stopCountdown(timer) {
  pauseCountdown(timer);
  clearValues();
  enableInputs();
}

function clearValues() {
  hours.value = "";
  minutes.value = "";
  seconds.value = "";
}

function disableInputs() {
  time.forEach((item) => {
    item.disabled = true;
  });
}

function enableInputs() {
  time.forEach((item) => {
    item.disabled = false;
  });
}

function preventNonIntegers() {
  document.querySelectorAll("input").forEach((item) => {
    item.addEventListener("keypress", (e) => {
      if (!(e.charCode >= 48 && e.charCode <= 57)){
        e.preventDefault();
      }
    });
  });
}
