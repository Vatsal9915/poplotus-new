import crypto from "crypto"
import { getOrdersCollection } from "@/lib/mongodb"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = body

    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keySecret) {
      return Response.json({ error: "Razorpay key secret not configured" }, { status: 500 })
    }

    const hmac = crypto.createHmac("sha256", keySecret)
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const generatedSignature = hmac.digest("hex")

    if (generatedSignature !== razorpay_signature) {
      return Response.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }

    const ordersCollection = await getOrdersCollection()

    const orderDocument = {
      ...orderData,
      paymentDetails: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        verifiedAt: new Date(),
      },
      orderStatus: "confirmed",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await ordersCollection.insertOne(orderDocument)

    console.log("Order saved to MongoDB after payment verification:", result.insertedId)

    return Response.json({
      success: true,
      message: "Payment verified and order saved",
      orderId: orderDocument.orderId,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return Response.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
