// src/pages/LandingPage/components/HowItWorks.jsx

// const steps = [
//     {
//         icon: <ListOrdered className="w-6 h-6 text-red-500" />,
//         title: "Browse & Customize",
//         description:
//             "Explore our full menu and tailor your meal to your taste.",
//     },
//     {
//         icon: <CheckCircle className="w-6 h-6 text-red-500" />,
//         title: "Place Your Order",
//         description:
//             "Order directly through our website—fast, secure, and simple.",
//     },
//     {
//         icon: <Clock className="w-6 h-6 text-red-500" />,
//         title: "Real-Time Tracking",
//         description:
//             "Know exactly when your food will arrive with live updates.",
//     },
//     {
//         icon: <UtensilsCrossed className="w-6 h-6 text-red-500" />,
//         title: "Fresh at Your Door",
//         description: "We cook and deliver—no third-party apps, just us.",
//     },
// ];

import { howItWorksStepsData } from "../data";

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 items-center gap-0 sm:gap-12">
                    {/* Image Section */}
                    <div className="relative w-full max-w-xl mx-auto order-1 lg:order-2">
                        <img
                            src="/images/landingpage/misc/cook.png"
                            alt="How Biterunner Works"
                            className="w-full h-auto rounded-xl"
                        />
                    </div>
                    {/* Text Section */}
                    <div className="order-2 lg:order-1">
                        <p className="text-red-500 text-sm font-semibold uppercase tracking-[0.25em] mb-3 text-center sm:text-start">
                            How It Works
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8 text-center sm:text-start">
                            From Kitchen to Your Doorstep
                        </h2>
                        <div className="space-y-6">
                            {howItWorksStepsData.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="mt-1">{step.icon}</div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm sm:text-base mt-1">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center sm:justify-start sm:items-start ">
                            <a
                                href="/menu"
                                className="inline-block mt-10 text-base md:text-lg font-semibold rounded-full text-white bg-red-500 border border-red-500 px-6 py-3 hover:bg-transparent hover:text-red-600 transition-all duration-300"
                            >
                                Order Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
