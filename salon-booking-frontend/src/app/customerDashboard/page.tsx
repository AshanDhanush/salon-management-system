"use client";

import React, { use, useEffect, useState } from "react"; // Added useState
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, CalendarCheck, LogOut, Menu, X , Loader2} from "lucide-react"; // Added Menu, X
import Navbar from "../componet/common/Nabar";
import Footer from "../componet/common/Footer";
import { useAuth } from "@/context/AuthContext";
import axios, {isAxiosError} from "axios";

type Appointment = {
  title: string;
  date: string;
  time: string;
  category: string;
  price: number;
  status?: string;
};


const NavItems = ({
  logout,
  activeTab,
  setActiveTab,
}: {
  logout: () => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <nav className="w-full space-y-2">
    <button
      onClick={() => setActiveTab("dashboard")}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
        activeTab === "dashboard"
          ? "bg-black text-white"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <LayoutDashboard size={18} />
      Dashboard
    </button>
    <button
      onClick={() => setActiveTab("appointments")}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
        activeTab === "appointments"
          ? "bg-black text-white"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <CalendarCheck size={18} />
      Appointments
    </button>
    <button 
      className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-sm text-sm font-medium mt-6 transition-colors" 
      onClick={logout}
    >
      <LogOut size={18} />
      Logout
    </button>
  </nav>
);

export default function UpdatedDashboard() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [activeTab, setActiveTab] = useState<"dashboard" | "appointments">("dashboard");
  const [amount,setAmount] = useState<number>(0)
  const [error,setError] = useState('')
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

 useEffect(() => {
  const fetchStat = async () => {
    if (!user?.email) return;

    try {
      setLoading(true); 
    
      const [amountRes , listRes] = await Promise.all([
        axios.get(`http://localhost:8081/customers/booking/amount?email=${user.email}`),
        axios.get(`http://localhost:8081/customers/booking/details?email=${user.email}`)
      ]);
      
      setAmount(amountRes.data);
      setAppointments(listRes.data);
      setError(""); 
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Could not load appointment data.");
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchStat();
}, [user?.email]); 

  return (
    <>
      <Navbar />
      
      {/* MOBILE TOGGLE BUTTON (Visible only on small screens) */}
      <div className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between">
        <span className="font-bold font-sans  text-slate-900">My Dashboard</span>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-blue-500 hover:bg-blue-900 text-white rounded-md shadow-md"
        >
          <Menu size={20} />
        </button>
      </div>

      <motion.div
        className="min-h-screen bg-gray-50 flex items-start justify-center px-0 md:px-4 py-0 md:py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white w-full max-w-7xl md:rounded-lg border-0 md:border border-gray-100 shadow-sm flex flex-row overflow-hidden">
          
          {/* DESKTOP SIDEBAR (Hidden on mobile) */}
          <aside className="hidden md:flex w-64 border-r border-gray-100 p-8 flex-col items-center">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-sm">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Guest'}`}
                  alt="User Avatar" 
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 leading-tight">{user?.name || 'Guest'}</h2>
              <p className="text-gray-500 text-sm mt-1">{user?.phone || "757223665"}</p>
            </div>
            <NavItems logout={logout} activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>

          {/* MOBILE SLIDE-OUT MENU (Framer Motion) */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Dark Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
                {/* Sidebar Drawer */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 p-6 md:hidden shadow-2xl"
                >
                  <div className="flex justify-end mb-4 ">
                    <button onClick={() => setIsMobileMenuOpen(false)}><X  className = 'text-red-500 hover:text-red-800' size={24} /></button>
                  </div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-2 overflow-hidden border-2 border-white shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Guest'}`} alt="Avatar" />
                    </div>
                    <h2 className="text-lg font-bold">{user?.name || 'Guest'}</h2>
                  </div>
                  <NavItems logout={logout} activeTab={activeTab} setActiveTab={setActiveTab} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* RIGHT MAIN CONTENT AREA */}
          <main className="flex-1 p-6 md:p-8 bg-white min-h-[60vh]">
            {activeTab === "dashboard" ? (
              <div className="max-w-xl mx-auto md:mx-0">
                <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                      <div className="p-3 border-2 border-black rounded-lg">
                        <CalendarCheck size={32} className="text-black" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">Appointments</h3>
                        <p className="text-gray-500 text-sm">Your history</p>
                      </div>
                    </div>
                    <div className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tighter">
                      {loading ? (
                        <Loader2 className="animate-spin text-slate-700" />
                      ) : (
                        // Changed text-white to text-black or text-pink-500 because the background is white
                        <div className="text-4xl font-black text-black group-hover:text-pink-500 transition-colors">
                          {amount}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#1f2937] hover:bg-black transition-colors">
                    <button className="w-full py-3 text-white text-sm font-semibold tracking-wide"
                     onClick={()=>setActiveTab("appointments")} >
                      View All Bookings
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-full mx-auto md:mx-0">
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold">Price</th>
                      </tr>
                    </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {appointments.length > 0 ? (
                          appointments.map((app,index) => (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{app.title}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{app.date}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{app.time}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{app.category}</td>
                              <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                                {app.status || "Confirmed"}
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                                Rs. {(app.price*10000).toLocaleString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-10 text-center text-gray-400 italic">
                              No appointments found. Start booking today!
                            </td>
                          </tr>
                        )}
                      </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}