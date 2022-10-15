export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    if (product === null) {
      return;
    }

    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    //console.log(cartItem);

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

    // let cartItem = this.cartItems.find((item) => item.product.id === productId);
    // console.log(cartItem);
    // if (cartItem === undefined) {
    //   return;
    // } else {
    //   this.cartItems.count = cartItem.count += amount;
    //   if (cartItem.count === 0) {
    //     this.cartItems = this.cartItems.filter(
    //       (item) => item.product.id !== productId
    //     );
    //   }
    console.log(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount = () => {
    return this.cartItems.map((item) => item.count).reduce((a, b) => a + b, 0);
  };

  getTotalPrice() {
    let totalPrice = this.cartItems
      .map((item) => {
        return item.product.price * item.count;
      })
      .reduce((a, b) => a + b, 0);
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
