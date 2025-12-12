import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}${dbCluster}`;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    console.log("Database already connected");
    return;
  }
  try {
    await mongoose.connect(connectionString);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
