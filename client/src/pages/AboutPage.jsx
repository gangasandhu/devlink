import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gray-200 py-10 px-8 border-b">
          <h1 className="text-4xl font-extrabold text-stone-900 mb-2">About DevLink</h1>
          <p className="text-lg font-medium text-gray-700">
            Your gateway to connecting, learning, and growing in the tech community.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Welcome to DevLink</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-semibold text-blue-500">DevLink</span> is a platform created for developers,
              tech enthusiasts, and learners to come together, collaborate, and grow. Our goal is to provide
              a space where knowledge-sharing and innovation thrive, helping you take your skills to the next level.
            </p>
          </div>

          {/* Mission Section */}
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              At <span className="font-semibold text-blue-500">DevLink</span>, we aim to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700 text-lg">
              <li>Foster meaningful connections within the tech community.</li>
              <li>Encourage collaboration through knowledge sharing.</li>
              <li>Provide tools to build and showcase your expertise.</li>
              <li>Promote continuous learning through tutorials and resources.</li>
            </ul>
          </div>

          {/* Features Section */}
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Features</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700 text-lg">
              <li>Publish blog posts to share your expertise with the community.</li>
              <li>Collaborate with others using the integrated code editor.</li>
              <li>Engage in discussions, ask questions, and exchange ideas.</li>
              <li>Build connections through our friend and team collaboration features.</li>
              <li>Access a rich library of resources, including tutorials and guides.</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Have questions, suggestions, or feedback? We’d love to hear from you! Reach out to us and let’s
              make DevLink even better.
            </p>
            <p className="mt-3 text-gray-700 text-lg">
              Email us at:{" "}
              <a href="mailto:support@devlink.com" className="text-blue-500 hover:underline">
                support@devlink.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gray-50 px-8 py-6 border-t">
          <h3 className="text-xl font-bold text-stone-900">Join the Community</h3>
          <p className="text-gray-700 text-lg mt-2">
            Become a part of DevLink today and start connecting with like-minded developers!
          </p>
          <div className="mt-4">
            <a
              href="/auth"
              className="inline-block bg-gray-900 hover:bg-gray-950 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
