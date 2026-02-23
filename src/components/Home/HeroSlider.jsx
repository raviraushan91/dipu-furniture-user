import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Crafted Living Spaces",
      subtitle: "Signature Sofas & Lounge Sets",
      description:
        "Timeless silhouettes, rich textures, and statement comfort for modern homes.",
      image: "./sofa.png",
      cta: "Explore Living Room",
      url: "/products?category=Living Room",
    },
    {
      id: 2,
      title: "Bedroom in Balance",
      subtitle: "Beds, Side Tables, Quiet Luxury",
      description:
        "Build calm interiors with natural finishes and thoughtfully designed essentials.",
      image: "./bed.webp",
      cta: "Style Your Bedroom",
      url: "/products?category=Bedroom",
    },
    {
      id: 3,
      title: "Dining With Character",
      subtitle: "Warm Woods, Elegant Lines",
      description:
        "From intimate meals to celebrations, elevate your dining experience beautifully.",
      image: "./wood-angle-kitchen.png",
      cta: "Shop Dining",
      url: "/products?category=Dining",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[58vh] md:min-h-[66vh] pt-[4.3rem]">
      <div className="relative h-[58vh] md:h-[66vh] overflow-hidden rounded-[1.3rem] grain-overlay shadow-[0_20px_50px_-32px_rgba(8,35,58,0.65)]">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-zoom-soft"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

        <div className="relative z-10 h-full flex items-center">
          <div className="px-5 md:px-11 max-w-2xl text-left animate-fade-in-up">
            <p className="inline-block px-3 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase bg-white/15 border border-white/25 text-white mb-3">
              {slide.subtitle}
            </p>
            <h1 className="text-3xl md:text-5xl leading-[1.02] font-semibold text-white mb-3">
              {slide.title}
            </h1>
            <p className="text-sm md:text-base text-white/85 mb-6 max-w-xl">{slide.description}</p>
            <Link to={slide.url} className="btn-primary text-sm">
              {slide.cta}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 md:left-9 flex items-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-10 bg-white" : "w-2.5 bg-white/45 hover:bg-white/65"
              }`}
            />
          ))}
        </div>

        <div className="absolute right-4 bottom-4 md:right-8 md:bottom-6 flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-xl bg-black/30 border border-white/20 text-white hover:bg-black/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-xl bg-black/30 border border-white/20 text-white hover:bg-black/50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

