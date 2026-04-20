"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios, { isAxiosError } from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error on new attempt

        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', {
                email: email,
                password: password
            });

            // FIX: Correctly destructuring user and token from response data
            const { user, token } = response.data;

            login(user, token);

            if (user.role === 'CUSTOMER') {
                router.push("/");
                console.log("Customer logged in", user.name);
            }
        } catch (err) {
            if (isAxiosError(err) && err.response) {
                // TypeScript now knows err.response exists
                setError(err.response.data.message || "Invalid email or password");
            } else {
                setError("Network error. Is the server running?");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-slate-900/95 border border-slate-800 shadow-[0_35px_60px_-15px_rgba(15,23,42,0.9)] rounded-[2rem] p-8 backdrop-blur-xl">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-pink-400">Welcome back</p>
                    <h1 className="mt-3 text-3xl font-semibold text-white">Login to your account</h1>
                    <p className="mt-2 text-sm text-slate-400">Access your dashboard and manage your bookings.</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-slate-200 mb-2">Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white shadow-inner outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-200 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white shadow-inner outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-pink-400 hover:text-pink-300">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}