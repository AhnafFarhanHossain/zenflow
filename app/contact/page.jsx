"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Navbar /> {/* Hero Section */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-white dark:bg-gray-900">
        <div
          className="absolute inset-0 bg-texture opacity-80 pointer-events-none dark:opacity-60"
          style={{ zIndex: 0 }}
        />
        <div
          className="max-w-screen-xl mx-auto px-4 sm:px-8 relative"
          style={{ zIndex: 1 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              Get in{" "}
              <span className="text-[#15803d] dark:text-[#bbf7d0]">Touch</span>{" "}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Have questions about ZenFlow? Want to learn more about our
              services? We're here to help and would love to hear from you.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              {" "}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out to us using the contact form or through
                any of our contact channels below. We'll get back to you as soon
                as possible.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#15803d]/10 p-3 rounded-full text-[#15803d] dark:bg-[#bbf7d0]/10 dark:text-[#bbf7d0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    {" "}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Email
                    </h3>
                    <a
                      href="mailto:ahnaffarhanhossain@gmail.com"
                      className="text-[#15803d] hover:underline dark:text-[#bbf7d0] dark:hover:text-[#86efac]"
                    >
                      {" "}
                      ahnaffarhossain@gmail.com
                    </a>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      We'll respond as quickly as possible
                    </p>
                  </div>
                </div>{" "}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#15803d]/10 p-3 rounded-full text-[#15803d] dark:bg-[#bbf7d0]/10 dark:text-[#bbf7d0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Office
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Free School Street, Pukurpar
                      <br />
                      Dhanmondi, Dhaka, Bangladesh
                      <br />
                      Bangladesh
                    </p>
                  </div>
                </div>{" "}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#15803d]/10 p-3 rounded-full text-[#15803d] dark:bg-[#bbf7d0]/10 dark:text-[#bbf7d0]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Phone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +880 1886 155 446
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Mon-Fri from 8am to 5pm PST
                    </p>
                  </div>
                </div>
              </div>{" "}
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Connect with us
                </h3>
                <div className="flex space-x-4">
                  {["Twitter", "LinkedIn", "Facebook", "Instagram"].map(
                    (social) => (
                      <a
                        key={social}
                        href="#"
                        className="bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-[#15803d] hover:shadow-lg transition-all duration-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:text-[#bbf7d0] dark:shadow-gray-900/80 dark:hover:shadow-[#bbf7d0]/20"
                        aria-label={social}
                      >
                        {social === "Twitter" && (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        )}
                        {social === "LinkedIn" && (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        )}
                        {social === "Facebook" && (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                        )}
                        {social === "Instagram" && (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        )}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>{" "}
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900/80">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a message
              </h2>
              {isSubmitted ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6 dark:bg-[#bbf7d0]/10 dark:border-[#bbf7d0]/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {" "}
                      <svg
                        className="h-5 w-5 text-green-400 dark:text-[#bbf7d0]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 dark:text-[#bbf7d0]">
                        Message sent!
                      </h3>
                      <div className="mt-2 text-sm text-green-700 dark:text-[#d1fae5]">
                        <p>
                          Thank you for contacting us. We'll get back to you
                          shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name
                      </label>{" "}
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#15803d] focus:border-[#15803d] transition-colors duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-[#bbf7d0] dark:focus:border-[#bbf7d0]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>{" "}
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#15803d] focus:border-[#15803d] transition-colors duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-[#bbf7d0] dark:focus:border-[#bbf7d0]"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>{" "}
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#15803d] focus:border-[#15803d] transition-colors duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-[#bbf7d0] dark:focus:border-[#bbf7d0]"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>{" "}
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="5"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#15803d] focus:border-[#15803d] transition-colors duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-[#bbf7d0] dark:focus:border-[#bbf7d0]"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Map Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="rounded-xl overflow-hidden h-96 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/80">
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-[#15803d]/10 p-3 rounded-full text-[#15803d] dark:bg-[#bbf7d0]/10 dark:text-[#bbf7d0] inline-block mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                    />
                  </svg>
                </div>{" "}
                <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                  Interactive Map
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Map would appear here in a production environment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find quick answers to common questions about contacting us
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How quickly will I receive a response?",
                answer:
                  "We typically respond to all inquiries within 24-48 business hours. For urgent matters, please mention this in your message subject.",
              },
              {
                question:
                  "Is there a phone number I can call for immediate assistance?",
                answer:
                  "Yes, you can reach our customer support team at +880 1886 155 446, available Monday to Friday from 8am to 5pm GMT+06.",
              },
              {
                question: "Do you offer in-person consultations?",
                answer:
                  "Yes, we do offer in-person consultations at our office location. Please schedule an appointment through our contact form or by calling us directly.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#15803d]/20 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-[#bbf7d0]/20 dark:shadow-gray-900/80 dark:hover:shadow-[#bbf7d0]/10"
              >
                <div className="flex items-start">
                  <span className="text-[#15803d] dark:text-[#bbf7d0] text-2xl font-bold mr-4">
                    Q.
                  </span>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
