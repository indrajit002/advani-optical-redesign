// src/components/DiscountWheel.tsx

import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { X } from "lucide-react";

const wheelData = [
  { option: "FREE FRAME", style: { backgroundColor: "#4ECDC4", textColor: "#FFFFFF" } },
  { option: "ALMOST", style: { backgroundColor: "#F5F5DC", textColor: "#333333" } },
  { option: "15% OFF", style: { backgroundColor: "#4ECDC4", textColor: "#FFFFFF" } },
  { option: "NO LUCK", style: { backgroundColor: "#F5F5DC", textColor: "#333333" } },
  { option: "10% OFF", style: { backgroundColor: "#4ECDC4", textColor: "#FFFFFF" } },
  { option: "SORRY...", style: { backgroundColor: "#F5F5DC", textColor: "#333333" } },
  { option: "20% OFF", style: { backgroundColor: "#4ECDC4", textColor: "#FFFFFF" } },
  { option: "TRY AGAIN", style: { backgroundColor: "#F5F5DC", textColor: "#333333" } },
];

const losingOptions = ["TRY AGAIN", "SORRY...", "NO LUCK", "ALMOST"];

export const DiscountWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isWheelOpen, setIsWheelOpen] = useState(true);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    const finalPrize = wheelData[prizeNumber].option;

    if (!losingOptions.includes(finalPrize.toUpperCase())) {
      toast.success(`🎉 Congratulations! You won: ${finalPrize}`, {
        description: "Your discount code has been applied.",
        duration: 5000,
      });
    } else {
      toast.info("Better luck next time!", {
        description: "You can try again on your next visit.",
        duration: 5000,
      });
    }

    setTimeout(() => setIsWheelOpen(false), 2000);
  };

  return (
    <Dialog open={isWheelOpen} onOpenChange={setIsWheelOpen}>
      <DialogContent className="max-w-4xl text-center p-0 overflow-hidden bg-white border-0 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsWheelOpen(false)}
          className="absolute right-4 top-4 z-50 rounded-full p-2 bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
          {/* Wheel */}
          <div className="relative bg-white p-8 flex items-center justify-center">
            <div className="relative">
              <div className="rotate-90"> {/* ✅ Rotate wheel so 12 o’clock becomes 3 o’clock */}
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={wheelData}
                  onStopSpinning={onStopSpinning}
                  outerBorderColor="#FFFFFF"
                  radiusLineColor="#FFFFFF"
                  innerRadius={15}
                  innerBorderWidth={3}
                  outerBorderWidth={6}
                  textStyle={{
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                  perpendicularText={false}
                  pointerProps={{ style: { display: "none" } }}
                />
              </div>

              {/* 👉 Custom Arrow on right, pointing LEFT */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2">
                <div className="w-0 h-0 border-t-8 border-b-8 border-r-[16px] border-t-transparent border-b-transparent border-r-red-600"></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 bg-white flex flex-col justify-center text-left">
            <div className="mb-8">
              <DialogTitle className="text-4xl font-bold mb-4 text-gray-900">
                Spin to win
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                Enter your email for the chance to win a discount.
              </DialogDescription>
            </div>

            <div className="mb-6">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleSpinClick}
                disabled={mustSpin}
                className="w-full h-12 text-lg font-bold bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
              >
                {mustSpin ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Spinning...
                  </span>
                ) : (
                  "Claim discount"
                )}
              </Button>

              <Button
                variant="link"
                onClick={() => setIsWheelOpen(false)}
                className="text-blue-600 hover:text-blue-800 p-0 h-auto"
              >
                No, thanks
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              You are signing up to receive communication via email and can unsubscribe at any time.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
