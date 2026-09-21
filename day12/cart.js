const products = [
  { id: 1, name: "iPhone 15", price: 22000000, category: "Điện thoại" },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 20000000,
    category: "Điện thoại",
  },
  { id: 3, name: "MacBook Air M2", price: 26000000, category: "Laptop" },
  { id: 4, name: "Dell XPS 13", price: 30000000, category: "Laptop" },
  { id: 5, name: "AirPods Pro", price: 6000000, category: "Phụ kiện" },
  { id: 6, name: "Apple Watch", price: 9000000, category: "Phụ kiện" },
];

const categoryFilter = document.querySelector("#category-filter");
const sortFilter = document.querySelector("#sort-filter");

const productListOutput = document.querySelector("#product-list");
const totalOutput = document.querySelector("#total-value");

function getFilteredProducts(productList, category) {
  const filteredList =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);
  return filteredList;
}

function getSortedProducts(productList, sortType) {
  const sortedList = [...productList];

  if (sortType === "asc") {
    sortedList.sort((a, b) => a.price - b.price);
  } else if (sortType === "desc") {
    sortedList.sort((a, b) => b.price - a.price);
  }

  return sortedList;
}

function getProductDescriptions(productList) {
  const descriptions = productList.map((product) => {
    return `${product.name} - ${product.category} - ${product.price.toLocaleString("vi-VN")} VND`;
  });

  return descriptions;
}

function calculateTotal(productList) {
  const total = productList.reduce((sum, product) => sum + product.price, 0);
  const localizedTotal = total.toLocaleString("vi-VN");

  return localizedTotal;
}

function renderProducts(descriptions) {
  productListOutput.textContent = "";

  descriptions.forEach((description) => {
    const li = document.createElement("li");
    li.className = "rounded-xl border border-line bg-soft px-5 py-4 text-sm";
    li.textContent = description;
    productListOutput.appendChild(li);
  });
}

function renderTotal(total) {
  totalOutput.textContent = total;
}

function renderCart() {
  const filteredProducts = getFilteredProducts(products, categoryFilter.value);
  const sortedProducts = getSortedProducts(filteredProducts, sortFilter.value);
  const productDescriptions = getProductDescriptions(sortedProducts);
  const total = calculateTotal(sortedProducts);

  renderProducts(productDescriptions);
  renderTotal(total);
}

categoryFilter.addEventListener("change", renderCart);
sortFilter.addEventListener("change", renderCart);

renderCart();
