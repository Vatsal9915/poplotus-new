import type { NextRequest } from "next/server"
import { getOrdersCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      shippingAddress,
      items,
      selectedSample,
      selectedSamples,
      totalPrice,
      appliedCoupon,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
    } = body

    // Validate required fields
    if (!shippingAddress || !items || !totalPrice) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const ordersCollection = await getOrdersCollection()

    // Create order document
    const orderDocument = {
      _id: new ObjectId(),
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      },
      items: items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      selectedSample: selectedSample || null,
      selectedSamples: selectedSamples || [],
      totalPrice: totalPrice,
      appliedCoupon: appliedCoupon || null,
      paymentMethod: paymentMethod,
      paymentDetails: {
        razorpayOrderId: razorpayOrderId || null,
        razorpayPaymentId: razorpayPaymentId || null,
      },
      orderStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert order into database
    const result = await ordersCollection.insertOne(orderDocument)

    console.log("Order saved to MongoDB:", result.insertedId)

    return Response.json(
      {
        success: true,
        message: "Order saved successfully",
        orderId: orderDocument.orderId,
        databaseId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error saving order:", error)
    return Response.json({ error: "Failed to save order" }, { status: 500 })
  }
}
