"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

// ========== CONFIG ==========
const RODS = 9;
const UNIT_POSITION = 5; // unit point at center of 5th rod

const BEAD_H = 24;
const BEAD_GAP = 2;
const UPPER_DECK_H = 56;
const LOWER_DECK_H = 140;
const BEAM_H = 12;

const UPPER_IDLE_GAP = 4;
const UPPER_ACTIVE_GAP = 0;
const LOWER_ACTIVE_GAP = 14;
const BOTTOM_PAD = 8;

// Rod widths & gaps — must match the JSX classes
const ROD_W_BASE = 36; // mobile: w-9 = 36px
const ROD_W_SM = 40;   // sm:     w-10 = 40px
const GAP_BASE = 8;    // mobile: gap-2 = 8px
const GAP_SM = 12;     // sm:     gap-3 = 12px

type Rod = { upper: 0 | 1; lower: number };

function Bead({
  active,
  onClick,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative w-8 h-5 sm:w-9 sm:h-6 transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        borderRadius: "50% / 45%",
        background: active
          ? "radial-gradient(ellipse 60% 55% at 32% 28%, #a7f3d0 0%, #34d399 30%, #059669 65%, #064e3b 100%)"
          : "radial-gradient(ellipse 60% 55% at 32% 28%, #fecaca 0%, #f87171 30%, #dc2626 65%, #7f1d1d 100%)",
        boxShadow: active
          ? "inset 0 -2px 3px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.25)"
          : "inset 0 -2px 3px rgba(0,0,0,0.35), inset 0 2px 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.25)",
      }}
    >
      <span
        className="absolute top-[15%] left-[25%] w-[30%] h-[15%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.8), transparent 70%)",
        }}
      />
    </button>
  );
}

