import About from "@/components/About";
import Contact from "@/components/Contact";
import Customers from "@/components/Customers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Services from "@/components/Services";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Services />
        <Customers />
        <Locations />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
