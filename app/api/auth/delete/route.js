import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import jwt from "jsonwebtoken";

export async function DELETE(req){
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        await connectDB();

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }   
        return NextResponse.json(
            { message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete user error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}