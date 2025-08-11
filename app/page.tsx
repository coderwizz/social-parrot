import { Analytics } from "@vercel/analytics/react";
import EmojiDisplay from "@/components/ui/EmojiDisplay"; // Import the EmojiDisplay component
import ShimmerBackground from "@/components/ui/ShimmerBackground"; // Import ShimmerBackground component
import DisclaimerNotice from "@/components/ui/DisclaimerNotice"; // Import the DisclaimerNotice component

export default function Home() {
  return (
    <ShimmerBackground>
      {/* Logo Banner with Chela One Font and Flexbox for Centering */}
      <div className="flex flex-col items-center justify-center font-chela font-bold text-white mb-4 space-y-2 hover:text-yellow-500">
        {/* Heading for SocialParrot */}
        <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
          SocialParrot🦜
        </div>

        {/* EmojiDisplay centered with appropriate size */}
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          <EmojiDisplay />
        </div>

        {/* App Explanation Text */}
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mt-2 text-white">
          Squawk! I'm SocialParrot. Every 8-15 seconds I shapeshift into a different emoji based on camera input from your computer.
        </div>
      </div>

      {/* DisclaimerNotice component placed at the bottom of the page */}
      <DisclaimerNotice />

      {/* Vercel Analytics Component */}
      <Analytics />
    </ShimmerBackground>
  );
}
