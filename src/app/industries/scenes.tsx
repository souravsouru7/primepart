"use client";

import { motion, type TargetAndTransition, type Transition } from "motion/react";
import { useId, type ComponentType, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   Animated blueprint scenes, one per industry in the brief.

   Gold line-work on navy, drawn inline so nothing is fetched. Every
   loop runs only while `play` is true — the stage passes false for
   scenes that are off screen, inactive, or for readers who prefer
   reduced motion — and falls back to a still frame otherwise.
═══════════════════════════════════════════════════════════════ */

const GOLD = "#F4AE13";
const LINE = { stroke: GOLD, strokeWidth: 1.6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PANEL = "rgba(22,32,46,0.9)";
const WATER = "#7CC4FF";
const HOT = "#FF8A2A";

type SceneProps = { play: boolean };

/** Props for a looping motion: the frames while playing, `still` otherwise. */
function loop(
  play: boolean,
  frames: TargetAndTransition,
  still: TargetAndTransition,
  transition: Transition,
) {
  return play
    ? { animate: frames, transition: { repeat: Infinity, ...transition } }
    : { animate: still, transition: { duration: 0.3 } };
}

/** Rotate about a fixed point in scene coordinates. */
// Set through motion's own origin values: when motion animates `rotate`
// it writes transform-origin itself and would override a CSS one.
const pivot = (x: number, y: number) => ({
  transformBox: "view-box" as const,
  originX: `${x}px`,
  originY: `${y}px`,
});

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={label} className="h-full w-full">
      {children}
    </svg>
  );
}

/* ─────────────────────────── Hydroelectric ─────────────────────────── */

function HydroScene({ play }: SceneProps) {
  const clip = useId();
  return (
    <Frame label="Animated drawing of a dam, penstock and turbine">
      <defs>
        <clipPath id={clip}>
          <rect x="0" y="100" width="168" height="210" />
        </clipPath>
      </defs>

      {/* reservoir */}
      <rect x="0" y="112" width="168" height="198" fill={WATER} opacity="0.1" />
      <g clipPath={`url(#${clip})`}>
        {[118, 140, 166].map((y, i) => (
          <motion.path
            key={y}
            d={`M-60 ${y} q12 -6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0`}
            stroke={WATER}
            strokeWidth="1.4"
            fill="none"
            opacity={0.55 - i * 0.12}
            {...loop(play, { x: [0, 48] }, { x: 0 }, { duration: 2.6 + i * 0.6, ease: "linear" })}
          />
        ))}
      </g>

      {/* dam wall */}
      <path d="M150 88 L192 88 L232 310 L150 310 Z" {...LINE} fill={PANEL} />
      {[130, 175, 220, 265].map((y) => (
        <line key={y} x1={150} x2={150 + 42 + (y - 88) * 0.18} y1={y} y2={y} stroke={GOLD} strokeWidth="0.8" opacity="0.35" />
      ))}

      {/* penstock: pipe walls and the water running down it */}
      <path d="M176 150 L292 246" {...LINE} strokeWidth="14" stroke="rgba(244,174,19,0.18)" />
      <path d="M176 150 L292 246" {...LINE} strokeWidth="1.6" transform="translate(0 -7)" />
      <path d="M176 150 L292 246" {...LINE} strokeWidth="1.6" transform="translate(0 7)" />
      <motion.path
        d="M176 150 L292 246"
        stroke={WATER}
        strokeWidth="3"
        strokeDasharray="7 11"
        strokeLinecap="round"
        {...loop(play, { strokeDashoffset: [0, -36] }, { strokeDashoffset: 0 }, { duration: 0.7, ease: "linear" })}
      />

      {/* turbine */}
      <circle cx="312" cy="262" r="36" {...LINE} fill={PANEL} />
      <motion.g style={pivot(312, 262)} {...loop(play, { rotate: [0, 360] }, { rotate: 0 }, { duration: 2.2, ease: "linear" })}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path
            key={a}
            d="M312 262 C318 248 324 240 330 236"
            {...LINE}
            transform={`rotate(${a} 312 262)`}
          />
        ))}
        <circle cx="312" cy="262" r="5" fill={GOLD} />
      </motion.g>

      {/* generator */}
      <rect x="352" y="176" width="86" height="64" rx="8" {...LINE} fill={PANEL} />
      <motion.circle
        cx="395"
        cy="208"
        r="16"
        fill={GOLD}
        {...loop(play, { opacity: [0.15, 0.55, 0.15] }, { opacity: 0.3 }, { duration: 1.6, ease: "easeInOut" })}
      />
      <path d="M389 200 L398 208 L392 210 L401 218" {...LINE} strokeWidth="2" />
      <path d="M312 226 L312 208 L352 208" {...LINE} strokeDasharray="3 4" opacity="0.6" />

      {/* accumulators with a gauge */}
      {[360, 396].map((x) => (
        <rect key={x} x={x} y="262" width="24" height="48" rx="12" {...LINE} fill={PANEL} />
      ))}
      <circle cx="446" cy="276" r="13" {...LINE} fill={PANEL} />
      <motion.line
        x1="446"
        y1="276"
        x2="446"
        y2="266"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinecap="round"
        style={pivot(446, 276)}
        {...loop(play, { rotate: [-35, 40, -35] }, { rotate: 0 }, { duration: 3, ease: "easeInOut" })}
      />

      {/* tailrace */}
      <line x1="0" x2="480" y1="310" y2="310" {...LINE} opacity="0.6" />
      {[322, 336].map((y, i) => (
        <motion.line
          key={y}
          x1="250"
          x2="480"
          y1={y}
          y2={y}
          stroke={WATER}
          strokeWidth="1.6"
          strokeDasharray="14 10"
          opacity={0.6 - i * 0.2}
          {...loop(play, { strokeDashoffset: [0, -48] }, { strokeDashoffset: 0 }, { duration: 1.4 + i * 0.4, ease: "linear" })}
        />
      ))}
    </Frame>
  );
}

