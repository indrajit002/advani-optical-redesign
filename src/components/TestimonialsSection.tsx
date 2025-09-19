import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Designer",
      content: "Advani Opticals has been my go-to for luxury eyewear for over 5 years. Their collection is unmatched and the service is exceptional.",
      rating: 5,
      image: "/api/placeholder/80/80",
    },
    {
      name: "Rajesh Kumar",
      role: "Business Executive",
      content: "The eye examination was thorough and professional. They helped me find the perfect frames that suit both my style and vision needs.",
      rating: 5,
      image: "/api/placeholder/80/80",
    },
    {
      name: "Anita Desai",
      role: "Architect",
      content: "Outstanding quality and service! The Visioffice technology ensured my progressive lenses were perfectly customized. Highly recommend!",
      rating: 5,
      image: "/api/placeholder/80/80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 to-background relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
            Customer Reviews
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who trust us with their vision
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`transition-all duration-500 ${
                  index === activeIndex 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-95 absolute inset-0"
                }`}
              >
                <CardContent className="p-8 md:p-12">
                  <Quote className="h-12 w-12 text-accent/20 mb-6" />
                  
                  <p className="text-xl md:text-2xl font-light mb-8 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-accent w-8"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;