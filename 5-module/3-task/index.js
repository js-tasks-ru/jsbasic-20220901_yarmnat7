function initCarousel() {
  const slider = document.querySelector(".carousel__inner");
  const arrowRight = document.querySelector(".carousel__arrow_right");
  const arrowLeft = document.querySelector(".carousel__arrow_left");
  const images = document.querySelectorAll(".carousel__slide");

  const numOfImages = images.length;
  const width = images[0].offsetWidth;
  let curImg = 0;

  hideLeftArrow(curImg);

  function hideRightArrow(curImg) {
    if (curImg === numOfImages - 1) {
      arrowRight.style.display = "none";
      return;
    }
  }

  function hideLeftArrow(curImg) {
    if (curImg === 0) {
      arrowLeft.style.display = "none";
      return;
    }
  }
  function moveSlide() {
    slider.style.transform = `translateX(${-width * curImg}px)`;
    slider.style.transition = "transform 0.6s ease-in-out";
  }
  arrowRight.addEventListener("click", () => {
    curImg++;
    hideRightArrow(curImg);
    arrowLeft.style.display = "";
    moveSlide(curImg);
  });

  arrowLeft.addEventListener("click", () => {
    curImg--;
    hideLeftArrow(curImg);
    arrowRight.style.display = "";
    moveSlide(curImg);
  });
}
