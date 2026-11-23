import React from 'react';
import { IMPACT_MILESTONES } from '../data/products.js';

export const ImpactHero = ({ isWholesale, onToggleWholesale }) => {
  return (
    <section className="bg-gradient-to-b from-[#f3ede2] via-[#f7f3ea] to-[#faf8f5] border-b border-[#e5dac9] px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Proud Environmentalist Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="p-2.5 bg-[#1b4332] text-[#f7f3ea] rounded-2xl text-2xl shadow-sm">
              ♻️
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-[#2d6a4f] text-[#f7f3ea]">
                  100% Circular Upcycling
                </span>
                <span className="text-xs font-semibold text-[#8c6239]">
                  Potato Chips & Biscuit Foil Specialists
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332] mt-1 leading-tight">
                RePlank: Turn Discarded Snack Packets Into Indestructible Living
              </h1>
              <p className="text-sm sm:text-base text-[#432818]/80 mt-1 max-w-2xl">
                We transform non-recyclable multi-layer plastics (MLP) from chips and biscuit packets into high-strength, termite-proof plastic boards for <strong className="text-[#1b4332]">designer furniture</strong>, <strong className="text-[#1b4332]">cooling roofs</strong>, and <strong className="text-[#1b4332]">mortar-less interlocking bricks</strong>.
              </p>
            </div>
          </div>

          {/* Wholesale Mode Switcher Card */}
          <div className="bg-[#ede4d4] border-2 border-[#d4a373] p-3.5 rounded-2xl shadow-sm shrink-0">
            <div className="text-xs font-bold text-[#6d4c2b] uppercase tracking-wide mb-1.5 flex items-center justify-between">
              <span>Shopping Mode</span>
              <span className="text-[10px] bg-[#d4a373]/30 px-2 py-0.5 rounded text-[#432818]">
                {isWholesale ? 'B2B Wholesale' : 'Customer Retail'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#dfd4c0] p-1 rounded-xl">
              <button
                onClick={() => onToggleWholesale(false)}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  !isWholesale
                    ? 'bg-[#1b4332] text-white shadow-md'
                    : 'text-[#432818] hover:bg-[#d4a373]/30'
                }`}
              >
                🌿 Retail Store
              </button>
              <button
                onClick={() => onToggleWholesale(true)}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  isWholesale
                    ? 'bg-[#8c6239] text-white shadow-md'
                    : 'text-[#432818] hover:bg-[#d4a373]/30'
                }`}
              >
                🏭 Wholesale Hub
              </button>
            </div>
          </div>
        </div>

        {/* Live Environmental Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mt-2">
          <div className="bg-white/80 backdrop-blur border border-[#d9ccba] rounded-2xl p-3 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-black text-[#1b4332]">
              {IMPACT_MILESTONES.totalPacketsRecycled.toLocaleString()}+
            </div>
            <div className="text-xs font-bold text-[#8c6239] mt-0.5">
              Packets Diverted
            </div>
            <div className="text-[10px] text-gray-500">From Oceans & Landfills</div>
          </div>

          <div className="bg-white/80 backdrop-blur border border-[#d9ccba] rounded-2xl p-3 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-black text-[#2d6a4f]">
              {IMPACT_MILESTONES.landfillSpaceSavedM3.toLocaleString()} m³
            </div>
            <div className="text-xs font-bold text-[#8c6239] mt-0.5">
              Landfill Volume Saved
            </div>
            <div className="text-[10px] text-gray-500">Protected Soil & Ground</div>
          </div>

          <div className="bg-white/80 backdrop-blur border border-[#d9ccba] rounded-2xl p-3 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-black text-[#52b788]">
              {IMPACT_MILESTONES.co2PreventedKg.toLocaleString()} kg
            </div>
            <div className="text-xs font-bold text-[#8c6239] mt-0.5">
              CO₂ Emissions Avoided
            </div>
            <div className="text-[10px] text-gray-500">Vs Burning / Open Dumps</div>
          </div>

          <div className="bg-white/80 backdrop-blur border border-[#d9ccba] rounded-2xl p-3 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-black text-[#8c6239]">
              100%
            </div>
            <div className="text-xs font-bold text-[#8c6239] mt-0.5">
              Water & Termite Proof
            </div>
            <div className="text-[10px] text-gray-500">Zero Wood Harvested</div>
          </div>
        </div>

        {/* 4-Step Circular Lifecycle Strip */}
        <div className="mt-4 bg-[#ede5d6]/70 rounded-2xl p-3 border border-[#dacbb7] flex flex-wrap items-center justify-between text-xs font-medium text-[#432818] gap-2">
          <span className="font-bold text-[#1b4332] flex items-center gap-1.5">
            <span>✨</span> How Chips Packets Become RePlank Products:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/90 px-2 py-1 rounded-md text-[11px] shadow-xs">1. Snack Packets Collected</span>
            <span className="text-[#8c6239]">→</span>
            <span className="bg-white/90 px-2 py-1 rounded-md text-[11px] shadow-xs">2. Shredded & High-Temp Pressed</span>
            <span className="text-[#8c6239]">→</span>
            <span className="bg-white/90 px-2 py-1 rounded-md text-[11px] shadow-xs">3. RePlank Plastic Boards</span>
            <span className="text-[#8c6239]">→</span>
            <span className="bg-[#1b4332] text-white px-2 py-1 rounded-md text-[11px] font-bold shadow-xs">4. Furniture, Roofs & Bricks</span>
          </div>
        </div>
      </div>
    </section>
  );
};
