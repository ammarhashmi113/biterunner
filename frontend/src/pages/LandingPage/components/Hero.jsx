const Hero = () => {
    return (
        <section id="home-section" className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
                    {/* Image Section */}
                    <div className="lg:col-span-6 relative flex justify-center">
                        <img
                            src="/images/landingpage/hero/banner-image.png"
                            alt="hero"
                            width={1000}
                            height={805}
                            className="max-w-full h-auto"
                        />

                        {/* Floating Info Box */}
                        <a href="/menu">
                            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg flex gap-3 items-center">
                                <img
                                    src="/images/landingpage/hero/pizza.svg"
                                    alt="pizza"
                                    className="w-14 h-14 object-contain"
                                />
                                <p className="text-gray-700 text-base sm:text-lg leading-snug">
                                    <span className="font-semibold text-red-500">
                                        50+{" "}
                                    </span>
                                    Menu Items
                                </p>
                            </div>
                        </a>
                    </div>

                    {/* Text Section */}
                    <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Your Favorite Meals, <br /> Delivered.
                        </h1>
                        <p className="text-gray-600 text-lg sm:text-xl">
                            Skip the middleman. Order directly from us for{" "}
                            <br className="hidden sm:block" />
                            faster service, better prices, and fresher food.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="/menu"
                                className="text-lg font-semibold rounded-full text-white py-4 px-6 bg-red-500 hover:bg-red-600 transition duration-300 border border-red-500"
                            >
                                Order Now
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-lg font-semibold rounded-full text-red-500 py-4 px-6 border border-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
