import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    gradient?: boolean; // New prop for purple gradient
}

export function Card({ children, className = '', title, subtitle, action, gradient = false, ...props }: CardProps) {
    const baseClasses = 'rounded-3xl p-6 shadow-sm border transition-all duration-200';
    const variantClasses = gradient
        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-transparent'
        : 'bg-white border-gray-100 text-gray-800 hover:shadow-md';

    return (
        <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
            {(title || action) && (
                <div className="flex justify-between items-start mb-4">
                    <div>
                        {title && <h3 className={`text-lg font-bold ${gradient ? 'text-indigo-100' : 'text-gray-900'}`}>{title}</h3>}
                        {subtitle && <p className={`text-sm ${gradient ? 'text-indigo-200' : 'text-gray-500'}`}>{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
}
