import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  elem = null;
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  updateFilter = (filters) => {
    const byCategory = this.products.filter(
      (product) => product.category === filters.category
    );
    console.log(byCategory);

    const noNuts = this.products.filter(product);
  };

  #template() {
    return `
    <div class="products-grid">
      <div class="products-grid__inner">
      ${this.products
        .map(
          (product) =>
            `<div class="card">
        <div class="card__top">
        <img src="/assets/images/products/${
          product.image
        }" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon"> 
        </button>
        </div>
      </div>`
        )
        .join("\n")}
  
      </div>
    </div>
    `;
  }
}
