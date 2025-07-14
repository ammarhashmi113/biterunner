// src/pages/LandingPage/data.js
import { CheckCircle, ListOrdered, Clock, UtensilsCrossed } from "lucide-react";

export const AdvantagesData = [
    {
        imgSrc: "/images/landingpage/advantage/advantage1.jpg",
        heading: "Fresh & Fast",
        subheading: "Straight from our kitchen to your doorstep.",
    },
    {
        imgSrc: "/images/landingpage/advantage/advantage2.jpg",
        heading: "In-House Delivery",
        subheading: "No middlemen. Our own riders, our own speed.",
    },
    {
        imgSrc: "/images/landingpage/advantage/advantage3.png",
        heading: "App-Only Deals",
        subheading: "Exclusive offers you won’t find anywhere else.",
    },
    {
        imgSrc: "/images/landingpage/advantage/advantage4.png",
        heading: "Live Order Tracking",
        subheading: "Know exactly when your food hits the road.",
    },
];

export const ourKitchenData = [
    {
        title: "Quality Ingredients",
        description:
            "We use only the freshest, locally sourced ingredients to prepare every meal.",
        imgSrc: "/images/landingpage/kitchen/kitchen1.jpg",
    },
    {
        title: "Made with Passion",
        description:
            "Every dish is made with love and care, just like you’d expect from your favorite restaurant.",
        imgSrc: "/images/landingpage/kitchen/kitchen2.jpg",
    },
    {
        title: "Reliable Delivery",
        description:
            "Our in-house delivery team ensures your food reaches you hot and fast.",
        imgSrc: "/images/landingpage/kitchen/kitchen3.jpg",
    },
];

export const howItWorksStepsData = [
    {
        icon: <ListOrdered className="w-6 h-6 text-red-500" />,
        title: "Browse & Customize",
        description:
            "Explore our full menu and tailor your meal to your taste.",
    },
    {
        icon: <CheckCircle className="w-6 h-6 text-red-500" />,
        title: "Place Your Order",
        description:
            "Order directly through our website—fast, secure, and simple.",
    },
    {
        icon: <Clock className="w-6 h-6 text-red-500" />,
        title: "Real-Time Tracking",
        description:
            "Know exactly when your food will arrive with live updates.",
    },
    {
        icon: <UtensilsCrossed className="w-6 h-6 text-red-500" />,
        title: "Fresh at Your Door",
        description: "We cook and deliver—no third-party apps, just us.",
    },
];

export const testimonialsData = [
    {
        name: "Samira Hadid",
        feedback:
            "Biterunner is my go-to! Food is always hot, delivery is super fast, and the app is easy to use. Love that it’s all in-house!",
        image: "/images/landingpage/testimonials/user1.jpeg",
    },
    {
        name: "Sanif Baig",
        feedback:
            "Way better than competitors. Their burgers hit different, and I can track my food in real time. Highly recommended!",
        image: "/images/landingpage/testimonials/user2.jpeg",
    },
    {
        name: "Zayd Haroon",
        feedback:
            "The exclusive deals on the app are insane. I get fresh meals straight from their kitchen, and I never had a bad order.",
        image: "/images/landingpage/testimonials/user3.jpeg",
    },
];
