"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/hero-bg.jpg')` }}
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Company</h1>
        <p className="text-xl">Creating amazing digital experiences</p>
      </div>
    </section>
  );
}
