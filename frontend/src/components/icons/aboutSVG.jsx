// aboutSVG.jsx

export const SVG1 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill="#fff" d="M0 0h24v24H0z" />
      <circle cx="12" cy="12" r="9" stroke="#5469e7" strokeLinejoin="round" />
      <path
        stroke="#5469e7"
        strokeLinejoin="round"
        d="M12 3s-3.5 3-3.5 9 3.5 9 3.5 9M12 3s3.5 3 3.5 9-3.5 9-3.5 9M3 12h18M19.5 7.5h-15"
      />
      <g filter="url(#a)">
        <path stroke="#5469e7" strokeLinejoin="round" d="M19.5 16.5h-15" />
      </g>
      <defs>
        <filter
          id="a"
          width="17"
          height="3"
          x="3.5"
          y="16"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation=".5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_15_556"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_15_556"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const SVG2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="40"
      height="40"
      viewBox="0 0 32 32"
    >
      <path
        fill="#5469e7"
        d="M24 19V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h4v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-5h-4zM8 10H6V7a1 1 0 0 1 2 0v3zm2 14V7c0-.35-.06-.687-.171-1H21c.551 0 1 .449 1 1v12H12v5a1 1 0 0 1-2 0zm16 0c0 .551-.449 1-1 1H13.829c.111-.313.171-.65.171-1v-3h12v3zm-6-12h-8v-2h8v2zm0 4h-8v-2h8v2z"
      />
    </svg>
  );
};

export const SVG3 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#5469e7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6c-1.8-2.097-4.806-2.745-7.06-.825-2.255 1.92-2.573 5.131-.802 7.402 1.472 1.888 5.927 5.87 7.387 7.16.163.144.245.216.34.245a.456.456 0 0 0 .258 0c.095-.029.176-.1.34-.245 1.46-1.29 5.915-5.272 7.387-7.16 1.77-2.27 1.492-5.502-.802-7.402C16.755 3.275 13.8 3.903 12 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const SVG4 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="40"
      height="40"
      viewBox="0 0 121.663 121.662"
      fill="#5469e7"
    >
      <circle cx="39.195" cy="13.094" r="13.094" />
      <circle cx="82.469" cy="13.098" r="13.094" />
      <path d="m108.158 61.635-6.056-28.261c-1.127-5.265-6.466-7.792-11-7.924l-.039.002s-1.599.009-2.976.272c-1.441.275-2.705.968-2.705.968-3.342 1.621-6.538 4.97-6.93 9.036-.052.196-.115.386-.146.592-.882 6.212-1.767 10.146-3.669 11.881-1.963 1.786-6.371 2.583-14.294 2.583-1.834 0-3.428.98-4.322 2.437-4.782-.975-7.603-2.214-9.093-3.938-1.935-2.235-2.64-6.39-3.575-12.967-.029-.206-.094-.396-.146-.592-.392-4.066-3.589-7.416-6.931-9.036 0 0-1.262-.693-2.703-.968-1.378-.263-2.976-.272-2.976-.272l-.039-.002c-4.533.132-9.872 2.659-11 7.924l-6.054 28.261c-.808 3.773.88 7.152 3.61 9.48l-.026 43.613a6.933 6.933 0 0 0 6.928 6.936h.004c3.827 0 6.93-3.1 6.932-6.928l.024-41.268c2.865-1.14 5.287-3.352 6.026-6.801l2.292-10.699c3.646 4.258 9.67 6.701 20.409 8.169a5.083 5.083 0 0 0 5.46-3.306c8.407-.444 13.623-2.176 17.014-5.743l2.48 11.582c.739 3.45 3.161 5.662 6.026 6.802l.024 41.267a6.93 6.93 0 0 0 6.932 6.928h.004a6.932 6.932 0 0 0 6.928-6.936l-.025-43.614c2.731-2.326 4.418-5.705 3.612-9.478z" />
    </svg>
  );
};

export const SVG5 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#5469e7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14v3m0-3a5.002 5.002 0 0 1-4.9-4m4.9 4a5.002 5.002 0 0 0 4.9-4m.1-5h2.75c.232 0 .349 0 .445.02a1 1 0 0 1 .786.785c.019.097.019.213.019.445 0 .697 0 1.045-.058 1.335a3 3 0 0 1-2.357 2.357c-.29.058-.638.058-1.335.058h-.35M7 5H4.25c-.232 0-.348 0-.445.02a1 1 0 0 0-.786.785C3 5.902 3 6.018 3 6.25c0 .697 0 1.045.058 1.335a3 3 0 0 0 2.357 2.357c.29.058.638.058 1.335.058h.35m4.9 7c.93 0 1.395 0 1.777.102a3 3 0 0 1 2.12 2.122C16 19.605 16 20.07 16 21H8c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C10.605 17 11.07 17 12 17Zm-4.9-7A5.023 5.023 0 0 1 7 9V4.571c0-.533 0-.8.099-1.005a1 1 0 0 1 .467-.467C7.772 3 8.038 3 8.571 3h6.858c.533 0 .8 0 1.005.099a1 1 0 0 1 .467.467c.099.206.099.472.099 1.005V9c0 .342-.034.677-.1 1"
      />
    </svg>
  );
};
