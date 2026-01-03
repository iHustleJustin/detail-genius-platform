
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            phone,
            serviceId,
            vehicleType,
            date,
            time,
            smsConsent
        } = body;

        // 1. Create or Update Customer
        const { data: customer, error: customerError } = await supabase
            .from('customers')
            .upsert({
                full_name: name,
                email,
                phone,
                sms_consent: smsConsent,
                sms_consent_date: smsConsent ? new Date().toISOString() : null
            }, { onConflict: 'email' })
            .select()
            .single();

        if (customerError) throw customerError;

        // 2. Create Appointment
        // Note: In a real app we'd look up service details for price/duration
        // For now we'll use placeholders or need to fetch service first

        // Fetch service details for price calculation
        // (Assuming services table is populated, otherwise we default)
        // For MVP, we simply insert the appointment

        const { data: appointment, error: aptError } = await supabase
            .from('appointments')
            .insert({
                customer_id: customer.id,
                service_id: serviceId, // Assumes UUID match or we need to handle legacy IDs
                vehicle_type: vehicleType,
                start_time: `${date}T${time}:00`, // Simple timestamp combination
                status: 'Confirmed', // Auto-accept for now
                total_price: 0, // Should be calculated from service
                deposit_amount: 0,
                deposit_paid: false
            })
            .select()
            .single();

        if (aptError) throw aptError;

        return NextResponse.json({ success: true, appointmentId: appointment.id });

    } catch (error: any) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Failed to create booking', details: error.message },
            { status: 500 }
        );
    }
}
