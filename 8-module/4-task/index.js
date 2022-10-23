import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
    this.renderModal();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (!cartItem) {
      cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count += 1;
    }
    this.onProductUpdate(cartItem);

    console.log(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);
    console.log(cartItem);
    if (cartItem === undefined) {
      return;
    } else {
      cartItem.count += amount;
    }
    if (cartItem.count === 0) {
      const idx = this.cartItems.findIndex((item) => item === cartItem);
      this.cartItems.splice(idx, 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, item) => acc + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modalBody = document.createElement("div");
    for (let item of this.cartItems) {
      this.modalBody.append(this.renderProduct(item.product, item.count));
    }
    this.modalBody.append(this.renderOrderForm());
    this.modal.setBody(this.modalBody);
    this.modal.open();
    console.log(this.modalBody);
    this.modalBody.addEventListener("click", (e) => {
      const amount = e.target.closest(".cart-counter__button_plus") ? 1 : -1;
      const productId = e.target.closest(".cart-product[data-product-id]")
        .dataset.productId;
      this.updateProductCount(productId, amount);
    });
    const modalForm = this.modalBody.querySelector(".cart-form");
    modalForm.addEventListener("submit", (e) => onSubmit(e));
  }

  onProductUpdate = (cartItem) => {
    let productId = cartItem.product.id; // Уникальный идентификатора товара (для примера)
    let modalBody = this.modal.elem.querySelector(".modal__body"); //корневой элемент тела модального окна, который мы получили, вызвав метод renderModal
    console.log(modalBody);
    // Элемент, который хранит количество товаров с таким productId в корзине
    let productCount = this.modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-counter__count`
    );
    console.log(productCount);
    // //Элемент с общей стоимостью всех единиц этого товара
    // let productPrice = this.modalBody.querySelector(
    //   `[data-product-id="${productId}"] .cart-product__price`
    // );
    // // Элемент с суммарной стоимостью всех товаров
    // let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    // productCount.innerHTML = this.getTotalCount(); //новое количество единиц товара
    // productPrice.innerHTML = `€${(productPrice * productCount).toFixed(2)}`;
    // infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    this.cartIcon.update(this);
  };

  onSubmit(e) {
    e.preventDefault();
    // ...ваш код
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
