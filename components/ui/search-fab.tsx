"use client";

import { useState } from "react";
import { Search, Sparkles, X, WandSparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface SearchFabProps {
  className?: string;
}

export function SearchFab({ className }: SearchFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    
    toast.loading("Discovering treasures from our garage");
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.dismiss();
      toast.error("ship, something went wrong!");
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
        <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute inset-0 rounded-full animate-glow"
      />

      <motion.div
        animate={{
          y: [0, -3, 0],  // Floating effect
          rotate: [0, 10, -10, 0], // Slight tilting motion
          opacity: [1, 0.8, 1], // Twinkling effect
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1 -right-1"
      >
        <Sparkles className="w-6 h-6 text-yellow-400" />
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
            {/* Wrapper container with original width constraints */}
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
                  className="mt-3 p-2 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-center w-full"
                  onClick={handleSearch}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <span className="animate-pulse">Analyzing...</span>
                  ) : (
                    <>
                      Search
                      <Sparkles className="w-6 h-6 text-gray-500 ml-2" />
                    </>
                  )}
                </button>
              </motion.div>
              {/* Floating Close Button Outside the Popup */}
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
    </>
  );
}
