/**
 * Hero ambient background — premium "stone & light" treatment.
 *
 * Aesthetic reference: Aēsop, Loro Piana, The Row, luxury hospitality print.
 * Replaced the previous busy multi-blob mesh with a single, deliberate
 * sequence of layers:
 *
 *   1. Multi-stop diagonal wash — evokes polished marble / travertine paper.
 *   2. Vertical paper-grain stripes — adds a tactile fabric feel at very low
 *      opacity. Gives the page "weight" without pattern noise.
 *   3. Golden-hour bloom from the top-right (sunlight-through-a-window).
 *   4. Quiet cool bloom from the bottom-left (anchoring depth).
 *   5. One traveling hairline per axis — restrained, editorial.
 *
 * All decorative (`pointer-events: none`, hidden from a11y).
 * GPU-cheap: only transform / opacity animate.
 * `prefers-reduced-motion` disables all animations via globals.css.
 */
export function BackgroundMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* 1. Marble-paper diagonal wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(118deg, #F2EAD9 0%, #F8F5EA 18%, #FAFAF7 40%, #F4F2EA 62%, #ECEFE8 82%, #DDE6DC 100%)",
        }}
      />

      {/* 2. Vertical paper-grain stripes — feels like fine fabric weave */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(74, 60, 35, 0.5) 0px, rgba(74, 60, 35, 0.5) 1px, transparent 1px, transparent 6px)",
        }}
      />

      {/* 3. Golden-hour bloom from the top-right */}
      <div
        className="absolute -right-44 -top-60 size-[820px] rounded-full opacity-[0.55] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #E8D5A8 0%, #F0E4C5 35%, transparent 70%)",
          animation: "mesh-1 28s var(--ease-soft) infinite",
        }}
      />

      {/* 4. Cool bloom from the bottom-left — quiet, grounding */}
      <div
        className="absolute -bottom-48 -left-32 size-[680px] rounded-full opacity-[0.5] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, #C8DAD0 0%, #DDE7DE 40%, transparent 70%)",
          animation: "mesh-2 36s var(--ease-soft) infinite",
        }}
      />

      {/* Subtle center bloom keeps the headline area glowing */}
      <div
        className="absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 rounded-full opacity-[0.4] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #FFFFFF 0%, transparent 70%)",
          animation: "mesh-3 32s var(--ease-soft) infinite",
        }}
      />

      {/* 5. Editorial traveling hairlines — one per axis */}
      <div
        className="absolute h-px"
        style={{
          top: "32%",
          left: 0,
          right: 0,
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)",
          width: "55%",
          animation: "line-h-travel 13s linear infinite",
        }}
      />
      <div
        className="absolute w-px"
        style={{
          left: "76%",
          top: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, transparent 0%, var(--color-gold) 50%, transparent 100%)",
          height: "55%",
          opacity: 0.6,
          animation: "line-v-travel 17s linear infinite",
          animationDelay: "-6s",
        }}
      />
    </div>
  );
}
