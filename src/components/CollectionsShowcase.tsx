import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CollectionsShowcase = () => {
  const collections = [
    {
      title: "Sunglasses",
      subtitle: "UV Protection & Style",
      description: "Discover iconic designs from Ray-Ban, Gucci, and more",
      gradient: "from-amber-600 to-orange-600",
      link: "/sunglasses",
    },
    {
      title: "Prescription Glasses",
      subtitle: "Vision & Fashion",
      description: "Premium frames with precision lenses",
      gradient: "from-slate-600 to-slate-800",
      link: "/opticals",
    },
    {
      title: "Contact Lenses",
      subtitle: "Comfort & Clarity",
      description: "Daily, monthly & colored options",
      gradient: "from-blue-600 to-cyan-600",
      link: "/contact-lenses",
    },
  ];

  return (
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
              Shop by Category
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-4">
              Our Collections
            </h2>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={index}
              to={collection.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative p-8 h-64 flex flex-col justify-between text-white">
                <div>
                  <h3 className="font-playfair text-3xl mb-2">{collection.title}</h3>
                  <p className="text-white/90 font-medium mb-4">{collection.subtitle}</p>
                  <p className="text-white/80 text-sm">{collection.description}</p>
                </div>
                
                <div className="flex items-center gap-2 font-medium group-hover:gap-4 transition-all">
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
              
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle, white 2px, transparent 2px)`,
                  backgroundSize: '15px 15px',
                }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsShowcase;