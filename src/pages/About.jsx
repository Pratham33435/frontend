"use client";
import React from "react";

export default function About() {
  const content = {
    header: {
      title: "About Us",
      subtitle: "A free, open, and safe space for your creativity.",
    },
    highlight:
      "This platform is completely free to use. You don’t need to sign up, and we don’t collect your personal data. You can submit your content anonymously, or include your name and social media handles if you’d like to connect with readers. It’s your choice—your identity, your voice.",
    sections: [
      {
        title: "Your Voice Matters",
        paragraphs: [
          "We built this space for storytellers, poets, thinkers, and everyday dreamers. Whether you're writing from the hills of Darjeeling or the heart of Delhi, your voice matters here.",
          "Here, you can read and write freely—sharing your experiences, your poems, your stories, your articles, and your reflections. Think of it as your own digital newspaper, where your creativity takes center stage.",
        ],
      },
      
      {
        title: "Free Speech, Not Cheap Speech",
        paragraphs: [
          "We believe in freedom of speech—but we also believe in respect. That’s why all submissions are reviewed before publishing. This helps us maintain a space that’s open to ideas but closed to vulgarity, hate, or anything that disrespects the spirit of creativity.",
          "We welcome bold ideas, raw emotions, and honest stories. But we don’t tolerate vulgarity, hate, or anything that disrespects the spirit of creativity. In short: free speech, not shitty stuff.",
        ],
      },
    ],
    footer: "No login. No data collection. Just your words.",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-gray-900 md:opacity-50 text-white text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {content.header.title}
        </h1>
        {content.header.subtitle && (
          <p className="text-lg opacity-80">{content.header.subtitle}</p>
        )}
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 flex-1">
        {/* Highlight box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-md p-6 mb-10 shadow-sm">
          <p className="text-lg">{content.highlight}</p>
        </div>

        {/* Sections */}
        {content.sections.map((section, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {section.title}
            </h2>
            {section.paragraphs.map((para, i) => (
              <p key={i} className="text-lg mb-4 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="text-base">{content.footer}</p>
      </footer>
    </div>
  );
}
