import React from "react";

/**
 * Card editorial de produto (Cuidado em movimento / catálogo).
 * variant "rail": carrossel com CTA em hover a partir de md.
 * variant "catalog": grid do catálogo com preço visível, sem CTA por hover.
 */
export default function EditorialProductCard({
  href,
  tag,
  image,
  imageAlt,
  title,
  subtitle,
  price = null,
  variant = "rail",
  className = "",
  railCard = false,
}) {
  const isRail = variant === "rail";

  const rootClassName = isRail
    ? `group relative flex h-auto w-[18.25rem] shrink-0 snap-start flex-col items-center overflow-hidden bg-[#F6F4F2] px-2.5 py-2 pb-2.5 text-center transition duration-500 hover:-translate-y-1 max-md:h-full max-md:min-h-0 sm:px-3 sm:py-2.5 sm:pb-3 md:min-h-0 md:h-[31rem] md:w-[20rem] md:p-3.5 md:pb-3.5 lg:h-[34rem] lg:w-[calc((100vw-0.75rem)/4)] lg:p-4 xl:h-[35.5rem] ${className}`.trim()
    : `group relative flex h-full min-h-0 w-full shrink-0 flex-col items-center overflow-x-hidden overflow-y-visible bg-[#F6F4F2] px-2.5 py-2 pb-4 text-center transition duration-500 hover:-translate-y-1 sm:px-3 sm:py-2.5 sm:pb-4 md:p-3.5 md:pb-4 lg:overflow-hidden lg:h-[calc(39rem-40px)] lg:w-full lg:p-4 lg:pb-5 xl:h-[calc(40.5rem-40px)] xl:pb-5 ${className}`.trim();

  const imageShellClass = isRail
    ? "relative mt-2 w-full shrink-0 overflow-hidden bg-[#F6F4F2] px-1 py-0.5 max-md:block max-md:h-[17.25rem] md:flex md:h-[18rem] md:shrink-0 md:items-center md:justify-center md:overflow-visible lg:mt-6 lg:h-[20rem] lg:px-3 lg:pb-1 xl:h-[22rem]"
    : "relative mt-2 w-full shrink-0 overflow-hidden bg-[#F6F4F2] px-1 py-0.5 max-lg:block max-lg:h-[calc(17.25rem-20px)] md:flex md:h-[18rem] md:shrink-0 md:items-center md:justify-center md:overflow-visible lg:mt-6 lg:h-[20rem] lg:px-3 lg:pb-1 xl:h-[22rem]";

  const imgClass = isRail
    ? "relative z-[2] mx-auto h-auto max-h-[min(100%,20rem)] w-auto max-w-[94%] object-contain object-center transition duration-300 ease-out max-md:block max-md:max-h-[min(100%,17rem)] max-md:origin-bottom max-md:scale-[1.25] md:max-h-[min(100%,18rem)] md:origin-center md:scale-100 md:group-hover:scale-[1.02] lg:max-w-[82%]"
    : "relative z-[2] mx-auto h-auto max-h-[min(100%,20rem)] w-auto max-w-[94%] object-contain object-center transition duration-300 ease-out max-lg:block max-lg:max-h-[min(100%,17rem)] max-lg:origin-bottom max-lg:scale-[1.25] md:max-h-[min(100%,18rem)] md:origin-center md:scale-100 md:group-hover:scale-[1.02] lg:max-w-[82%]";

  const textColClass = isRail
    ? "mt-2 w-full min-w-0 px-1 text-center max-md:mt-2 max-md:flex max-md:min-h-0 max-md:flex-1 max-md:flex-col max-md:justify-end md:mt-2 md:flex md:min-h-0 md:flex-1 md:flex-col md:items-center md:justify-between md:px-2 md:pb-2 md:pt-2 lg:mt-auto lg:pt-4"
    : "";

  const textInnerClass = isRail
    ? "w-full shrink-0 px-0.5 py-7 text-center max-md:min-h-0 md:px-0 md:py-0"
    : "";

  /** Catálogo: reserva fixa para 2 linhas de título + 2 de descrição (preço não depende do texto). */
  const catalogTextSlotClass =
    "flex w-full min-w-0 shrink-0 flex-col items-center justify-start px-0.5 pt-2 text-center min-h-[calc(17px*1.24*2+0.25rem+12.5px*1.42*2)] sm:min-h-[calc(18px*1.24*2+0.25rem+12.5px*1.42*2)] md:min-h-[calc(1.2rem*1.24*2+0.25rem+13px*1.42*2)] lg:min-h-[calc(1.98rem*1.08*2+0.875rem+1rem*1.625*2)] lg:px-0 lg:pt-3 xl:min-h-[calc(2.08rem*1.08*2+0.875rem+1rem*1.625*2)]";

  const catalogZone1Class = "flex w-full shrink-0 flex-col items-center";
  const catalogZone2Class =
    "flex w-full shrink-0 flex-col items-stretch justify-start";
  const catalogPriceWrapClass =
    "mt-auto flex w-full shrink-0 flex-col items-center px-0.5 pt-3 lg:pt-4";

  const titleClass = isRail
    ? "mx-auto max-w-[min(100%,28ch)] overflow-hidden text-balance text-pretty font-display text-[17px] font-semibold leading-[1.24] tracking-[-0.02em] text-ink transition-all duration-300 ease-out max-md:line-clamp-2 md:line-clamp-2 md:max-h-[5.5rem] md:max-w-[min(100%,31ch)] md:text-[1.2rem] md:group-hover:max-h-0 md:group-hover:opacity-0 lg:max-w-[min(100%,34ch)] lg:text-[calc(1.98rem-2px)] lg:font-light lg:leading-[1.08] lg:tracking-[-0.03em] xl:text-[calc(2.08rem-2px)]"
    : "mx-auto max-w-[min(100%,28ch)] overflow-hidden text-balance text-pretty font-display text-[17px] font-semibold leading-[1.24] tracking-[-0.02em] text-ink line-clamp-2 sm:text-[18px] md:max-w-[min(100%,31ch)] md:text-[1.2rem] lg:max-w-[min(100%,34ch)] lg:text-[calc(1.98rem-2px)] lg:font-light lg:leading-[1.08] lg:tracking-[-0.03em] xl:text-[calc(2.08rem-2px)]";

  const subtitleClass = isRail
    ? "mx-auto mt-1 line-clamp-2 max-w-[min(100%,28ch)] text-center text-[12.5px] font-light leading-[1.42] text-ink/60 max-md:mt-1 md:max-w-[min(100%,31ch)] md:text-[13px] lg:mt-3.5 lg:max-w-[min(100%,42ch)] lg:text-[1rem] lg:leading-relaxed"
    : "mx-auto mt-1 line-clamp-2 max-w-[min(100%,28ch)] text-center text-[12.5px] font-light leading-[1.42] text-ink/60 max-lg:mt-1 md:max-w-[min(100%,31ch)] md:text-[13px] lg:mt-3.5 lg:max-w-[min(100%,42ch)] lg:text-[1rem] lg:leading-relaxed";

  const priceClass =
    "mx-auto w-full max-w-[min(100%,28ch)] shrink-0 pb-0.5 text-center text-[15px] font-semibold leading-[1.35] tabular-nums tracking-[0.015em] text-ink sm:text-[15.5px] lg:max-w-[min(100%,31ch)] lg:text-[16px] lg:leading-normal lg:tracking-[0.02em]";

  const HeadingTag = isRail ? "h3" : "h2";

  const tagEl = (
    <p className="self-start shrink-0 inline-flex items-center border border-black/6 bg-white px-2.5 py-1 text-[9px] font-semibold uppercase leading-normal tracking-[0.2em] text-ink">
      {tag}
    </p>
  );

  const imageEl = (
    <div className={imageShellClass}>
      <div className="absolute inset-0 z-[1] bg-black/0 transition duration-300 group-hover:bg-black/[0.05]" />
      <img src={image} alt={imageAlt} className={imgClass} />
    </div>
  );

  return (
    <a
      href={href}
      className={rootClassName}
      {...(railCard ? { "data-rail-card": true } : {})}
    >
      {isRail ? (
        <>
          {tagEl}
          {imageEl}
          <div className={textColClass}>
            <div className={textInnerClass}>
              <HeadingTag className={titleClass}>{title}</HeadingTag>
              <p className={subtitleClass}>{subtitle}</p>
            </div>
            <div className="hidden w-full shrink-0 translate-y-3 pt-3.5 opacity-0 pointer-events-none transition-all duration-300 ease-out md:block md:translate-y-3 md:pt-3.5 md:opacity-0 md:pointer-events-none md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100 lg:pt-5">
              <span className="inline-flex h-[46px] w-full items-center justify-center gap-2 bg-black px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                Ver produto
                <span className="text-sm leading-none transition duration-300 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={catalogZone1Class}>
            {tagEl}
            {imageEl}
          </div>
          <div className={catalogZone2Class}>
            <div className={catalogTextSlotClass}>
              <HeadingTag className={titleClass}>{title}</HeadingTag>
              <p className={subtitleClass}>{subtitle}</p>
            </div>
          </div>
          <div className={catalogPriceWrapClass}>
            {price ? <p className={priceClass}>{price}</p> : null}
          </div>
        </>
      )}
    </a>
  );
}
