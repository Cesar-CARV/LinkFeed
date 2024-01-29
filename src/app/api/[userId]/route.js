import { NextResponse } from "next/server";
import prisma from '@/libs/db';
import bcrypt from 'bcrypt';

export async function GET(req, {params}) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(params.userId)
            },
            select: {
                id: true,
                name: true,
                userName: true,
                email: true,
                links: {select: {url:true, urlName:true, id: true}}
            }
        });
        
        if (!user) return NextResponse.json({message: "The user does not exist"});
    
        return NextResponse.json(user);
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