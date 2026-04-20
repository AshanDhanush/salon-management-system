"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import aboutImg from '../../../assets/Glamorous portrait with soft lighting.png';
import Link from 'next/link';   
export default function About() {
    return (
        <motion.section
            className="relative w-full min-h-screen max-h-0.5 sm:min-h-[90vh] overflow-hidden bg-gradient-to-r from-slate-900 to-slate-950  "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            id = "about"
        >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl text-white px-4 py-16 mt-15">
                <div className="flex-1 flex flex-col gap-6">
                    <h1 className='bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent text-4xl md:text-6xl '>The New Standard of Elegance</h1>
                    <span className='mt-3 text-sm md:text-lg'>Step into a world where premium care meets refined artistry. Our sanctuary is dedicated to those who demand excellence, offering a sophisticated beauty experience designed to rejuvenate both your style and your spirit. We combine global innovation with a personalized touch to ensure every visit is a masterpiece of luxury.</span>
                    <Link href="/about">
                        <button className="mt-6 self-start rounded-full bg-gradient-to-r from-sky-300 to-purple-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                            View More
                        </button>
                    </Link>
                </div>
                <div className='flex-1 flex justify-center'>
                    <Image
                        src={aboutImg}
                        alt="About Glamour Salon"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover shadow-lg"
                    />
                    
                </div>


            </div>

        </motion.section>

    );
}