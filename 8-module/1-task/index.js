import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    window.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition = () => {
    const cart = document.querySelector(".cart-icon");
    const initialTopCoord = cart.getBoundingClientRect().top;

    let leftIndent =
      Math.min(
        document.querySelector(".container").getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - cart.offsetWidth - 10
      ) + "px";

    if (cart.offsetWidth && window.pageYOffset > initialTopCoord) {
      Object.assign(cart.style, {
        position: "fixed",
        top: "50px",
        zIndex: 999,
        right: "10px",
        left: leftIndent,
      });
    } else {
      Object.assign(cart.style, {
        position: "",
        top: "",
        left: "",
        zIndex: "",
      });
    }
  };
}
