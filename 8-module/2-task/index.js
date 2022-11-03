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
    this.elem = createElement(`<div class="products-grid">
   <div class="products-grid__inner"></div></div>`);
    this.renderProductCard();
  }

  renderProductCard() {
    this.grid("inner").innerHTML = "";
    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (product.spiciness > this.filters.maxSpiciness) continue;
      if (this.filters.category && product.category != this.filters.category)
        continue;
      let productCard = new ProductCard(product);
      this.grid("inner").append(productCard.elem);
    }
  }
  updateFilter(product) {
    Object.assign(this.filters, product), this.renderProductCard();
  }
  grid(el) {
    return this.elem.querySelector(`.products-grid__${el}`);
  }
}
