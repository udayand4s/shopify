import dbConnect from '@/lib/dbConnect';
import BusinessModel from '@/models/schema';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    
try {
    const body = await request.json();
    
    await dbConnect()
    const businessData= await BusinessModel.create({
        userId: body.userId,
        name: body.name,
        BusinessName: body.BusinessName,
        Industry: body.Industry,
        Location: body.Location,
        PhoneNumber: body.PhoneNumber
    })

    return NextResponse.json({
        success: true,
        message: "Business setup successful",
        data: businessData
    }, { status: 201 });

} catch (error) {
    console.error('Error setting up business:', error);
    return NextResponse.json({
        success: false,
        message: "Business setup failed",
        error: error
    }, { status: 500 });
}
}