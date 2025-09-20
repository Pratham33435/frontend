import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function Category() {
  const categories = [
    
    {
      title: "Articles",
      quote: "“Knowledge blooms when curiosity finds its voice.”",
      to: "/articles",
      bg: "bg-gradient-to-br from-[#43cea2] to-[#185a9d]",
      text: "text-white",
      btn: "bg-white/20 hover:bg-white/40 text-white",
    },
    
    {
      title: "Stories",
      quote: "“Every tale holds a heartbeat waiting to be heard.”",
      to: "/stories",
      bg: "bg-gradient-to-br from-[#ff9966] to-[#ff5e62]",
      text: "text-white",
      btn: "bg-white/20 hover:bg-white/40 text-white",
    },
    {
      title: "Poems",
      quote: "“Let your soul speak in stanzas and silence.”",
      to: "/poems",
      bg: "bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]",
      text: "text-white",
      btn: "bg-white/20 hover:bg-white/40 text-white",
    },
    {
      title: "Others",
      quote: "“Beyond categories lies the magic of the unexpected.”",
      to: "/others",
      bg: "bg-gradient-to-br from-[#f7971e] to-[#ffd200]",
      text: "text-gray-800",
      btn: "bg-black/10 hover:bg-black/20 text-gray-800",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-12 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Floating background shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

      {/* Top Heading */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">
          Discover, Imagine & Create ✨
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Poems, articles, and stories that inspire you every day.
        </p>
      </div>

      {/* Mobile: Coverflow slider */}
      <div className="relative z-10 block sm:hidden w-full flex justify-center items-center">
        <Swiper
          modules={[EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            scale: 0.85,
            slideShadows: false,
          }}
          className="w-full max-w-sm"
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index} className="max-w-xs">
              <div
                className={`rounded-xl shadow-lg p-6 text-center transition-transform duration-300 ${cat.bg} ${cat.text}`}
              >
                <h2 className="text-2xl font-semibold mb-2">{cat.title}</h2>
                <p className="italic mb-6">{cat.quote}</p>
                <Link
                  to={cat.to}
                  className={`block w-full py-2 rounded-lg transition-colors text-sm font-medium ${cat.btn}`}
                >
                  {cat.title === "Poems"
                    ? "Read a Verse"
                    : cat.title === "Articles"
                    ? "Explore Insights"
                    : cat.title === "Stories"
                    ? "Dive into Tales"
                    : "Browse More"}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid */}
      <div className="relative z-10 hidden sm:grid grid-cols-2 gap-6 max-w-5xl w-full">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-1 ${cat.bg} ${cat.text}`}
          >
            <h2 className="text-2xl font-semibold mb-2">{cat.title}</h2>
            <p className="italic mb-6">{cat.quote}</p>
            <Link
              to={cat.to}
              className={`block w-full py-2 rounded-lg transition-colors text-sm font-medium ${cat.btn}`}
            >
              {cat.title === "Articles"
                ? "Explore Insights"
                : cat.title === "Poems"
                ? "Read a Verse"
                : cat.title === "Stories"
                ? "Dive into Tales"
                : "Browse More"}
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 mt-12 text-center">
        <p className="text-gray-700 mb-4">
          Want to share your own work?
        </p>
        <Link
          to="/contact"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Submit Your Creation
        </Link>
      </div>
    </div>
  );
}
