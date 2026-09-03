import React from "react";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const Contact = () => {
  const form = useRef();
  const [showModal, setShowModal] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
                  // service key, template key
      .sendForm('service_vy22jox', 'template_zntb0x8', form.current, {
        publicKey: 'xyfG0ymAFGdWOQhtz', //public key
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setShowModal(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setShowModal(true);
        },
      );
  };

  const inputClasses =
    "w-full h-12 px-4 bg-white border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

  return (
    <div className="flex justify-center items-center px-4 py-12 md:py-8 mb-0">
      <div className="w-full max-w-md bg-white border border-ink-100 rounded-2xl shadow-card p-8 md:p-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 mb-1">
          Contact Us
        </h2>
        <p className="text-sm text-ink-500 mb-6">
          We'd love to hear from you. We usually reply within a day.
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block mb-1.5 text-sm font-semibold text-ink-700"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="from_name"
              placeholder="Your name"
              autoComplete="off"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm font-semibold text-ink-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="from_email"
              placeholder="you@example.com"
              autoComplete="off"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-1.5 text-sm font-semibold text-ink-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="10"
              rows="4"
              placeholder="How can we help?"
              className="w-full px-4 py-3 bg-white border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full h-12 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-full transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Send Message <IoSendSharp />
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm z-50 animate-fade-in"></div>
        )}
        {showModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white text-ink-900 p-8 rounded-2xl shadow-float z-50 text-center animate-slide-up"
          >
            <span className="text-4xl" aria-hidden="true">✅</span>
            <h2 className="text-lg font-bold mt-3">
              Your form has been sent successfully!
            </h2>
            <p className="text-sm text-ink-500 mt-1">Thanks for reaching out.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 px-6 py-2.5 bg-ink-900 hover:bg-ink-700 text-white text-sm font-semibold rounded-full transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
