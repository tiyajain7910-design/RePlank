import React from 'react';

export const Header = ({
  cartCount,
  totalPacketsInCart,
  onOpenCart,
  isWholesale,
  onToggleWholesale,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f7f3ea]/95 backdrop-blur-md border-b-2 border-[#e6dbc9] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Identity: RePlank */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#1b4332] text-[#f7f3ea] flex items-center justify-center text-xl sm:text-2xl shadow-sm border border-[#52b788]/40">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-xl font-black text-[#1b4332] tracking-tight">
                RePlank
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#8c6239] bg-[#ede4d4] px-1.5 py-0.5 rounded">
                EcoBoards
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-[#432818]/70 hidden xs:block">
              Recycled Chips & Biscuit Packets
            </p>
          </div>
        </div>

        {/* Search Bar (Mobile & Desktop) */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search boards, furniture, roofs, bricks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 sm:pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#dacbb7] rounded-xl focus:border-[#1b4332] focus:ring-1 focus:ring-[#1b4332] outline-none text-[#432818] placeholder-gray-400 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions: Wholesale Toggle & Cart Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Wholesale Switch (Compact for Mobile) */}
          <button
            onClick={() => onToggleWholesale(!isWholesale)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all border ${
              isWholesale
                ? 'bg-[#8c6239] text-white border-[#8c6239] shadow-sm'
                : 'bg-[#ede4d4] text-[#432818] border-[#dacbb7] hover:bg-[#dfd4c0]'
            }`}
            title="Toggle between retail customer prices and bulk wholesale B2B pricing"
          >
            <span>{isWholesale ? '🏭 Wholesale Active' : '🌿 Retail Mode'}</span>
          </button>

          {/* BIG TACTILE CART BUTTON */}
          <button
            onClick={onOpenCart}
            className="relative py-2 px-3 sm:py-2.5 sm:px-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#f7f3ea] rounded-2xl font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            aria-label="Open Cart"
          >
            <span className="text-base sm:text-lg">🛒</span>
            <span className="hidden sm:inline">Cart</span>
            
            {/* Cart Items Count Badge */}
            <span className="w-5 h-5 rounded-full bg-[#ca8a04] text-[#1c1917] font-black text-[11px] flex items-center justify-center">
              {cartCount}
            </span>

            {/* Packets Diverted Pill inside Cart button */}
            {totalPacketsInCart > 0 && (
              <span className="hidden lg:inline text-[11px] font-bold bg-[#2d6a4f] px-2 py-0.5 rounded-full text-white/95">
                ♻️ {totalPacketsInCart.toLocaleString()} pkts
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
