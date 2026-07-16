import { MenuIcon, XIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if a route is active
    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Generate", path: "/generate" },
        { name: "My Generations", path: "/my-generations" },
    ];

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <motion.nav 
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full py-2 px-6 md:px-16 lg:px-24 xl:px-32 bg-zinc-950/70 border-b border-white/5 backdrop-blur-md"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
            >
                <Link to='/'>
                    <img src="/logo.svg" alt="Logo" className="w-35 h-12 object-contain" />
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                className={`text-sm font-medium transition-colors relative py-1 ${
                                    active ? "text-pink-500 font-semibold" : "text-zinc-400 hover:text-zinc-100"
                                }`}
                            >
                                {link.name}
                                {active && (
                                    <motion.div 
                                        layoutId="activeNavDot"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Actions (Auth State) */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md select-none">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                                <span className="text-xs font-semibold text-zinc-200">
                                    {user?.name || "User"}
                                </span>
                            </div>
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-full transition cursor-pointer active:scale-95"
                            >
                                <LogOutIcon size={12} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 active:scale-95 transition-all text-white text-sm font-semibold rounded-full shadow-lg shadow-pink-600/20 cursor-pointer"
                        >
                            Get Started
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setIsOpen(true)} className="md:hidden text-zinc-400 hover:text-white p-1">
                    <MenuIcon size={24} className="active:scale-90 transition" />
                </button>
            </motion.nav>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div 
                            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer Panel */}
                        <motion.div 
                            className="fixed top-0 right-0 bottom-0 z-101 w-72 max-w-full bg-zinc-950/95 backdrop-blur-md border-l border-white/5 p-6 flex flex-col justify-between shadow-2xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="space-y-8">
                                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <img src="/logo.svg" alt="Logo" className="w-28 h-10 object-contain" />
                                    <button 
                                        onClick={() => setIsOpen(false)} 
                                        className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                                    >
                                        <XIcon size={20} />
                                    </button>
                                </div>

                                {/* Mobile Links */}
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link) => {
                                        const active = isActive(link.path);
                                        return (
                                            <Link 
                                                key={link.path}
                                                onClick={() => setIsOpen(false)} 
                                                to={link.path}
                                                className={`text-base font-semibold py-2 px-3 rounded-xl transition ${
                                                    active 
                                                    ? "text-pink-500 bg-pink-500/10 border-l-4 border-pink-500" 
                                                    : "text-zinc-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                                                }`}
                                            >
                                                {link.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile User Actions / Footer */}
                            <div className="border-t border-white/5 pt-6">
                                {isLoggedIn ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md select-none">
                                                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-white leading-none">
                                                    {user?.name || "User"}
                                                </span>
                                                <span className="text-[10px] text-zinc-500 mt-1">
                                                    Logged In
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => { setIsOpen(false); handleLogout(); }}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-red-950/20 text-red-400 border border-red-500/10 hover:bg-red-600 hover:text-white hover:border-red-500 transition cursor-pointer"
                                        >
                                            <LogOutIcon size={14} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => { setIsOpen(false); navigate('/login'); }}
                                        className="w-full text-center py-3 rounded-xl text-sm font-semibold bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/20 transition cursor-pointer"
                                    >
                                        Get Started
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}