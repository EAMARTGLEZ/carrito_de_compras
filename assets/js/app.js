// Get references to DOM elements
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const viewCartButton = document.querySelector(".view-cart");
const cartModal = document.querySelector(".cart-modal");
const closeCartButton = document.querySelector(".close-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const checkoutButton = document.querySelector(".checkout");

// Initialize cart state
let cartItems = [];

// Add click event listeners to add-to-cart buttons
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = parseInt(button.dataset.productId);
    const existingCartItem = cartItems.find((item) => item.id === productId);
    if (existingCartItem) {
      // If item is already in cart, increase quantity
      existingCartItem.quantity++;
    } else {
      // If item is not in cart, add to cart with quantity of 1
      cartItems.push({ id: productId, quantity: 1 });
    }
  });
});

// Add click event listener to view-cart button
viewCartButton.addEventListener("click", () => {
  // Clear previous cart items
  cartItemsContainer.innerHTML = "";
  // Render cart items
  cartItems.forEach((item) => {
    const product = getProductById(item.id);
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${product.price}</p>
      <div class="quantity-controls">
        <button class="decrease-quantity" data-product-id="${product.id}">-</button>
        <span>${item.quantity}</span>
        <button class="increase-quantity" data-product-id="${product.id}">+</button>
      </div>
      <button class="remove-item" data-product-id="${product.id}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });
  // Show cart modal
  cartModal.classList.remove("hidden");
});

// Add click event listener to close-cart button
closeCartButton.addEventListener("click", () => {
  // Hide cart modal
  cartModal.classList.add("hidden");
});

// Add click event listener to checkout button
checkoutButton.addEventListener("click", () => {
  
});

// Add click event listeners to quantity control buttons
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("increase-quantity")) {
    const productId = parseInt(event.target.dataset.productId);
    const cartItem = cartItems.find((item) => item.id === productId);
    cartItem.quantity++;
    // Re-render cart items
    viewCartButton.click();
  } else if (event.target.classList.contains("decrease-quantity")) {
    const productId = parseInt(event.target.dataset.productId);
    const cartItem = cartItems.find((item) => item.id === productId);
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      // Remove item from cart if quantity is 1
      cartItems = cartItems.filter((item) => item.id !== productId);
    }
    // Re-render cart items
    viewCartButton.click();
  } else if (event.target.classList.contains("remove-item")) {
    const productId = parseInt(event.target.dataset.productId);
    cartItems = cartItems.filter((item) => item.id !== productId);
    // Re-render cart items
    viewCartButton.click();
  }
});

// Get product data by ID
function getProductById(productId) {
  // TODO: Replace with actual product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      desc: "",
      price: 9.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      desc: "",
      price: 19.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      desc: "",
      price: 29.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      desc: "",
      price: 39.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Product 5",
      desc: "",
      price: 49.99,
      image: "https://via.placeholder.com/150",
    },
    {
        id: 6,
        name: "Product 3",
        desc: "",
        price: 29.99,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 7,
        name: "Product 4",
        desc: "",
        price: 39.99,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        name: "Product 5",
        desc: "",
        price: 49.99,
        image: "https://via.placeholder.com/150",
      },
  ];
  return products.find((product) => product.id === productId);
}
const mediaQuery = window.matchMedia("(max-width: 768px)");
mediaQuery.addEventListener("change", () => {
  if (mediaQuery.matches) {
    cartModal.classList.add("hidden");
  } else {
    cartModal.classList.remove("hidden");
  }
});
