import React from "react";

const SVG = props => {
  const style = {
    float: "right",
    margin: "-33px 10px",
    display: "block"
  };

  return (
    <svg
      className={props.className}
      style={style}
      width="16px"
      height="16px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.clicked}
    >
      <title>Shape</title>
      <desc>Created with Sketch.</desc>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Page---registration-form-POP-UP-Barcode"
          transform="translate(-330.000000, -320.000000)"
          fill="#646263"
          fillRule="nonzero"
        >
          <path
            d="M339,325 L341,325 L341,327 L339,327 L339,325 Z M339,329 L341,329 L341,335 L339,335 L339,329 Z M340,320 C334.48,320 330,324.48 330,330 C330,335.52 334.48,340 340,340 C345.52,340 350,335.52 350,330 C350,324.48 345.52,320 340,320 Z M340,338 C335.59,338 332,334.41 332,330 C332,325.59 335.59,322 340,322 C344.41,322 348,325.59 348,330 C348,334.41 344.41,338 340,338 Z"
            id="Shape"
          />
        </g>
      </g>
    </svg>
  );
};

export default SVG;
