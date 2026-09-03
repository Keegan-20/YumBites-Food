import React from "react";
import { useState } from "react";

//Lifting the State Up
const Section = ({ title, description, isVisible, setIsVisible }) => {
  return (
    //accordion component //F&Q section kind thing
    <div className="border border-ink-100 rounded-2xl bg-white shadow-card mb-3 overflow-hidden transition-shadow duration-200 hover:shadow-card-hover">
      <button
        className="w-full flex items-center justify-between gap-4 text-left px-6 md:px-4 py-5 md:py-4 cursor-pointer"
        aria-expanded={isVisible}
        onClick={() => (isVisible ? setIsVisible(null) : setIsVisible(title))}
      >
        <h3 className="font-bold text-ink-900 text-base md:text-sm">{title}</h3>
        <span
          className={`h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 ${
            isVisible ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <i className="fa-solid fa-caret-down"></i>
        </span>
      </button>
      {
        // wrapping it inside { } so we can use it as js
        isVisible && (
          <p className="px-6 md:px-4 pb-6 md:pb-4 text-sm leading-7 text-ink-500 animate-slide-down">
            {description}
          </p>
        )
      }
    </div>
  );
};
const Instamart = () => {
  const [visibleSection, setIsVisibleSection] = useState("whyYumBite");
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-4 py-12 md:py-8 mb-24 animate-fade-in">
      <h1 className="text-3xl md:text-2xl font-extrabold tracking-tight text-ink-900 mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-ink-500 text-sm mb-8">
        Everything you need to know about ordering with YumBites.
      </p>

      {/* Controlled accordion Component */}
      <Section
        title={"Why Choose YumBite Fooods ?"}
        description={
          "YumBite Foods stands out for its wide selection of quality cuisines, convenience in ordering and reliable delivery service, exceptional customer support, and great value for money. Enjoy a deliciously convenient dining experience delivered right to your doorstep with YumBite Foods.Our commitment to quality begins with our ingredients. We partner with trusted suppliers to ensure that only the freshest and highest-quality ingredients make it into your meals. Whether you're craving authentic Indian flavors, indulgent comfort food, or healthy options to fuel your day, YumBite Foods has something for everyone.Convenience is key in today's fast-paced world, and YumBite Foods delivers on that front. Our user-friendly website and mobile app make ordering a breeze, with intuitive navigation, secure payment options, and real-time order tracking. Say goodbye to long wait times and busy phone lines with YumBite Foods, your favorite meals are just a few clicks away."
        }
        isVisible={visibleSection === "Why Choose YumBite Fooods ?"}
        setIsVisible={setIsVisibleSection}
      />

      <Section
        title={"Most Famous Restaurants in Goa?"}
        description={
          "In the vibrant culinary landscape of Goa, several iconic restaurants have earned acclaim for their delectable offerings and unique ambiance. From the legendary Ritz Classic, renowned for its sumptuous seafood dishes and warm hospitality, to the quaint charm of Cooperleaf Panaji, where traditional Goan flavors mingle with global influences, each dining destination offers a distinct experience. Sharda Classic beckons with its authentic Goan fare, tantalizing the taste buds with generations-old recipes passed down through time. For those craving a feast, Barbeque Nation stands out as a haven for barbecue enthusiasts, offering an array of grilled delights in a lively setting. Meanwhile, the Tiffin Factory captures the essence of Goan cuisine with its innovative twists on classic dishes, creating culinary masterpieces that delight locals and tourists alike. Whether you seek traditional flavors or contemporary cuisine, these renowned restaurants in Goa promise an unforgettable dining experience that celebrates the rich culinary heritage of the region."
        }
        isVisible={visibleSection === "Most Famous Restaurants in Goa?"}
        setIsVisible={setIsVisibleSection}
      />

      <Section
        title={"Cancel order & Refund Policy?"}
        description={
          "You can cancel your order on YumBite before it is confirmed by the restaurant. Once the restaurant confirms the order, cancellation may not be possible. To cancel, simply navigate to your order history and select the option to cancel.If your order is canceled before confirmation or due to unforeseen circumstances, we will initiate a refund to your original payment method. Refunds typically take 3-5 business days to process, depending on your bank or payment provider.For any assistance with cancellations or refunds, please contact our customer support team, and we'll be happy to assist you promptly."
        }
        isVisible={visibleSection === "Cancel order & Refund Policy?"}
        setIsVisible={setIsVisibleSection}
      />
    </div>
  );
};
export default Instamart;
