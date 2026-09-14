export default function Logo({ size = 28 }) {
  return (
    <div className="font-display flex select-none items-baseline font-black leading-none" style={{ fontSize: size, letterSpacing: "-0.04em" }}>
      <span className="text-white">S</span>
      <span style={{ color: "#84cc16", marginLeft: -size * 0.14, marginRight: -size * 0.18, fontSize: size * 0.79 }}>b</span>
      <span className="text-white">S</span>
    </div>
  );
}
