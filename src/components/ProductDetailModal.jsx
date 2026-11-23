import React, { useState } from 'react';

export const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart, initialWholesale = false }) => {
  if (!isOpen || !product) return null;

  const [isWholesale, setIsWholesale] = useState(initialWholesale);
  const minQty = isWholesale ? product.wholesaleMOQ : 1;
  const [quantity, setQuantity] = useState(minQty);

  const activePrice = isWholesale ? product.wholesalePrice : product.retailPrice;
  const itemTotal = (activePrice * quantity).toFixed(2);
  const totalPackets = (product.packetsSaved * quantity).toLocaleString();
  const totalCO2 = ((product.co2SavedKg || 5) * quantity).toFixed(1);

  const handleToggleMode = (mode) => {
    setIsWholesale(mode);
    setQuantity(mode ? product.wholesaleMOQ : 1);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, isWholesale);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-[#faf6ef] border-2 border-[#d4a373] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#e6dbc9] bg-[#f2ebd9]">
          <div className="flex items-center gap-2">
            <span className="bg-[#1b4332] text-white text-xs font-black px-3 py-1 rounded-full">
              ♻️ {product.packetsSaved.toLocaleString()} Chips Packets Inside
            </span>
            <span className="text-xs font-bold text-[#8c6239] uppercase">
              {product.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#ede4d4] hover:bg-[#d4a373]/40 text-[#432818] font-black text-xl flex items-center justify-center transition-all"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Visual & Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="rounded-2xl overflow-hidden border border-[#e0d3be] bg-[#ede4d4]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#2d6a4f] text-sm font-black">
                  ★ {product.rating} ({product.reviewsCount} customer reviews)
                </span>
                <span className="text-xs bg-[#e2f0d9] text-[#1b4332] font-bold px-2 py-0.5 rounded-full">
                  RePlank Certified
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#1b4332] leading-snug">
                {product.name}
              </h2>

              <p className="text-sm font-semibold text-[#8c6239]">
                {product.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#432818]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Mode Toggle inside Modal */}
              <div className="pt-2">
                <span className="text-xs font-bold text-[#432818] block mb-1.5">
                  Select Order Tier:
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleMode(false)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      !isWholesale
                        ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
                        : 'bg-white text-[#432818] border-[#dacbb7] hover:bg-[#ede4d4]'
                    }`}
                  >
                    🌿 Customer Retail (${product.retailPrice.toFixed(2)})
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleMode(true)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      isWholesale
                        ? 'bg-[#8c6239] text-white border-[#8c6239] shadow-sm'
                        : 'bg-white text-[#432818] border-[#dacbb7] hover:bg-[#ede4d4]'
                    }`}
                  >
                    🏭 Wholesale Tier (${product.wholesalePrice.toFixed(2)})
                  </button>
                </div>
                {isWholesale && (
                  <p className="text-[11px] text-[#ca8a04] font-bold mt-1.5">
                    ⚡ Wholesale Minimum Order Quantity: {product.wholesaleMOQ} units
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Environmental Impact Breakdown Card */}
          <div className="bg-[#e8f2ea] border-2 border-[#52b788] rounded-2xl p-4 sm:p-5">
            <h3 className="text-sm font-black text-[#1b4332] uppercase tracking-wider flex items-center gap-2 mb-3">
              <span>🌱</span> Environmental Impact Report for this Product
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#a7d7b5]">
                <div className="text-lg font-black text-[#1b4332]">{totalPackets}</div>
                <div className="text-[11px] font-bold text-[#2d6a4f]">Packets Diverted</div>
                <div className="text-[10px] text-gray-500">MLP Chips/Biscuits</div>
              </div>

              <div className="bg-white/80 p-2.5 rounded-xl border border-[#a7d7b5]">
                <div className="text-lg font-black text-[#1b4332]">{totalCO2} kg</div>
                <div className="text-[11px] font-bold text-[#2d6a4f]">CO₂e Avoided</div>
                <div className="text-[10px] text-gray-500">Vs Incineration</div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white/80 p-2.5 rounded-xl border border-[#a7d7b5]">
                <div className="text-lg font-black text-[#1b4332]">100%</div>
                <div className="text-[11px] font-bold text-[#2d6a4f]">Circular Life</div>
                <div className="text-[10px] text-gray-500">Recyclable Forever</div>
              </div>
            </div>

            <div className="mt-3 text-xs text-[#2d6a4f] bg-white/60 p-2.5 rounded-xl">
              <strong>Raw Composition:</strong> {product.composition}
            </div>
          </div>

          {/* Detailed Specifications Table */}
          <div>
            <h3 className="text-sm font-black text-[#432818] uppercase tracking-wider mb-2">
              Engineering & Performance Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-[#ede5d6] p-2.5 rounded-xl flex justify-between">
                <span className="font-semibold text-gray-600">Dimensions:</span>
                <span className="font-bold text-[#1b4332]">{product.dimensions}</span>
              </div>
              <div className="bg-[#ede5d6] p-2.5 rounded-xl flex justify-between">
                <span className="font-semibold text-gray-600">Unit Weight:</span>
                <span className="font-bold text-[#1b4332]">{product.weight}</span>
              </div>
              <div className="bg-[#ede5d6] p-2.5 rounded-xl flex justify-between">
                <span className="font-semibold text-gray-600">Durability / Life:</span>
                <span className="font-bold text-[#1b4332]">{product.durability}</span>
              </div>
              <div className="bg-[#ede5d6] p-2.5 rounded-xl flex justify-between">
                <span className="font-semibold text-gray-600">Thermal / Load Rating:</span>
                <span className="font-bold text-[#1b4332]">{product.thermalRating}</span>
              </div>
              <div className="sm:col-span-2 bg-[#ede5d6] p-2.5 rounded-xl flex justify-between">
                <span className="font-semibold text-gray-600">Aesthetic Texture Finish:</span>
                <span className="font-bold text-[#8c6239]">{product.finish}</span>
              </div>
            </div>
          </div>

          {/* Key Features Bullet List */}
          <div>
            <h3 className="text-sm font-black text-[#432818] uppercase tracking-wider mb-2">
              Eco-Advantages
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#432818]">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-[#f4ece0] p-2 rounded-lg">
                  <span className="text-[#2d6a4f] font-bold">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-[#f2ebd9] border-t border-[#e6dbc9] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#1b4332]">
                ${activePrice.toFixed(2)}
              </span>
              <span className="text-xs text-gray-600 font-semibold ml-1">/ unit</span>
            </div>
            <div className="text-right sm:text-left">
              <span className="text-xs font-bold text-[#8c6239] block">
                Total: <strong className="text-base text-[#1b4332]">${itemTotal}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Stepper */}
            <div className="flex items-center bg-[#ede4d4] rounded-2xl p-1 border border-[#dacbb7]">
              <button
                onClick={() => quantity > minQty && setQuantity(quantity - 1)}
                className="w-10 h-10 flex items-center justify-center font-black text-xl text-[#432818] hover:bg-[#d4a373]/30 rounded-xl"
              >
                -
              </button>
              <span className="w-12 text-center font-black text-base text-[#1b4332]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center font-black text-xl text-[#432818] hover:bg-[#d4a373]/30 rounded-xl"
              >
                +
              </button>
            </div>

            {/* BIG ACTION BUTTON */}
            <button
              onClick={handleAdd}
              className="flex-1 sm:flex-initial py-3 px-6 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#f7f3ea] font-black text-base rounded-2xl shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>🛒</span>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
