import React from 'react';

export const WholesaleBanner = ({ onContactBulk }) => {
  return (
    <div className="bg-[#ede1ce] border-2 border-[#8c6239] rounded-2xl p-4 sm:p-5 my-4 max-w-6xl mx-auto shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8c6239] text-[#f7f3ea] text-xs font-black uppercase">
            🏭 B2B & Wholesale Contractor Portal
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#432818]">
            Direct Manufacturer Bulk Pricing for Sellers, Carpenters & Civil Builders
          </h2>
          <p className="text-xs sm:text-sm text-[#432818]/80 max-w-3xl">
            Order full pallets of recycled boards, interlocking bricks in truckloads, or cooling roof sheets directly from the factory. 
            Enjoy <strong className="text-[#8c6239]">30% to 45% wholesale margins</strong>, certified carbon credit offset certificates for your green building rating (LEED/GRIHA), and GST commercial tax invoices.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
          <div className="bg-white/80 p-3 rounded-xl border border-[#d4a373] text-center">
            <span className="block text-xs font-bold text-[#8c6239]">Bulk Pallet Freight</span>
            <span className="text-sm font-black text-[#1b4332]">Zero Extra Surcharge</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-[#d4a373] text-center">
            <span className="block text-xs font-bold text-[#8c6239]">Standard Lead Time</span>
            <span className="text-sm font-black text-[#1b4332]">48h Factory Dispatch</span>
          </div>
        </div>
      </div>
    </div>
  );
};
