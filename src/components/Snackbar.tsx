"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  message: string;
  visible: boolean;
    onClose: () => void;
};

export default function Snackbar({ message, visible, onClose }: props) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [visible, onClose]);
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed bottom-4 right-4 bg-white text-black p-4 rounded shadow-lg flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <span className="text-sm"> {message}</span>
                    <button onClick={onClose} >
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
