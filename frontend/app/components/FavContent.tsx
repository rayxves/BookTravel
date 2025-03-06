import Link from "next/link";
import Lottie from "react-lottie";

interface Props {
  readonly tittle: string;
  readonly paragraph: string;
  readonly href: string;
  readonly linkText: string;
  readonly animationData: any;
}
export default function FavContent({
  tittle,
  paragraph,
  href,
  linkText,
  animationData: path,
}: Props) {
  const options = {
    animationData: path,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 pt-2 ">
      <h1 className="font-poppins px-3 pt-5 pb-2 text-lg sm:text-xl lg:text-2xl text-center flex flex-col gap-1 border-b-2 border-b-gray-900">
        {tittle} <p className=" text-md sm:text-lg lg:text-xl">{paragraph}</p>
        <Link
          href={href}
          className="text-[var(--hunter-green)] cursor-pointer hover:text-green-700"
        >
          {linkText}
        </Link>
      </h1>
      <Lottie options={options} style={{ width: "auto", height: "auto" }} />
    </div>
  );
}
