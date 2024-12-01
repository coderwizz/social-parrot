import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";

const Intro = () => {
  return (
    <div className="flex gap-6 items-center justify-between py-12 px-10 bg-gradient-to-r from-gray-50 via-blue-50 to-gray-100">
      <div className="flex flex-col gap-6 w-8/12">
        <BorderBeam className="border-gray-300" />
        <h1 className="text-4xl font-semibold text-gray-800 tracking-tight">
          Hi! I'm Ethan.
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
        I am a driven and hands-on problem solver with a unique ability to innovate and optimize complex systems. Whether enhancing model routers for cutting-edge AI performance or improving fairness with probability theory techniques, I tackle challenges head-on with a blend of creativity and technical rigor. My expertise spans collaborative tech initiatives that elevate model intelligence, to leading the craft of mathematical problems and designing educational math games. I seek to bring a versatile mix of deep analytical skills, coding prowess, and an eye for elegant solutions to every problem I tackle.
        </p>
      </div>

      <div className="flex-1 w-3/12 flex justify-center">
        <Image
          src="/images/main.png"
          alt="Ethan"
          width={160}
          height={160}
          className="rounded-full border-2 border-gray-200 object-cover shadow-md transition-all transform hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Intro;