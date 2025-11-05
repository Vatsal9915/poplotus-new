import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keySecret) {
      return Response.json({ error: "Razorpay key secret not configured" }, { status: 500 })
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", keySecret)
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const generatedSignature = hmac.digest("hex")

    if (generatedSignature === razorpay_signature) {
      return Response.json({ success: true, message: "Payment verified" })
    } else {
      return Response.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    return Response.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
