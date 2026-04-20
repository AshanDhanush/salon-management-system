"use client";
import Image from 'next/image';
import heroBg from '../../../assets/Gemini_Generated_Image_4kpw1x4kpw1x4kpw.png';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section
      className="relative w-full min-h-[85vh] max-h-0.5 sm:min-h-[90vh] overflow-hidden flex flex-column justify-content-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      id="home"
    >
      <Image
        src={heroBg}
        alt="Salon background"
        fill
        sizes="100vw" 
        quality={90} 
        className="absolute inset-0 object-cover md:opacity-90 "
        priority
      />
      <div className="absolute inset-0 bg-slate-950/40" />

      <div className="relative z-10 mx-auto flex  md:min-h-[85vh] max-w-6xl flex-col items-center justify-center gap-5 px-4 text-center text-white sm:px-6 md:text-left ">
        <h1 className="text-4xl text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 font-bold leading-tight sm:text-5xl md:text-6xl">
          Welcome to Glamour Salon
        </h1>
        <p className="max-w-3xl text-base text-center leading-relaxed text-slate-100 sm:text-lg md:text-xl md:px-5">
          Where expert care meets luxurious services for a transformative beauty
          experience in Sri Lanka.
        </p>
        <button className="mt-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          Book Your Appointment
        </button>
      </div>
    </motion.section>
  );
};

export default Hero;