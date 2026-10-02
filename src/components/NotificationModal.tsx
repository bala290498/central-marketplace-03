"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
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
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 max-h-[85vh] flex items-center justify-center">
          {/* Desktop Image (Shown on screens >= sm) */}
          <img
            src="/notification/desktop.jpeg"
            alt="Notification Banner"
            className="hidden sm:block max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
          />

          {/* Mobile Image (Shown on screens < sm) */}
          <img
            src="/notification/mobile.jpeg"
            alt="Notification Banner"
            className="sm:hidden max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
