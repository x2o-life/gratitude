"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const TRUST_SIGNAL_TRANSITION = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1] as const,
};
const TRUST_SIGNAL_VISIBLE_MS = 3000;

export default function RotatingTrustSignals({ items }: { items: readonly string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const cycleMs =
            TRUST_SIGNAL_VISIBLE_MS + TRUST_SIGNAL_TRANSITION.duration * 2 * 1000;

        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % items.length);
        }, cycleMs);

        return () => window.clearInterval(id);
    }, [items.length]);

    return (
        <div className="relative mt-10 flex min-h-14 w-full max-w-xl items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.p
                    key={items[index]}
                    className="absolute inset-x-0 px-4 text-center text-3xl font-bodoni-moda"
                    initial={{ y: 32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -32, opacity: 0 }}
                    transition={TRUST_SIGNAL_TRANSITION}
                >
                    {items[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}