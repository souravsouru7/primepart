import Image from "next/image";

/**
 * Every decorative layer of the hero: the plates behind the content
 * (`-z-10`) and the silk ribbon that crosses in front of the facility
 * (`z-5`).
 *
 * The whole composition is desktop-only. Below `xl` the hero is a single
 * white column in reading order, so the navy split, the skyline band and
 * the drape are all hidden — the skyline crop in particular only holds
 * at the reference proportions, and at phone height it would expose the
 * interface text baked into the lower half of that plate.
 *
 * `hero-silk-wave-overlay.png` is the supplied transparent drape and
 * replaces the hand-drawn SVG ribbon. `hero-glow-ring.png` is not used:
 * it carries heavy red/yellow fringing along its alpha edge that reads
 * as a halo of artefacts over the navy, and the reference's warm light
 * is diffuse rather than a visible ring — it is a CSS radial gradient
 * here instead. The cityscape plate is from the earlier pack and only
 * its clean top band is shown; its lower half has interface text baked
 * into the pixels.
 */
export default function HeroBackdrop() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden xl:block">
        {/* the whole navy side — gradient, skyline and ambient light — is
            clipped by one mask, so none of it bleeds over the white column */}
        <div className="hero-mask-split absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(118deg,#0B1E29_0%,#06161F_46%,#030E14_100%)]" />

          {/* distant skyline — only the clean top band of the plate */}
          <div className="hero-mask-sky-x absolute left-0 right-0 top-0 h-[23%]">
            <div className="hero-mask-sky-y relative h-full w-full overflow-hidden">
              <Image
                src="/primepart/hero/01-cityscape-dark-background.png"
                alt=""
                width={3840}
                height={1150}
                priority
                className="absolute left-[-12%] top-0 w-[130%] max-w-none opacity-55"
              />
            </div>
          </div>

          {/* warm ambient light over the facility */}
          <div className="absolute left-[calc((100%_-_var(--u)*870)*0.756)] top-[4%] h-[74%] w-[calc(var(--u)*1180)] ml-[calc(var(--u)*-90)] rounded-[50%] bg-[radial-gradient(closest-side,rgba(244,174,19,0.22),rgba(244,174,19,0.07)_58%,transparent_78%)]" />
        </div>
      </div>

      {/* silk drape and gold hairline, in front of the facility */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden xl:block">
        {/* the drape's own white stops short of the trust row's right end,
            so a soft wash carries it to the reference edge */}
        <div className="hero-mask-wash absolute inset-x-0 bottom-0 h-[20%] bg-[linear-gradient(to_right,#FFFFFF_0%,#FBFDFE_52%,rgba(250,252,253,0.9)_64%,rgba(250,252,253,0)_80%)]" />
        <div className="absolute bottom-[calc(var(--u)*-41)] left-[calc(var(--u)*-154)] right-[calc(var(--u)*210)] h-[calc(var(--u)*735)]">
          <Image
            src="/primepart/hero/silk-wave.png"
            alt=""
            fill
            sizes="100vw"
            className="hero-mask-silk object-fill"
          />
        </div>

        <svg
          viewBox="0 0 1536 1024"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M812 886c200-40 414-74 724-62"
            fill="none"
            stroke="#F4AE13"
            strokeWidth="6"
            strokeOpacity="0.25"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M812 886c200-40 414-74 724-62"
            fill="none"
            stroke="#F8C544"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </>
  );
}
