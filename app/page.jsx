// Components Import
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar /> {/* Hero Section */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-white dark:bg-gray-900">
        <div
          className="absolute inset-0 bg-texture opacity-80 dark:opacity-60 pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div
          className="max-w-screen-xl mx-auto px-4 sm:px-8 relative"
          style={{ zIndex: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-5">
                {" "}
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-[#15803d] bg-[#15803d]/10 dark:text-[#bbf7d0] dark:bg-[#bbf7d0]/10 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803d] dark:bg-[#bbf7d0] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803d] dark:bg-[#bbf7d0]"></span>
                  </span>
                  New Features Released
                </span>{" "}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                  Organize your tasks with{" "}
                  <span className="text-[#15803d] dark:text-[#bbf7d0] relative">
                    ZenFlow
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 100 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0,5 Q25,0 50,5 T100,5"
                        fill="none"
                        stroke="#15803d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="dark:stroke-[#bbf7d0]"
                      />
                    </svg>
                  </span>
                </h1>{" "}
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                  Stay organized, focused, and in control. The modern task
                  management app designed to help you achieve more with less
                  stress.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/signup" variant="primary" size="lg">
                  Get Started Free
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  Contact Us
                </Button>
              </div>

              <div className="flex items-center gap-3">
                {" "}
                <div className="flex -space-x-2">
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden">
                    <Image
                      src="/person-1.jpg"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden">
                    <Image
                      src="/person-2.jpg"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden">
                    <Image
                      src="/person-3.jpg"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    4,000+
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    happy users
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-500">4.9/5</span>{" "}
                </div>
              </div>
            </div>

            {/* Simplified Image Section */}
            <div className="flex justify-center lg:justify-end">
              {" "}
              <div className="relative w-full max-w-lg">
                <Image
                  src="/homepage.jpeg"
                  alt="ZenFlow Dashboard"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#15803d]/10 dark:from-[#bbf7d0]/10 to-transparent pointer-events-none"></div>
      </section>
      {/* Features Section */}
      <section
        id="how-it-works"
        className="py-24 bg-gradient-to-b from-[#15803d] to-[#166534]"
      >
        <div className="absolute inset-0 bg-texture-white z-0 opacity-10" />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">
              Everything you need for perfect task management
            </h2>
            <p className="text-[#dcfce7] text-lg">
              ZenFlow brings all your tasks, schedules, and tools together in
              one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Intuitive Interface",
                description:
                  "A clean, minimal interface that keeps you focused on what matters.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Everything in One Place",
                description:
                  "No more jumping around different apps for different tools. ZenFlow has it all.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Schedule Planner",
                description:
                  "ZenFlow offers an integrated calendar to help you plan your tasks and deadlines.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                ),
              },
              {
                title: "Smart Notifications",
                description:
                  "Get notified about what's important, when it's important.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Task Sorting",
                description:
                  "Sort and filter tasks by priority, due date, or custom tags.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                ),
              },
              {
                title: "Advanced Analytics",
                description:
                  "Gain insights into your productivity and team performance.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-7 rounded-xl border border-white/20 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="bg-white/20 p-3.5 rounded-full w-14 h-14 flex items-center justify-center text-white mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#dcfce7]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-texture z-0 opacity-80 dark:opacity-60" />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
              What our customers say
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Thousands of teams use ZenFlow to improve their productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "ZenFlow has completely transformed how our team manages projects. We've increased productivity by 40% since we started using it.",
                author: "Sarah Johnson",
                role: "Product Manager, Acme Inc.",
                avatar: "F",
              },
              {
                quote:
                  "The intuitive interface and powerful features make ZenFlow the perfect task management solution for our remote team.",
                author: "Michael Chen",
                role: "CTO, StartUp Labs",
                avatar: "M",
              },
              {
                quote:
                  "As a freelancer juggling multiple clients, ZenFlow helps me stay organized and never miss a deadline. Couldn't work without it!",
                author: "Emily Rodriguez",
                role: "Independent Designer",
                avatar: "F",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-100/80 dark:shadow-gray-900/80 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 relative"
              >
                <div className="flex items-center mb-5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>{" "}
                <div className="absolute top-5 right-5 opacity-10 text-8xl font-serif text-[#15803d] dark:text-[#bbf7d0]">
                  "
                </div>{" "}
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg italic leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#15803d] to-[#166534] flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden dark:bg-gray-900">
        {/* Background with grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-gray-900 to-[#15803d]/10 dark:to-[#bbf7d0]/5 z-0"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[#15803d] dark:bg-[#bbf7d0]"></div>
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#15803d 2px, transparent 2px), linear-gradient(90deg, #15803d 2px, transparent 2px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        {/* Top masking effect */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-0"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Can't find the answer you're looking for? Contact our support
              team.
            </p>
          </div>{" "}
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How does the 14-day trial work?",
                answer:
                  "You can try ZenFlow Pro for free for 14 days. No credit card required. After the trial ends, you can choose to subscribe or downgrade to the free plan.",
              },
              {
                question: "Can I change my plan later?",
                answer:
                  "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, you'll be charged prorated amount for the remainder of the billing cycle.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "Currently, all the plans of our app are set to free and unlimited for use. We will be adding paid plans in the future.",
              },
              {
                question: "Is there a limit to how many tasks I can create?",
                answer:
                  "No, all plans include unlimited tasks. The differences between plans are related to team size, storage, and advanced features.",
              },
              {
                question: "How secure is my data?",
                answer:
                  "We take security seriously. ZenFlow uses bank-level encryption, regular security audits, and we never share your data with third parties.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index % 2 === 0
                    ? "bg-white border-gray-200 hover:border-[#15803d]/20 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-[#bbf7d0]/20"
                    : "bg-[#15803d]/5 border-[#15803d]/10 hover:border-[#15803d]/30 dark:bg-[#bbf7d0]/5 dark:border-[#bbf7d0]/10 dark:hover:border-[#bbf7d0]/20"
                }`}
              >
                <div className="flex items-start">
                  <span
                    className={`text-2xl font-bold mr-4 text-[#15803d] dark:text-[#bbf7d0]`}
                  >
                    Q.
                  </span>
                  <div>
                    <div className="font-semibold text-xl text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>{" "}
        {/* Bottom masking effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-0"></div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#15803d] to-[#166534]">
        <div className="absolute inset-0 bg-texture-white z-0 opacity-10" />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-10 md:p-16">
              <div className="space-y-8">
                <div className="space-y-5">
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                    Ready to boost your productivity?
                  </h2>
                  <p className="text-[#dcfce7] text-lg leading-relaxed">
                    Join thousands of satisfied users who have transformed how
                    they manage tasks. Start your free trial today.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/signup" variant="white" size="lg">
                    Get Started Free
                  </Button>
                  <Button href="/contact" variant="ghost" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full filter blur-3xl"></div>
                <Image
                  src="/cta.jpeg"
                  alt="ZenFlow Dashboard"
                  width={400}
                  height={300}
                  className="w-full max-w-md h-auto relative z-10 drop-shadow-2xl rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
