"use client";

export default function Contacts() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Contact Us</h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
