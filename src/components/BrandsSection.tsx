import { useEffect, useRef } from "react";

const BrandsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const brands = [
    "GUCCI",
    "PRADA",
    "RAY-BAN",
    "BURBERRY",
    "TOM FORD",
    "VERSACE",
    "CALVIN KLEIN",
    "CARRERA",
    "LINDBERG",
    "OAKLEY",
    "CHANEL",
    "DIOR",
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-background border-y">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <span className="text-accent font-medium text-sm tracking-wider uppercase">
            Our Partners
          </span>
          <h3 className="font-playfair text-3xl mt-2">Premium Brands We Carry</h3>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-16 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Duplicate brands for seamless loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 py-4 group cursor-pointer"
            >
              <h4 className="text-2xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors duration-300 tracking-wider">
                {brand}
              </h4>
            </div>
          ))}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default BrandsSection;