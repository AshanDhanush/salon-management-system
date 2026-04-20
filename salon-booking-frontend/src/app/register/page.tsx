"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNo: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(''); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8081/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                contactNo: formData.contactNo,
                roll: 'customer'
            });
            const { user, token } = response.data;

            login(user, token);
            if (user.role === 'customer') {
                router.push("/");
            }
            setLoading(false);

        } catch (err) {
            setLoading(false);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 shadow-[0_35px_60px_-15px_rgba(15,23,42,0.9)] rounded-[2rem] p-8 backdrop-blur-xl">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-pink-400">Create Account</p>
                    <h1 className="mt-3 text-3xl font-semibold text-white">Join us today</h1>
                    <p className="mt-2 text-sm text-slate-400">Experience the ultimate grooming journey.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className=' gap-4'>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                    </div>
                    <div className=' gap-4'>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                    </div>
                    <div className=' gap-4'>
                        <div>
                            <label htmlFor="contactNo" className="block text-sm font-medium text-slate-300">Contact Number</label>
                            <input
                                type="text"
                                name="contactNo"
                                id="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                    </div>
                    <div className=' gap-4'>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                    </div>
                    <div className=' gap-4'>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>

                </form>

                  <p className="text-center text-sm text-slate-200 mt-6">
            Already have an account? <Link href="/login" className="font-bold text-brand-deep hover:text-brand-teal transition-colors">Sign in</Link>
          </p>
            </div>
        </div>
    )

}