import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();
    this.renderCart();
    this.products = await this.fetchProducts();
    this.renderProductsGrid();
    document.body.addEventListener("product-add", ({ detail }) => {
      let cartItem = this.products.find((cartItem) => cartItem.id === detail);
      this.cart.addProduct(cartItem);
    });
    this.stepSlider.elem.addEventListener("slider-change", ({ detail }) => {
      this.productsGrid.updateFilter({ maxSpiciness: detail });
    });
    this.ribbonMenu.elem.addEventListener("ribbon-select", ({ detail }) => {
      this.productsGrid.updateFilter({ category: detail });
    });
    document.querySelector("#nuts-checkbox").addEventListener("change", (e) => {
      this.productsGrid.updateFilter({ noNuts: e.target.checked });
    });
    document
      .querySelector("#vegeterian-checkbox")
      .addEventListener("change", (e) => {
        this.productsGrid.updateFilter({ vegeterianOnly: e.target.checked });
      });
  }
  renderCarousel() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);
  }
  renderRibbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);
  }
  renderStepSlider() {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);
  }
  renderCartIcon() {
    this.cartIcon = new CartIcon();
    document
      .querySelector("[data-cart-icon-holder]")
      .append(this.cartIcon.elem);
  }
  renderCart() {
    this.cart = new Cart(this.cartIcon);
  }
  async fetchProducts() {
    const products = await fetch("products.json");
    return await products.json();
  }
  renderProductsGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    document.querySelector("[data-products-grid-holder]").innerHTML = "";
    document
      .querySelector("[data-products-grid-holder]")
      .append(this.productsGrid.elem);
  }
}
