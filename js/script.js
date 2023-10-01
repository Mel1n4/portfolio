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

document.addEventListener('DOMContentLoaded',  function ScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  })
