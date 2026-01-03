'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex min-h-screen bg-gray-950 text-white">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header Placeholder */}
                <header className="h-16 border-b border-gray-900 flex items-center px-6 md:px-10 justify-between flex-shrink-0">
                    <div className="hidden lg:block">
                        <h2 className="text-sm font-medium text-gray-400">Welcome back, <span className="text-white">Embry</span></h2>
                    </div>
                    <div className="flex-1 lg:flex-none flex justify-center lg:justify-end">
                        {/* Search/Notification slots */}
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
