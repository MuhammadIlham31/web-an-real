// Adaptive Network Laboratory — logo asset from Figma (public/assets/logo.png)
export default function Logo({ size = 40, showText = true, textColor = "text-[#E3F2FD]", className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/assets/logo.png" width={size} height={size} alt="Logo Adaptive Network Laboratory" />
      {showText && (
        <span className={`text-lg font-semibold tracking-wide ${textColor}`}>
          Adaptive Network Laboratory
        </span>
      )}
    </div>
  );
}
