'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Car, Sparkles, Shield, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICES = [
    {
        id: '1',
        name: 'Interior Deep Clean',
        duration: 120,
        price: 150,
        description: 'Full vacuum, steam clean, stain removal',
        icon: Sparkles
    },
    {
        id: '2',
        name: 'Exterior Gloss & Seal',
        duration: 180,
        price: 200,
        description: 'Wash, clay bar, polish, sealant',
        icon: Shield
    },
    {
        id: '3',
        name: 'Platinum Transformation',
        duration: 300,
        price: 450,
        description: 'Full interior + exterior + 1-year protection',
        icon: Car
    },
];

const VEHICLE_TYPES = ['Sedan', 'SUV', 'Truck', 'Van', 'Coupe'];

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [vehicleType, setVehicleType] = useState('');
    const [smsConsent, setSmsConsent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
    });

    const selectedServiceData = SERVICES.find(s => s.id === selectedService);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // POST to /api/bookings/create
        const response = await fetch('/api/bookings/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                serviceId: selectedService,
                vehicleType,
                smsConsent,
            }),
        });

        if (response.ok) {
            const { sessionId } = await response.json();
            // Redirect to Stripe Checkout
            window.location.href = `/booking/payment?session=${sessionId}`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white">
            <div className="max-w-4xl mx-auto px-6 py-20">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/50">
                        <Shield size={32} className="text-white" />
                    </div>
                    <h1 className="text-5xl font-outfit font-bold mb-4">Book Your Detail</h1>
                    <p className="text-xl text-gray-400">Premium mobile detailing at your convenience</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {['Service', 'Details', 'Confirm'].map((label, idx) => (
                        <div key={label} className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                                step > idx + 1 ? "bg-blue-600 text-white" :
                                    step === idx + 1 ? "bg-blue-600 text-white ring-4 ring-blue-600/30" :
                                        "bg-gray-800 text-gray-500"
                            )}>
                                {step > idx + 1 ? <Check size={20} /> : idx + 1}
                            </div>
                            <span className={cn(
                                "hidden md:block text-sm font-medium",
                                step >= idx + 1 ? "text-white" : "text-gray-500"
                            )}>{label}</span>
                            {idx < 2 && <div className="hidden md:block w-16 h-0.5 bg-gray-800" />}
                        </div>
                    ))}
                </div>

                {/* Step 1: Service Selection */}
                {step === 1 && (
                    <div className="space-y-6 animate-in">
                        <h2 className="text-2xl font-outfit font-bold mb-6">Choose Your Service</h2>
                        <div className="grid gap-4">
                            {SERVICES.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => setSelectedService(service.id)}
                                    className={cn(
                                        "glass-card p-6 text-left transition-all hover:bg-gray-900/40 group",
                                        selectedService === service.id && "ring-2 ring-blue-600 bg-blue-600/10"
                                    )}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                                selectedService === service.id ? "bg-blue-600" : "bg-gray-900 group-hover:bg-gray-800"
                                            )}>
                                                <service.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                                                <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={16} /> {service.duration} min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-outfit font-bold">${service.price}</div>
                                            <div className="text-xs text-gray-500 mt-1">50% deposit required</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8">
                            <label className="block text-sm font-bold mb-3">Vehicle Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {VEHICLE_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setVehicleType(type)}
                                        className={cn(
                                            "px-4 py-3 rounded-xl font-medium transition-all",
                                            vehicleType === type
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={!selectedService || !vehicleType}
                            className="btn-primary w-full mt-8"
                        >
                            Continue to Details
                        </button>
                    </div>
                )}

                {/* Step 2: Customer Details */}
                {step === 2 && (
                    <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6 animate-in">
                        <h2 className="text-2xl font-outfit font-bold mb-6">Your Information</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-field w-full"
                                    placeholder="John Smith"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="input-field w-full"
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="input-field w-full"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Preferred Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="input-field w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Preferred Time</label>
                                <select
                                    required
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="input-field w-full"
                                >
                                    <option value="">Select time...</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                </select>
                            </div>
                        </div>

                        {/* SMS Consent - REQUIRED FOR TWILIO */}
                        <label className="flex items-start gap-3 p-5 bg-blue-900/10 border-2 border-blue-800/30 rounded-xl cursor-pointer hover:bg-blue-900/20 transition">
                            <input
                                type="checkbox"
                                checked={smsConsent}
                                onChange={(e) => setSmsConsent(e.target.checked)}
                                className="mt-1 w-5 h-5 accent-blue-600"
                                required
                            />
                            <div className="flex-1">
                                <div className="font-bold text-blue-400 mb-1">
                                    📱 Get SMS Appointment Reminders
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    I agree to receive appointment reminders and updates via SMS from Detail Genius.
                                    Message and data rates may apply. Reply STOP to opt out anytime.
                                </p>
                            </div>
                        </label>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all"
                            >
                                Back
                            </button>
                            <button type="submit" className="btn-primary flex-1">
                                Review Booking
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && selectedServiceData && (
                    <div className="space-y-8 animate-in">
                        <h2 className="text-2xl font-outfit font-bold">Confirm Your Booking</h2>

                        <div className="glass-card p-8 space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 mb-2">SERVICE</h3>
                                <p className="text-2xl font-bold">{selectedServiceData.name}</p>
                                <p className="text-gray-400">{vehicleType}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 mb-2">DATE & TIME</h3>
                                    <p className="text-lg font-medium">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="text-gray-400">{formData.time}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 mb-2">CONTACT</h3>
                                    <p className="text-lg font-medium">{formData.name}</p>
                                    <p className="text-gray-400">{formData.phone}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-800">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400">Service Total</span>
                                    <span className="text-2xl font-bold">${selectedServiceData.price}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-400">Deposit Due Today (50%)</span>
                                    <span className="text-3xl font-outfit font-bold text-blue-400">${selectedServiceData.price * 0.5}</span>
                                </div>
                                <p className="text-xs text-gray-500">Remaining balance of ${selectedServiceData.price * 0.5} due after service completion</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all"
                            >
                                Edit Details
                            </button>
                            <button onClick={handleSubmit} className="btn-primary flex-1">
                                Pay ${selectedServiceData.price * 0.5} Deposit
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
