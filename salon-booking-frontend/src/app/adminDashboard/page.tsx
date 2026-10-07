"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, LayoutDashboard, Loader2, LogOut, Menu, User, X } from "lucide-react";
import axios, { isAxiosError } from "axios";
import Navbar from "../componet/common/Nabar";
import { useAuth } from "@/context/AuthContext";
import Footer from "../componet/common/Footer";

type Tab = "dashboard" | "appointments" | "users";

type Appointment = {
  id?: string | number;
  title?: string;
  customerName?: string;
  date?: string;
  time?: string;
  category?: string;
  price?: number;
  status?: string;
};

type User = {
  id?: string;
  name?: string;
  email?: string;
  contactNo?: string;
  address?: string;
  role?: string;
};

const STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"];

const normalizeAppointment = (item: any, index: number): Appointment => ({
  id: item?.id ?? item?.appointmentId ?? item?.bookingId ?? item?._id ?? index,
  title: item?.title ?? item?.serviceName ?? item?.service ?? "Appointment",
  customerName: item?.customerName ?? item?.customer ?? item?.userName ?? "Customer",
  date: item?.date ?? item?.bookingDate ?? item?.appointmentDate ?? "-",
  time: item?.time ?? item?.bookingTime ?? item?.appointmentTime ?? "-",
  category: item?.category ?? item?.serviceCategory ?? item?.type ?? "General",
  price: Number(item?.price ?? item?.amount ?? item?.totalPrice ?? 0),
  status: item?.status ?? item?.bookingStatus ?? item?.appointmentStatus ?? "Pending",
});

