import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600 leading-relaxed">
        Welcome to <span className="font-semibold text-blue-500">DevLink</span>, a platform dedicated to empowering developers and tech enthusiasts to share knowledge, collaborate on projects, and build a strong community. Whether you're a seasoned programmer or just starting your coding journey, DevLink provides the tools and resources you need to grow and thrive in the tech world.
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to create a collaborative space where developers can:
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-600">
          <li>Share ideas and best practices.</li>
          <li>Connect with like-minded individuals.</li>
          <li>Access valuable coding resources and tools.</li>
          <li>Contribute to a growing library of blog posts and tutorials.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Features</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-600">
          <li>Write and share blog posts to showcase your expertise.</li>
          <li>Engage in discussions and exchange ideas with the community.</li>
          <li>Use the integrated code editor for collaborative programming.</li>
          <li>Build connections through the friends system and team collaborations.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h2>
        <p className="text-gray-600 leading-relaxed">
          Have questions, feedback, or ideas for improvement? We’d love to hear from you!
        </p>
        <p className="mt-2 text-gray-600">
          Email us at: <a href="mailto:support@devlink.com" className="text-blue-500 hover:underline">support@devlink.com</a>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
