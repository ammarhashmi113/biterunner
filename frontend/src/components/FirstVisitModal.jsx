import { useEffect, useState } from "react";

const FirstVisitModal = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem("hasSeenBackendNotice");
        if (!hasSeen) {
            setShowModal(true);
            localStorage.setItem("hasSeenBackendNotice", "true");
        }
    }, []);

    useEffect(() => {
        if (showModal) {
            // Lock scroll
            document.body.style.overflow = "hidden";
        } else {
            // Unlock scroll
            document.body.style.overflow = "auto";
        }

        return () => {
            // Cleanup in case component unmounts
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="bg-white text-black rounded-2xl p-6 max-w-md w-full shadow-xl text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-3">
                    Backend Notice
                </h2>
                <p className="mb-4 text-gray-800">
                    Biterunner's API is currently{" "}
                    <span className="font-semibold text-red-500">offline</span>{" "}
                    due to free hosting limits. So some features like viewing
                    the menu, placing orders, or logging in won’t work for now.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    You can still explore the UI and check out the full code on{" "}
                    <a
                        href="https://github.com/ammarhashmi113/biterunner"
                        className="text-red-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    .
                </p>
                <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                >
                    Continue to site
                </button>
            </div>
        </div>
    );
};

export default FirstVisitModal;
