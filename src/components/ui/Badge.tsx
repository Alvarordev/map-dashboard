interface Props {
  children: JSX.Element | string;
  className: string;
}

export const Badge = ({ children, className }: Props) => {
  return (
    <div
      className={`inline-flex items-center justify-center whitespace-nowrap text-white font-medium rounded-full py-0.5 px-2 ${className}`}
    >
      <>{children}</>
    </div>
  );
};
