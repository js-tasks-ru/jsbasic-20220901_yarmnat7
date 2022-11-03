import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;

    this.#render();
    this.setValue(value);
    this.addEventListeners();
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  setValue(value) {
    this.value = value;

    // Displaying step change
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    let leftPercents = (this.value / this.segments) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    this.elem.querySelector(".slider__value").innerText = this.value;

    //Removing and adding step__active class
    const spans = Array.from(
      this.elem.querySelector(".slider__steps").children
    );
    spans.map((span) => span.classList.remove("slider__step-active"));
    spans.at(this.value).classList.add("slider__step-active");
  }

  addEventListeners() {
    let thumb = this.elem.querySelector(".slider__thumb");

    thumb.ondragstart = (e) => {
      e.preventDefault();
    };
    thumb.onpointerdown = this.#onPointerDown;
    this.elem.onclick = this.#onClick;
  }

  #onClick = (e) => {
    // Calculating step
    let left =
      (e.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    this.setValue(Math.round(left * this.segments));

    // Custom event
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };

  #onPointerDown = (e) => {
    e.preventDefault();
    document.addEventListener("pointermove", this.#onPointerMove);
    document.addEventListener("pointerup", this.#onPointerUp, { once: true });
  };

  #onPointerMove = (e) => {
    e.preventDefault();
    // Calculating step
    let left =
      (e.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    if (left < 0) {
      left = 0;
    }
    if (left > 1) {
      left = 1;
    }
    let leftPercents = left * 100;

    // Displaying step change
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    // Changing value
    this.value = Math.round(left * this.segments);
    this.elem.querySelector(".slider__value").innerText = this.value;

    //Removing and adding step__active class
    const spans = Array.from(
      this.elem.querySelector(".slider__steps").children
    );
    spans.map((span) => span.classList.remove("slider__step-active"));
    spans.at(this.value).classList.add("slider__step-active");

    this.elem.classList.add("slider_dragging");
  };

  #onPointerUp = () => {
    document.removeEventListener("pointermove", this.#onPointerMove);
    document.removeEventListener("pointerup", this.#onPointerUp);
    this.elem.classList.remove("slider_dragging");

    const sliderValue = this.elem.querySelector(".slider__value");
    this.value = +sliderValue.innerText;

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };

  #template() {
    return `
  <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
    ${"<span></span>".repeat(this.steps)}
    </div>
  </div>
    `;
  }
}
