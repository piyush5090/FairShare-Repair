import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/onlylogo.png';

const IntroPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Adjust the breakpoint as needed

  // Update isMobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define animation variants for the logo and other elements
  const logoVariants = {
    initial: { opacity: 0, y: 100 }, // Start position below
    center: { opacity: 1, y: 0 }, // Logo centered
    top: { opacity: 1, y: isMobile ? -425 : -290 }, // Different final position based on screen size
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowContent(true); // Show content after the logo has moved
    }, 1600); // Set this to the total duration for logo movement

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-4 px-4 relative">
      {/* Animated Logo */}
      <motion.div
        className="flex flex-col items-center mb-8"
        initial="initial" // Start from the initial state
        animate={showContent ? 'top' : 'center'} // Animate based on animation state
        variants={logoVariants}
        transition={{ duration: 1, ease: 'easeOut' }} // Smoother transition
        style={{
          position: 'absolute',
          top: '50%', // Center when not moved
          transform: 'translateY(-50%)', // Center vertically
          zIndex: 10, // Ensure it stays above other elements
        }}
      >
        <img src={logo} alt="FairShare Logo" className="w-22 h-20" />
        <h1 className="text-4xl font-bold text-teal-800">FairShare</h1>
        <p className="text-lg text-gray-600">Fair Spending, Fair Sharing.</p>
      </motion.div>

      {/* Spacer to create space for the logo and prevent overlap */}
      <div style={{ height: '150px' }} /> {/* Adjust height as needed */}

      {/* Animated Features Section */}
      <div
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        style={{ position: 'relative', zIndex: 0 }}
      >
        {/* Feature 1: Track Expenses */}
        <motion.div
          className="p-6 bg-gray-200 rounded-lg shadow-md"
          initial="hidden"
          animate={showContent ? 'visible' : 'hidden'}
          variants={contentVariants}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-teal-800">Track Expenses</h2>
          <p className="text-gray-600">
            Keep a detailed record of all your trip expenses effortlessly.
          </p>
        </motion.div>

        {/* Feature 2: Balance Payments */}
        <motion.div
          className="p-6 bg-gray-200 rounded-lg shadow-md"
          initial="hidden"
          animate={showContent ? 'visible' : 'hidden'}
          variants={contentVariants}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-teal-800">Balance Payments</h2>
          <p className="text-gray-600">
            Automatically calculate and balance who owes what for a fair share.
          </p>
        </motion.div>

        {/* Feature 3: Real-Time Updates */}
        <motion.div
          className="p-6 bg-gray-200 rounded-lg shadow-md"
          initial="hidden"
          animate={showContent ? 'visible' : 'hidden'}
          variants={contentVariants}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-teal-800">Real-Time Updates</h2>
          <p className="text-gray-600">
            View and update expenses in real-time across all your devices.
          </p>
        </motion.div>

        {/* Feature 4: Secure Transactions */}
        <motion.div
          className="p-6 bg-gray-200 rounded-lg shadow-md"
          initial="hidden"
          animate={showContent ? 'visible' : 'hidden'}
          variants={contentVariants}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-teal-800">Secure Transactions</h2>
          <p className="text-gray-600">
            Ensure all your financial data is securely stored and managed.
          </p>
        </motion.div>
      </div>

      {/* Animated Login/Signup Buttons */}
      <motion.div
        className="flex space-x-4"
        initial="hidden"
        animate={showContent ? 'visible' : 'hidden'}
        variants={contentVariants}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
      >
        <Link
          to="/login"
          className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition transform hover:scale-105"
        >
          Sign Up
        </Link>
      </motion.div>
    </div>
  );
};

export default IntroPage;
