"use client";

import { useState, useEffect, useRef } from "react";
import { RotateCcw, Maximize2, X } from "lucide-react";

// ========== CONFIG ==========
const RODS = 9;
const UNIT_POSITION = 5;

// ✅ Responsive sizes
const SIZES = {
  mobile: {
    BEAD_W: 22,
    BEAD_H: 14,
    BEAD_GAP: 2,
    UPPER_DECK_H: 40,
    LOWER_DECK_H: 100,
    BEAM_H: 8,
    ROD_W: 24,
    GAP: 4,
    ROD_THICKNESS: 2,
    UPPER_IDLE_GAP: 3,
    UPPER_ACTIVE_GAP: 0,
    LOWER_ACTIVE_GAP: 8,
    BOTTOM_PAD: 4,
    UNIT_SIZE: 8,
    VALUE_TEXT: "text-xl",
    FRAME_PADDING: 12,
  },
  desktop: {
    BEAD_W: 36,
    BEAD_H: 22,
    BEAD_GAP: 2,
    UPPER_DECK_H: 56,
    LOWER_DECK_H: 140,
    BEAM_H: 12,
    ROD_W: 40,
    GAP: 12,
    ROD_THICKNESS: 4,
    UPPER_IDLE_GAP: 4,
    UPPER_ACTIVE_GAP: 0,
    LOWER_ACTIVE_GAP: 14,
    BOTTOM_PAD: 8,
    UNIT_SIZE: 12,
    VALUE_TEXT: "text-4xl",
    FRAME_PADDING: 16,
  },
};

type SizeConfig = typeof SIZES.mobile;
type Rod = { upper: 0 | 1; lower: number };

function Bead({
  active,
  onClick,
  ariaLabel,
  size,
}: {
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
  size: SizeConfig;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative transition-all duration-200 hover:scale-110 active:scale-95"
      style={{
        width: `${size.BEAD_W}px`,
        height: `${size.BEAD_H}px`,
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [size, setSize] = useState<SizeConfig>(SIZES.desktop);
  const containerRef = useRef<HTMLDivElement>(null);
  const abacusRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // ✅ Detect mobile vs desktop
  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth < 768;
      setSize(isMobile ? SIZES.mobile : SIZES.desktop);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Calculate scale for fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      setScale(1);
      return;
    }

    const computeScale = () => {
      if (!abacusRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const baseWidth = RODS * size.ROD_W + (RODS - 1) * size.GAP + 80;
      const baseHeight =
        size.UPPER_DECK_H + size.LOWER_DECK_H + size.BEAM_H + 200;

      const scaleW = (vw * 0.9) / baseWidth;
      const scaleH = (vh * 0.8) / baseHeight;
      const newScale = Math.min(scaleW, scaleH, 2.5);

      setScale(newScale);
    };

    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, [isFullscreen, size]);

  // Sync with browser fullscreen state
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Lock body scroll when fullscreen
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const enterFullscreen = async () => {
    try {
      if (containerRef.current?.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      }
    } catch {
      // ignore
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
    setIsFullscreen(false);
  };

  // ========== SOUND ==========
  const getAudioCtx = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (Ctx) audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current;
  };

  /**
   * Bead sounds:
   * - activate (PLUS): bright, upward sweep, happy chime
   * - deactivate (MINUS): soft, downward sweep, wooden thud
   * - reset: longer downward sweep
   */
  const playBeadSound = (
    type: "upper" | "lower" | "activate" | "deactivate" | "reset" = "lower"
  ) => {
    const ctx = getAudioCtx();
    if (!ctx) return;

    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // ============================================================
    // PLUS SOUND (activate) — bright, happy, upward sweep ✨
    // ============================================================
    if (type === "activate") {
      // Main bright tone — sweeping up
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1700, now + 0.08);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.20, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);

      // Bright sparkle layer
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(2400, now + 0.01);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.exponentialRampToValueAtTime(0.09, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.14);

      // Warm undertone
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(1200, now);
      gain3.gain.setValueAtTime(0.0001, now);
      gain3.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      osc3.connect(gain3).connect(ctx.destination);
      osc3.start(now);
      osc3.stop(now + 0.12);

      return;
    }

    // ============================================================
    // MINUS SOUND (deactivate) — soft, downward, distinct thud 🪵
    // ============================================================
    if (type === "deactivate") {
      // Main soft downward tone with lowpass filter
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.14);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(2, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(filter).connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);

      // Low wooden "thud" undertone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(180, now);
      osc2.frequency.exponentialRampToValueAtTime(85, now + 0.14);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.exponentialRampToValueAtTime(0.11, now + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.18);

      return;
    }

    // ============================================================
    // RESET SOUND — long, low, soft sweep
    // ============================================================
    if (type === "reset") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.28);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.13, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.34);
      return;
    }

    // ============================================================
    // FALLBACK (upper / lower) — classic wooden click
    // ============================================================
    const baseFreq = type === "upper" ? 900 : 620;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.55, now + 0.06);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(baseFreq * 0.5, now);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(0.09, now + 0.008);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.12);
  };

  const toggleUpper = (i: number) => {
    setRods((prev) => {
      const target = prev[i];
      const willActivate = target.upper === 0;
      playBeadSound(willActivate ? "activate" : "deactivate");
      return prev.map((r, idx) =>
        idx === i ? { ...r, upper: r.upper === 0 ? 1 : 0 } : r
      );
    });
  };

  const toggleLower = (i: number, slot: number) => {
    setRods((prev) => {
      const target = prev[i];
      const isCurrentlyUp = slot < target.lower;
      playBeadSound(isCurrentlyUp ? "deactivate" : "activate");
      return prev.map((r, idx) => {
        if (idx !== i) return r;
        const newLower = isCurrentlyUp ? slot : slot + 1;
        return { ...r, lower: newLower };
      });
    });
  };

  const total = rods.reduce((sum, r) => sum * 10 + r.upper * 5 + r.lower, 0);

  const formattedTotal = (() => {
    const str = total.toString().padStart(RODS, "0");
    const intPart = str.slice(0, UNIT_POSITION).replace(/^0+/, "") || "0";
    const decPart = str.slice(UNIT_POSITION);
    return `${intPart}.${decPart}`;
  })();

  const reset = () => {
    playBeadSound("reset");
    setRods(Array.from({ length: RODS }, () => ({ upper: 0, lower: 0 })));
  };

  const slotSpacing = size.BEAD_H + size.BEAD_GAP;

  const computeUnitOffset = (rodW: number, gap: number) => {
    const containerW = RODS * rodW + (RODS - 1) * gap;
    const center = containerW / 2;
    const rodCenterX = (UNIT_POSITION - 1) * (rodW + gap) + rodW / 2;
    return rodCenterX - center;
  };

  // ===== Abacus UI =====
  const abacusUI = (
    <div
      ref={abacusRef}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        transition: "transform 0.3s ease",
      }}
    >
      {/* ===== Value Display ===== */}
      <div className="relative mb-5 flex justify-center">
        <div className="px-8 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl">
          <p className="text-[9px] text-white/80 uppercase tracking-[0.3em] text-center mb-1 font-semibold">
            Current Value
          </p>
          <p
            className={`font-bold text-white tabular-nums text-center drop-shadow-lg ${size.VALUE_TEXT}`}
          >
            {formattedTotal}
          </p>
        </div>
      </div>

      {/* ===== Abacus Frame ===== */}
      <div
        className="rounded-2xl"
        style={{
          padding: `${size.FRAME_PADDING}px`,
          background: "#ffffff",
          border: "2px solid #e5e7eb",
          boxShadow:
            "0 20px 40px -12px rgba(0,0,0,0.25), 0 8px 16px -8px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="relative rounded-xl"
          style={{
            padding: `${size.FRAME_PADDING}px`,
            background: "#fafafa",
            border: "1px solid #f0f0f0",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="relative flex justify-center"
            style={{ gap: `${size.GAP}px` }}
          >
            {rods.map((rod, i) => (
              <div key={i} className="flex flex-col items-center relative">
                {/* ==== UPPER DECK ==== */}
                <div
                  className="relative"
                  style={{
                    width: `${size.ROD_W}px`,
                    height: `${size.UPPER_DECK_H}px`,
                  }}
                >
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 rounded-full"
                    style={{
                      width: `${size.ROD_THICKNESS}px`,
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
                          ? `${
                              size.UPPER_DECK_H -
                              size.BEAD_H -
                              size.UPPER_ACTIVE_GAP
                            }px`
                          : `${size.UPPER_IDLE_GAP}px`,
                    }}
                  >
                    <Bead
                      active={rod.upper === 1}
                      onClick={() => toggleUpper(i)}
                      ariaLabel={`Upper bead rod ${i + 1}`}
                      size={size}
                    />
                  </div>
                </div>

                {/* ==== LOWER DECK ==== */}
                <div
                  className="relative"
                  style={{
                    width: `${size.ROD_W}px`,
                    height: `${size.LOWER_DECK_H}px`,
                  }}
                >
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 rounded-full"
                    style={{
                      width: `${size.ROD_THICKNESS}px`,
                      background:
                        "linear-gradient(90deg, #6b7280 0%, #9ca3af 30%, #e5e7eb 50%, #9ca3af 70%, #6b7280 100%)",
                      boxShadow: "0 0 2px rgba(0,0,0,0.15)",
                    }}
                  />

                  {[0, 1, 2, 3].map((slot) => {
                    const active = slot < rod.lower;

                    const top = active
                      ? size.LOWER_ACTIVE_GAP + slot * slotSpacing
                      : size.LOWER_DECK_H -
                        size.BOTTOM_PAD -
                        size.BEAD_H -
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
                          size={size}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Continuous Beam */}
            <div
              className="absolute left-0 right-0 z-20 pointer-events-none rounded-sm"
              style={{
                top: `${size.UPPER_DECK_H}px`,
                height: `${size.BEAM_H}px`,
                background:
                  "linear-gradient(180deg, #4b5563 0%, #6b7280 30%, #374151 70%, #1f2937 100%)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
              }}
            />

            {/* Unit Point */}
            <div
              className="absolute z-30 pointer-events-none"
              style={{
                top: `${size.UPPER_DECK_H + size.BEAM_H / 2}px`,
                left: "50%",
                transform: "translate(-50%, -50%)",
                marginLeft: `${computeUnitOffset(size.ROD_W, size.GAP)}px`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${size.UNIT_SIZE}px`,
                  height: `${size.UNIT_SIZE}px`,
                  background: "#fbbf24",
                  boxShadow: "0 0 0 2px #ffffff, 0 1px 3px rgba(0,0,0,0.35)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ===== Main render =====
  return (
    <div
      ref={containerRef}
      className={
        isFullscreen
          ? "fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
          : "w-full h-full flex flex-col items-center justify-center p-2 sm:p-3 md:p-5"
      }
      style={
        isFullscreen
          ? {
              background:
                "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
            }
          : undefined
      }
    >
      {/* Exit button — top right (fullscreen only) */}
      {isFullscreen && (
        <button
          onClick={exitFullscreen}
          className="absolute top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Exit fullscreen"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
          <span className="hidden sm:inline">Exit</span>
        </button>
      )}

      {/* Abacus */}
      {abacusUI}

      {/* Controls — below abacus (only in normal mode) */}
      {!isFullscreen && (
        <>
          <div className="flex items-center gap-2 mt-3 sm:mt-4">
            <button
              onClick={reset}
              className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <RotateCcw
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500"
                strokeWidth={2.5}
              />
              Reset
            </button>

            <button
              onClick={enterFullscreen}
              className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <Maximize2
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform"
                strokeWidth={2.5}
              />
              Fullscreen
            </button>
          </div>

          <p className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] text-white/80 tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center font-medium px-2">
            Upper down = +5 · Lower up = +1
          </p>
        </>
      )}

      {/* Reset button (fullscreen mode) */}
      {isFullscreen && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button
            onClick={reset}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            <RotateCcw
              className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500"
              strokeWidth={2.5}
            />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}