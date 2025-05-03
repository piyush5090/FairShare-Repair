import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "./navbar";
import { FaInstagram, FaLinkedin, FaSpotify } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import Team from "./team";
import { useNavigate } from "react-router-dom";

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Section = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};  

const AboutUs = () => {

const navigate = useNavigate();

const back = () =>{
    navigate(-1);
}

  return (
    <>
      <Navbar back={back}/>

      <div className="min-h-screen w-full flex flex-col mt-16 gap-4 bg-white">

        {/* Heading */}
        <div className="px-6 text-left">
          <p className="text-[rgb(84,45,0)] font-baloo text-[35px] font-normal leading-[56px] tracking-[0px]">
            About Us
          </p>
        </div>

        {/* Welcome */}
        <Section>
          <div className="px-6 text-left">
            <p className="text-black font-nunito text-[22px] font-normal">
              Welcome to FairShare - <br />
              Fair Spending, Fair Sharing.
            </p>
            <p className="text-black font-open text-[18px] font-light leading-[25px]">
              At FairShare, we believe that managing group expenses should be simple,
              transparent, and fair. Whether you're on a weekend getaway with friends,
              organizing a team event, or splitting bills for a shared apartment,
              FairShare ensures everyone pays their fair share — no stress, no confusion.
            </p>
          </div>
        </Section>

        {/* Our Mission */}
        <Section>
          <div className="px-6 text-left">
            <p className="text-black font-nunito text-[22px] font-normal">Our Mission</p>
            <p className="text-black font-open text-[18px] font-light leading-[25px]">
              To make group expense tracking effortless, accurate, and accessible —
              helping friends and teams focus on the moments that matter, not the money math.
            </p>
          </div>
        </Section>

        {/* Our Story */}
        <Section>
          <div className="px-6 text-left">
            <p className="text-black font-nunito text-[22px] font-normal">Our Story</p>
            <p className="text-black font-open text-[18px] font-light leading-[25px]">
              FairShare was born out of personal frustration. A group of friends went on a trip
              and spent more time figuring out who owed what than enjoying the vacation. That’s
              when we knew — there had to be a better way. What started as a side project quickly
              turned into a full-featured solution to help everyone split expenses with ease and confidence.
            </p>
          </div>
        </Section>

        {/* Meet Our Team */}
        <Section>
          <div className="px-6 text-left">
            <p className="text-black font-nunito text-[22px] font-normal">Meet Our Team</p>
            <p className="text-black font-open text-[18px] font-light leading-[25px]">
              We're four friends who built FairShare out of a shared passion for building smarter,
              people-friendly tools. Each of us brings a unique strength to the team — from design
              and development to strategy and product thinking.
            </p>
          </div>
        </Section>

        {/* Team Component */}
        <Section>
          <Team />
        </Section>

        {/* Why FairShare */}
        <Section>
          <div className="px-6 text-left">
            <p className="text-black font-nunito text-[22px] font-normal">Why FairShare?</p>
            <p className="text-black font-open text-[18px] font-light leading-[25px]">
              Traditional expense tracking tools can be complicated or cluttered. FairShare is built
              with simplicity and fairness at its core — designed for friends who value transparency
              and want to avoid awkward money talks after a fun trip.
            </p>
          </div>
        </Section>
      </div>

      <div className="bg-white h-[20px] w-[full]">

      </div>

      {/* Simple Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
          <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} FairShare. All rights reserved.</p>
          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="Spotify"><FaSpotify /></a>
            <a href="mailto:team@fairshare.com" aria-label="Email"><MdAttachEmail /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutUs;
