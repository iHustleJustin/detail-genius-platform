'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from "@/components/layout/DashboardShell";
import {
    TrendingUp,
    Users,
    Calendar as CalendarIcon,
    Clock,
    Car,
    MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const [stats, setStats] = useState([
        { label: 'Total Revenue', value: '$0', change: '+0%', icon: TrendingUp, color: 'text-emerald-500' },
        { label: 'Active Jobs', value: '0', sub: '0 in progress', icon: Car, color: 'text-blue-500' },
        { label: 'New Customers', value: '0', change: '+0%', icon: Users, color: 'text-indigo-500' },
    ]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // 1. Fetch Stats
                const { count: customerCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });
                const { data: activeJobs } = await supabase.from('appointments').select('*').eq('status', 'In Progress');
                const { data: revenueData } = await supabase.from('appointments').select('total_price').eq('status', 'Completed'); // Revenue from completed jobs

                const totalRevenue = revenueData?.reduce((acc, curr) => acc + (Number(curr.total_price) || 0), 0) || 0;

                setStats([
                    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+100%', icon: TrendingUp, color: 'text-emerald-500' },
                    { label: 'Active Jobs', value: String(activeJobs?.length || 0), sub: `${activeJobs?.length || 0} in progress`, icon: Car, color: 'text-blue-500' },
                    { label: 'New Customers', value: String(customerCount || 0), change: '+100%', icon: Users, color: 'text-indigo-500' },
                ]);

                // 2. Fetch Today's Appointments
                // Getting everything for demo purposes, usually filter by date
                const { data: apts } = await supabase
                    .from('appointments')
                    .select(`
                        id, 
                        status, 
                        start_time, 
                        service:services(name), 
                        customer:customers(full_name), 
                        vehicle:vehicles(make, model, year)
                    `)
                    .order('start_time', { ascending: true })
                    .limit(5);

                if (apts) {
                    const formattedApts = apts.map(a => ({
                        id: a.id,
                        client: a.customer?.full_name || 'Unknown',
                        car: a.vehicle ? `${a.vehicle.year} ${a.vehicle.make} ${a.vehicle.model}` : 'Unknown Vehicle',
                        service: a.service?.name || 'Detailing',
                        // Format time from ISO
                        time: new Date(a.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: a.status,
                        statusColor: a.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }));
                    setAppointments(formattedApts);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

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
                    {stats.map((stat, i) => (
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
                                    <h3 className="text-3xl font-outfit font-bold mt-1">
                                        {loading ? "..." : stat.value}
                                    </h3>
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
                    ))}
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
                        {loading && <div className="text-gray-500">Loading appointments...</div>}

                        {!loading && appointments.length === 0 && (
                            <div className="glass-card p-10 text-center text-gray-500">
                                No appointments scheduled for today.
                            </div>
                        )}

                        {appointments.map((apt, i) => (
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
                                            {apt.client.split(' ').map((n: string) => n[0]).join('')}
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
