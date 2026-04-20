import Navbar from "./componet/common/Nabar";
import Footer from "./componet/common/Footer";
import About from "./componet/home/AboutSection";
import Hero from "./componet/home/Hero";
import Services from "./componet/home/Services";


export default function Home() {
  return (
     <>
      <Navbar />
      <Hero/>
      <About/>
      <Services/>
      <Footer/>
     </>
      
    
  );
}
