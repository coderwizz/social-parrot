export default function ShimmerBackground({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-[linear-gradient(#d1f2a5_0%,#ffed8e_50%,#ff9c9c_100%)] animate-glossy">
        {children}
      </div>
    );
  }