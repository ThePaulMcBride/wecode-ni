"use client";

import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import config from "config";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("Weekly");

  function handleSubit(e, subscribe) {
    e.preventDefault();
    subscribe({
      EMAIL: email,
      FREQUENCY: frequency,
    });
  }

  return (
    <MailchimpSubscribe
      url={config.newsletterUrl}
      render={({ subscribe, status, message }) => (
        <div className="w-full p-6 lg:p-4 bg-white rounded shadow mb-6">
          <h4 className="text-gray-800 text-lg mb-2 font-semibold">
            Never miss a job
          </h4>
          <p className="text-gray-600 text-sm mb-4 leading-normal">
            Sign up to our newsletter to get updates about jobs delivered right
            to your inbox.
          </p>
          {status === "error" && (
            <div className="mb-4 bg-red-400 p-2 rounded">
              <span className="text-white text-xs">
                There was an error with your submission
              </span>
            </div>
          )}
          {status === "success" && (
            <div className="mb-4 bg-primary-400 p-2 rounded">
              <span className="text-white text-xs">
                Success! We&apos;ll be in touch soon
              </span>
            </div>
          )}
          <form
            onSubmit={(e) => handleSubit(e, subscribe)}
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
          >
            <label htmlFor="email" className="mb-4 block text-gray-800">
              <span className="uppercase tracking-wider text-xs font-bold">
                Email Address
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                name="email"
                className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 block mt-2 focus:ring focus:outline-none`}
              />
            </label>
            <label htmlFor="email" className="mb-4 block text-gray-800">
              <span className="uppercase tracking-wider text-xs font-bold">
                Frequency
              </span>
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  name="FREQUENCY"
                  className="block appearance-none w-full bg-gray-100 border border-gray-100 text-gray-700 py-2 px-4 pr-8 mt-2 rounded leading-tight focus:outline-none focus:ring"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </label>
            <input
              type="submit"
              value={status === "sending" ? "Loading" : "Submit"}
              className="bg-transparent border border-primary-500 hover:text-white hover:bg-primary-500 w-full text-primary-500 font-bold py-2 px-4 rounded mt-2"
            />
          </form>
        </div>
      )}
    />
  );
};
