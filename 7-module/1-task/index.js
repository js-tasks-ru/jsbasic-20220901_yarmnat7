import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;

    this.#render();
  }

  // arrowTop.onclick = function() {
  //   window.scrollTo(pageXOffset, 0);
  //   // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
  // };

  // window.addEventListener('scroll', function() {
  //   arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
  // });

  #render() {
    this.elem = createElement(this.#tempalte());

    this.#onScroll();

    const categoryLink = this.elem.querySelectorAll(".ribbon__item");

    categoryLink.forEach((link) => {
      link.addEventListener("click", this.#onCategoryClick);
    });
  }

  #tempalte() {
    return `
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
  
    ${this.categories
      .map(
        (category) =>
          `<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`
      )
      .join("\n")}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `;
  }

  #onCategoryClick = (e) => {
    e.preventDefault();
    const category = e.target.closest(".ribbon__item");
    const categoryId = category.dataset.id;

    const categoryItem = this.elem.querySelectorAll(".ribbon__item");
    categoryItem.forEach((item) =>
      item.classList.remove("ribbon__item_active")
    );
    category.classList.add("ribbon__item_active");

    const event = new CustomEvent("ribbon-select", {
      detail: categoryId,
      bubbles: true,
    });
    this.elem.querySelector(".ribbon__item").dispatchEvent(event);
  };

  #onScroll() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    const arrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    arrowLeft.onclick = () => {
      ribbonInner.scrollBy(-350, 0);

      if (scrollLeft === 0) {
        arrowLeft.classList.remove("ribbon__arrow_visible");
      }
      arrowRight.classList.add("ribbon__arrow_visible");
    };

    const arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    arrowRight.onclick = () => {
      ribbonInner.scrollBy(350, 0);

      if (scrollRight < 1) {
        arrowRight.classList.remove("ribbon__arrow_visible");
      }
      arrowLeft.classList.add("ribbon__arrow_visible");
    };
  }
}
