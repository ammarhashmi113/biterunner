// src/pages/LandingPage/components/Testimonials.jsx
import { testimonialsData } from "../data";

const Testimonials = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-14">
                    <p className="text-red-500 text-base font-semibold uppercase tracking-[0.25em] mb-3">
                        What Our Customers Say
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        Loved by foodies across the city.
                    </h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonialsData.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <h4 className="text-lg font-semibold text-gray-900">
                                    {testimonial.name}
                                </h4>
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed">
                                “{testimonial.feedback}”
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
