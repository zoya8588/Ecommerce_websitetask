// /  Topics covered: useState, useEffect, props, conditional
//  rendering, list rendering, localStorage, fetch API
import { useState, useEffect } from "react";

// clothes images from Unsplash

const images = [
  "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://media.istockphoto.com/id/2265182796/photo/retail-store-offering-trench-coats-and-scarves.jpg?s=2048x2048&w=is&k=20&c=cc56TXmllTjZyEKLpK2p1T9LChImJb-AM38DiduVUaw=",
  "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1605095772003-48390988f7e4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673125287363-b4e837f1215f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://media.istockphoto.com/id/114282384/photo/shirt-rack-v2.jpg?s=2048x2048&w=is&k=20&c=P-kzl7PcJBgXDNnBygui6MDPD_oJryb_JuA2yuFPkI0=",
];

// Category list for the filter buttons
const categories = ["All", "Shirts", "T-Shirts", "Pants", "Trousers", "Formals"];

// Shows the logo and cart button at the top of the page
// Props: cartCount (number), page (string), setPage (function)
function Navbar({ cartCount, page, setPage }) {
  return (
    <div className="bg-amber-100 text-amber-900 px-6 py-4 flex justify-between items-center shadow-md">

      {/* for going back to homepage */}
      <button
        onClick={() => setPage("home")}
        className="text-3xl font-bold  justufy-between hover:text-amber-300 transition"
      >
        👕CLOTHIFY :)👕
      </button>

      {/* Home and Cart button */}

      <div className="flex items-center gap-2 rounded-full">

        <button
          onClick={() => setPage("home")}
          className={`text-sm font-medium "}`}
        >
          Home
        </button>

        {/* Cart button and item count */}
        <button
          onClick={() => setPage("cart")}
          className="relative bg-white text-amber-700 font-bold px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition"
        >
          🛒 cart
          {/* Only show the red badge if cart has items */}

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
}

// Props: search (string), setSearch (function)
function Hero({ search, setSearch }) {
  return (
    <div className="bg-linear-to-r from-amber-100 to-amber-100 text-amber-900 text-center py-14 px-4">

      <h1 className="text-4xl font-bold mb-4 italic hover:text-black transition">Welcome to Clothify 🛍️</h1>
      <p className="text-amber-900 mb-4 text-lg text-center font-bold italic hover:text-black transition">Find your perfect style with clothify!</p>

      {/* Search bar */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-full text-black text-sm focus:outline-none focus:ring-2 focus:ring-white shadow-lg hover:text-amber-800"
        />
        {/* Show X button only when user has typed something */}
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-red-500 text-lg font-bold"
          >
            ✕
          </button>
        )}
      </div>

    </div>
  );
}

// Shows a single product with image, name, price, buttons
// Props: product, addToCart, wishlist, toggleWishlist, setPage, setDetailId

