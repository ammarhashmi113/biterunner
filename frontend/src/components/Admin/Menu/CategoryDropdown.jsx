import { Listbox } from "@headlessui/react";
import { Check, ChevronDown, FolderOpen } from "lucide-react";
import { Fragment } from "react";

const CategoryDropdown = ({ categories, selectedId, onChange }) => {
    const selectedCategory = categories.find((cat) => cat._id === selectedId);

    return (
        <div className="space-y-1">
            <span className="text-sm text-gray-500 px-0.5">Category</span>
            <div className="relative">
                <Listbox
                    value={selectedCategory}
                    onChange={(cat) => onChange(cat._id)}
                >
                    <div className="relative">
                        <FolderOpen
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Listbox.Button className="w-full bg-gray-100 text-left rounded-xl px-10 py-2 focus:outline-none focus:ring-1 focus:ring-green-500">
                            {selectedCategory
                                ? selectedCategory.name
                                : "Select Category"}
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                        </Listbox.Button>

                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            {categories.map((cat) => (
                                <Listbox.Option
                                    key={cat._id}
                                    value={cat}
                                    as={Fragment}
                                >
                                    {({ selected, active }) => (
                                        <li
                                            className={`cursor-pointer select-none px-4 py-2 ${
                                                active
                                                    ? "bg-green-100 text-green-900"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                {cat.name}
                                                {selected && (
                                                    <Check
                                                        size={18}
                                                        className="text-green-600"
                                                    />
                                                )}
                                            </div>
                                        </li>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>
        </div>
    );
};

export default CategoryDropdown;
