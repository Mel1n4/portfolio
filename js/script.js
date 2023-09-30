const text= document.querySelector("#front-end");
const textLoad = () => {
    setTimeout(() => {
        text.textContent= "Front-End Developer";
    }, 0);
    setTimeout(() => {
        text.textContent= "Aspirante Back-End Developer";
    }, 2000);
    setTimeout(() => {
        text.textContent= "Designer";
    }, 4000);
}
textLoad();
setInterval(textLoad, 6000);

let scrollToTop = document.getElementById("up");

window.onscroll = function () {
  scroll();
};

function scroll() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTop.style.display = "flex";
  } else {
    scrollToTop.style.display = "none";
  }
}