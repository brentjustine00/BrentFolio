export default function CRTOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
      role="presentation"
    >
      {/* Scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.03]" />
      {/* Vignette */}
      <div className="absolute inset-0 crt-vignette" />
    </div>
  );
}
