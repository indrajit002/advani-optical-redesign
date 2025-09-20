import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Glasses, Phone } from "lucide-react";
import opticalTitanium from "@/assets/products/optical-titanium.jpg";
import storeInterior from "@/assets/store-interior.jpg";
import contactLens from "@/assets/contact_lence.png";

const ServicesSection = () => {
  const services = [
    {
      icon: <Glasses className="h-8 w-8" />,
      title: "Prescription Eyewear",
      description: "Premium prescription eyewear with unmatched expertise. Choose from top global brands like Gucci, Prada, Burberry, paired with best-in-class lenses.",
      link: "/collections/all",
      cta: "Explore More",
      image: opticalTitanium,
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Comprehensive Eye Exam",
      description: "State-of-the-art Visioffice® technology ensures perfect vision. Advanced system crafts lenses tailored to your unique needs.",
      link: "/appointments",
      cta: "Book Now",
      image: storeInterior,
    },
    {
      icon: <Glasses className="h-8 w-8" />,
      title: "Contact Lenses",
      description: "Personalized consultations for perfect fit. Choose from Acuvue, Bausch + Lomb, Alcon, CooperVision, and more top brands.",
      link: "/contact-lenses",
      cta: "Shop Now",
      image: contactLens,
    },
  ];

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience world-class vision care with cutting-edge technology and personalized service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-primary-foreground">
                  {service.icon}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>
                <Link to={service.link}>
                  <Button variant="outline" className="group">
                    {service.cta}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;