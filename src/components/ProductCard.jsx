import React, { useState } from 'react';

export const ProductCard = ({ product, isWholesale, onAddToCart, onOpenDetail }) => {
  const minQty = isWholesale ? product.wholesaleMOQ : 1;
  const [quantity, setQuantity] = useState(minQty);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  React.useEffect(() => {
    setQuantity(isWholesale ? product.wholesaleMOQ : 1);
  }, [isWholesale, product.wholesaleMOQ]);

  const activePrice = isWholesale ? product.wholesalePrice : product.retailPrice;
  const itemTotal = (activePrice * quantity).toFixed(2);
  const totalPackets = (product.packetsSaved * quantity).toLocaleString();

  const handleDecrement = (e) => {
    e.stopPropagation();
    const limit = isWholesale ? product.wholesaleMOQ : 1;
    if (quantity > limit) setQuantity(quantity - 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, quantity, isWholesale);
  };

  return (
    <div 
      onClick={() => onOpenDetail(product)}
      className="group bg-[#faf6ef] border-2 border-[#e6dbc9] hover:border-[#8c6239] transition-all duration-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Real Image Header with Eco-Badges */}
        <div className="relative bg-[#ede4d4] overflow-hidden h-48 sm:h-52">
          {/* Eco Badge Pills */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
            <span className="bg-[#1b4332] text-[#f7f3ea] text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span>♻️</span> {product.packetsSaved.toLocaleString()} Packets
            </span>
            {product.badge && (
              <span className="bg-[#8c6239] text-[#f7f3ea] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Wholesale Savings Pill */}
          {isWholesale && (
            <div className="absolute top-3 right-3 z-10 bg-[#ca8a04] text-[#1c1917] font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
              MOQ: {product.wholesaleMOQ} pcs
            </div>
          )}

          {/* Real Photo */}
          {!imgError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#ede4d4] text-center">
              <span className="text-3xl mb-1">♻️</span>
              <span className="text-xs font-bold text-[#8c6239]">{product.name}</span>
            </div>
          )}

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent py-1.5 px-3 text-center">
            <span className="text-[11px] font-bold text-white drop-shadow">
              Click to inspect recycled composition 🔍
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-[#8c6239] font-bold uppercase tracking-wider mb-1">
            <span>{product.category.toUpperCase()}</span>
            <span className="text-[#2d6a4f] flex items-center gap-1">
              ★ {product.rating} <span className="text-gray-400">({product.reviewsCount})</span>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-[#1b4332] leading-snug group-hover:text-[#2d6a4f] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#432818]/70 mt-1 line-clamp-2">
            {product.tagline}
          </p>

          {/* Quick Technical Specs Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="text-[11px] font-semibold bg-[#ede5d6] text-[#432818] px-2 py-0.5 rounded-md">
              📏 {product.dimensions.split('(')[0]}
            </span>
            <span className="text-[11px] font-semibold bg-[#ede5d6] text-[#1b4332] px-2 py-0.5 rounded-md">
              🛡️ {product.durability}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Cart Action Footer */}
      <div className="p-4 sm:p-5 pt-0 mt-auto border-t border-[#ede2d1]">
        {/* Price Row */}
        <div className="flex items-baseline justify-between mt-3 mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#1b4332]">
                ${activePrice.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                / unit
              </span>
              {isWholesale && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.retailPrice.toFixed(2)}
                </span>
              )}
            </div>

            {isWholesale ? (
              <span className="text-[11px] font-extrabold text-[#ca8a04]">
                Wholesale Tier (Save {Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100)}%)
              </span>
            ) : (
              <span className="text-[11px] font-bold text-[#2d6a4f]">
                Retail Price • Carbon-Neutral Ship
              </span>
            )}
          </div>

          {/* Environmental Impact on current qty */}
          <div className="text-right">
            <span className="text-[11px] font-bold text-[#8c6239] block">
              Diverts:
            </span>
            <span className="text-xs font-black text-[#1b4332]">
              {totalPackets} pkts
            </span>
          </div>
        </div>

        {/* Quantity Controls & Big Add to Cart Button */}
        <div className="flex items-center gap-2">
          {/* Big Stepper */}
          <div className="flex items-center bg-[#ede4d4] rounded-2xl p-1 border border-[#dacbb7]">
            <button
              onClick={handleDecrement}
              className="w-9 h-9 flex items-center justify-center font-black text-lg text-[#432818] hover:bg-[#d4a373]/30 rounded-xl active:scale-95 transition-all"
            >
              -
            </button>
            <span className="w-10 text-center font-black text-sm text-[#1b4332]">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-9 h-9 flex items-center justify-center font-black text-lg text-[#432818] hover:bg-[#d4a373]/30 rounded-xl active:scale-95 transition-all"
            >
              +
            </button>
          </div>

          {/* BIG TACTILE ADD TO CART BUTTON */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#f7f3ea] font-black text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>🛒</span>
            <span>Add to Cart</span>
            <span className="text-xs font-normal opacity-85">(${itemTotal})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
