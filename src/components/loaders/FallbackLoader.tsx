import { BounceLoader } from "react-spinners";

const FallbackLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BounceLoader color="#008cff" />
    </div>
  );
};

export default FallbackLoader;
