import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: {
          userName: params.username
        },
        select: {
            id: true,
            userName: true,
            links: true
        }
    });
    console.log(user);
    return NextResponse.json(user);
}