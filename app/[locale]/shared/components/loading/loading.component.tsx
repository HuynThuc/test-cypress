interface Props {
  title?: string;
}
export const Loadingcustom = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-center h-full ">
      <div className="justify-center border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600"></div>
      <div className="align-middle hidden">{title}</div>
    </div>
  );
};
