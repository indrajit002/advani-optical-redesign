import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import sunglassesAnimation from "@/assets/Sunglasses.json";

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number; // Duration in milliseconds
}

const LoadingScreen = ({ onComplete, duration = 3000 }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Animation complete
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 500); // Small delay before hiding
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Lottie Animation */}
        <div className="w-64 h-64 relative">
          <Lottie
            animationData={sunglassesAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
          {/* Glow effect around animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl -z-10" />
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
            Welcome to Advani Opticals
          </h2>
          <p className="text-muted-foreground text-lg">
            Crafting your perfect vision experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Fade out overlay */}
      <div 
        className="absolute inset-0 bg-background transition-opacity duration-500"
        style={{ 
          opacity: progress > 90 ? 1 : 0,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default LoadingScreen;