const NavItems = ({
  logout,
  activeTab,
  setActiveTab,
}: {
  logout: () => void;
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => (
  <nav className="w-full space-y-2">
    <button
      onClick={() => setActiveTab("dashboard")}
      className={`w-full flex items-center gap-3 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === "dashboard" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <LayoutDashboard size={18} />
      Dashboard
    </button>

    <button
      onClick={() => setActiveTab("appointments")}
      className={`w-full flex items-center gap-3 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === "appointments" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <CalendarCheck size={18} />
      Appointments
    </button>

    <button
      onClick={() => setActiveTab("users")}
      className={`w-full flex items-center gap-3 rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === "users" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <User size={18} />
      Users
    </button>

    <button
      className="mt-6 flex w-full items-center gap-3 rounded-sm px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
      onClick={logout}
    >
      <LogOut size={18} />
      Logout
    </button>
  </nav>
);

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);

  const fetchAdminData = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      setError("");

      const [amountRes, appointmentsRes, usersRes] = await Promise.all([
        axios.get(`http://localhost:8081/customers/booking/amount?email=${user.email}`),
        axios.get(`http://localhost:8081/customers/booking/getALL`),
        axios.get(`http://localhost:8081/customers/getALL`),
      ]);

      setAmount(Number(amountRes.data ?? 0));
      const list = Array.isArray(appointmentsRes.data)
        ? appointmentsRes.data
        : Array.isArray(appointmentsRes.data?.data)
          ? appointmentsRes.data.data
          : [];

      setAppointments(list.map(normalizeAppointment));
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Could not load appointment data.");
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [user?.email]);

  const updateAppointmentStatus = async (id: string | number, newStatus: string) => {
    if (!id) return;

    try {
      setUpdatingId(id);
      setError("");

      const endpoints = [
        `http://localhost:8081/customers/booking/updateStatus/${id}`,
        `http://localhost:8081/api/booking/${id}/status`,
        `http://localhost:8081/api/appointments/${id}/status`,
      ];

      let success = false;

      for (const endpoint of endpoints) {
        try {
          await axios.put(endpoint, { status: newStatus });
          success = true;
          break;
        } catch {
          // Try next known endpoint.
        }
      }

      if (!success) {
        await axios.patch(`http://localhost:8081/customers/booking/${id}`, { status: newStatus });
      }

      setAppointments((prev) =>
        prev.map((appointment) =>
          String(appointment.id) === String(id)
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Could not update appointment status.");
      } else {
        setError("Could not update appointment status.");
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4 md:hidden">
        <span className="text-lg font-bold text-slate-900">Admin Dashboard</span>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-md bg-blue-500 p-2 text-white shadow-md transition-colors hover:bg-blue-900"
          aria-label="Open dashboard menu"
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
        <div className="flex w-full max-w-7xl flex-row overflow-hidden border-0 bg-white shadow-sm md:rounded-lg md:border md:border-gray-100">
          <aside className="hidden w-64 flex-col items-center border-r border-gray-100 p-8 md:flex">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-yellow-400 shadow-sm">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "Guest"}`}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold leading-tight text-gray-800">{user?.name || "Guest"}</h2>
              <p className="mt-1 text-sm text-gray-500">{user?.contactNo || "757223665"}</p>
            </div>

            <NavItems logout={logout} activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-black/50 md:hidden"
                />

                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  className="fixed bottom-0 left-0 top-0 z-50 w-64 bg-white p-6 shadow-2xl md:hidden"
                >
                  <div className="mb-4 flex justify-end">
                    <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                      <X className="text-red-500 hover:text-red-800" size={24} />
                    </button>
                  </div>

                  <div className="mb-6 text-center">
                    <div className="mx-auto mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-yellow-400 shadow-sm">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "Guest"}`}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">{user?.name || "Guest"}</h2>
                  </div>

                  <NavItems logout={logout} activeTab={activeTab} setActiveTab={setActiveTab} />
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <main className="min-h-[60vh] flex-1 bg-white p-4 sm:p-6 md:p-8">
            {activeTab === "dashboard" ? (
              <div className="mx-auto max-w-xl md:mx-0">
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="rounded-lg border-2 border-black p-2 sm:p-3">
                        <CalendarCheck size={28} className="text-black sm:size-8" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">Appointments</h3>
                        <p className="text-sm text-gray-500">Booking overview</p>
                      </div>
                    </div>

                    <div className="text-4xl font-black tracking-tighter text-black sm:text-5xl md:text-6xl">
                      {loading ? <Loader2 className="animate-spin text-slate-700" /> : amount}
                    </div>
                  </div>

                  <div className="bg-[#1f2937] transition-colors hover:bg-black">
                    <button onClick={() => setActiveTab("appointments")} className="w-full py-3 text-sm font-semibold tracking-wide text-white">
                      View All Bookings
                    </button>
                  </div>
                </div>
              </div>
            ) : activeTab === "appointments" ? (
              <div className="mx-auto flex w-full max-w-6xl justify-center md:mx-0">
                <div className="w-full">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">All Appointments</h2>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {appointments.length} total
                    </span>
                  </div>

                  {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

                  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold">Price</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">
                      {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                          <tr key={String(appointment.id ?? index)} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{appointment.title || "Appointment"}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{appointment.customerName || "Customer"}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{appointment.date || "-"}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{appointment.time || "-"}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{appointment.category || "General"}</td>
                            <td className="px-4 py-3 text-sm">
                              <select
                                value={appointment.status || "Pending"}
                                onChange={(event) => updateAppointmentStatus(appointment.id ?? index, event.target.value)}
                                disabled={updatingId === (appointment.id ?? index)}
                                className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 shadow-sm outline-none transition focus:border-slate-500"
                              >
                                {STATUS_OPTIONS.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                              Rs. {Number(appointment.price ?? 0).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-4 py-10 text-center text-gray-400 italic">
                            {loading ? "Loading appointments..." : "No appointments found."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl md:mx-0">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 bg-slate-900 px-4 py-4 text-white sm:px-6">
                    <h3 className="text-lg font-bold sm:text-xl">Users</h3>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {(users.length > 0 ? users : [{ name: "Aisha Perera", email: "aisha@example.com", role: "Customer" }, { name: "Nimal Silva", email: "nimal@example.com", role: "Stylist" }, { name: "Sami Fernando", email: "sami@example.com", role: "Admin" }]).map((member: any) => (
                      <div key={member.email || member.id || member.name} className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-gray-800">{member.name || "User"}</p>
                          <p className="truncate text-sm text-gray-500">{member.email || "-"}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 sm:px-3">{member.role || "User"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </motion.div>
      <Footer/>
    </>
  );
}
