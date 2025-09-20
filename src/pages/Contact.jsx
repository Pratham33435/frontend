import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = `Upload Request from ${name}`;
    const body = `Hello,\n\nMy name is ${name}.\nI want to upload: ${request}\n\nThanks.`;

    window.location.href = `mailto:thelocaltales98@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter your name"
            />
          </div>

          {/* Request */}
          <div>
            <label className="block text-gray-700 font-medium">What to Upload</label>
            <input
              type="text"
              required
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Discription"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}
