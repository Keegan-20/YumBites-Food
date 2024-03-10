import React from "react";
import { IoSendSharp } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="flex justify-center my-5   items-center ">
      <div className="bg-slate-300 w-[450px] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form action="https://formspree.io/f/xzbnvazl" method="POST" className="space-y-4 ">
          <div>
            <label htmlFor="username" className="block mb-1">Name:</label>
            <input
              type="text"
              id="username"
              name="Name"
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
              name="email"
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
      </div>
    </div>
  );
};

export default Contact;
