export const SliderSeparator: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-visible">
      <svg
        width="220"
        height="320"
        viewBox="0 0 220 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full absolute -left-3/4"
        preserveAspectRatio="none"
      >
        <path
          d="M5 319.787L19.1537 320H156.844C156.844 320 241.193 210.754 214.932 0H208.269C208.269 0 210.045 302.061 5 319.767V319.787Z"
          className="fill-primary"
        />
        <path
          d="M215 0C215 344.065 0 319.622 0 319.622L9.91248 318.924C64.304 312.876 190.625 270.135 190.625 0.0193835H215V0Z"
          className="fill-oppositeBackground"
        />
      </svg>
    </div>
  );
};
