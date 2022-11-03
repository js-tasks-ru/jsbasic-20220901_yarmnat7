function initCarousel() {
  const slider = document.querySelector(".carousel__inner");
  const arrowRight = document.querySelector(".carousel__arrow_right");
  const arrowLeft = document.querySelector(".carousel__arrow_left");
  const images = document.querySelectorAll(".carousel__slide");

  const numOfImages = images.length;
  let curSlide = 0;

  hideLeftArrow(curSlide);

  function moveSlide() {
    let width = images[0].offsetWidth;
    slider.style.transform = `translateX(${-width * curSlide}px)`;
    slider.style.transition = "transform 0.6s ease-in-out";
  }

  window.addEventListener("resize", () => {
    slider.style.transition = "none";
    moveSlide();
  });

  function hideRightArrow(curSlide) {
    if (curSlide === numOfImages - 1) {
      arrowRight.style.display = "none";
      return;
    }
  }

  function hideLeftArrow(curSlide) {
    if (curSlide === 0) {
      arrowLeft.style.display = "none";
      return;
    }
  }

  arrowRight.addEventListener("click", () => {
    curSlide++;
    hideRightArrow(curSlide);
    arrowLeft.style.display = "";
    moveSlide(curSlide);
  });

  arrowLeft.addEventListener("click", () => {
    curSlide--;
    hideLeftArrow(curSlide);
    arrowRight.style.display = "";
    moveSlide(curSlide);
  });
}
