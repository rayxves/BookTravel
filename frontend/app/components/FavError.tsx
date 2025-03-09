import sadFace from "@/public/sadFace.json";
import Lottie from "react-lottie";
export default function FavError({ error }) {
  const options = {
    animationData: sadFace,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <div className="w-fit h-fit flex flex-col items-center justify-center">
      <p className="font-inter text-lg sm:text-xl md:text-2xl">
        Something went wrong...
      </p>
      <p className="w-fit h-fit text-lg sm:text-xl md:text-2xl p-3 text-red-700 font-inter">
        {error}
      </p>
      <Lottie options={options} style={{ width: "50%", height: "50%" }} />
    </div>
  );
}
