import { LANDING, LANDING_STRIPE } from "@/app/docs/_components/docs-landing/landing-tokens"

const barHeights = [
  [70, 40],
  [100, 55],
  [62, 42],
  [140, 65],
  [118, 58],
  [170, 72],
] as const

function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex h-[350px] items-center justify-center overflow-hidden border-r border-b border-border max-md:border-r-0 md:[&:nth-child(2n)]:border-r-0"
      style={{ background: LANDING.panel }}
    >
      {children}
    </div>
  )
}

export function LandingCharts() {
  return (
    <section className="grid grid-cols-1 border-t border-border md:grid-cols-2">
      <ChartCard>
        <svg viewBox="0 0 500 180" className="max-w-[80%] overflow-visible">
          <path
            d="M0 85 C120 10 190 40 260 92 S390 105 500 70"
            fill="none"
            stroke={LANDING.chartMid}
            strokeWidth="2"
          />
          <path
            d="M0 110 C100 110 150 165 250 135 S390 80 500 110"
            fill="none"
            stroke={LANDING.chartSoft}
            strokeWidth="2"
          />
        </svg>
      </ChartCard>

      <ChartCard>
        <div
          className="grid size-[150px] place-items-center rounded-full"
          style={{
            background: `conic-gradient(${LANDING.chartDark} 0 30%, ${LANDING.chartMid} 30% 58%, ${LANDING.line} 58% 75%, transparent 75%)`,
          }}
        >
          <div
            className="grid size-[78px] place-items-center rounded-full text-center text-[18px] font-black leading-[1.1] text-foreground"
            style={{ background: LANDING.surface }}
          >
            100
            <br />
            total
          </div>
        </div>
      </ChartCard>

      <ChartCard>
        <div
          className="grid size-[190px] place-items-center rounded-full"
          style={{
            background: `repeating-radial-gradient(circle, ${LANDING.line} 0 8px, transparent 9px 18px)`,
          }}
        >
          <div
            className="grid size-[90px] place-items-center rounded-full text-center text-[18px] font-black text-foreground"
            style={{ background: LANDING.surface }}
          >
            11,050
            <br />
            <small className="text-[11px] font-normal">sessions</small>
          </div>
        </div>
      </ChartCard>

      <ChartCard>
        <div className="flex h-[170px] items-end gap-[22px]">
          {barHeights.flatMap(([solid, alt], i) => [
            <span
              key={`bar-${i}-solid`}
              className="w-[22px] rounded-t-lg"
              style={{ height: solid, background: LANDING.chartDark }}
            />,
            <span
              key={`bar-${i}-alt`}
              className="w-[22px] rounded-t-lg border border-border"
              style={{ height: alt, background: LANDING_STRIPE }}
            />,
          ])}
        </div>
      </ChartCard>

      <ChartCard>
        <div className="text-[112px] opacity-25 grayscale">🗺️</div>
      </ChartCard>

      <ChartCard>
        <svg viewBox="0 0 200 200" className="w-[170px]">
          <polygon
            points="100,10 178,55 178,145 100,190 22,145 22,55"
            fill="none"
            stroke={LANDING.line}
          />
          <polygon
            points="100,38 150,66 158,132 100,162 48,138 42,70"
            fill={LANDING.chartMid}
            fillOpacity="0.35"
            stroke={LANDING.chartDark}
            strokeOpacity="0.6"
          />
          <g stroke={LANDING.soft}>
            <line x1="100" y1="10" x2="100" y2="190" />
            <line x1="22" y1="55" x2="178" y2="145" />
            <line x1="178" y1="55" x2="22" y2="145" />
          </g>
        </svg>
      </ChartCard>

      <ChartCard>
        <div
          className="grid size-[190px] place-items-center rounded-full text-center text-[18px] font-black text-foreground"
          style={{
            background: `conic-gradient(${LANDING.chartDark} 0 68%, ${LANDING.line} 68% 82%, transparent 82% 100%)`,
            clipPath: "polygon(0 0, 100% 0, 100% 78%, 50% 50%, 0 78%)",
          }}
        >
          $428,000
          <br />
          <small className="text-[11px] font-normal">APR 2026</small>
        </div>
      </ChartCard>

      <ChartCard>
        <div className="grid grid-cols-[repeat(36,10px)] gap-[7px]">
          {Array.from({ length: 180 }, (_, i) => (
            <span
              key={i}
              className="block size-[10px]"
              style={{
                background:
                  i % 7 === 0
                    ? LANDING.chartDark
                    : i % 3 === 0
                      ? LANDING.soft
                      : LANDING.chartMid,
                opacity: i % 7 === 0 ? 0.75 : i % 3 === 0 ? 0.35 : 0.5,
              }}
            />
          ))}
        </div>
      </ChartCard>
    </section>
  )
}
