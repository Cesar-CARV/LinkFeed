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
        const reqData = await req.json();
        // Eliminar los valores bacios del objeto
        const newData = Object.fromEntries(Object.entries(reqData).filter(([_, v]) => v != null && v !== ''));

        // si se va a cambiar la contraseña la encripta antes de guardarla en la db
        if (newData.password) {
            newData.password = await bcrypt.hash(newData.password, 10);
        }

        const user = await prisma.user.update({
            where: {
                id: Number(params.userId)
            },
            data: newData
        });
        
        if (!user) return NextResponse.json({message: "The user does not exist"});
        

        const { password:_, ...userData } =  user;
        return NextResponse.json(userData);
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