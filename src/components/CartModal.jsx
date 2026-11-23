import React from 'react';

export const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const ecoDiscount = subtotal > 100 ? subtotal * 0.05 : 0;
  const grandTotal = subtotal - ecoDiscount;

  const totalPackets = cartItems.reduce((acc, item) => acc + item.packetsSaved * item.quantity, 0);
  const totalCO2 = cartItems.reduce((acc, item) => acc + (item.co2SavedKg || 5) * item.quantity, 0).toFixed(1);
  const totalLandfillLiters = Math.round(totalPackets * 0.35);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Cart Container */}
      <div className="relative bg-[#faf6ef] border-2 border-[#8c6239] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#f2ebd9] border-b border-[#e6dbc9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#1b4332] text-white rounded-xl text-lg">🛒</span>
            <div>
              <h2 className="text-xl font-black text-[#1b4332]">Your RePlank Eco-Cart</h2>
              <p className="text-xs text-[#8c6239] font-bold">
                {cartItems.length} {cartItems.length === 1 ? 'unique product' : 'unique products'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-red-600 hover:text-red-800 font-bold px-2 py-1 rounded hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#ede4d4] hover:bg-[#d4a373]/40 text-[#432818] font-black text-xl flex items-center justify-center transition-all"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Cart Body */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-3">
              <div className="text-5xl">🌿</div>
              <h3 className="text-lg font-black text-[#1b4332]">Your eco-cart is waiting!</h3>
              <p className="text-xs sm:text-sm text-[#432818]/70 max-w-sm mx-auto">
                Select recycled plastic boards, weather-proof furniture, cooling roofs, or interlocking bricks to divert snack packets from landfills.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 bg-[#1b4332] text-white font-bold text-sm rounded-xl hover:bg-[#2d6a4f] transition-all"
              >
                Explore RePlank Products
              </button>
            </div>
          ) : (
            <>
              {/* Live Cumulative Environmental Impact Pill */}
              <div className="bg-[#e8f2ea] border-2 border-[#52b788] rounded-2xl p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-[#1b4332] tracking-wider flex items-center gap-1.5">
                    <span>🌱</span> Your Real Planet Impact With This Order
                  </span>
                  <span className="text-[10px] bg-[#52b788] text-white font-bold px-2 py-0.5 rounded-full">
                    Eco-Hero Status
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/85 p-2 rounded-xl">
                    <span className="block text-base sm:text-lg font-black text-[#1b4332]">
                      {totalPackets.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-[#8c6239]">Packets Diverted</span>
                  </div>

                  <div className="bg-white/85 p-2 rounded-xl">
                    <span className="block text-base sm:text-lg font-black text-[#2d6a4f]">
                      {totalCO2} kg
                    </span>
                    <span className="text-[10px] font-bold text-[#8c6239]">CO₂e Avoided</span>
                  </div>

                  <div className="bg-white/85 p-2 rounded-xl">
                    <span className="block text-base sm:text-lg font-black text-[#8c6239]">
                      {totalLandfillLiters.toLocaleString()} L
                    </span>
                    <span className="text-[10px] font-bold text-[#8c6239]">Landfill Saved</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.isWholesale ? 'wholesale' : 'retail'}`}
                    className="bg-white/90 border border-[#dacbb7] rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-[#f2ebd9] rounded-xl overflow-hidden shrink-0 border border-[#e6dbc9]">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            item.isWholesale
                              ? 'bg-[#8c6239] text-white'
                              : 'bg-[#2d6a4f] text-white'
                          }`}>
                            {item.isWholesale ? 'Wholesale Tier' : 'Retail'}
                          </span>
                          <span className="text-[11px] font-bold text-[#8c6239]">
                            ♻️ {(item.packetsSaved * item.quantity).toLocaleString()} packets
                          </span>
                        </div>

                        <h4 className="text-sm font-black text-[#1b4332] leading-tight mt-0.5">
                          {item.name}
                        </h4>

                        <div className="text-xs text-gray-500 font-semibold mt-0.5">
                          ${item.price.toFixed(2)} / unit
                        </div>
                      </div>
                    </div>

                    {/* Stepper & Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f0e7d5]">
                      <div className="flex items-center bg-[#ede4d4] rounded-xl p-1 border border-[#dacbb7]">
                        <button
                          onClick={() => {
                            const minLimit = item.isWholesale ? item.wholesaleMOQ : 1;
                            if (item.quantity > minLimit) {
                              onUpdateQuantity(item.id, item.isWholesale, item.quantity - 1);
                            } else {
                              onRemoveItem(item.id, item.isWholesale);
                            }
                          }}
                          className="w-7 h-7 flex items-center justify-center font-black text-sm text-[#432818] hover:bg-[#d4a373]/30 rounded-lg"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-black text-xs text-[#1b4332]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.isWholesale, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center font-black text-sm text-[#432818] hover:bg-[#d4a373]/30 rounded-lg"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="block text-sm font-black text-[#1b4332]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id, item.isWholesale)}
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations Breakdown */}
              <div className="bg-[#ede5d6]/70 rounded-2xl p-4 border border-[#dacbb7] space-y-2 text-xs">
                <div className="flex justify-between text-[#432818]">
                  <span>Subtotal:</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {ecoDiscount > 0 && (
                  <div className="flex justify-between text-[#2d6a4f] font-bold">
                    <span>🌱 Circular Earth Reward (5% discount):</span>
                    <span>-${ecoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#432818]">
                  <span>Carbon-Neutral Electric Delivery:</span>
                  <span className="font-bold text-[#2d6a4f]">FREE ⚡</span>
                </div>

                <div className="pt-2 border-t border-[#dacbb7] flex justify-between items-baseline text-sm">
                  <span className="font-black text-[#1b4332]">Total Amount:</span>
                  <span className="text-xl font-black text-[#1b4332]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with Big Place Order Button */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#f2ebd9] border-t border-[#e6dbc9] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="text-xs text-[#8c6239] font-bold block">
                Total Environmental Diversion:
              </span>
              <span className="text-sm font-black text-[#1b4332]">
                {totalPackets.toLocaleString()} plastic snack wrappers diverted!
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full sm:w-auto py-3.5 px-8 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#f7f3ea] font-black text-base rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>🌱 Place RePlank Order</span>
              <span>(${grandTotal.toFixed(2)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