export default function VirtualAbacus() {
  const [rods, setRods] = useState<Rod[]>(
    Array.from({ length: RODS }, () => ({ upper: 0, lower: 0 }))
  );

  const toggleUpper = (i: number) => {
    setRods((prev) =>
      prev.map((r, idx) =>
        idx === i ? { ...r, upper: r.upper === 0 ? 1 : 0 } : r
      )
    );
  };

  const toggleLower = (i: number, slot: number) => {
    setRods((prev) =>
      prev.map((r, idx) => {
        if (idx !== i) return r;
        const isCurrentlyUp = slot < r.lower;
        const newLower = isCurrentlyUp ? slot : slot + 1;
        return { ...r, lower: newLower };
      })
    );
  };

  const total = rods.reduce((sum, r) => sum * 10 + r.upper * 5 + r.lower, 0);

  const formattedTotal = (() => {
    const str = total.toString().padStart(RODS, "0");
    const intPart = str.slice(0, UNIT_POSITION).replace(/^0+/, "") || "0";
    const decPart = str.slice(UNIT_POSITION);
    return `${intPart}.${decPart}`;
  })();

  const reset = () =>
    setRods(Array.from({ length: RODS }, () => ({ upper: 0, lower: 0 })));

  const slotSpacing = BEAD_H + BEAD_GAP;

  // ✅ Compute unit point offset so it sits at the CENTER of the 5th rod
  const computeUnitOffset = (rodW: number, gap: number) => {
    const containerW = RODS * rodW + (RODS - 1) * gap;
    const center = containerW / 2;
    // Center of rod at index (UNIT_POSITION - 1) → 5th rod = index 4
    const rodCenterX = (UNIT_POSITION - 1) * (rodW + gap) + rodW / 2;
    return rodCenterX - center;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 relative">
      {/* ===== Value Display ===== */}
      <div className="relative mb-5 sm:mb-6">
        <div className="px-6 sm:px-8 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl">
          <p className="text-[9px] text-white/80 uppercase tracking-[0.3em] text-center mb-1 font-semibold">
            Current Value
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums text-center drop-shadow-lg">
            {formattedTotal}
          </p>
        </div>
      </div>

      {/* ===== Abacus Frame ===== */}
      <div
        className="rounded-2xl p-3 sm:p-4"
        style={{
          background: "#ffffff",
          border: "2px solid #e5e7eb",
          boxShadow:
            "0 20px 40px -12px rgba(0,0,0,0.25), 0 8px 16px -8px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="relative rounded-xl p-3 sm:p-4"
          style={{
            background: "#fafafa",
            border: "1px solid #f0f0f0",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative flex gap-2 sm:gap-3 justify-center">
            {rods.map((rod, i) => (
              <div key={i} className="flex flex-col items-center relative">
                {/* ==== UPPER DECK ==== */}
                <div
                  className="relative w-9 sm:w-10"
                  style={{ height: `${UPPER_DECK_H}px` }}
                >
                  {/* Bold rod */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #6b7280 0%, #9ca3af 30%, #e5e7eb 50%, #9ca3af 70%, #6b7280 100%)",
                      boxShadow: "0 0 2px rgba(0,0,0,0.15)",
                    }}
                  />

                  <div
                    className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                    style={{
                      top:
                        rod.upper === 1
                          ? `${UPPER_DECK_H - BEAD_H - UPPER_ACTIVE_GAP}px`
                          : `${UPPER_IDLE_GAP}px`,
                    }}
                  >
                    <Bead
                      active={rod.upper === 1}
                      onClick={() => toggleUpper(i)}
                      ariaLabel={`Upper bead rod ${i + 1}`}
                    />
                  </div>
                </div>

                {/* ==== LOWER DECK ==== */}
                <div
                  className="relative w-9 sm:w-10"
                  style={{ height: `${LOWER_DECK_H}px` }}
                >
                  {/* Bold rod */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #6b7280 0%, #9ca3af 30%, #e5e7eb 50%, #9ca3af 70%, #6b7280 100%)",
                      boxShadow: "0 0 2px rgba(0,0,0,0.15)",
                    }}
                  />

                  {[0, 1, 2, 3].map((slot) => {
                    const active = slot < rod.lower;

                    const top = active
                      ? LOWER_ACTIVE_GAP + slot * slotSpacing
                      : LOWER_DECK_H -
                        BOTTOM_PAD -
                        BEAD_H -
                        (3 - slot) * slotSpacing;

                    return (
                      <div
                        key={slot}
                        className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                        style={{ top: `${top}px` }}
                      >
                        <Bead
                          active={active}
                          onClick={() => toggleLower(i, slot)}
                          ariaLabel={`Bead ${slot + 1} rod ${i + 1}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* ==== Beam (continuous) ==== */}
            <div
              className="absolute left-0 right-0 z-20 pointer-events-none"
              style={{
                top: `${UPPER_DECK_H}px`,
                height: `${BEAM_H}px`,
                background:
                  "linear-gradient(180deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
              }}
            />

            {/* ==== Unit Point — desktop ==== */}
            <div
              className="absolute z-30 pointer-events-none hidden sm:block"
              style={{
                top: `${UPPER_DECK_H + BEAM_H / 2}px`,
                left: "50%",
                transform: "translate(-50%, -50%)",
                marginLeft: `${computeUnitOffset(ROD_W_SM, GAP_SM)}px`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: "#fbbf24",
                  boxShadow:
                    "0 0 0 2px #ffffff, 0 1px 3px rgba(0,0,0,0.35)",
                }}
              />
            </div>

            {/* ==== Unit Point — mobile ==== */}
            <div
              className="absolute z-30 pointer-events-none sm:hidden"
              style={{
                top: `${UPPER_DECK_H + BEAM_H / 2}px`,
                left: "50%",
                transform: "translate(-50%, -50%)",
                marginLeft: `${computeUnitOffset(ROD_W_BASE, GAP_BASE)}px`,
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: "#fbbf24",
                  boxShadow:
                    "0 0 0 2px #ffffff, 0 1px 3px rgba(0,0,0,0.35)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Reset Button ===== */}
      <div className="mt-4 sm:mt-5">
        <button
          onClick={reset}
          className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        >
          <RotateCcw
            className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500"
            strokeWidth={2.5}
          />
          Reset
        </button>
      </div>

      <p className="mt-3 text-[10px] text-white/80 tracking-[0.2em] uppercase text-center font-medium">
        Upper down = +5 · Lower up = +1
      </p>
    </div>
  );
}