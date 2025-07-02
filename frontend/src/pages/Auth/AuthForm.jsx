import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react";

const AuthForm = ({
    mode,
    form,
    onChange,
    onSubmit,
    loading,
    toggleMode,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
}) => {
    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 capitalize">{mode}</h2>

            <form onSubmit={onSubmit} className="space-y-4">
                {/* Username (register only) */}
                {mode === "register" && (
                    <div className="relative">
                        <User
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={18}
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={onChange}
                            className="w-full border pl-10 pr-3 py-2 rounded"
                            required
                        />
                    </div>
                )}

                {/* Email */}
                <div className="relative">
                    <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange}
                        className="w-full border pl-10 pr-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={onChange}
                        className="w-full border pl-10 pr-10 py-2 rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <Eye size={18} />
                        ) : (
                            <EyeOff size={18} />
                        )}
                    </button>
                </div>

                {/* Confirm Password & Phone (register only) */}
                {mode === "register" && (
                    <>
                        {/* Confirm Password */}
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                            />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={onChange}
                                className="w-full border pl-10 pr-10 py-2 rounded"
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? (
                                    <Eye size={18} />
                                ) : (
                                    <EyeOff size={18} />
                                )}
                            </button>
                        </div>

                        {/* Phone Number */}
                        <div className="relative">
                            <Phone
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number (03XXXXXXXXX)"
                                pattern="^03[0-9]{9}$"
                                value={form.phoneNumber}
                                onChange={onChange}
                                className="w-full border pl-10 pr-3 py-2 rounded"
                                required
                            />
                        </div>
                    </>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 bg-red-500 text-white py-2 rounded transition cursor-pointer ${
                        loading
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:bg-red-600"
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            {mode === "login" ? "Logging in" : "Registering"}
                        </>
                    ) : (
                        mode.charAt(0).toUpperCase() + mode.slice(1)
                    )}
                </button>
            </form>

            {/* Toggle Mode */}
            <p className="text-sm text-center mt-4 text-gray-500">
                {mode === "login"
                    ? "Don’t have an account?"
                    : "Already have an account?"}{" "}
                <button
                    onClick={toggleMode}
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    {mode === "login" ? "Register" : "Login"}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
