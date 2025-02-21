"use client";

import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "E-commerce Platform",
              description: "A full-featured online shopping platform",
              imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
            },
            {
              title: "Mobile Banking App",
              description: "Secure and user-friendly banking application",
              imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
            },
            {
              title: "Portfolio Website",
              description: "Creative portfolio for digital artists",
              imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative w-full h-48">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
