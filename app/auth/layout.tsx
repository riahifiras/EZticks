import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#2B293D] flex h-screen flex-col md:flex-row md:overflow-hidden">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse absolute top-8 left-10">
          <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={32} alt="EZticks Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EZticks</span>
        </a>
      <div className="flex justify-start leading-[60px] px-24 font-semibold text-white text-5xl items-center w-[40vw]">
      Discover tailored events.
      Sign up for personalized recommendations today!
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}