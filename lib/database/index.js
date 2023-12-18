import mongoose from "mongoose";

let cached = mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!process.env.MOGODB_URI) throw new Error("MONGODB_URI must be defined");

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MOGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
