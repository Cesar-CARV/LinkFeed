import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const data = await req.json();

    const emailFound = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (emailFound) {
      return NextResponse.json({
        message: "Email already exists"
      },
      {
        status: 400
      })
    }

    const userNameFound = await prisma.user.findUnique({
      where: {
        userName: data.userName
      }
    });

    if (userNameFound) {
      return NextResponse.json({
        message: "User name already exists"
      },
      {
        status: 400
      })
    }

    console.log(data);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        userName: data.userName,
        email: data.email,
        password: hashedPassword
      }
    });
    
    const {password:_, ...user} = newUser;
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({message: error.message},{status: 500});
  }
}