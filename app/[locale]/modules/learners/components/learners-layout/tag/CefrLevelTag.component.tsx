export const CefrLevelTag = ({ level }: { level: string }) => {
  return (
    <div className="px-1 py-[3px] text-primary border border-primary/50 rounded w-7 h-4 text-center">
      <p className="text-center text-xs leading-[9px] font-bold">{level}</p>
    </div>
  );
};
