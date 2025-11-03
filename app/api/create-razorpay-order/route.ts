export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.totalPrice || !body.shippingAddress?.email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For now, generate a mock Razorpay order ID
    // Replace with actual Razorpay API call when you add your API keys
    const razorpayOrderId = `order_${Date.now()}`
    const amount = Math.round(body.totalPrice * 100) // Convert to paise

    const order = {
      razorpayOrderId,
      amount,
      amountInRupees: body.totalPrice,
      shippingAddress: body.shippingAddress,
      items: body.items,
      selectedSample: body.selectedSample,
      paymentMethod: "razorpay",
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    if (typeof window === "undefined") {
      // Server-side: store in a temporary location
      // This should be replaced with database storage
    }

    return Response.json({
      razorpayOrderId,
      amount,
      amountInRupees: body.totalPrice,
    })
  } catch (error) {
    console.error("[v0] Razorpay API error:", error)
    return Response.json({ error: "Failed to create order" }, { status: 500 })
  }
}
