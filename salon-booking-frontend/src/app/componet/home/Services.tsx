"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Tag, Scissors, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';


interface Service {
    id: number;
    title: string;
    price: string;
    duration: string;
    category: string;
    description: string;
}



const Services = () => {
    const services: Service[] = [
        {
            id: 1,
            title: "Executive Haircut",
            price: "Rs. 2,500",
            duration: "45 min",
            category: "Hair",
            description: "Custom cut, wash, and style tailored to your preference."
        },
        {
            id: 2,
            title: "Signature Beard Trim",
            price: "Rs. 1,200",
            duration: "30 min",
            category: "Grooming",
            description: "Hot towel treatment, precision shaping, and beard oil finish."
        },
        {
            id: 3,
            title: "Luxury Skin Facial",
            price: "Rs. 4,000",
            duration: "60 min",
            category: "Skin",
            description: "Deep cleansing and hydration to revitalize your skin."
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <section className="py-20 bg-slate-800" id='services'>
                <div className="max-w-7xl mx-auto px-6">

                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-2">
                                Our Menu
                            </h2>
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                Premium Services
                            </h3>
                        </div>
                        <p className="text-white max-w-md">
                            Choose from our curated selection of grooming treatments designed for the modern gentleman.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
                            >
                                {/* Category Badge */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-6 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <Scissors size={14} />
                                    {service.category}
                                </div>

                                {/* Title & Description */}
                                <h4 className="text-2xl font-bold text-slate-900 mb-3">
                                    {service.title}
                                </h4>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Price & Duration Info */}
                                <div className="flex items-center justify-between py-4 border-t border-slate-100 mb-6">
                                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                                        <Tag size={18} className="text-blue-500" />
                                        {service.price}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <Clock size={18} />
                                        {service.duration}
                                    </div>
                                </div>

                                {/* Button */}
                                <Link href  = "/booking">
                                <button className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                                    Book Now
                                    <ChevronRight size={18} />
                                </button>
                                </Link>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.section>
    )
};

export default Services;