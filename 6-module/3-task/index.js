import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;

  constructor(slides) {
    this.slides = slides;
    this.curSlide = 0;
    this.#render();
  }

  #render() {
    this.elem = createElement(`
  <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon" />
    </div>
    <div class="carousel__inner"></div>
  </div>
  `);

    let slides = this.slides.map((item) =>
      createElement(`
<div class="carousel__slide" data-id="${item.id}">
  <img
    src="/assets/images/carousel/${item.image}"
    class="carousel__img"
    alt="slide"
  />
  <div class="carousel__caption">
    <span class="carousel__price">€${item.price.toFixed(2)}</span>
    <div class="carousel__title">${item.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon" />
    </button>
  </div>
</div>`)
    );

    this.elem.querySelector(".carousel__inner").append(...slides);
    this.addEventListeners();
    this.navigateSlides();
  }

  addEventListeners() {
    this.elem.onclick = ({ target }) => {
      const btn = target.closest(".carousel__button");
      const slide = target.closest(".carousel__slide");
      if (btn) {
        const productId = slide.dataset.id;
        const event = new CustomEvent("product-add", {
          detail: productId,
          bubbles: true,
        });
        this.elem.dispatchEvent(event);
      }

      if (target.closest(".carousel__arrow_right")) {
        this.nextSlide();
      }

      if (target.closest(".carousel__arrow_left")) {
        this.prevSlide();
      }
    };
  }

  nextSlide() {
    this.curSlide++;
    this.navigateSlides();
  }

  prevSlide() {
    this.curSlide--;
    this.navigateSlides();
  }

  navigateSlides() {
    const arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    const arrowRight = this.elem.querySelector(".carousel__arrow_right");
    const slider = this.elem.querySelector(".carousel__inner");

    const numOfSlides = this.slides.length;

    let width = this.elem.offsetWidth;
    slider.style.transform = `translateX(${-width * this.curSlide}px)`;

    if (this.curSlide === numOfSlides - 1) {
      arrowRight.style.display = "none";
    } else {
      arrowRight.style.display = "";
    }

    if (this.curSlide === 0) {
      arrowLeft.style.display = "none";
    } else {
      arrowLeft.style.display = "";
    }
  }
  resizeSlide() {
    window.addEventListener("resize", () => {
      slider.style.transition = "none";
      this.navigateSlides();
    });
  }
}
