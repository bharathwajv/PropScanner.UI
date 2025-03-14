"use client";

import { useState } from "react";
import { Search, Sparkle, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface SearchFabProps {
  className?: string;
}

export function SearchFab({ className }: SearchFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    toast.loading("Discovering treasures from our garage");
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.dismiss();
      toast.error("Ship, something went wrong!");
    }, 4000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn("relative p-3 rounded-full bg-white shadow-md", className)}
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-7 h-7" />

        {/* Sparkles with pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1], // Expanding and shrinking effect
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-2 -right-1"
        >
          <Sparkle className="w-5 h-5 text-yellow-400" />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.3, 1], // Slightly bigger pulse
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.2,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 -left-3"
        >
          <Sparkle className="w-6 h-6 text-yellow-400" />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1], // Smallest pulse effect
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut",
          }}
          className="absolute bottom-1 -right-2"
        >
          <Sparkle className="w-4 h-4 text-yellow-400" />
        </motion.div>
      </motion.button>

      {/* Search Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Wrapper container */}
            <div className="relative w-[90%] max-w-md">
              <motion.div
                className="bg-white p-4 rounded-lg shadow-lg w-full"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <textarea
                  placeholder="Search for properties..."
                  className={cn(
                    "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 h-24 resize-none",
                    isAnalyzing && "shimmer-text"
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isAnalyzing}
                />
                <button
                  className={cn(
                    "mt-3 p-2 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-center w-full",
                    searchQuery.trim() === ""
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  )}
                  onClick={handleSearch}
                  disabled={isAnalyzing || searchQuery.trim() === ""}
                >
                  {isAnalyzing ? (
                    <span className="shiny-text">Analyzing...</span>
                  ) : (
                    <>
                      Search
                      <Sparkles className="w-6 h-6 text-gray-500 ml-2" />
                    </>
                  )}
                </button>
              </motion.div>
              {/* Floating Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute left-1/2 transform -translate-x-1/2 translate-y-full mt-2 p-2 rounded-full bg-white shadow-lg border border-gray-300 hover:bg-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for Left-to-Right Shimmer Animation */}
      <style jsx>{`
        .shiny-text {
          background: linear-gradient(
            90deg,
            rgba(82, 82, 82, 0.2) 0%,
            rgb(35, 35, 35) 50%,
            rgba(106, 106, 106, 0.2) 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          animation: shimmer 3s linear infinite;
          font-weight: bold;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}
