"use client";

import { useAuth } from "@/context/AuthContext";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatButton() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Don't show the button if it's loading, there is no user, or we are already on the chat page
  if (loading || !user || pathname === "/chat") {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/chat">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
            <MessageCircle className="w-8 h-8 text-white relative z-10" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
