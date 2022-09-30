import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;

  constructor(slides) {
    this.slides = slides;

    this.#render();
    this.#navigateSlides();
  }

  #render() {
    this.elem = createElement(this.#template());

    const carouselBtn = this.elem.querySelectorAll(".carousel__button");

    carouselBtn.forEach((btn) => {
      btn.addEventListener("click", this.#onAddProduct);
    });
  }

  #navigateSlides() {
    const arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    const arrowRight = this.elem.querySelector(".carousel__arrow_right");
    const slides = this.elem.querySelectorAll(".carousel__slide");
    const slider = this.elem.querySelector(".carousel__inner");

    const numOfSlides = this.slides.length;
    let width;
    let curSlide = 0;

    hideLeftArrow(curSlide);

    function setSize() {
      width = slides[0].offsetWidth;
      slider.style.transform = `translateX(${-width * curSlide}px)`;
    }

    window.addEventListener("resize", () => {
      slider.style.transition = "none";
      setSize();
    });

    function hideRightArrow(curSlide) {
      if (curSlide === numOfSlides - 1) {
        arrowRight.style.display = "none";
        return;
      }
    }

    function hideLeftArrow(curImg) {
      if (curSlide === 0) {
        arrowLeft.style.display = "none";
        return;
      }
    }

    function moveSlide() {
      setSize();
      slider.style.transition = "transform 0.6s ease-in-out";
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

  #onAddProduct = (e) => {
    const slide = e.target.closest(".carousel__slide");
    const productId = slide.dataset.id;

    const event = new CustomEvent("product-add", {
      detail: productId,
      bubbles: true,
    });
    this.elem.querySelector(".carousel__button").dispatchEvent(event);
  };

  #template() {
    return `  
  <div class="carousel">
  <div class="carousel__inner"> 
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    ${this.slides
      .map(
        (slide) => `<div class="carousel__slide" data-id=${slide.id}>
      <img src="/assets/images/carousel/${
        slide.image
      }" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
      </div>
      </div>`
      )
      .join("\n")}
    <button type="button" class="carousel__button">
    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
  </button>
  </div>
</div>
  `;
  }
}
