import { Link } from '@inertiajs/react';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh w-full flex items-center justify-center bg-white dark:bg-neutral-950 px-6 py-12">
            {/* Fondo inmersivo cubriendo todo el viewport */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-black/[30] dark:bg-black/[50]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                {children}
            </div>
        </div>
    );
}
