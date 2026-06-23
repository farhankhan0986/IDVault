import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null};
}

const OPTS = {
    serverSelectionTimeoutMS: 5000,  // fail fast if DNS/network is blocked
    connectTimeoutMS: 8000,
};

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, OPTS)
            .then((m) => m)
            .catch((err) => {
                // Reset so the next request retries instead of hanging forever
                cached.promise = null;
                throw err;
            });
    }

    cached.conn = await cached.promise;
    console.log("MongoDB connected");
    return cached.conn;
}