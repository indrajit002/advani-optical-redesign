import { useState, useEffect } from "react";
import { X, ChevronRight, Sparkles, Gift, Zap, Star, Crown, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const DiscountWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [showTab, setShowTab] = useState(true);
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [wonDiscount, setWonDiscount] = useState(0);

  const segments = [
    { 
      label: "25% OFF", 
      color: "#FF6B6B", 
      textColor: "#FFFFFF", 
      value: 25,
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-red-400 to-red-600"
    },
    { 
      label: "No Luck", 
      color: "#F8F9FA", 
      textColor: "#6B7280", 
      value: 0,
      icon: <Star className="w-6 h-6" />,
      gradient: "from-gray-200 to-gray-300"
    },
    { 
      label: "15% OFF", 
      color: "#4ECDC4", 
      textColor: "#FFFFFF", 
      value: 15,
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "from-teal-400 to-teal-600"
    },
    { 
      label: "FREE LENS", 
      color: "#FFD93D", 
      textColor: "#1F2937", 
      value: 100,
      icon: <Crown className="w-6 h-6" />,
      gradient: "from-yellow-400 to-yellow-500"
    },
    { 
      label: "30% OFF", 
      color: "#6C63FF", 
      textColor: "#FFFFFF", 
      value: 30,
      icon: <Diamond className="w-6 h-6" />,
      gradient: "from-purple-500 to-purple-700"
    },
    { 
      label: "Try Again", 
      color: "#F8F9FA", 
      textColor: "#6B7280", 
      value: 0,
      icon: <Star className="w-6 h-6" />,
      gradient: "from-gray-200 to-gray-300"
    },
    { 
      label: "20% OFF", 
      color: "#FF6B6B", 
      textColor: "#FFFFFF", 
      value: 20,
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-red-400 to-red-600"
    },
    { 
      label: "10% OFF", 
      color: "#4ECDC4", 
      textColor: "#FFFFFF", 
      value: 10,
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "from-teal-400 to-teal-600"
    },
  ];

  useEffect(() => {
    const now = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours
    
    // Check if tab is currently hidden
    const hideUntil = localStorage.getItem('discountWheelHideUntil');
    if (hideUntil && now < parseInt(hideUntil)) {
      setShowTab(false);
      return;
    }
    
    // Check if user has seen the tab recently
    const lastShown = localStorage.getItem('discountWheelLastShown');
    
    // Show tab if:
    // 1. Never shown before (new device/user)
    // 2. Last shown more than 24 hours ago
    // 3. User hasn't spun the wheel yet today
    if (!lastShown || (now - parseInt(lastShown)) > oneDayInMs) {
      setShowTab(true);
      localStorage.setItem('discountWheelLastShown', now.toString());
    } else {
      // Check if user has spun today
      const lastSpinDate = localStorage.getItem('lastSpinDate');
      const today = new Date().toDateString();
      if (lastSpinDate !== today) {
        setShowTab(true);
      }
    }
    
    // Fallback: Always show tab after 5 seconds if not shown yet (for new devices)
    const fallbackTimer = setTimeout(() => {
      if (!showTab) {
        setShowTab(true);
        console.log('Discount wheel tab shown via fallback timer');
      }
    }, 5000);
    
    return () => clearTimeout(fallbackTimer);
  }, [showTab]);

  const handleSpin = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email to spin the wheel",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setHasSpun(true);

    const spins = 5 + Math.random() * 3;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    const finalRotation = spins * 360 + randomSegment * segmentAngle + segmentAngle / 2;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winningSegment = segments[segments.length - 1 - randomSegment];
      setSelectedDiscount(winningSegment.label);
      setWonDiscount(winningSegment.value);
      
      localStorage.setItem("lastSpinDate", new Date().toDateString());
      localStorage.setItem("discountCode", winningSegment.label.replace(" ", "_"));
      
      if (winningSegment.value > 0) {
        toast({
          title: "🎉 Congratulations!",
          description: `You won ${winningSegment.label}! Check your email for the discount code.`,
        });
      } else {
        toast({
          title: "Better luck next time!",
          description: "No discount this time, but check out our amazing deals!",
        });
      }

      setTimeout(() => {
        if (winningSegment.value === 0) {
          setIsOpen(false);
          // Hide tab for 1 hour instead of permanently
          setShowTab(false);
          const hideUntil = new Date().getTime() + (60 * 60 * 1000); // 1 hour
          localStorage.setItem('discountWheelHideUntil', hideUntil.toString());
        }
      }, 5000);
    }, 4000);
  };

  const createSegmentPath = (index: number) => {
    const angle = 360 / segments.length;
    const startAngle = index * angle - 90;
    const endAngle = startAngle + angle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const radius = 200;
    const x1 = 250 + radius * Math.cos(startRad);
    const y1 = 250 + radius * Math.sin(startRad);
    const x2 = 250 + radius * Math.cos(endRad);
    const y2 = 250 + radius * Math.sin(endRad);
    
    return `M 250 250 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angle = 360 / segments.length;
    const midAngle = (index * angle + angle / 2 - 90) * Math.PI / 180;
    const textRadius = 130;
    const x = 250 + textRadius * Math.cos(midAngle);
    const y = 250 + textRadius * Math.sin(midAngle);
    const rotation = index * angle + angle / 2;
    return { x, y, rotation };
  };

  return (
    <>
      {/* Ultra Modern Floating Tab */}
      {showTab && (
        <div 
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[9999] group cursor-pointer"
          onClick={() => setIsOpen(true)}
          style={{ zIndex: 9999 }}
        >
        <div className="relative">
          {/* Glassmorphism Tab */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-8 rounded-r-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse" />
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="relative flex items-center gap-3 text-white">
              {/* Animated Icons */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <Gift className="h-5 w-5 animate-bounce drop-shadow-lg" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-ping" />
                </div>
                <Sparkles className="h-3 w-3 animate-pulse drop-shadow-lg" />
              </div>
              
              {/* Vertical text with gradient */}
              <div className="flex flex-col items-center">
                <div 
                  className="text-sm font-bold tracking-wider drop-shadow-lg bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent"
                  style={{ 
                    writingMode: "vertical-rl", 
                    textOrientation: "mixed",
                    lineHeight: "1.2"
                  }}
                >
                  SPIN TO WIN
                </div>
              </div>
              
              {/* Animated Arrow */}
              <div className="relative">
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-lg rotate-180" />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:scale-150 transition-all duration-300" />
              </div>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </div>
          
          {/* Floating indicator */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse shadow-lg" />
        </div>
      </div>
      )}

      {/* Ultra Modern Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[1000px] max-h-[95vh] p-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-0 shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-6 z-50 rounded-full p-3 bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 shadow-xl border border-white/20"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[700px]">
            {/* Wheel Side */}
            <div className="relative bg-gradient-to-br from-slate-800/50 via-purple-800/30 to-slate-800/50 p-8 flex items-center justify-center backdrop-blur-xl">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
              
              <div className="relative z-10">
                {/* Outer decorative rings */}
                <div className="absolute inset-[-60px] rounded-full border-2 border-dashed border-purple-400/30 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-[-80px] rounded-full border border-dashed border-pink-400/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                
                {/* Wheel container */}
                <div className="relative">
                  {/* Enhanced Wheel Shadow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/40 via-black/20 to-black/40 blur-3xl transform translate-y-8 scale-110" />
                  
                  {/* Main Wheel */}
                  <svg
                    width="500"
                    height="500"
                    className="transition-transform duration-[4000ms] ease-out relative z-10 drop-shadow-2xl"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Segments with modern gradients */}
                    {segments.map((segment, index) => (
                      <g key={index}>
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={segment.color} />
                            <stop offset="50%" stopColor={`${segment.color}DD`} />
                            <stop offset="100%" stopColor={`${segment.color}AA`} />
                          </linearGradient>
                          <filter id={`glow-${index}`}>
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <path
                          d={createSegmentPath(index)}
                          fill={`url(#gradient-${index})`}
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="2"
                          filter={`url(#glow-${index})`}
                          className="drop-shadow-xl"
                        />
                        {/* Inner highlight */}
                        <path
                          d={createSegmentPath(index)}
                          fill="none"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1"
                          className="pointer-events-none"
                        />
                      </g>
                    ))}
                    
                    {/* Text labels with icons */}
                    {segments.map((segment, index) => {
                      const { x, y, rotation } = getTextPosition(index);
                      return (
                        <g key={`text-${index}`}>
                          {/* Text shadow */}
                          <text
                            x={x + 3}
                            y={y + 3}
                            fill="rgba(0,0,0,0.4)"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${rotation} ${x} ${y})`}
                            className="pointer-events-none"
                          >
                            {segment.label}
                          </text>
                          {/* Main text */}
                          <text
                            x={x}
                            y={y}
                            fill={segment.textColor}
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${rotation} ${x} ${y})`}
                            className="pointer-events-none drop-shadow-lg"
                          >
                            {segment.label}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Ultra modern center circle */}
                    <defs>
                      <radialGradient id="centerGradient">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="30%" stopColor="#F8FAFC" />
                        <stop offset="70%" stopColor="#E2E8F0" />
                        <stop offset="100%" stopColor="#CBD5E1" />
                      </radialGradient>
                      <linearGradient id="centerBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#E2E8F0" />
                        <stop offset="100%" stopColor="#CBD5E1" />
                      </linearGradient>
                    </defs>
                    {/* Center shadow */}
                    <circle cx="252" cy="252" r="50" fill="rgba(0,0,0,0.3)" className="blur-sm" />
                    {/* Main center circle */}
                    <circle cx="250" cy="250" r="48" fill="url(#centerGradient)" stroke="url(#centerBorder)" strokeWidth="4" className="drop-shadow-2xl" />
                    {/* Inner decorative circle */}
                    <circle cx="250" cy="250" r="35" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                    {/* Center text */}
                    <text x="252" y="252" fill="rgba(0,0,0,0.3)" fontSize="20" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                      SPIN
                    </text>
                    <text x="250" y="250" fill="#1E293B" fontSize="20" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                      SPIN
                    </text>
                  </svg>
                  
                  {/* Ultra modern Pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20">
                    <div className="relative">
                      {/* Pointer shadow */}
                      <div className="absolute top-2 left-2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-black/30" />
                      {/* Main pointer */}
                      <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-gradient-to-b from-purple-500 to-pink-500 drop-shadow-2xl" 
                           style={{ borderBottomColor: '#8B5CF6' }} />
                      {/* Pointer highlight */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-white/40" />
                      {/* Center dot */}
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-white to-gray-200 rounded-full shadow-xl border-2 border-purple-500" />
                      {/* Inner dot */}
                      <div className="absolute top-11 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Ultra modern spinning effects */}
                {isSpinning && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Outer ring of particles */}
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 22.5}deg) translateX(350px) translateY(-50%)`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                    {/* Inner ring of particles */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`inner-${i}`}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-lg"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 30}deg) translateX(250px) translateY(-50%)`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                    {/* Center pulsing effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-ping" />
                  </div>
                )}
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 lg:p-12 relative flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-purple-800/80 backdrop-blur-xl">
              {!hasSpun ? (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-2xl">
                      <Gift className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                      Spin the Wheel!
                    </h2>
                    <p className="text-gray-300 text-xl">
                      Get up to <span className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">30% OFF</span> on your first order!
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-16 text-lg pl-14 bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
                      />
                      <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-purple-400" />
                    </div>

                    <Button
                      onClick={handleSpin}
                      disabled={isSpinning || !email}
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                      size="lg"
                    >
                      {isSpinning ? (
                        <span className="flex items-center gap-3">
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          Spinning...
                        </span>
                      ) : (
                        "SPIN TO WIN NOW!"
                      )}
                    </Button>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  {wonDiscount > 0 ? (
                    <>
                      <div className="mb-8">
                        <div className="text-8xl mb-6">🎉</div>
                        <h3 className="text-4xl font-bold text-white mb-4">Congratulations!</h3>
                        <p className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                          {selectedDiscount}
                        </p>
                        <p className="text-gray-300 text-lg">Your discount code has been sent to:</p>
                        <p className="font-medium text-white text-lg">{email}</p>
                      </div>
                      <Button 
                        onClick={() => setIsOpen(false)}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4"
                      >
                        Start Shopping
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="mb-8">
                        <div className="text-8xl mb-6">😊</div>
                        <h3 className="text-3xl font-bold text-white mb-4">Better luck next time!</h3>
                        <p className="text-gray-300 text-lg">Check out our amazing collection anyway!</p>
                      </div>
                      <Button 
                        onClick={() => setIsOpen(false)} 
                        variant="outline" 
                        size="lg"
                        className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4"
                      >
                        Browse Collection
                      </Button>
                    </>
                  )}
                </div>
              )}

              {!hasSpun && (
                <p className="text-xs text-gray-400 text-center mt-8">                  *Valid for new customers only. By entering, you agree to receive promotional emails.
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiscountWheel;