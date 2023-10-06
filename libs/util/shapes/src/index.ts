export type Point = {
  x: number;
  y: number;
};

// web rectangles have x values that increase from left to right.
// and y values and increase from top to bottom.
export type WebRectangle = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export const isInRect = (p: Point, r: WebRectangle) => {
  return p.x >= r.left && p.x <= r.right && p.y <= r.bottom && p.y >= r.top;
};

type LineOptions = {
  color?: string;
  thickness?: number;
  padding?: number;
  radius?: number;
};

export const drawLine = (
  from: Point | null | undefined,
  to: Point | null | undefined,
  options?: LineOptions
) => {
  if (!from || !to) {
    return {};
  }

  const color = options?.color || 'black';
  const thickness = options?.thickness || 1;
  const padding = options?.padding || 0;
  const radius = options?.radius || 0;

  // bottom right
  const x1 = from.x;
  const y1 = from.y;
  // top right
  const x2 = to.x;
  const y2 = to.y;

  // distance
  const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  // center
  const cx = (x1 + x2) / 2 - length / 2;
  const cy = (y1 + y2) / 2 - thickness / 2;
  // angle
  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
  // make styles
  const style = {
    padding: 0,
    paddingLeft: padding,
    margin: 0,
    height: thickness,
    backgroundColor: color,
    lineHeight: 1,
    position: 'absolute' as const,
    left: cx - padding / 2,
    top: cy,
    width: length,
    borderRadius: `${radius}px`,
    MozTransform: `rotate(${angle}deg)`,
    WebkitTransform: `rotate(${angle}deg)`,
    OTransform: `rotate(${angle}deg)`,
    msTransform: `rotate(${angle}deg)`,
    transform: `rotate(${angle}deg)`,
  };

  return style;

  // var htmlLine =
  //   "<div style='padding:0px; margin:0px; height:" +
  //   thickness +
  //   'px; background-color:' +
  //   color +
  //   '; line-height:1px; position:absolute; left:' +
  //   cx +
  //   'px; top:' +
  //   cy +
  //   'px; width:' +
  //   length +
  //   'px; -moz-transform:rotate(' +
  //   angle +
  //   'deg); -webkit-transform:rotate(' +
  //   angle +
  //   'deg); -o-transform:rotate(' +
  //   angle +
  //   'deg); -ms-transform:rotate(' +
  //   angle +
  //   'deg); transform:rotate(' +
  //   angle +
  //   "deg);' />";
  // //
  // // alert(htmlLine);
  // document.body.innerHTML += htmlLine;
};
