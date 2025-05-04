// components/Popup.tsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    closeOnOutsideClick?: boolean;
    className?: string;
};

export default function Popup({
                                  isOpen,
                                  onClose,
                                  children,
                                  closeOnOutsideClick = true,
                                  className = '',
                              }: PopupProps) {
    // Close popup when pressing Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay with subtle transparency */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 0.7}}
                        exit={{opacity: 0}}
                        className="absolute inset-0 bg-black"
                        onClick={closeOnOutsideClick ? onClose : undefined}
                    />

                    {/* Popup content */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 0.6}}
                        exit={{opacity: 0}}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={closeOnOutsideClick ? onClose : undefined}
                    />

                    <motion.div
                        initial={{scale: 0.95, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.95, opacity: 0}}
                        transition={{type: 'spring', damping: 20, stiffness: 300}}
                        className={`relative z-10 max-w-3xl w-full bg-white/90 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg ${className}`}
                    >
                        {children}

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition-all duration-200 shadow-md"
                            aria-label="Close popup"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600 hover:text-gray-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}