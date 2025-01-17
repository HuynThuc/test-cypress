type SectionEndProps = {
  isDisplay: boolean;
  side: string;
};

const SectionEnd = ({ isDisplay, side }: SectionEndProps) => {
  return (
    <div
      className={`w-[24px] h-full absolute top-0 ${side === 'left' ? 'left-0 bg-gradient-to-l' : 'right-0 bg-gradient-to-r'} from-background/0 to-background/100 pointer-events-none transition-opacity duration-200`}
      style={{ opacity: isDisplay ? 0 : 1 }}
    ></div>
  );
};

export default SectionEnd;
