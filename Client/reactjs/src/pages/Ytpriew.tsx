import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yt_html } from "../assets/assets";
import { ArrowLeft, RefreshCw, Layout, Smartphone, Laptop } from "lucide-react";
import SoftBackdrop from "../components/SoftBackdrop";

const Ytpriew = () => {
    const navigate = useNavigate();
    const [iframeSrc, setIframeSrc] = useState("");
    const [title, setTitle] = useState("");
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const queryTitle = params.get("title");
        const queryUrl = params.get("thumbnail_url");

        const storedTitle = queryTitle || localStorage.getItem("thumblify_preview_title") || "My Awesome Video Title!";
        const storedUrl = queryUrl || localStorage.getItem("thumblify_preview_url") || "https://picsum.photos/800/450";

        setTitle(storedTitle);

        // Replace template placeholders in yt_html
        let docContent = yt_html;
        docContent = docContent.replace(/%%TITLE%%/g, storedTitle);
        docContent = docContent.replace(/%%THUMBNAIL_URL%%/g, storedUrl);

        setIframeSrc(docContent);
    }, []);

    return (
        <div className="relative min-h-screen pt-20">
            <SoftBackdrop />
            <main className="max-w-7xl mx-auto px-6 py-8 pb-20">
                
                {/* Top header navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition cursor-pointer text-sm font-medium"
                    >
                        <ArrowLeft size={18} />
                        <span>Go Back</span>
                    </button>

                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            <Layout className="text-pink-500" size={20} />
                            <span>YouTube Feed Sandbox</span>
                        </h1>
                        <span className="hidden md:inline-block text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                            Testing CTR CTR visibility
                        </span>
                    </div>

                    {/* Viewport switcher */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                        <button
                            onClick={() => setViewMode("desktop")}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                viewMode === "desktop" ? "bg-pink-600 text-white" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            <Laptop size={14} />
                            <span>Desktop</span>
                        </button>
                        <button
                            onClick={() => setViewMode("mobile")}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                viewMode === "mobile" ? "bg-pink-600 text-white" : "text-gray-400 hover:text-white"
                            }`}
                        >
                            <Smartphone size={14} />
                            <span>Mobile</span>
                        </button>
                    </div>
                </div>

                {/* Sandbox Frame Container */}
                <div className="w-full flex justify-center">
                    <div 
                        className={`w-full bg-zinc-950 border border-white/10 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ${
                            viewMode === "mobile" ? "max-w-[430px] h-[844px] rounded-[40px] border-8 border-zinc-800" : "max-w-6xl h-[680px]"
                        }`}
                    >
                        {/* Mock header bar */}
                        <div className="bg-zinc-900 px-4 py-2.5 flex items-center justify-between border-b border-zinc-800">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                                <span className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="text-xs text-gray-500 font-mono bg-black/40 px-4 py-1 rounded-md max-w-sm truncate">
                                youtube.com/feed/mockup-sandbox?title={encodeURIComponent(title)}
                            </div>
                            <div className="w-12" />
                        </div>

                        {/* Rendering simulated IFrame */}
                        {iframeSrc ? (
                            <iframe 
                                srcDoc={iframeSrc} 
                                title="YouTube Sandbox Preview"
                                className="w-full h-full border-none bg-transparent"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                                <RefreshCw className="animate-spin text-pink-500 mb-3" size={24} />
                                <span>Loading preview sandbox...</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Ytpriew;