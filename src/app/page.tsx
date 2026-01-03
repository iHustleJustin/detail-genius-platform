'use client';

import { DashboardShell } from "@/components/layout/DashboardShell";
import {
    TrendingUp,
    Users,
    Calendar as CalendarIcon,
    Clock,
    Car,
    ChevronRight,
    MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
    { label: 'Total Revenue', value: '$14,500', change: '+12%', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Active Jobs', value: '18', sub: '4 in progress', icon: Car, color: 'text-blue-500' },
    { label: 'New Customers', value: '124', change: '+8%', icon: Users, color: 'text-indigo-500' },
];

const APPOINTMENTS = [
    { id: 1, client: 'Michael Chen', car: 'Tesla Model S Plaid', service: 'Full Ceramic + Interior', time: '09:00 AM - 01:00 PM', status: 'In Progress', statusColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { id: 2, client: 'Sarah Davis', car: 'Porsche 911 Carrera', service: 'Paint Correction + PPF', time: '01:30 PM - 05:30 PM', status: 'Scheduled', statusColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    { id: 3, client: 'David Wilson', car: 'Range Rover Autobiography', service: 'Executive Wash', time: '02:00 PM - 04:00 PM', status: 'Scheduled', statusColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    { id: 4, client: 'Emily Rodriguez', car: 'Audi RS e-tron GT', service: 'Interior Deep Clean', time: '04:30 PM - 06:30 PM', status: 'Scheduled', statusColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
];

export default function DashboardPage() {
    return (
        <DashboardShell>
            <div className="space-y-10 pb-20">

                {/* Header Section */}
                <section>
                    <h1 className="text-4xl font-outfit font-bold mb-2">Business Overview</h1>
                    <p className="text-gray-500 font-medium">Monitoring Detail Genius #1 (Washington HQ)</p>
                </section>

                {/* Stats Grid */}
                <section className="dashboard-grid">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-3xl font-outfit font-bold mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl bg-gray-900 border border-gray-800 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                {stat.change && <span className="text-emerald-500 text-sm font-bold">{stat.change}</span>}
                                <span className="text-gray-500 text-xs font-medium">{stat.change ? 'from last week' : stat.sub}</span>
                            </div>
                        </motion.div>
                    ))} section
                </section>

                {/* Appointments List Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-outfit font-bold flex items-center gap-3">
                            <CalendarIcon className="text-blue-500" />
                            Today's Appointments
                        </h2>
                        <button className="text-blue-500 font-bold text-sm hover:underline">View Calendar</button>
                    </div>

                    <div className="space-y-4">
                        {APPOINTMENTS.map((apt, i) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="glass-card p-5 group hover:bg-gray-900/40 transition-all cursor-pointer border-transparent hover:border-gray-800"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Client Info */}
                                    <div className="flex items-center gap-4 min-w-[200px]">
                                        <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 font-bold">
                                            {apt.client.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg leading-none">{apt.client}</h4>
                                            <p className="text-sm text-gray-500 mt-1">Vehicle Owner</p>
                                        </div>
                                    </div>

                                    {/* Vehicle & Service */}
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2 text-white font-semibold">
                                            <Car size={16} className="text-blue-500" />
                                            {apt.car}
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">
                                            {apt.service}
                                        </div>
                                    </div>

                                    {/* Time & Status */}
                                    <div className="flex items-center justify-between md:justify-end gap-10">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium whitespace-nowrap">
                                            <Clock size={16} />
                                            {apt.time}
                                        </div>
                                        <div className={cn("px-3 py-1 rounded-full text-xs font-bold border", apt.statusColor)}>
                                            {apt.status}
                                        </div>
                                        <MoreVertical size={20} className="text-gray-600 lg:group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>
        </DashboardShell>
    );
}
