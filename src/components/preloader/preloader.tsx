"use client";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function Preloader() {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const dotinterval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500);

        return () => clearInterval(dotinterval);
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-[#C54B8C] z-50">
            <Image src="/image/logohk1.png" alt="Logo" width={439} height={439} />
            <div className="mt-4 text-x1 font-bold">Loading{dots}</div>
            </div>
    );
}