let items = document.querySelectorAll(".item");
let currentItem = 0;
/* время для завершение слайда */
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}
function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}
function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}
function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

document.querySelector(".control.left").addEventListener("click", () => {
  if (isEnabled) {
    previousItem(currentItem);
  }
});
function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

document.querySelector(".control.right").addEventListener("click", () => {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

const swipedetect = (el) => {
  let surface = el;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let dist = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowTime = 300;

  surface.addEventListener("mousedown", function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener("mouseup", function (e) {
    e.preventDefault();
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowTime) {
      if (Math.abs(distX) > threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });

  surface.addEventListener("touchstart", function (e) {
    if (
      e.target.classList.contains("arrow") ||
      e.target.classList.contains("control")
    ) {
      if (e.target.classList.contains("left")) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else if (e.target.classList.contains("right")) {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
    let toucObj = e.changedTouches[0];
    startX = toucObj.pageX;
    startY = toucObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });
  surface.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });

  surface.addEventListener("touchend", function (e) {
    e.preventDefault();
    let toucObj = e.changedTouches[0];
    distX = toucObj.pageX - startX;
    distY = toucObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowTime) {
      if (Math.abs(distX) > threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });
};

let el = document.querySelector(".carousel");
swipedetect(el);
