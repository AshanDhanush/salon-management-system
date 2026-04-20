"use client";

import React from "react";
import Navbar from "../componet/common/Nabar";
import Footer from "../componet/common/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

import aboutImage from "./../../assets/Gemini_Generated_Image_sojcoisojcoisojc.png";


export default function About() {
  return (
    <>
      <Navbar />
      <motion.div
        className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-r from bg-gray-700 to bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src={aboutImage}
            alt="Liyo Salon - Transforming Beauty"
            priority
            fill
            className=" object-center hidden md:block "
            
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
            <div className="max-w-2xl text-left">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
              >
                About Salon
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-2xl text-slate-100 font-medium leading-relaxed"
              >
                Discover Our Journey of Excellence and Commitment to
                <br className="hidden md:block" />
                Transforming Beauty in Sri Lanka.
              </motion.p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">
              Our Journey
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed italic">
              Since our inception, Salon has been at the forefront of
              hairstyling innovation, blending traditional techniques with
              modern artistry to create timeless looks for every client.
            </p>
          </div>

          {/* You can add another image or a stat block here to fill the right side */}
          <video
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Replace the path below with your actual video file path in /public */}
            <source
              src="https://res.cloudinary.com/dvoaneah7/video/upload/v1775847096/Salon_Growth_Video_Generated_tcllwn.mp4"
              type="video/mp4"
            />
          </video>
        </section>
      </motion.div>
      <Footer />
    </>
  );
}