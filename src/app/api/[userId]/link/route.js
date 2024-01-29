import { NextResponse } from "next/server";
import prisma from '@/libs/db';
import bcrypt from 'bcrypt';

export async function POST(req, {params}) {
    try {
        return NextResponse.json({message: "POST"});
    } catch (error) {
        return NextResponse.json({message: error.message});
    }
}

export async function PUT(req, {params}) {
    try {
        
        return NextResponse.json({message: "PUT"});
    } catch (error) {
        return NextResponse.json({message: error.message});
    }
}

export async function DELETE(req, {params}) {
    try {
        return NextResponse.json({message: "DELTE"});
    } catch (error) {
        return NextResponse.json({message: error.message});
    }
}