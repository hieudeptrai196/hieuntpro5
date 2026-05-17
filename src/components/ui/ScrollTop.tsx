"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

/** Nút cuộn lên đầu trang — hiện sau khi scroll > 400px. */
export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="fixed bottom-36 right-6 z-40 w-9 h-9 flex items-center justify-center
                     border border-hex-400/50 bg-void-950/90 backdrop-blur-sm
                     hover:bg-hex-400/10 hover:border-hex-400
                     text-hex-300/70 hover:text-hex-100 transition-all font-mono text-sm"
          style={{
            clipPath:
              "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
          }}
        >
          ↑
        </m.button>
      )}
    </AnimatePresence>
  );
}
