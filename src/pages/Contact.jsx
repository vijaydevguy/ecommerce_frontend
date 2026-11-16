import React, { useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Newsletter from "../components/Newsletter";
import { FaWhatsapp, FaCalendarAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const whatsappNumber = "918248640264";
  const whatsappMessage = encodeURIComponent(
    "Hello Vijay, I would like to inquire about your products and services.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Initialize Cal.com official embed for native modal popup
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return api;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    if (window.Cal) {
      window.Cal("init", { origin: "https://cal.com" });
      window.Cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }
  }, []);

  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-gray-200">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-16">
        <img
          src={assets.contact_img}
          alt="contact"
          className="w-full md:max-w-[480px] object-cover rounded-sm"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-700">Get In Touch</p>

          {/* Physical address commented out as requested */}
          {/* 
          <p className="text-gray-500">
            54709 Willioms Station <br />
            Suite 350, Washington, USA
          </p> 
          */}

          {/* WhatsApp & Phone */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              WhatsApp & Phone
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-gray-700 hover:text-green-600 transition font-medium"
            >
              <FaWhatsapp size={22} className="text-green-500 shrink-0" />
              <span>+91 82486 40264 </span>
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
              Email Address
            </span>
            <a
              href="mailto:vijayakumarjob01@gmail.com"
              className="inline-flex items-center gap-2.5 text-gray-700 hover:text-black transition font-medium"
            >
              <MdEmail size={22} className="text-gray-500 shrink-0" />
              <span>vijayakumarjob01@gmail.com</span>
            </a>
          </div>

          {/* Schedule with Cal.com Button (Triggers Cal.com's own native modal) */}
          <div className="flex flex-col gap-3 pt-2">
            <p className="font-semibold text-lg text-gray-700">
              Schedule a Meeting
            </p>
            <p className="text-gray-500 text-sm">
              Click below to book a 1-on-1 meeting directly.
            </p>
            <button
              type="button"
              data-cal-link="vijay-iy2uad/portfolio"
              data-cal-config='{"layout":"month_view"}'
              className="inline-flex items-center justify-center gap-2 border border-[#1E1E1E] px-8 py-3.5 text-sm hover:bg-[#1E1E1E] hover:text-white transition-all duration-300 font-medium cursor-pointer w-fit"
            >
              <FaCalendarAlt />
              Book on Cal.com
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Separate Section Commented Out as requested */}
      {/*
      <div className="my-14 border-t border-gray-200 pt-10">
        <div className="text-center text-2xl mb-4">
          <Title text1={"BOOK A"} text2={"CALL"} />
          <p className="text-gray-500 text-sm mt-1">
            Choose a suitable date and time slot below to schedule a meeting.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
          <iframe
            src="https://cal.com/vijay-iy2uad/portfolio"
            title="Schedule with Vijay on Cal.com"
            width="100%"
            height="700px"
            frameBorder="0"
            className="w-full"
          />
        </div>
      </div>
      */}

      {/* <Newsletter /> */}
    </div>
  );
};

export default Contact;
