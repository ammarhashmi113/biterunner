// src/pages/LandingPage/components/WhyChooseUs.jsx
const WhyChooseUs = () => {
    return (
        <section className="bg-red-500 py-20 text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    {/* Text Content */}
                    <div>
                        <p className="text-white/80 text-base font-semibold uppercase tracking-[0.25em] mb-3">
                            Why Choose Us
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Delivering More Than Just Food.
                        </h2>
                        <p className="text-white/80 mb-6 text-base sm:text-lg">
                            From sizzling-hot burgers to lightning-fast
                            delivery, Biterunner takes care of your cravings,
                            all in-house, no middlemen, no compromises. You
                            order, we deliver. Simple.
                        </p>
                        <a
                            href="/register"
                            className="inline-block px-6 py-3 rounded-full bg-white text-black hover:bg-red-500 hover:text-white border border-white transition-all duration-300"
                        >
                            Sign Up
                        </a>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center">
                        <img
                            src="/images/landingpage/misc/burger.png"
                            alt="soup"
                            className="w-48 md:w-64 lg:w-72"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
