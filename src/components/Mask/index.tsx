interface IMaskProps {
  rects: Array<{ width: number; height: number; left: number; top: number }>;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  redius?: number;
}
export default function Mask(props: IMaskProps) {
  const { 
  rects, onClick, redius = 5 } = props;
  return (
    <svg
      className="svg"
      style={{ width: "100vw", height: "100vh" }}
      onClick={onClick}
    >
      <defs>
        <mask id="myMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            style={{ stroke: "none", fill: "#ccc" }}
          ></rect>
          {rects.map((rect) => (
            <rect
              width={rect.width}
              height={rect.height}
              x={rect.left}
              y={rect.top}
              rx={redius}
              style={{ fill: "#000" }}
            ></rect>
          ))}
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        style={{
          stroke: "none",
          fill: "rgba(0, 0, 0, 0.6)",
          mask: "url(#myMask)",
        }}
      ></rect>
    </svg>
  );
}
