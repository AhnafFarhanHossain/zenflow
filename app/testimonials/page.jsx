"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState("all");

  const testimonialCategories = [
    { id: "all", name: "All Testimonials" },
    { id: "professionals", name: "Professionals" },
    { id: "creatives", name: "Creatives" },
    { id: "students", name: "Students" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Designer",
      company: "Mindful Design Co.",
      category: "professionals",
      image: "/person-1.jpg",
      quote:
        "ZenFlow has transformed my workday. The calm interface helps me stay focused without the usual digital noise. I've reduced my task-switching by 60%, and my mind feels clearer at the end of each day.",
      rating: 5,
      date: "March 15, 2025",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Independent Developer",
      company: "Self-employed",
      category: "professionals",
      image: "/person-2.jpg",
      quote:
        "As a freelancer juggling multiple projects, ZenFlow's clean task management system keeps me centered. The focus mode is a game-changer when I need to code without distractions, and the notes system helps me capture ideas instantly.",
      rating: 5,
      date: "February 22, 2025",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Creator",
      company: "Serene Media",
      category: "creatives",
      image: "/person-3.jpg",
      quote:
        "ZenFlow feels like it was designed specifically for creative minds. I can organize my content calendar, store inspiration in the notes system, and track my creative output with analytics. All without the overwhelming features that plague other apps.",
      rating: 5,
      date: "April 3, 2025",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Mindfulness Coach",
      company: "Presence Practice",
      category: "professionals",
      image: "/person-2.jpg",
      quote:
        "I recommend ZenFlow to all my clients struggling with digital overwhelm. Its minimalist approach embodies the principles I teach: focus on what matters, eliminate distractions, and create space for meaningful work. The clean design promotes mental clarity.",
      rating: 4,
      date: "January 18, 2025",
    },
    {
      id: 5,
      name: "Jessica Park",
      role: "Doctoral Researcher",
      company: "University Research Lab",
      category: "students",
      image: "/person-1.jpg",
      quote:
        "My research demands deep focus and organized thinking. ZenFlow's distraction-free environment helps me track complex research tasks, schedule focused writing sessions, and collect notes during literature reviews. My productivity has increased dramatically.",
      rating: 5,
      date: "March 30, 2025",
    },
    {
      id: 6,
      name: "Thomas Reed",
      role: "Illustrator & Designer",
      company: "Reed Creative Studio",
      category: "creatives",
      image: "/person-2.jpg",
      quote:
        "ZenFlow's light/dark mode toggle adapts to my creative moods. The simple task system lets me focus on creating rather than managing complicated project software. It's become the calm center of my often chaotic creative process.",
      rating: 5,
      date: "February 10, 2025",
    },
    {
      id: 7,
      name: "Alex Wong",
      role: "Software Engineer",
      company: "Calm Technologies",
      category: "professionals",
      image: "/person-3.jpg",
      quote:
        "After trying countless productivity apps that ended up adding more stress than they solved, ZenFlow's minimalist approach is refreshing. I use the schedule planner for coding sprints and the focus mode to achieve flow state more consistently.",
      rating: 4,
      date: "March 5, 2025",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      role: "Graduate Student",
      company: "State University",
      category: "students",
      image: "/person-1.jpg",
      quote:
        "Between classes, research, and part-time work, ZenFlow helps me maintain sanity. The visual task organization and daily planner keep me on track with assignments, and the notes feature is perfect for capturing research insights on the go.",
      rating: 5,
      date: "April 12, 2025",
    },
    {
      id: 9,
      name: "Ryan Kim",
      role: "Photographer",
      company: "Visual Harmony Studios",
      category: "creatives",
      image: "/person-2.jpg",
      quote:
        "ZenFlow helps me manage photoshoots, client deliverables, and personal projects without the usual stress. The clean interface mirrors the aesthetic simplicity I aim for in my own work. The tagging system is perfect for organizing different photography projects.",
      rating: 4,
      date: "January 25, 2025",
    },
  ];

  const filteredTestimonials =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => testimonial.category === activeCategory
        );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-texture opacity-80 pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div
          className="max-w-screen-xl mx-auto px-4 sm:px-8 relative"
          style={{ zIndex: 1 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Finding <span className="text-[#15803d]">Calm</span> in the
              Digital Chaos
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Discover how people are using ZenFlow to reduce digital noise,
              find focus, and create space for what truly matters in their work
              and lives.
            </p>

            <div className="bg-gray-100 p-4 rounded-xl max-w-2xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {testimonialCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      activeCategory === category.id
                        ? "bg-[#15803d] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-500 text-sm">
                    April 15, 2025
                  </span>
                </div>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 relative">
                    <span className="text-6xl absolute -left-6 top-0 text-[#15803d]/10 font-serif">
                      "
                    </span>
                    Finding focus in a world of constant distraction
                    <span className="text-6xl absolute -right-6 bottom-0 text-[#15803d]/10 font-serif">
                      "
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    After years of digital burnout from notifications, complex
                    apps, and constant switching between tools, ZenFlow became
                    my digital sanctuary. Its minimalist design isn't about
                    lacking features—it's about intentionally creating space.
                  </p>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    My mind feels clearer, my work more intentional, and I've
                    cut down on digital distraction by 70%. ZenFlow doesn't just
                    help me manage tasks—it helps me manage my attention, which
                    is far more valuable.
                  </p>
                </div>

                <div className="flex items-center">
                  <Image
                    src="/person-1.jpg"
                    alt="Katherine Lee"
                    width={60}
                    height={60}
                    className="rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">Katherine Lee</h3>
                    <p className="text-gray-600">
                      Author & Digital Wellness Advocate
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#15803d]/5 p-10 md:p-16 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#15803d] flex items-center justify-center mr-3">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">
                      My ZenFlow Experience
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {[
                      "70% reduction in digital distractions",
                      "2.5 more focused hours per day",
                      "Nearly eliminated end-of-day mental fatigue",
                      "Completed book manuscript ahead of schedule",
                    ].map((stat, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#15803d] mt-1 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {testimonial.date}
                    </span>
                  </div>

                  <div className="relative mb-8">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="absolute top-0 right-0 text-8xl opacity-10 text-[#15803d] font-serif -z-10">
                      "
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-2 w-full bg-gradient-to-r from-[#15803d]/70 via-[#15803d] to-[#15803d]/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#15803d] to-[#166534] text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rediscover calm in your digital life
            </h2>
            <p className="text-xl text-[#dcfce7] mb-8">
              Join thousands who have found focus and flow with ZenFlow's
              mindful productivity approach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/login"
                className="px-8 py-4 bg-white text-[#15803d] font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Start Free Trial
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
