import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const exchangePolicy = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    desc: "We offer hassle free exchange policy",
  },
  {
    icon: assets.quality_icon,
    title: "7 Days Return Policy",
    desc: "We provide 7 days free return policy",
  },
  {
    icon: assets.support_img,
    title: "Best Customer Support",
    desc: "We provide 24/7 customer support",
  },
];

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-700">
      {exchangePolicy.map((e, i) => (
        <div key={i}>
          <img
            src={e.icon}
            alt="icon"
            className="w-12 m-auto mb-5 pointer-events-none"
          />
          <p className="font-semibold">{e.title}</p>
          <p className="text-gray-400">{e.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
