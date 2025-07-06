'use client';

import { useRouter }  from "next/navigation";

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#F6D9EE] to-[#F3C78D] px-4">
            <h1 className="text-4xl font-bold text-[#C54B8C] mb-4">Welcome to Housekeeping App</h1>
            <p className="text-lg mb-6">Your one-stop solution for managing housekeeping tasks.</p>
            <button
                onClick={() => router.push("/login")}
                className="px-6 py-3 bg-[#C54B8C] text-white rounded-lg hover:bg-[#a43c7b]"
            >
                Login 
            </button>
        </div>
    );
};