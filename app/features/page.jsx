"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Features() {
  const [activeTab, setActiveTab] = useState("core");

  const featureTabs = [
    {
      id: "core",
      name: "Core Features",
      description:
        "Essential productivity tools in a distraction-free environment",
      features: [
        {
          title: "Task Management",
          description:
            "Create, update, and delete tasks with difficulty ratings (Easy, Medium, Hard), track progress with status updates (To-do, In Progress, Done), and add detailed descriptions to each task.",
          icon: (
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
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ),
          image: "/homepage.jpeg",
        },
        {
          title: "Todo List",
          description:
            "A dedicated section for daily to-dos with the ability to check off completed items and pin important tasks for easy access.",
          icon: (
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
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          ),
          image: "/homepage.jpeg",
        },
        {
          title: "Notes System",
          description:
            "Write down quick thoughts or detailed notes, organize and pin notes for easy access, and find what you need with fast search functionality.",
          icon: (
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          ),
          image: "/cta.jpeg",
        },
      ],
    },
    {
      id: "scheduling",
      name: "Schedule & Analysis",
      description: "Plan your time and track your progress",
      features: [
        {
          title: "Schedule Planner",
          description:
            "Visual calendar to assign tasks to specific dates, daily and weekly views for better planning, and contextual task display for selected dates.",
          icon: (
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
          ),
          image: "/homepage.jpeg",
        },
        {
          title: "Task Analytics",
          description:
            "Visual charts to track task completion over time and view daily and weekly productivity trends to help you stay on target.",
          icon: (
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
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
          ),
          image: "/cta.jpeg",
        },
        {
          title: "Focus Mode",
          description:
            "Eliminate distractions with our Focus Mode, designed to help you concentrate on what matters in a calm, distraction-free environment.",
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
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          ),
          image: "/homepage.jpeg",
        },
      ],
    },
    {
      id: "additional",
      name: "Additional Features",
      description: "Extra tools to enhance your productivity experience",
      features: [
        {
          title: "Organization Tools",
          description:
            "Add tags to categorize and filter tasks, pin important notes and tasks, and use quick search across all content to find what you need instantly.",
          icon: (
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
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6Z"
              />
            </svg>
          ),
          image: "/homepage.jpeg",
        },
        {
          title: "Customization",
          description:
            "Light/Dark mode toggle to suit your preferences, set reminders for upcoming tasks, and sort tasks by date, difficulty, or status.",
          icon: (
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
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          ),
          image: "/cta.jpeg",
        },
        {
          title: "Data Management",
          description:
            "Export tasks and notes for backup, quick-add button for seamless creation, and flexible data organization options.",
          icon: (
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
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
          ),
          image: "/homepage.jpeg",
        },
      ],
    },
  ];

  const currentTabContent = featureTabs.find((tab) => tab.id === activeTab);

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
              Your <span className="text-[#15803d]">Calm Companion</span> for
              Daily Productivity
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              ZenFlow combines essential productivity tools in a
              distraction-free environment, helping you manage tasks, track
              progress, take notes, and plan schedules — all in one peaceful
              digital space.
            </p>
            <div className="flex justify-center gap-4">
              <Button href="/login" variant="primary" size="lg">
                Get Started Free
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 font-medium text-base transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-[#15803d] border-b-2 border-[#15803d]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="mt-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {currentTabContent.name}
              </h2>
              <p className="text-lg text-gray-600">
                {currentTabContent.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {currentTabContent.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-[#15803d]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center text-[#15803d] mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={400}
                      height={225}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Quote Section */}
      <section className="py-16 bg-[#15803d]/5 border-y border-[#15803d]/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="text-center">
            <div className="inline-block text-5xl text-[#15803d] opacity-30 font-serif">
              "
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 max-w-3xl mx-auto my-6 leading-relaxed">
              ZenFlow is more than a todo app. It's a peaceful digital space for
              clarity, consistency, and progress.
            </blockquote>
            <div className="inline-block text-5xl text-[#15803d] opacity-30 font-serif">
              "
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#15803d] to-[#166534] text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to find focus and flow?
            </h2>
            <p className="text-lg text-[#dcfce7] mb-8">
              Join thousands already using ZenFlow to reduce chaos and boost
              productivity in a calm, mindful environment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/login" variant="white" size="lg">
                Get Started Free
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
