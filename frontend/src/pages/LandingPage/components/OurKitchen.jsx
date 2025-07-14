// src/pages/LandingPage/components/OurKitchen.jsx
import { ourKitchenData } from "../data";

const OurKitchen = () => {
    return (
        <section className="bg-red-50 py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-red-500 text-base font-semibold uppercase tracking-[0.25em] mb-3">
                    From Our Kitchen
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-14">
                    Crafted with Passion, Delivered with Care
                </h2>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {ourKitchenData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-full aspect-square overflow-hidden rounded-xl mb-6">
                                <img
                                    src={item.imgSrc}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-base mt-1">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurKitchen;
