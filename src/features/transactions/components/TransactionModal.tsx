'use client';

import { X } from 'lucide-react';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function TransactionModal({ isOpen, onClose, children }: TransactionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md m-4 pointer-events-auto animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-300">
                {children}
            </div>
        </div>
    );
}
