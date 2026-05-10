"use client";

import { useRef, useState, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  ariaLabel,
  target,
  rel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0, 0)");

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate(${x * 0.2}px, ${y * 0.2}px)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0, 0)");
  };

  const sharedProps = {
    ref: ref as any,
    className: `magnetic-btn ${className}`,
    style: { transform },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} download={download} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...sharedProps} type="button">
      {children}
    </button>
  );
}
