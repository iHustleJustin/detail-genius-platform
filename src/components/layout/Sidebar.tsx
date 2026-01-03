'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Calendar,
    Car,
    Users,
    Settings,
    Menu,
    X,
    ShieldCheck,
    Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { name: 'Dashboard', icon: BarChart3, href: '/' },
    { name: 'Appointments', icon: Calendar, href: '/appointments' },
    { name: 'Services', icon: Package, href: '/services' },
    { name: 'Customers', icon: Users, href: '/customers' },
    { name: 'Vehicles', icon: Car, href: '/vehicles' },
    { name: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
            >
                <Menu size={24} />
            </button>

            {/* Backdrop for Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                className={cn(
                    "fixed top-0 left-0 h-full w-72 bg-gray-950 border-r border-gray-900 z-50 transition-transform duration-300 lg:translate-x-0 overflow-y-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:sticky"
                )}
            >
                <div className="p-6">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="font-outfit font-bold text-xl tracking-tight">Detail Genius</h1>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Platform</p>
                        </div>

                        {/* Close button for mobile */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden ml-auto p-2 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                                        isActive
                                            ? "bg-blue-600/10 text-blue-500 border border-blue-600/20"
                                            : "text-gray-400 hover:text-white hover:bg-gray-900"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "transition-colors",
                                        isActive ? "text-blue-500" : "text-gray-500 group-hover:text-blue-400"
                                    )} size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Profile Section */}
                <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-900">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold shadow-lg">
                            EA
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">Detail Genius #1</p>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
