import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { throttle } from "lodash";

const MenuCategoriesNavbar = ({ categories }) => {
    const [activeId, setActiveId] = useState(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Ref to the horizontal scrollable navbar container
    const containerRef = useRef(null);

    const checkForScroll = () => {
        const el = containerRef.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft);
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        checkForScroll(); // check on mount

        const handleResize = throttle(checkForScroll, 200);
        const handleScroll = throttle(checkForScroll, 200);

        window.addEventListener("resize", handleResize);
        el.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            el.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        // This function runs every time the page scrolls (vertical scroll)
        const handleThrottledScroll = throttle(() => {
            // For each category, we get the distance of its section from the top of the viewport
            const offsets = categories.map((cat) => {
                const el = document.getElementById(`category-${cat._id}`);
                return {
                    id: cat._id,
                    offset: el ? el.getBoundingClientRect().top : Infinity, // if element not found, we put it far away
                };
            });

            // Find the one that is closest to the top (most visible)
            const closest = offsets.reduce((prev, curr) =>
                Math.abs(curr.offset) < Math.abs(prev.offset) ? curr : prev
            );

            // Update the active category ID (so you can highlight it in the navbar)
            setActiveId(closest.id);

            // Scroll the active button into view horizontally
            const activeButton = document.getElementById(
                `navbar-btn-${closest.id}`
            );
            activeButton?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }, 200);

        // Attach scroll listener to the page
        window.addEventListener("scroll", handleThrottledScroll);

        // Clean up when component unmounts (avoid memory leaks)
        return () =>
            window.removeEventListener("scroll", handleThrottledScroll);
    }, [categories]);

    // This runs when a navbar button is clicked
    // It scrolls the page to that specific category section smoothly
    const handleClick = (id) => {
        const section = document.getElementById(`category-${id}`);
        section?.scrollIntoView({ behavior: "smooth" }); // scrolls vertically to the section
    };

    // This scrolls the horizontal navbar left/right by 250px
    const scroll = (direction) => {
        if (!containerRef.current) return; // safety check

        const scrollAmount = 250; // how much to scroll in pixels

        containerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount, // direction logic
            behavior: "smooth", // smooth scroll
        });
    };

    return (
        <div className="relative mb-4 mx-2">
            {/* Left Scroll Button */}
            {canScrollLeft && (
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-white shadow-md p-1 rounded-full sm:flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            {/* Right Scroll Button */}
            {canScrollRight && (
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white shadow-md p-1 rounded-full sm:flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                    onClick={() => scroll("right")}
                >
                    <ChevronRight size={20} />
                </button>
            )}

            {/* Scrollable Nav */}
            <div
                ref={containerRef}
                className={`overflow-x-auto scrollbar-hide whitespace-nowrap py-2 px-2 mx-2 flex gap-2 ${
                    !canScrollLeft && !canScrollRight
                        ? "justify-center"
                        : "justify-start"
                }`}
            >
                {categories.map((cat) => (
                    <button
                        id={`navbar-btn-${cat._id}`}
                        key={cat._id}
                        onClick={() => handleClick(cat._id)}
                        className={`px-3 py-1 rounded-full border text-sm transition whitespace-nowrap cursor-pointer ${
                            activeId === cat._id
                                ? "bg-red-600 text-white border-red-600"
                                : "text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MenuCategoriesNavbar;
