interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <header>
      <h1 className="text-xl font-semibold mb-6">{title}</h1>
    </header>
  );
};

export default Header;
