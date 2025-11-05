import { MongoClient, type Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not defined")
  }

  try {
    const client = new MongoClient(mongoUri)
    await client.connect()

    const db = client.db("poplotus")

    cachedClient = client
    cachedDb = db

    console.log("[v0] Connected to MongoDB")
    return { client, db }
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error)
    throw error
  }
}

export async function getOrdersCollection() {
  const { db } = await connectToDatabase()
  return db.collection("orders")
}

export default connectToDatabase
