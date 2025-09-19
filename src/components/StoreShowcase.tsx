import { Link } from "react-router-dom";
import storeInterior from "@/assets/store-interior.jpg";

const StoreShowcase = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Store Image */}
          <div className="relative group animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover-lift">
              <img
                src={storeInterior}
                alt="Advani Opticals Store Interior"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {/* Glass effect overlay */}
              <div className="absolute top-4 right-4 glass-effect px-4 py-2 rounded-lg">
                <span className="text-white text-sm font-medium">25+ Years</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>

          {/* Store Description */}
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <span className="text-accent font-medium text-sm tracking-wider uppercase animate-fade-in">
                #25YEARSOFTRUST
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-foreground animate-fade-in">
                Explore our Journey
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in">
                For over 25 years, Advani Opticals has been at the forefront of optical excellence, 
                serving our community with unwavering dedication. From our humble beginnings in Gurgaon 
                to becoming India's premier optical boutique, we've built our legacy on trust, quality, 
                and personalized care.
              </p>
              <p className="text-muted-foreground leading-relaxed animate-fade-in">
                Our state-of-the-art store combines cutting-edge technology with timeless craftsmanship, 
                ensuring every customer receives the perfect vision solution tailored to their unique needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about" className="inline-flex">
                <button className="px-8 py-3 border-2 border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-all duration-300 rounded-lg">
                  Read more
                </button>
              </Link>
              <Link to="/appointment" className="inline-flex">
                <button className="px-8 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 rounded-lg">
                  Book Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreShowcase;
