interface MarqueeBarProps {
  text: string;
  reverse?: boolean;
  className?: string;
}

export default function MarqueeBar({
  text,
  reverse = false,
  className = "",
}: MarqueeBarProps) {
  const repeated = `${text} `.repeat(12);

  return (
    <div
      className={`overflow-hidden w-full border-y border-dark-border py-3 ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex w-max whitespace-nowrap font-bebas text-sm tracking-[4px] text-lime ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
}
