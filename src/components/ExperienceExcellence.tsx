import { Link } from "react-router-dom";
import storeInterior from "@/assets/store-interior.jpg";

const ExperienceExcellence = () => {
  return (
    <section 
      className="relative py-32 parallax-bg"
      style={{
        backgroundImage: `url(${storeInterior})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h3 className="font-playfair text-4xl md:text-5xl text-white mb-6">
            Experience Excellence
          </h3>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Step into our world of optical perfection where cutting-edge technology meets timeless craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/visit-us" className="inline-flex">
              <button className="px-8 py-4 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 rounded-lg text-lg hover-lift">
                Visit Our Store
              </button>
            </Link>
            <Link to="/appointment" className="inline-flex">
              <button className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-lg text-lg hover-lift">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceExcellence;
