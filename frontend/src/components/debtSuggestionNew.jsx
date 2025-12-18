import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "./navbar";
import IndiSuggetion from "./indiSuggestionNew";
import { MdOutlineAutoAwesome } from "react-icons/md";

const Suggestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);

  const tripId = location.state?.tripId;
  const back = () => navigate(-1);

  const fetchSuggestions = async () => {
    if (!tripId) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/trips/${tripId}/suggestions`);
      setSuggestions(response.data);

      const tripRes = await axiosInstance.get(`/api/trips/${tripId}`);
      setTripDetails(tripRes.data);
    } catch (err) {
      console.error("Failed to fetch settlement data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [tripId]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito flex flex-col">
      <Navbar back={back} />

      {/* --- Sticky Summary Header --- */}
      <div className="fixed top-[64px] left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-100">
                <MdOutlineAutoAwesome size={22} />
             </div>
             <div>
                <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none">Trip Settlement</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Smart split suggestions</p>
             </div>
          </div>

          {/* Cost Summary Card */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Trip Cost</span>
              <span className="text-xl font-black text-slate-800 tracking-tighter">₹{tripDetails?.totalTripCost?.toFixed(2)}</span>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-black text-teal-600 uppercase tracking-tighter">Per Head Share</span>
              <span className="text-xl font-black text-teal-600 tracking-tighter">₹{tripDetails?.perMemberShare?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Suggestions List --- */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-52 pb-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
            Recommended Settlements ({suggestions.length})
          </h2>

          <AnimatePresence>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 w-full bg-white rounded-[24px] border border-slate-100 animate-pulse" />
                ))}
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <IndiSuggetion index={index + 1} suggestion={suggestion} />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-medium tracking-tight">No debts found. Everyone is even!</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Suggestions;