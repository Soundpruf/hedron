import { css, injectGlobal } from "styled-components";

export const drawDebug = () => [
  "background: rgba(0, 255, 255, 0.1);",
  "border: 1px dashed rgba(255, 0, 255, 1);",
];

/**
 * Returns an array of valid css declarations generated
 * from the react props supplied.
 *
 * @param {array} props list of react props
 */
export const generateStyles = props => [
  props.padding && `padding: ${props.padding};`,
  props.margin && `margin: ${props.margin};`,
  props.width && `width: ${props.width};`,
  props.height && `height: ${props.height};`,
  props.visibility && `visibility: ${props.visibility};`,
  props.display && `display: ${props.display};`,
  props.opacity && `opacity: ${props.opacity};`,
  props.color && `color: ${props.color};`,
  props.background && `background: ${props.background};`,
  props.border && `border: ${props.border};`,
  props.fontSize && `font-size: ${props.fontSize};`,
  props.fontWeight && `font-weight: ${props.fontWeight};`,
  props.fontStyle && `font-style: ${props.fontStyle};`,
  props.fontFamily && `font-family: ${props.fontFamily};`,
  props.lineHeight && `line-height: ${props.lineHeight};`,
  props.textTransform && `text-transform: ${props.textTransform};`,
  props.hidden && `display: none;`,
];

/**
 * Injects our custom reset css styles into the html head
 *
 * @param {Object} props - custom configuration properties
 * @param {Object} props.body - configuration for the html body
 * @param {string} props.body.margin - margin to apply to the html body
 * @param {string} props.body.background - background to apply to the html body
 * @param {string} props.font - default font family to use
 */
export const resetCSS = ({ body = {}, font } = {}) => injectGlobal`
  html {
    line-height: 1.15;
    text-size-adjust: 100%;
  }
  body {
    margin: ${body.margin ? body.margin : "0"};
    ${body.background && `background: ${body.background};`}
    ${font && `font-family: ${font};`}
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const breakpoints = props => {
  if (!props.breakpoints) return null;

  return Object.keys(props.breakpoints).map(
    id =>
      props[id] && [
        css`
          @media (min-width: ${props.breakpoints[
              id
            ][0]}px) and (max-width: ${props.breakpoints[id][1]}px) {
            ${generateStyles(props[id])};
          }
        `,
      ]
  );
};

const translations = {
  direction: {
    horizontal: "row",
    vertical: "column",
  },
  wrap: {
    true: "wrap",
    1: "wrap",
    false: "nowrap",
    0: "nowrap",
  },
  align: {
    top: "flex-start",
    left: "flex-start",
    bottom: "flex-end",
    right: "flex-end",
    center: "center",
    middle: "center",
  },
};

export const flex = ({
  flex,
  fill,
  direction,
  wrap,
  valign,
  halign,
  shiftLeft,
  shiftRight,
  shiftUp,
  shiftDown,
}) => {
  const props = [];
  if (flex) props.push(`flex: ${flex};`);
  if (fill) props.push(`flex: 1 1 auto;`);
  if (direction)
    props.push(`flex-direction: ${translations.direction[direction]};`);
  if (wrap) props.push(`flex-wrap: ${translations.wrap[wrap]};`);

  if (halign) {
    if (direction === "horizontal")
      props.push(`justify-content: ${translations.align[halign]};`);
    else props.push(`align-items: ${translations.align[halign]};`);
  }

  if (valign) {
    if (direction === "horizontal")
      props.push(`align-items: ${translations.align[valign]};`);
    else props.push(`justify-content: ${translations.align[valign]};`);
  }

  if (shiftLeft) props.push("margin-right: auto;");
  if (shiftRight) props.push("margin-left: auto;");
  if (shiftUp) props.push("margin-bottom: auto;");
  if (shiftDown) props.push("margin-top: auto;");

  return props;
};