'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
            <div className="text-center space-y-6 max-w-md">
                <div className="w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🔍</span>
                </div>

                <h1 className="text-6xl font-outfit font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    404
                </h1>

                <h2 className="text-2xl font-bold">Page Not Found</h2>

                <p className="text-gray-400 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/booking"
                        className="px-8 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl font-bold transition-all"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
