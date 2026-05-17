"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "hieunt_notice_v1";

/**
 * SiteNotice — thông báo nhỏ lần đầu vào trang.
 * Dùng localStorage để không hiện lại sau lần đầu.
 * Dễ custom: đổi nội dung NOTICE_* bên dưới.
 */

const NOTICE_VI =
  "Lần đầu mất chút thời gian để tải — nhưng từ lần sau trở đi, mọi tài nguyên đã được cache lại trong trình duyệt của bạn. Hãy thử F5 để cảm nhận sự khác biệt ⚡";

const NOTICE_EN =
  "First visit takes a moment to load — on every return, assets are cached locally in your browser. Hit F5 to feel the difference ⚡";

const NOTICE_LABEL = "Cache Protocol";

export function SiteNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Chỉ hiện nếu chưa từng đóng
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const t = setTimeout(() => setVisible(true), 2800);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0  }}
          exit={{   opacity: 0, x: -20, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-40 max-w-[300px] font-mono"
          style={{
            clipPath:
              "polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)",
          }}
        >
          <div className="bg-void-950/97 border border-hex-600/40 backdrop-blur-sm overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between gap-3 px-3 py-1.5 bg-void-900/70 border-b border-hex-600/20">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-hex-400 animate-pulse" />
                <span className="text-[8px] tracking-[0.35em] uppercase text-hex-300/50">
                  {NOTICE_LABEL}
                </span>
              </div>
              <button
                onClick={dismiss}
                aria-label="Đóng thông báo"
                className="text-hex-300/30 hover:text-hex-300/80 transition-colors leading-none text-xs"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-3.5 pt-3 pb-3.5 space-y-2.5">
              {/* VI */}
              <p className="text-[10px] text-hex-200/65 leading-relaxed">
                <span className="text-hex-300/40 mr-1">VI</span>
                {NOTICE_VI}
              </p>
              {/* EN */}
              <p className="text-[10px] text-hex-200/40 leading-relaxed">
                <span className="text-hex-300/25 mr-1">EN</span>
                {NOTICE_EN}
              </p>

              {/* Auto-dismiss bar */}
              <m.div className="w-full h-px bg-hex-700/40 overflow-hidden mt-1">
                <m.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 9, ease: "linear" }}
                  onAnimationComplete={dismiss}
                  className="h-full bg-hex-500/50"
                />
              </m.div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
