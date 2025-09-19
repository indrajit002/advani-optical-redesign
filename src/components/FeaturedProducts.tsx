import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Eye, Star } from "lucide-react";
import { useState } from "react";

// Product Images
import aviatorGold from "@/assets/products/aviator-gold.jpg";
import cateyeBlack from "@/assets/products/cateye-black.jpg";
import opticalTortoise from "@/assets/products/optical-tortoise.jpg";
import roundGold from "@/assets/products/round-gold.jpg";
import opticalTitanium from "@/assets/products/optical-titanium.jpg";
import wayfarerBlack from "@/assets/products/wayfarer-black.jpg";
import squareBurgundy from "@/assets/products/square-burgundy.jpg";
import butterflyRose from "@/assets/products/butterfly-rose.jpg";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  isBestseller?: boolean;
  isNew?: boolean;
  rating?: number;
  discount?: string;
}

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: "1",
      name: "Aviator Classic",
      brand: "RAY-BAN",
      price: 12500,
      originalPrice: 15000,
      image: aviatorGold,
      isBestseller: true,
      rating: 4.8,
      discount: "17% OFF",
    },
    {
      id: "2",
      name: "Cat Eye Elegance",
      brand: "PRADA",
      price: 28900,
      image: cateyeBlack,
      isNew: true,
      rating: 4.9,
    },
    {
      id: "3",
      name: "Heritage Tortoise",
      brand: "BURBERRY",
      price: 18990,
      originalPrice: 22000,
      image: opticalTortoise,
      rating: 4.7,
      discount: "14% OFF",
    },
    {
      id: "4",
      name: "Round Vintage",
      brand: "GUCCI",
      price: 32500,
      image: roundGold,
      isBestseller: true,
      rating: 4.9,
    },
    {
      id: "5",
      name: "Titanium Minimal",
      brand: "LINDBERG",
      price: 45000,
      image: opticalTitanium,
      isNew: true,
      rating: 5.0,
    },
    {
      id: "6",
      name: "Wayfarer Original",
      brand: "RAY-BAN",
      price: 11500,
      originalPrice: 13500,
      image: wayfarerBlack,
      isBestseller: true,
      rating: 4.8,
      discount: "15% OFF",
    },
    {
      id: "7",
      name: "Square Modern",
      brand: "TOM FORD",
      price: 26800,
      image: squareBurgundy,
      rating: 4.7,
    },
    {
      id: "8",
      name: "Butterfly Dreams",
      brand: "VERSACE",
      price: 29900,
      image: butterflyRose,
      isNew: true,
      rating: 4.9,
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 70px)`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
            Premium Collection
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-4">
            Featured Eyewear
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Handpicked selections from the world's most prestigious brands, curated for the discerning eye
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/50 to-background">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isBestseller && (
                    <Badge className="bg-accent text-accent-foreground shadow-lg">
                      Bestseller
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      New Arrival
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-destructive text-destructive-foreground shadow-lg">
                      {product.discount}
                    </Badge>
                  )}
                </div>
                
                {/* Rating */}
                {product.rating && (
                  <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                )}
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Quick Actions Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/60 flex items-center justify-center gap-3 transition-all duration-300 ${
                  hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                }`}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-5">
                <p className="text-xs text-accent font-bold tracking-wider uppercase mb-2">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-lg mb-3">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/collections/all">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
              Explore Full Collection
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;