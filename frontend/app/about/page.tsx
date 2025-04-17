"use client";

import menWalking from "@/public/menWalking.json";
import Lottie from "lottie-react";
import FeatureList from "../components/About/FeatureList";

export default function About() {
  return (
    <>
      {" "}
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100  overflow-y-auto pb-8 font-inter">
        <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100  relative">
          <h1 className="text-center font-poppins text-gray-800 text-2xl md:text-3xl border-b border-gray-800 w-full pb-4 mb-5">
            Welcome to Book Travel!
          </h1>

          <p className="text-gray-800 text-sm md:text-md lg:text-lg xl:text-xl leading-relaxed py-4 w-full">
            Your platform to explore and discover your dream destinations.
            Created as part of a personal project, this site is designed to help
            you plan trips and organize your favorite spots with ease.
          </p>

          <h2 className="text-gray-800 text-xl md:text-2xl my-5 w-full">
            How does it work?
          </h2>

          <FeatureList />

          <div className="flex flex-col lg:flex-row justify-between items-center w-full pt-6 lg:pt-12">
            <p className="text-gray-800 text-sm md:text-md lg:text-lg leading-relaxed w-full lg:w-2/3 pb-8">
              This project was developed with the purpose of learning and
              studying web development, exploring API creation, front-end
              integration, and enhancing design and usability skills. The idea
              was to build a functional platform where you can search, filter,
              save, and organize travel destinations while practicing modern
              technologies. Built with ♥.
            </p>

            <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-start">
              <Lottie
                animationData={menWalking}
                loop
                style={{ width: "50%", height: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
