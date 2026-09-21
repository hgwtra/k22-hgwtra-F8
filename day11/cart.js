const cart = {
  items: [
    {
      id: 1,
      name: "Laptop",
      price: 15000000,
      quantity: 1,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Mouse",
      price: 300000,
      quantity: 2,
      category: "Electronics",
    },
  ],
  _discountRate: 0,
  validCoupons: {
    WELCOME10: 0.1,
    SUMMER20: 0.2,
    VIP30: 0.3,
  },

  // Trả về tổng sản phẩm trong giỏ
  get totalQuantity() {
    const totalQuantity = this.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    return totalQuantity;
  },

  // Tính tổng tiền hàng (chưa áp dụng mã giảm giá)
  get subtotal() {
    const subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return subtotal;
  },

  // Áp dụng mã giảm giá bằng cách truyền tên coupon
  // Nếu coupon có trong `validCoupons`, gán `_discountRate`. Nếu không, in thông báo lỗi và không gán.
  set applyCoupon(code) {
    if (this.validCoupons.hasOwnProperty(code)) {
      this._discountRate = this.validCoupons[code];
    } else {
      console.log("Mã giảm giá không hợp lệ.");
    }
  },

  // Tính tổng tiền thực tế phải trả
  get totalPrice() {
    const totalPrice = this.subtotal * (1 - this._discountRate);
    return totalPrice;
  },

  // Thêm nhiều sản phẩm cùng lúc
  // - Nếu item đã tồn tại (dựa vào id): cộng dồn quantity.
  // - Nếu chưa có: kiểm tra xem item truyền vào có mặc định `quantity` chưa, nếu chưa thì gán mặc định bằng 1 rồi mới push.
  addItems(...newItems) {
    newItems.forEach((newItem) => {
      const existingItem = this.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        if (!newItem.hasOwnProperty("quantity")) {
          newItem.quantity = 1;
        }
        this.items.push(newItem);
      }
    });
  },

  // Cập nhật số lượng sản phẩm theo id
  // Nếu newQuantity <= 0 thì tự động xoá sản phẩm đó khỏi giỏ.
  updateQuantity(id, newQuantity) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return "Id not found";
    }

    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      this.removeItem(id);
    }
  },

  // Xoá sản phẩm theo id
  removeItem(id) {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return "Id not found";
    } else {
      this.items = this.items.filter((item) => item.id !== id);
    }
  },

  // Lọc danh sách sản phẩm theo danh mục (category)
  getItemsByCategory(category) {
    const items = this.items.filter((item) => item.category === category);

    if (items.length === 0) {
      return "No items found";
    }

    return items;
  },

  printInvoice() {
    console.log("================ HOÁ ĐƠN BAN HÀNG ================");
    // In danh sách từng dòng: Tên - Đơn giá - Số lượng - Thành tiền
    // In Tổng tiền hàng (Subtotal)
    // In Giảm giá (% và số tiền giảm)
    // In Tổng thanh toán (Total Price)
    this.items.forEach((item) => {
      const totalItemPrice = item.price * item.quantity;
      console.log(
        `${item.name} - ${item.price} x ${item.quantity} = ${totalItemPrice}`,
      );
    });
    console.log("Tổng tiền hàng:", this.subtotal);
    console.log(
      "Giảm giá:",
      this._discountRate * 100 + "%",
      "(-" + this.subtotal * this._discountRate + ")",
    );
    console.log("Tổng thanh toán:", this.totalPrice);
    console.log("==================================================");
  },
};

console.log(cart.totalQuantity); // 3
console.log(cart.subtotal); // 15600000

cart.applyCoupon = "WELCOME10";
console.log(cart.totalPrice); // 14040000

cart.addItems(
  {
    id: 3,
    name: "Keyboard",
    price: 500000,
    quantity: 1,
    category: "Electronics",
  },
  { id: 2, name: "Mouse", price: 300000, quantity: 1, category: "Electronics" },
);

console.log(cart.items);

cart.updateQuantity(1, 2);
console.log(cart.items);

cart.removeItem(2);
console.log(cart.items);

console.log(cart.getItemsByCategory("Electronics"));

cart.printInvoice();
