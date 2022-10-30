import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;

  constructor({ steps, value }) {
    this.steps = steps;
    this.value = value;
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.#createSpans();

    this.elem.addEventListener("click", this.#onClick);

    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = (e) => {
      e.preventDefault();
    };

    thumb.addEventListener("pointerdown", this.#onPointerDown);
  }

  #onClick = (e) => {
    // Calculating step
    const left = e.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const value = Math.round(leftRelative * segments);

    // Displaying step change
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let leftPercents = (value / segments) * 100;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const sliderValue = this.elem.querySelector(".slider__value");
    sliderValue.innerText = value;

    //Removing and adding step__active class
    const spans = Array.from(
      this.elem.querySelector(".slider__steps").children
    );
    spans.map((span) => span.classList.remove("slider__step-active"));
    const activeSpan = spans.at(value);
    activeSpan.classList.add("slider__step-active");

    // Custom event
    const event = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });

    this.elem.dispatchEvent(event);
  };

  #onPointerDown = () => {
    document.addEventListener("pointermove", this.#onPointerMove);
    document.addEventListener("pointerup", this.#onPointerUp, { once: true });
  };

  #onPointerMove = (e) => {
    // Calculating step
    const left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;

    // Displaying step change
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    // Changing value
    const segments = this.steps - 1;
    const value = Math.round(leftRelative * segments);
    let sliderValue = this.elem.querySelector(".slider__value");
    sliderValue.innerText = value;

    //Removing and adding step__active class
    const spans = Array.from(
      this.elem.querySelector(".slider__steps").children
    );
    spans.map((span) => span.classList.remove("slider__step-active"));
    const activeSpan = spans.at(value);
    activeSpan.classList.add("slider__step-active");

    this.elem.classList.add("slider_dragging");
  };

  #onPointerUp = () => {
    const sliderValue = this.elem.querySelector(".slider__value");
    let value = +sliderValue.innerText;

    const event = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });

    this.elem.dispatchEvent(event);

    document.removeEventListener("pointermove", this.#onPointerMove);
    this.elem.classList.remove("slider_dragging");
  };

  #createSpans = () => {
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement("span");
      const sliderSteps = this.elem.querySelector(".slider__steps");
      sliderSteps.append(span);
      sliderSteps.firstElementChild.classList.add("slider__step-active");
    }
  };

  #template() {
    return `
  <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
    </div>
  </div>
    `;
  }
}
