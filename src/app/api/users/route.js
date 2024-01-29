import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findMany({
        select: {
            userName: true
        }
    });
    return NextResponse.json(user);
}