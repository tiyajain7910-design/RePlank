import React, { useState } from 'react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxh8VBKierqD4WL4sKNZyqaDheqs36o26FDSS-O6Ff71ytiSPZuhfenJx1UBgs1djUDig/exec';

export const OrderConfirmationModal = ({ isOpen, onClose, cartItems, onCompleteOrder }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    address: 'Plot 42, Eco Living Avenue, Sector 5, Bengaluru, PIN 560102',
    product: cartItems.length > 0
      ? cartItems.map(i => `${i.name} [${i.isWholesale ? 'Wholesale' : 'Retail'}]`).join(', ')
      : 'Standard 18mm Recycled Board (8ft x 4ft)',
    quantity: cartItems.reduce((acc, i) => acc + i.quantity, 0) || 1,
    message: ''
  });

  const formatINR = (val) => '₹' + Math.round(val).toLocaleString('en-IN');

  const totalPackets = cartItems.reduce((acc, item) => acc + item.packetsSaved * item.quantity, 0);
  const totalCO2 = cartItems.reduce((acc, item) => acc + (item.co2SavedKg || 5) * item.quantity, 0).toFixed(1);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = subtotal > 5000 ? subtotal * 0.95 : subtotal;

  const orderId = 'REPLANK-IN-' + Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formDataObj = new FormData(form);
    const params = new URLSearchParams(formDataObj);

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: params
    }).catch((err) => console.error('Order submission error:', err));

    form.reset();
    setStep('success');
    onCompleteOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-[#faf6ef] border-2 border-[#1b4332] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        {step === 'form' ? (
          <>
            {/* Form Header */}
            <div className="p-4 sm:p-5 bg-[#f2ebd9] border-b border-[#e6dbc9] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#8c6239] bg-[#ede4d4] px-2 py-0.5 rounded">
                  Zero-Emission EV Delivery • Pan-India
                </span>
                <h2 className="text-xl font-black text-[#1b4332] mt-0.5">
                  Confirm Your RePlank Order
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#ede4d4] hover:bg-[#d4a373]/40 text-[#432818] font-black text-xl flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
              {/* Impact Callout */}
              <div className="bg-[#e8f2ea] border border-[#52b788] rounded-2xl p-3 flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <span className="font-black text-[#1b4332] block">
                    You are saving {totalPackets.toLocaleString('en-IN')} snack packets today!
                  </span>
                  <span className="text-[11px] text-[#2d6a4f]">
                    Zero landfill burden, zero microplastic ocean leakage.
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h3 className="font-black text-[#432818] uppercase text-xs tracking-wider">
                  Customer & Shipping Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#dacbb7] rounded-xl focus:border-[#1b4332] outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Mobile Contact (+91)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#dacbb7] rounded-xl focus:border-[#1b4332] outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#dacbb7] rounded-xl focus:border-[#1b4332] outline-none text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Product</label>
                    <input
                      type="text"
                      name="product"
                      required
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#dacbb7] rounded-xl focus:border-[#1b4332] outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#dacbb7] rounded-xl focus:border-[#1b4332] outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#8c6239] mb-1">
                    Message / Delivery Notes / GSTIN
                  </label>
                  <textarea
                    name="message"
                    rows="2"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Special instructions, wholesale notes, or GSTIN..."
                    className="w-full p-2.5 bg-white border border-[#8c6239] rounded-xl focus:border-[#1b4332] outline-none text-xs"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#f7f3ea] font-black text-base rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>🎉 Confirm & Place RePlank Order ({formatINR(grandTotal)})</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Order Placed Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-5 animate-scaleUp">
            <div className="w-20 h-20 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl">
              ✓
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#2d6a4f] bg-[#e8f2ea] px-3 py-1 rounded-full">
                Order Confirmed • #{orderId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1b4332] mt-2">
                Thank You, Eco-Warrior!
              </h2>
              <p className="text-xs sm:text-sm text-[#432818]/80 mt-1 max-w-md mx-auto">
                Your order has been forwarded to the RePlank circular plant. We are transforming snack packets into your durable living essentials right now.
              </p>
            </div>

            {/* Environmental Impact Certificate Card */}
            <div className="bg-gradient-to-br from-[#f3ede2] to-[#e8dfcf] border-2 border-[#8c6239] rounded-2xl p-4 sm:p-5 shadow-md text-left">
              <div className="flex items-center justify-between border-b border-[#dacbb7] pb-2 mb-3">
                <span className="text-xs font-black text-[#1b4332] uppercase">
                  Official RePlank Impact Certificate
                </span>
                <span className="text-[11px] font-bold text-[#8c6239]">Certified Circular</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center mb-3">
                <div className="bg-white/80 p-3 rounded-xl border border-[#dacbb7]">
                  <span className="text-2xl font-black text-[#1b4332] block">
                    {totalPackets.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] font-bold text-[#8c6239]">
                    Chips & Biscuit Packets Diverted
                  </span>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-[#dacbb7]">
                  <span className="text-2xl font-black text-[#2d6a4f] block">
                    {totalCO2} kg
                  </span>
                  <span className="text-[11px] font-bold text-[#8c6239]">
                    CO₂ Prevented from Skies
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-[#432818] space-y-1">
                <div><strong>Shipped to:</strong> {formData.name}, {formData.address}, {formData.city}</div>
                <div><strong>Delivery:</strong> Dispatched via 100% Electric Vehicle (EV) Van Fleet across India</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#f7f3ea] font-black text-sm rounded-2xl shadow-md transition-all"
              >
                Back to RePlank Store
              </button>
              <button
                onClick={() => alert(`Certificate #${orderId} generated! Saved to your environmental profile.`)}
                className="flex-1 py-3 px-6 bg-[#8c6239] hover:bg-[#6d4c2b] text-[#f7f3ea] font-bold text-sm rounded-2xl shadow-md transition-all"
              >
                📜 Save Eco-Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
