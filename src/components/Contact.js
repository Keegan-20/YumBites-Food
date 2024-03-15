import React from "react";
import emailjs from '@emailjs/browser';
import { useRef,useState } from "react";
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

  return (
    <div className="flex justify-center mt-3 items-center ">
      <div className="bg-slate-300 w-[450px] m-2 px-8 py-2 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form  ref={form} onSubmit={sendEmail} className="space-y-4 ">
          <div>
            <label htmlFor="username" className="block mb-1">Name:</label>
            <input
              type="text"
              id="username"
              name="from_name"
              placeholder="Name"
              autoComplete="off"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email address:</label>
            <input
              type="email"
              id="email"
              name="from_email"
              placeholder="Email Id"
              autoComplete="off"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">Any message:</label>
            <textarea
              name="message"
              id="message"
              cols="10"
              rows="6"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
            ></textarea>
          </div>
          <div>
          <div className="flex items-center">
            <button
              type="submit"
              className="flex items-center bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Send <IoSendSharp className="ml-2" />
            </button>
          </div>
          </div>
        </form>
        {showModal && (
        <div className="absolute w-full h-full bg-slate-800 text-white opacity-50 z-50"></div>
      )}
      {
      showModal && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-slate-800 text-white  p-6 rounded-xl shadow-lg z-50">
          <h2>Your Form has been sent successfully !</h2>
          <button onClick={() => setShowModal(false)} className="bg-red-600 rounded-md m-2 p-2">Close</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Contact;
