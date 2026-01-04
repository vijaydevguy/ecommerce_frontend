import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Newsletter from "../components/Newsletter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-gray-200">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="contact"
          className="w-full md:max-w-[480px] "
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600 ">Our Store</p>
          <p className="text-gray-500">
            54709 Willioms Station <br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: +91 12345 12345
            <br />
            Email: test@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our team and job openings.
          </p>
          <button className="cursor-pointer border border-[#1E1E1E]  px-8 py-4 text-sm hover:bg-[#1E1E1E] hover:text-white transition-all duration-300">
            Explore jobs
          </button>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default Contact;
