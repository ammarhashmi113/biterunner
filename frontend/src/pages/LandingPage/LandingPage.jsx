// src/pages/LandingPage/LandingPage.jsx
import Hero from "./components/Hero";
import Advantage from "./components/Advantage";
import HowItWorks from "./components/HowItWorks";
import OurKitchen from "./components/OurKitchen";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

const LandingPage = () => {
    return (
        <>
            <Hero />
            <Advantage />
            <OurKitchen />
            <Gallery />
            <HowItWorks />
            <Testimonials />
            <WhyChooseUs />
        </>
    );
};

export default LandingPage;
