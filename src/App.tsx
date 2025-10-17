import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-night text-softGray overflow-x-hidden">
      <Navbar />
      <HeroSection/>
      <Highlights/>
      <Footer/>
    </div>
  );
};

export default App;
