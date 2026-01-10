import { NextResponse } from "next/server";
import {connectDB} from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    await connectDB();

    const {floating_name, floating_email, floating_password} = await req.json();

    if(!floating_name || !floating_email || !floating_password) {
        return NextResponse.json({message: "All fields are required"}, {status: 400});
    }

    const existingUser = await User.findOne({email: floating_email});
    if(existingUser) {
        return NextResponse.json({message: "User already exists"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(floating_password, 10);

    await User.create({
        name: floating_name,
        email: floating_email,
        password: hashedPassword,
    })
    return NextResponse.json({message: "User registered successfully"}, {status: 201})
}