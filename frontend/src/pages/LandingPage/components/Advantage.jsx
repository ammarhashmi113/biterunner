import { AdvantagesData } from "../data";

const Advantage = () => {
    return (
        <section id="about-section" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-24">
                    <p className="text-red-500 text-base font-semibold uppercase tracking-[0.25em] mb-3">
                        Designed for Delivery
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        The <span className="text-red-500">Bite</span>
                        <span className="text-gray-700">Runner</span> Advantage
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid gap-25 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-10">
                    {AdvantagesData.map((item, i) => (
                        <div
                            className="relative bg-gradient-to-br from-gray-50 to-white shadow-md rounded-3xl p-6 pt-20 text-center hover:shadow-xl transition-all duration-300"
                            key={i}
                        >
                            {/* Icon Container */}
                            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-lg w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
                                <img
                                    src={item.imgSrc}
                                    alt={item.heading}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-gray-900 mt-4">
                                {item.heading}
                            </h3>
                            <p className="text-gray-600 text-base mt-2">
                                {item.subheading}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Advantage;
