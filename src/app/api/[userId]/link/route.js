import { NextResponse } from "next/server";
import prisma from '@/libs/db';

export async function POST(req, {params}) {
    try {
        const { userId, urlName, url} = await req.json();

        const newLink = await prisma.link.create({
            data: {
                userId: Number(userId),
                urlName: urlName,
                url: url
            }
        });

        return NextResponse.json(newLink);
    } catch (error) {
        return NextResponse.json({message: error.message});
    }
}

export async function PUT(req, {params}) {
    try {
        const { id, urlName, url} = await req.json();

        const newLink = await prisma.link.update({
            where: {
                id: Number(id)
            },
            data: {
                urlName: urlName,
                url: url
            }
        });

        return NextResponse.json(newLink);
    } catch (error) {
        return NextResponse.json({message: error.message});
    }
}

export async function DELETE(req, {params}) {
    try {
        const { id } = await req.json();

        const newLink = await prisma.link.delete({
            where: {
                id: Number(id)
            },
        });

        return NextResponse.json(newLink);
    } catch (error) {
        return NextResponse.json({message: error.message});
    }
}