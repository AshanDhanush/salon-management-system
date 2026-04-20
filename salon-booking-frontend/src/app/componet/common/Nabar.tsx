'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
    ];

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const menuVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3,
            },
        }),
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white font-sans shadow-lg"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                            Salon
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        className="hidden md:flex items-center space-x-1"
                    >
                        <ul className="flex space-x-2">
                            {menuItems.map((item, i) => (
                                <motion.li
                                    key={item.label}
                                    custom={i}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.a
                                        href={item.href}
                                        whileHover={{ y: -2 }}
                                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200 block"
                                    >
                                        {item.label}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        className="hidden md:flex items-center space-x-3"
                    >{user ? (
                        <>
                            <Link href="/customerDashboard">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200 font-medium cursor-pointer"
                                >
                                    <User className="w-5 h-5" />
                                    <span>{user.name}</span>
                                </motion.div>
                            </Link>
                            <button onClick={logout} className="px-5 py-2 rounded-lg bg-sky-900 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200 font-medium">
                                Logout
                            </button>
                        </>


                    ) : (
                        <Link href="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200 font-medium"
                            >
                                Login
                            </motion.button>
                        </Link>

                    )
                        }
                        <Link href="/booking">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium shadow-lg transition-all duration-200"
                            >
                                Book Now
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuVariants}
                        className="md:hidden border-t border-slate-800"
                    >
                        <div className="space-y-2 py-4">
                            {menuItems.map((item, i) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    custom={i}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="block px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            {user ? (
                                <Link href="/customerDashboard">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-2 px-5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors duration-200 font-medium cursor-pointer"
                                            >
                                                <User className="w-5 h-5" />
                                                <span>{user.name}</span>
                                            </motion.div>
                                        </Link>
                            ):(
                                <></>
                            )}
                            <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                                {user ? (
                                    <>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors font-medium text-center"
                                            onClick={logout}
                                        >
                                            Logout
                                        </motion.button>
                                    </>
                                ) : (
                                    <Link href="/login">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors font-medium text-center"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </motion.button>
                                    </Link>
                                )}

                                <Link href="/booking">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Book Now
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}