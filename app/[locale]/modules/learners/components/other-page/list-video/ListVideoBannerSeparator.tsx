// components/CustomSVG.tsx
import React from 'react';

const ListVideoBannerSeparator: React.FC = () => {
  return (
    <svg
      viewBox="0 0 125 320"
      preserveAspectRatio="none"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2312_529)">
        <g opacity="0.6">
          <path
            d="M57.4618 320H125L91.2331 101.957L57.4618 320Z"
            fill="url(#paint0_linear_2312_529)"
          />
        </g>
        <path
          d="M28.7003 0L67.8352 252.694L106.97 0H28.7003Z"
          fill="url(#paint1_linear_2312_529)"
        />
        <path
          d="M39.1348 67.2956L0 319.989H78.2697L39.1348 67.2956Z"
          fill="#06C270"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2312_529"
          x1="57.4618"
          y1="101.957"
          x2="143.209"
          y2="109.37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#4ADE80" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2312_529"
          x1="28.7003"
          y1="0"
          x2="128.073"
          y2="8.59071"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#4ADE80" />
        </linearGradient>
        <clipPath id="clip0_2312_529">
          <rect width="125" height="320" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ListVideoBannerSeparator;
