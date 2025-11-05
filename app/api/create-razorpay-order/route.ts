export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.totalPrice || !body.shippingAddress?.email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return Response.json({ error: "Razorpay API keys not configured" }, { status: 500 })
    }

    const amount = Math.round(body.totalPrice * 100) // Convert to paise

    // Create auth header for Razorpay API
    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")

    // Call Razorpay API directly
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amount,
        currency: "INR",
        receipt: `order_${Date.now()}`,
        notes: {
          email: body.shippingAddress.email,
          phone: body.shippingAddress.phone,
          name: `${body.shippingAddress.firstName} ${body.shippingAddress.lastName}`,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Razorpay API error:", error)
      return Response.json({ error: `Razorpay API error: ${error}` }, { status: response.status })
    }

    const order = await response.json()

    return Response.json({
      razorpayOrderId: order.id,
      amount: amount,
      amountInRupees: body.totalPrice,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("[v0] Error creating Razorpay order:", error)
    return Response.json(
      { error: `Failed to create order: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
