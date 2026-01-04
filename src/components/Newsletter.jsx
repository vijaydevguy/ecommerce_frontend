import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 pt-0 gap-3 overflow-x-clip w-full">
      <h2 className="font-medium text-2xl">Subscribe now & get 20% off</h2>
      <p className="text-base text-gray-500 md:text-left text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className="flex flex-row lg:max-w-[40%] w-full">
        <input
          type="text"
          placeholder="Enter your email"
          className="flex-1 border border-gray-200 px-4"
        />
        <button className="bg-[#1E1E1E] text-white px-8 py-2 cursor-pointer">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
