import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const OPTS = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 8000,
};

// Module-level flag — resets on every hot reload, so the drop is retried each restart
let _indexDropped = false;

async function dropLegacyUniqueIndex() {
    if (_indexDropped) return;
    _indexDropped = true;
    try {
        await mongoose.connection.collection("digitalcards").dropIndex("userId_1");
        console.log("[IDVault] Dropped legacy userId_1 unique index — multiple cards per user now allowed");
    } catch {
        // Index doesn't exist or was already dropped — nothing to do
    }
}

export async function connectDB() {
    if (cached.conn) {
        // Run migration even on cached connections (module resets on hot reload)
        await dropLegacyUniqueIndex();
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, OPTS)
            .catch((err) => {
                cached.promise = null;
                throw err;
            });
    }

    cached.conn = await cached.promise;
    console.log("MongoDB connected");
    await dropLegacyUniqueIndex();
    return cached.conn;
}
