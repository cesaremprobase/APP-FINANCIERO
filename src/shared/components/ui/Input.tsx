import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full bg-gray-50 border-2 border-transparent 
              focus:bg-white focus:border-indigo-500 focus:ring-0
              rounded-2xl px-4 py-4 text-lg text-gray-900 placeholder-gray-400
              transition-all duration-200 ease-in-out
              disabled:opacity-50 disabled:bg-gray-100
              ${leftIcon ? 'pl-11' : ''}
              ${error ? 'border-red-500 bg-red-50' : ''}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-600 ml-1 font-medium">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