/* ─────────────────────────── Forging & steel ─────────────────────────── */

const STRIKE: Transition = { duration: 1.9, ease: "easeInOut", times: [0, 0.42, 0.5, 1] };

function ForgeScene({ play }: SceneProps) {
  const sparks = [
    [-46, -10], [-34, -30], [-14, -40], [12, -42], [32, -30], [48, -12], [-52, 4], [54, 2],
  ];
  return (
    <Frame label="Animated drawing of a hydraulic forging press striking hot metal">
      {/* floor and anvil */}
      <line x1="40" x2="440" y1="322" y2="322" {...LINE} opacity="0.6" />
      <rect x="176" y="298" width="128" height="24" rx="3" {...LINE} fill={PANEL} />

      {/* frame */}
      <rect x="136" y="58" width="24" height="264" {...LINE} fill={PANEL} />
      <rect x="320" y="58" width="24" height="264" {...LINE} fill={PANEL} />
      <rect x="124" y="44" width="232" height="44" rx="4" {...LINE} fill={PANEL} />
      <rect x="212" y="88" width="56" height="52" rx="4" {...LINE} fill={PANEL} />

      {/* side cylinders with pressure flowing */}
      {[92, 388].map((x) => (
        <g key={x}>
          <rect x={x - 12} y="120" width="24" height="150" rx="4" {...LINE} fill={PANEL} />
          <motion.line
            x1={x}
            x2={x}
            y1="128"
            y2="262"
            stroke={GOLD}
            strokeWidth="3"
            strokeDasharray="5 9"
            strokeLinecap="round"
            {...loop(play, { strokeDashoffset: [0, -28] }, { strokeDashoffset: 0 }, { duration: 0.8, ease: "linear" })}
          />
        </g>
      ))}

      {/* glowing billet, flaring at the strike */}
      <motion.rect
        x="204"
        y="268"
        width="72"
        height="30"
        rx="4"
        fill={HOT}
        {...loop(play, { opacity: [0.65, 0.65, 1, 0.65] }, { opacity: 0.75 }, STRIKE)}
      />
      <rect x="204" y="268" width="72" height="30" rx="4" {...LINE} stroke="#FFC27A" />

      {/* ram and die */}
      <motion.g {...loop(play, { y: [0, 0, 58, 0] }, { y: 0 }, STRIKE)}>
        <rect x="231" y="140" width="18" height="52" {...LINE} fill={PANEL} />
        <rect x="194" y="192" width="92" height="18" rx="3" {...LINE} fill={PANEL} />
      </motion.g>

      {/* sparks */}
      {sparks.map(([dx, dy], i) => (
        <motion.circle
          key={i}
          cx="240"
          cy="268"
          r="2.2"
          fill={i % 2 ? "#FFD27A" : HOT}
          {...loop(
            play,
            { opacity: [0, 0, 1, 0], x: [0, 0, dx * 0.4, dx], y: [0, 0, dy * 0.4, dy + 18] },
            { opacity: 0, x: 0, y: 0 },
            { duration: 1.9, ease: "easeOut", times: [0, 0.49, 0.56, 0.85] },
          )}
        />
      ))}

      {/* heat shimmer */}
      {[218, 240, 262].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 262 q5 -8 0 -16 q-5 -8 0 -16`}
          stroke={HOT}
          strokeWidth="1.4"
          fill="none"
          {...loop(
            play,
            { opacity: [0, 0.7, 0], y: [0, -26] },
            { opacity: 0, y: 0 },
            { duration: 2.2, ease: "easeOut", delay: i * 0.45 },
          )}
        />
      ))}
    </Frame>
  );
}

/* ─────────────────────────── Paper & pulp ─────────────────────────── */

const SHEET =
  "M14 174 H70 Q110 174 110 200 Q110 226 150 226 Q190 226 190 200 Q190 174 230 174 Q270 174 270 200 Q270 226 310 226 Q350 226 350 200 Q350 174 390 174 H466";

function PaperScene({ play }: SceneProps) {
  const rollers = [70, 150, 230, 310, 390];
  return (
    <Frame label="Animated drawing of paper mill rollers running a sheet">
      {/* process pipe with a valve hand-wheel */}
      <line x1="112" x2="400" y1="92" y2="92" {...LINE} strokeWidth="8" stroke="rgba(244,174,19,0.18)" />
      <line x1="112" x2="400" y1="88" y2="88" {...LINE} />
      <line x1="112" x2="400" y1="96" y2="96" {...LINE} />
      <motion.line
        x1="112"
        x2="400"
        y1="92"
        y2="92"
        stroke={GOLD}
        strokeWidth="2"
        strokeDasharray="4 10"
        {...loop(play, { strokeDashoffset: [0, -28] }, { strokeDashoffset: 0 }, { duration: 0.9, ease: "linear" })}
      />
      <circle cx="90" cy="92" r="22" {...LINE} fill={PANEL} />
      <motion.g style={pivot(90, 92)} {...loop(play, { rotate: [0, 360] }, { rotate: 0 }, { duration: 6, ease: "linear" })}>
        {[0, 60, 120].map((a) => (
          <line key={a} x1="72" x2="108" y1="92" y2="92" {...LINE} transform={`rotate(${a} 90 92)`} />
        ))}
        <circle cx="90" cy="92" r="4" fill={GOLD} />
      </motion.g>

      {/* filter housing dripping clean fluid */}
      <rect x="400" y="54" width="52" height="80" rx="10" {...LINE} fill={PANEL} />
      <line x1="410" x2="442" y1="74" y2="74" {...LINE} opacity="0.5" />
      <line x1="410" x2="442" y1="90" y2="90" {...LINE} opacity="0.5" />
      <line x1="410" x2="442" y1="106" y2="106" {...LINE} opacity="0.5" />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="426"
          cy="140"
          r="3"
          fill={WATER}
          {...loop(
            play,
            { opacity: [0, 1, 0], y: [0, 26] },
            { opacity: 0, y: 0 },
            { duration: 1.2, ease: "easeIn", delay: i * 0.4 },
          )}
        />
      ))}

      {/* machine bed */}
      <rect x="36" y="248" width="408" height="14" rx="3" {...LINE} fill={PANEL} />
      {[60, 240, 420].map((x) => (
        <line key={x} x1={x} x2={x} y1="262" y2="316" {...LINE} />
      ))}
      <line x1="20" x2="460" y1="316" y2="316" {...LINE} opacity="0.6" />

      {/* rollers */}
      {rollers.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="200" r="24" {...LINE} fill={PANEL} />
          <motion.g
            style={pivot(x, 200)}
            {...loop(
              play,
              { rotate: i % 2 ? [0, -360] : [0, 360] },
              { rotate: 0 },
              { duration: 1.8, ease: "linear" },
            )}
          >
            <line x1={x - 18} x2={x + 18} y1="200" y2="200" {...LINE} opacity="0.7" />
            <line x1={x} x2={x} y1="182" y2="218" {...LINE} opacity="0.7" />
          </motion.g>
          <circle cx={x} cy="200" r="3.5" fill={GOLD} />
        </g>
      ))}

      {/* the sheet, running over and under */}
      <path d={SHEET} stroke="rgba(242,241,236,0.85)" strokeWidth="3.2" fill="none" />
      <motion.path
        d={SHEET}
        stroke={GOLD}
        strokeWidth="3.2"
        fill="none"
        strokeDasharray="5 16"
        {...loop(play, { strokeDashoffset: [0, -42] }, { strokeDashoffset: 0 }, { duration: 0.8, ease: "linear" })}
      />

      {/* steam off the dryer section */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={220 + i * 18}
          cy="150"
          r="8"
          fill="rgba(242,241,236,0.25)"
          {...loop(
            play,
            { opacity: [0, 0.8, 0], y: [0, -42], scale: [0.6, 1.5] },
            { opacity: 0, y: 0, scale: 0.6 },
            { duration: 2.4, ease: "easeOut", delay: i * 0.7 },
          )}
        />
      ))}
    </Frame>
  );
}

/* ─────────────────────────── Mobile & earthmoving ─────────────────────────── */

const DIG: Transition = { duration: 3.4, ease: "easeInOut" };

function MobileScene({ play }: SceneProps) {
  return (
    <Frame label="Animated drawing of an excavator digging">
      {/* ground, with soil drifting past */}
      <line x1="0" x2="480" y1="300" y2="300" {...LINE} opacity="0.6" />
      <motion.line
        x1="0"
        x2="480"
        y1="312"
        y2="312"
        stroke={GOLD}
        strokeWidth="1.4"
        strokeDasharray="2 14"
        opacity="0.5"
        {...loop(play, { strokeDashoffset: [0, 32] }, { strokeDashoffset: 0 }, { duration: 1.4, ease: "linear" })}
      />
      <path d="M352 300 Q390 270 440 300" {...LINE} fill="rgba(244,174,19,0.12)" opacity="0.7" />

      {/* tracks */}
      <rect x="100" y="262" width="196" height="38" rx="19" {...LINE} fill={PANEL} />
      <motion.rect
        x="106"
        y="268"
        width="184"
        height="26"
        rx="13"
        fill="none"
        stroke={GOLD}
        strokeWidth="2"
        strokeDasharray="6 6"
        {...loop(play, { strokeDashoffset: [0, -24] }, { strokeDashoffset: 0 }, { duration: 0.9, ease: "linear" })}
      />
      {[124, 164, 204, 244, 274].map((x) => (
        <g key={x}>
          <circle cx={x} cy="281" r="8" {...LINE} fill={PANEL} />
          <motion.line
            x1={x - 6}
            x2={x + 6}
            y1="281"
            y2="281"
            {...LINE}
            style={pivot(x, 281)}
            {...loop(play, { rotate: [0, 360] }, { rotate: 0 }, { duration: 1.1, ease: "linear" })}
          />
        </g>
      ))}

      {/* house and cab */}
      <rect x="120" y="206" width="132" height="56" rx="6" {...LINE} fill={PANEL} />
      <path d="M200 206 L200 158 L246 158 L252 206 Z" {...LINE} fill={PANEL} />
      <path d="M208 166 L240 166 L244 198 L208 198 Z" {...LINE} fill="rgba(124,196,255,0.15)" strokeWidth="1.2" />
      <rect x="108" y="214" width="20" height="40" rx="4" {...LINE} fill={PANEL} />

      {/* boom ▸ arm ▸ bucket, each swinging about its own pin */}
      <motion.g style={pivot(240, 214)} {...loop(play, { rotate: [0, -10, 4, 0] }, { rotate: 0 }, DIG)}>
        <path d="M232 220 L248 208 L338 112 L326 104 Z" {...LINE} fill={PANEL} />
        {/* boom cylinder */}
        <line x1="214" y1="236" x2="290" y2="160" {...LINE} strokeWidth="5" stroke="rgba(244,174,19,0.35)" />
        <motion.line
          x1="250"
          y1="200"
          x2="292"
          y2="158"
          stroke={GOLD}
          strokeWidth="2.2"
          strokeLinecap="round"
          {...loop(play, { pathLength: [0.75, 1, 0.85, 0.75] }, { pathLength: 1 }, DIG)}
        />
        <circle cx="240" cy="214" r="4" fill={GOLD} />

        <motion.g style={pivot(332, 108)} {...loop(play, { rotate: [0, 22, 10, 0] }, { rotate: 0 }, DIG)}>
          <path d="M326 104 L338 112 L392 214 L380 220 Z" {...LINE} fill={PANEL} />
          <circle cx="332" cy="108" r="4" fill={GOLD} />

          <motion.g style={pivot(386, 217)} {...loop(play, { rotate: [0, 50, 20, 0] }, { rotate: 0 }, DIG)}>
            <path d="M386 217 L414 228 L406 256 L378 246 Z" {...LINE} fill={PANEL} />
            <path d="M378 246 L374 256 M390 251 L387 261 M402 255 L400 265" {...LINE} />
            <circle cx="386" cy="217" r="3.5" fill={GOLD} />
            {/* soil spilling as the bucket curls */}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={384 + i * 6}
                cy="258"
                r="2.4"
                fill="#C9901B"
                {...loop(
                  play,
                  { opacity: [0, 0, 1, 0], y: [0, 0, 6, 26] },
                  { opacity: 0, y: 0 },
                  { ...DIG, times: [0, 0.45, 0.55, 0.8], delay: i * 0.05 },
                )}
              />
            ))}
          </motion.g>
        </motion.g>
      </motion.g>
    </Frame>
  );
}

/** Scene for each industry id in industries-data. */
export const scenes: Record<string, ComponentType<SceneProps>> = {
  hydroelectric: HydroScene,
  "forging-steel": ForgeScene,
  "paper-pulp": PaperScene,
  "mobile-earthmoving": MobileScene,
};
