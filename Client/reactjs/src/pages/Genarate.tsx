import { useParams } from "react-router-dom";
import { useState } from "react";
import type { IThumbnail } from "../assets/assets";
import SoftBackdrop from "../components/softbackdrop";

const Genarate = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <SoftBackdrop />
            <main className="max-w-6xl mx-auto px-4 md:px-16 lg:px-8 py-8 pb-28 lg:pb-36 ">
                <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                    {/* left side */}
                    <div className={` space-y-6 ${id && 'pointer-events-none'}`}>

                        <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                            <h2 className="text-lg text-white">Choose Preset</h2>


                        </div>
                    </div>
                    {/* right side */}
                    <div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Genarate 