export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  getTotalCount = () => {
    return this.cartItems.reduce((acc, item) => acc + item.count, 0);
  };

  getTotalPrice() {
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
