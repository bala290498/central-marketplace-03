"use client";

import React, { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop overlay click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content Container */}
      <div className="relative max-w-2xl w-full max-h-[85vh] flex items-center justify-center z-10">
        {/* Cross (X) Close Button on Top Right Corner */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white hover:bg-orange-600 transition-all z-20 cursor-pointer group hover:scale-110"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Notification Image Wrapper */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 max-h-[85vh] flex items-center justify-center min-h-[300px] sm:min-h-[420px] w-full sm:w-auto">
          {/* Skeleton Loader placeholder shown until image loads */}
          {!isLoaded && (
            <div className="w-full sm:w-[500px] h-[320px] sm:h-[440px] bg-slate-900/90 rounded-2xl flex flex-col items-center justify-center p-6 space-y-4 animate-pulse">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center shadow-inner">
                <ImageIcon className="w-8 h-8 text-slate-500 animate-bounce" />
              </div>
              <div className="w-2/3 h-4 bg-slate-800 rounded-full" />
              <div className="w-1/2 h-3.5 bg-slate-800/80 rounded-full" />
              <div className="w-1/3 h-3 bg-slate-800/60 rounded-full" />
            </div>
          )}

          {/* Desktop Image (Shown on screens >= sm) */}
          <img
            src="/notification/desktop.jpeg"
            alt="Notification Banner"
            onLoad={() => setIsLoaded(true)}
            className={`hidden sm:block max-h-[80vh] w-auto max-w-full object-contain rounded-2xl transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
          />

          {/* Mobile Image (Shown on screens < sm) */}
          <img
            src="/notification/mobile.jpeg"
            alt="Notification Banner"
            onLoad={() => setIsLoaded(true)}
            className={`sm:hidden max-h-[80vh] w-auto max-w-full object-contain rounded-2xl transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0 absolute"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