function ProductCard({ product, addToCart, wishlist, toggleWishlist, setPage, setDetailId }) {

  // Check if this product is already in the wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

      {/* Product Image - clicking opens the detail page */}
    
      <div className="relative">
        <img
          src={product.image}
          alt={product.category}
          className="h-52 w-full object-cover cursor-pointer"
          onClick={() => {
            setDetailId(product.id);
            setPage("detail");
          }}
        />
        {/* Wishlist heart button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 rounded-full p-1.5 shadow text-xl"
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button> 
      </div>

      {/* Product Info */}
      <div className="p-4">

        {/* Category label */}
        <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded-full">
          {product.category}
        </span>

        {/* Product title */}
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">{product.title}</p>

        {/* Price */}
        <p className="text-black font-bold text-lg mt-1">₹{product.price}</p>

        {/* Add to Cart button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-amber-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition"
        >
          Add to Cart 🛒
        </button>

      </div>
    </div>
  );
}
// Shows the hero, search bar, category filter, and product grid

function Home({ addToCart, wishlist, toggleWishlist, search, setSearch, setPage, setDetailId }) {

  // products: the list of items fetched from the API
  const [products, setProducts] = useState([]);

  // selectedCategory: which filter button is active
  const [selectedCategory, setSelectedCategory] = useState("All");

  // loading: true while we wait for the API to respond
  const [loading, setLoading] = useState(true);


  // useEffect runs once when the images first loads
  // // use it to fetch products from the internet
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
      // Take only first 30 posts and add clothing-specific fields

        const mapped = data.slice(0, 30).map((item, index) => ({
          id: item.id,
          title: item.title.slice(0, 40),
          category: categories[(index % (categories.length - 1)) + 1],
          price: item.id * 100 + 399,
          image: images[index % images.length],
          description: "Premium quality clothing for daily wear.",
        }));
        setProducts(mapped);
        setLoading(false);
      });
  }, []); 
  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });


  return (
    <div className="bg-gray-50 min-h-screen">

      {/* search bar */}
      <Hero search={search} setSearch={setSearch} />

      {/* Category selection */}
      <div className="flex flex-wrap gap-2 justify-center px-4 py-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold border transition ${
              selectedCategory === cat
                ? "bg-amber-700 text-white border-amber-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-amber-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* items in cart count */}
      <p className="text-center text-sm text-gray-400 mb-4">
        {filteredProducts.length} products found
        {search && ` for "${search}"`}
      </p>

      {/* Show loading message while fetching the images from the api */}
      {loading && (
        <p className="text-center text-gray-400 py-20 text-lg">Loading products...</p>
      )}

      {/* Product grid */}

      {!loading && filteredProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              setPage={setPage}
              setDetailId={setDetailId}
            />
          ))}
        </div>
      )}

    </div>
  );
}
// description about the item which is selected
function ProductDetail({ detailId, addToCart, setPage }) {

  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  // Fetch single product when detailId changes
  useEffect(() => {
    setProduct(null);
    setAdded(false);
    fetch(`https://jsonplaceholder.typicode.com/posts/${detailId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({
          id: data.id,
          title: data.title.slice(0, 40),
          category: categories[(data.id % (categories.length - 1)) + 1],
          price: data.id * 250 + 799,
          image: images[data.id % images.length],
          description:"This premium clothing item is made from high-quality fabric. Comfortable for daily wear and long-lasting. Suitable for all occasions.",
        });
      });
  }, [detailId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">

      {/* Back button */}
      <button
        onClick={() => setPage("home")}
        className="mb-6 text-amber-900 text-sm font-medium"
      >
      Back to Home
      </button>

      {/* Product card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden grid md:grid-cols-2">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 flex flex-col justify-center">

          <span className="text-xs bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-full w-fit mb-3">
            {product.category}
          </span>

          <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">
            {product.title}
          </h2>

          <p className="text-gray-500 text-sm mb-4">{product.description}</p>

          <p className="text-2xl font-bold text-amber-700 mb-5">₹{product.price}</p>

          <button
            onClick={() => {
              addToCart(product);
              setAdded(true);
            }}
            className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            {added ? "Added ✓" : "Add to Cart 🛒"}
          </button>
          {added && (
            <button
              onClick={() => setPage("cart")}
              className="mt-3 text-sm text-amber-700 font-medium "
            >
              Go to Cart 
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
// Shows all items the user added, with qty controls and delete

function Cart({ cart, wishlist, removeFromCart, updateQty, addToCart, toggleWishlist, setPage }) {

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const hasCartItems = cart.length > 0;
  const hasWishlistItems = wishlist.length > 0;

  // Show empty cart message only when cart and wishlist are empty
  if (!hasCartItems && !hasWishlistItems) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
        <p className="text-gray-400 text-sm mb-6">Add something from clothify :(</p>
        <button
          onClick={() => setPage("home")}
          className="bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-amber-600 transition"
        >
         continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Cart 🛒 ({cart.length} {cart.length === 1 ? "item" : "items"})
        </h2>

        {hasCartItems ? (
          <>
            {/* List of cart items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
                >
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm capitalize truncate">{item.title}</p>
                    <p className="text-amber-700 font-bold text-sm mt-0.5">₹{item.price} each</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.cartId, item.qty - 1)}
                        className="w-7 h-7 bg-gray-100 rounded-full text-sm font-bold hover:bg-gray-200 transition"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.cartId, item.qty + 1)}
                        className="w-7 h-7 bg-gray-100 rounded-full text-sm font-bold hover:bg-gray-200 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal + delete */}
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-800">₹{item.price * item.qty}</p>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="mt-2 text-amber-600 hover:text-red-600 text-xs font-medium transition italic"
                    >
                       Remove Item
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Order total price*/}
            <div className="bg-white rounded-xl shadow-sm p-5 mt-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">99</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-gray-800 text-lg">
                <span>Total</span>
                <span>₹{total + 99}</span>
              </div>
              <button className="mt-5 w-full bg-amber-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-amber-600 transition">
                Checkout
              </button>

            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 flex flex-col items-center text-center">
            <p className="text-4xl mb-2">🛒</p>
            <h3 className="text-lg font-semibold text-gray-800">Your cart is empty.</h3>
            <p className="text-sm text-gray-400 mt-1 mb-4">browse the store!</p>
            <button
              onClick={() => setPage("home")}
              className="bg-amber-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-amber-600 transition"
            >
            Continue Shopping 🛍️
            </button>
          </div>
        )}

        {hasWishlistItems && (
          <div className="bg-white rounded-xl shadow-sm p-5 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Wishlist items ({wishlist.length})</h3>
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm capitalize truncate">{item.title}</p>
                    <p className="text-amber-700 font-bold text-sm mt-0.5">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-amber-600 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="text-red-500 text-xs font-medium hover:text-red-700 transition italic"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setPage("home")}
          className="mt-4 w-full text-center text-sm text-amber-700 hover:text-amber-300 font-medium transition"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}
// This holds all state and decides which page to show

export default function App() {

  // Which page are we on?
  const [page, setPage] = useState("home");

  // Which product to show on the detail page
  const [detailId, setDetailId] = useState(null);

  // Search text typed by the user
  const [search, setSearch] = useState("");

  // Cartloaded from localStorage 

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("clothify_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist loaded from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("clothify_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clothify_cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clothify_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  // Add product to cart
  function addToCart(product) {
    setCart((prevCart) => {
      const alreadyInCart = prevCart.find((item) => item.id === product.id);
      if (alreadyInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, cartId: product.id + "-" + Date.now(), qty: 1 }];
      }
    });
  }

  // Remove item from cart
  function removeFromCart(cartId) {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  }

  // Update quantity 
  
  function updateQty(cartId, newQty) {
    if (newQty <= 0) {
      removeFromCart(cartId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartId === cartId ? { ...item, qty: newQty } : item
        )
      );
    }
  }

  // Toggle wishlist
  function toggleWishlist(product) {
    setWishlist((prev) => {
      const alreadyWished = prev.some((item) => item.id === product.id);
      return alreadyWished
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  }

  // Total item count for the cart badge
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);


  return (
    <div>
      {/* Navbar is always shown */}
      <Navbar cartCount={cartCount} page={page} setPage={setPage} />

      {/* Show the right page */}
      {page === "home" && (
        <Home
          addToCart={addToCart}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          setDetailId={setDetailId}
        />
      )}

      {page === "detail" && (
        <ProductDetail
          detailId={detailId}
          addToCart={addToCart}
          setPage={setPage}
        />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          wishlist={wishlist}
          removeFromCart={removeFromCart}
          updateQty={updateQty}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          setPage={setPage}
        />
      )}
    </div>
  );
}