"use client"

import Footer from "../componet/common/Footer";
import Navbar from "../componet/common/Nabar";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Clock, User, Check, ChevronRight, ChevronLeft, Calendar } from "lucide-react";

interface Service {
    id: number;
    title: string;
    price: string;
    duration: string;
    category: string;
}

const services: Service[] = [
    { id: 1, title: "Executive Haircut", price: "Rs. 2,500", duration: "45 min", category: "Hair" },
    { id: 2, title: "Signature Beard Trim", price: "Rs. 1,200", duration: "30 min", category: "Grooming" },
    { id: 3, title: "Luxury Skin Facial", price: "Rs. 4,000", duration: "60 min", category: "Skin" }
];

export default function Booking(){
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<string>("");

    useEffect(() => {
        const fetchSlots = async () => {
            if (!selectedDate) return;

            setLoadingSlots(true);
            try {
                const response = await fetch(`http://localhost:8081/api/booking/availability?date=${selectedDate}`);
                const data = await response.json();
                setAvailableSlots(data);
            } catch (error) {
                console.error("Error fetching slots:", error);
            } finally {
                setLoadingSlots(false);
            }
        };

        fetchSlots();
    }, [selectedDate]); 

    return(
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            {/* Header Area */}
            <div className="py-12 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Book Your Session
                </h1>
                <p className="text-slate-400 mt-4">Follow the steps to secure your premium grooming slot.</p>
            </div>

            <main className="max-w-4xl mx-auto px-6 pb-24">
                {/* Progress Bar */}
                <div className="flex justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
                    {[1, 2, 3].map((s) => (
                        <div 
                            key={s} 
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                                step >= s ? "bg-pink-500 text-white" : "bg-slate-900 text-slate-500 border border-slate-700"
                            }`}
                        >
                            {step > s ? <Check size={20} /> : s}
                        </div>
                    ))}
                </div>

                {/* Booking Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {/* STEP 1: SERVICE SELECTION */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <Scissors className="text-pink-500" /> Select a Service
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {services.map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => setSelectedService(service)}
                                            className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                                                selectedService?.id === service.id 
                                                ? "border-pink-500 bg-pink-500/10" 
                                                : "border-slate-800 hover:border-slate-700 bg-slate-800/40"
                                            }`}
                                        >
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-pink-500 uppercase tracking-tighter">{service.category}</p>
                                                <h3 className="text-xl font-bold">{service.title}</h3>
                                                <div className="flex gap-4 mt-1 text-slate-400 text-sm">
                                                    <span className="flex items-center gap-1"><Clock size={14}/> {service.duration}</span>
                                                    <span className="font-bold text-slate-200">{service.price}</span>
                                                </div>
                                            </div>
                                            {selectedService?.id === service.id && <Check className="text-pink-500" />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* 🗓️ DATE PICKER */}
                                <div className="space-y-4">
                                    <label className="text-slate-400 text-sm font-bold uppercase">Select Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none focus:border-pink-500 transition-all"
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]} // Disable past dates
                                    />
                                </div>

                                {/* 🕒 TIME SLOTS */}
                                <div className="space-y-4">
                                    <label className="text-slate-400 text-sm font-bold uppercase">Available Times</label>

                                    {loadingSlots ? (
                                        <div className="flex items-center gap-2 text-pink-500 animate-pulse">
                                            Fetching slots...
                                        </div>
                                    ) : availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            {availableSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setSelectedTime(slot)}
                                                    className={`p-3 rounded-xl font-bold border-2 transition-all ${selectedTime === slot
                                                            ? "border-pink-500 bg-pink-500 text-white"
                                                            : "border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                                                        }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 italic">Please select a date to see availability.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-12">
                        <button
                            disabled={step === 1}
                            onClick={() => setStep(step - 1)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                                step === 1 ? "opacity-0 pointer-events-none" : "hover:bg-slate-800 text-slate-400"
                            }`}
                        >
                            <ChevronLeft size={20} /> Back
                        </button>
                        
                        <button
                            disabled={step === 1 && !selectedService}
                            onClick={() => setStep(step + 1)}
                            className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-white hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {step === 3 ? "Confirm Booking" : "Next Step"} <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
        
    );
}