import Razorpay from "razorpay"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.totalPrice || !body.shippingAddress?.email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Initialize Razorpay with your API keys
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    })

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return Response.json({ error: "Razorpay API keys not configured" }, { status: 500 })
    }

    const amount = Math.round(body.totalPrice * 100) // Convert to paise

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        email: body.shippingAddress.email,
        phone: body.shippingAddress.phone,
        name: `${body.shippingAddress.firstName} ${body.shippingAddress.lastName}`,
      },
    })

    return Response.json({
      razorpayOrderId: order.id,
      amount: amount,
      amountInRupees: body.totalPrice,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("[v0] Razorpay API error:", error)
    return Response.json({ error: "Failed to create order" }, { status: 500 })
  }
}
