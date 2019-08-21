import React from "react";

const SVG = props => {
  const style = {};

  return (
    <svg
      style={style}
      onClick={props.clicked}
      width="10px"
      height="12px"
      viewBox="0 0 10 12"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Desktop---Wallet-#3"
          transform="translate(-764.000000, -444.000000)"
        >
          <g id="Bouton-Disable" transform="translate(759.000000, 440.000000)">
            <rect id="Rectangle" x="0" y="0" width="20" height="20" rx="5" />
            <g id="round-edit-24px" stroke-width="1" fill-rule="evenodd">
              <polygon id="Path" points="0 0 20 0 20 20 0 20" />
            </g>
            <path
              d="M12.3333333,8 L12.3333333,14.6666667 L7,14.6666667 L7,8 L12.3333333,8 Z M11.3333333,4 L8,4 L7.33333333,4.66666667 L5,4.66666667 L5,6 L14.3333333,6 L14.3333333,4.66666667 L12,4.66666667 L11.3333333,4 Z M13.6666667,6.66666667 L5.66666667,6.66666667 L5.66666667,14.6666667 C5.66666667,15.4 6.26666667,16 7,16 L12.3333333,16 C13.0666667,16 13.6666667,15.4 13.6666667,14.6666667 L13.6666667,6.66666667 Z"
              id="Shape"
              fill="#646263"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SVG;
