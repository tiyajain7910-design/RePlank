import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, IMPACT_MILESTONES } from './data/products.js';
import { Header } from './components/Header.jsx';
import { ImpactHero } from './components/ImpactHero.jsx';
import { WholesaleBanner } from './components/WholesaleBanner.jsx';
import { CategoryFilters } from './components/CategoryFilters.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { ProductDetailModal } from './components/ProductDetailModal.jsx';
import { CartModal } from './components/CartModal.jsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.jsx';

export function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isWholesale, setIsWholesale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const productsCountByCat = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleAddToCart = (product, quantity, asWholesale = isWholesale) => {
    const price = asWholesale ? product.wholesalePrice : product.retailPrice;
    const existingIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.isWholesale === asWholesale
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: price,
          retailPrice: product.retailPrice,
          wholesalePrice: product.wholesalePrice,
          wholesaleMOQ: product.wholesaleMOQ,
          packetsSaved: product.packetsSaved,
          co2SavedKg: product.co2SavedKg,
          imageUrl: product.imageUrl,
          quantity: quantity,
          isWholesale: asWholesale
        }
      ]);
    }

    const totalDiverted = (product.packetsSaved * quantity).toLocaleString();
    showToast(`🌱 Added ${quantity}× ${product.name}! Diverted ${totalDiverted} packets.`);
  };

  const handleUpdateQuantity = (id, itemIsWholesale, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id, itemIsWholesale);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.isWholesale === itemIsWholesale
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (id, itemIsWholesale) => {
    setCartItems(
      cartItems.filter((item) => !(item.id === id && item.isWholesale === itemIsWholesale))
    );
  };

  const handleClearCart = () => {
    if (window.confirm('Empty your RePlank eco-cart?')) {
      setCartItems([]);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    setTimeout(() => {
      setCartItems([]);
    }, 1500);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPacketsInCart = cartItems.reduce(
    (acc, item) => acc + item.packetsSaved * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#212529] font-sans flex flex-col selection:bg-[#52b788] selection:text-[#1b4332]">
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1b4332] text-[#f7f3ea] px-5 py-3 rounded-2xl shadow-2xl border-2 border-[#52b788] font-bold text-xs sm:text-sm animate-bounce text-center max-w-sm sm:max-w-md">
          {toastMessage}
        </div>
      )}

      <Header
        cartCount={totalCartCount}
        totalPacketsInCart={totalPacketsInCart}
        onOpenCart={() => setIsCartOpen(true)}
        isWholesale={isWholesale}
        onToggleWholesale={setIsWholesale}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        <ImpactHero
          isWholesale={isWholesale}
          onToggleWholesale={setIsWholesale}
        />

        {isWholesale && (
          <div className="px-4">
            <WholesaleBanner onContactBulk={() => alert('RePlank Wholesale support: 1800-REPLANK')} />
          </div>
        )}

        <CategoryFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          productsCountByCat={productsCountByCat}
        />

        <section className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1b4332]">
                {activeCategory === 'all'
                  ? 'RePlank Sustainable Products Catalog'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.name}
              </h2>
              <p className="text-xs text-[#8c6239] font-bold mt-0.5">
                Showing {filteredProducts.length} items made from post-consumer chips and biscuit packets
              </p>
            </div>

            <span className={`text-xs font-black px-3 py-1 rounded-full ${
              isWholesale
                ? 'bg-[#8c6239] text-white'
                : 'bg-[#2d6a4f] text-white'
            }`}>
              {isWholesale ? '🏭 Wholesale Mode' : '🌿 Retail Mode'}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-[#ede4d4] rounded-3xl p-8 text-center my-8">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-black text-[#1b4332] mt-2">No RePlank products match your search</h3>
              <p className="text-xs text-[#432818]/70 mt-1">
                Try searching for "boards", "roof", "bench", "table", or "brick".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-5 py-2 bg-[#1b4332] text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWholesale={isWholesale}
                  onAddToCart={handleAddToCart}
                  onOpenDetail={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-[#ede4d4] via-[#f5ede0] to-[#ede4d4] border-2 border-[#d4a373] rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-black text-[#1b4332] text-center mb-2">
              Why Every Environmentalist Is Switching to RePlank Boards
            </h3>
            <p className="text-xs sm:text-sm text-[#432818]/80 text-center max-w-2xl mx-auto mb-6">
              Chips packets and biscuit wrappers consist of high-tensile metallized film that takes 400+ years to decompose in landfills. We upcycle them into zero-maintenance building materials.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white/80 p-4 rounded-2xl border border-[#dacbb7] space-y-1.5">
                <span className="text-2xl">💧</span>
                <h4 className="font-black text-[#1b4332] text-sm">100% Waterproof & Termite-Proof</h4>
                <p className="text-[#432818]/70">
                  Unlike plywood or MDF which bloats and rots when exposed to rain, RePlank recycled plastic boards stay submerged underwater forever with zero swelling.
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-2xl border border-[#dacbb7] space-y-1.5">
                <span className="text-2xl">☀️</span>
                <h4 className="font-black text-[#1b4332] text-sm">Thermal Cooling Roofs</h4>
                <p className="text-[#432818]/70">
                  The metallic foil inside snack packaging reflects 88% of solar infrared heat, reducing the indoor temperature of homes and buildings by 4°C to 6°C.
                </p>
              </div>

              <div className="bg-white/80 p-4 rounded-2xl border border-[#dacbb7] space-y-1.5">
                <span className="text-2xl">🧱</span>
                <h4 className="font-black text-[#1b4332] text-sm">Interlocking Mortar-Less Bricks</h4>
                <p className="text-[#432818]/70">
                  Precision-molded bricks snap together without cement mortar, enabling fast green construction with zero sand mining and zero efflorescence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {cartItems.length > 0 && (
        <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 bg-[#1b4332] text-white rounded-2xl shadow-2xl flex items-center justify-between font-black text-sm border-2 border-[#52b788]"
          >
            <div className="flex items-center gap-2">
              <span className="bg-[#ca8a04] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {totalCartCount}
              </span>
              <span>View RePlank Eco-Cart</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#a7f3d0] block">
                ♻️ {totalPacketsInCart.toLocaleString()} pkts
              </span>
              <span className="text-sm">
                ${cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)} →
              </span>
            </div>
          </button>
        </div>
      )}

      <footer className="bg-[#1b4332] text-[#f7f3ea] py-8 px-4 border-t-4 border-[#8c6239] mt-8 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl">🌿</span>
              <span className="text-base font-black tracking-tight text-[#f7f3ea]">
                RePlank EcoBoards
              </span>
            </div>
            <p className="text-white/70 max-w-md">
              Proudly converting post-consumer multi-layer chips and biscuit packaging into sustainable circular boards, roofs, furniture, and bricks.
            </p>
          </div>

          <div className="text-white/80 space-y-1">
            <p>Certified RoHS Non-Toxic • Zero Formaldehyde • 100% Circular</p>
            <p className="text-white/50 text-[11px]">
              Built with React & Clean Energy Passion by Software Engineers for the Earth.
            </p>
          </div>
        </div>
      </footer>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        initialWholesale={isWholesale}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <OrderConfirmationModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}

export default App;
