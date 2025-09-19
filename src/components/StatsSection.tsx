import { useEffect, useState } from "react";
import { Award, Globe, Users, Glasses } from "lucide-react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const stats = [
    {
      icon: <Globe className="h-8 w-8" />,
      value: "Worldwide",
      label: "Delivery",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "100K+",
      label: "Satisfied Customers",
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: "20+",
      label: "Excellence Awards",
    },
    {
      icon: <Glasses className="h-8 w-8" />,
      value: "1M+",
      label: "Perfect Pairs Crafted",
    },
  ];

  return (
    <section id="stats-section" className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4 text-accent">{stat.icon}</div>
              <div className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <p className="text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;