import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {

    const baseStyles = 'inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-2xl shadow-sm hover:shadow-md';

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',
        secondary: 'bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 shadow-none hover:shadow-none',
    };

    const sizes = {
        sm: 'text-sm px-3 py-1.5 h-9',
        md: 'text-base px-5 py-3 h-12',
        lg: 'text-lg px-8 py-4 h-14 rounded-3xl', // Extra rounded for large approach
        xl: 'text-xl px-10 py-5 h-16 rounded-[2rem]', // Giant button
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
        </button>
    );
}
