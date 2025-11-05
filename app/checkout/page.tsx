"use client";

import type React from "react";
import { ProductSuggestions } from "@/components/product-suggestions"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ShippingProgress } from "@/components/shipping-progress";
import { CouponSection, type CouponCode } from "@/components/coupon-section";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, selectedSample, selectedSamples } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percentage") {
      return Math.floor((totalPrice * appliedCoupon.discount) / 100);
    }
    return appliedCoupon.discount;
  };

  const discountAmount = calculateDiscount();
  const finalTotal = Math.max(totalPrice - discountAmount, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add items to your cart before proceeding to checkout.
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="bg-gold hover:bg-gold/90 text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      postalCode,
    } = formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !postalCode
    ) {
      alert("Please fill in all required fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email");
      return false;
    }
    if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, ""))) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      if (paymentMethod === "cod") {
        const orderData = {
          shippingAddress: formData,
          items: items,
          selectedSample: selectedSample,
          selectedSamples: selectedSamples,
          totalPrice: finalTotal,
          appliedCoupon: appliedCoupon?.code || null,
          paymentMethod: "cod",
          orderDate: new Date().toISOString(),
        };

        // Store order in localStorage for now (replace with API call later)
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push(orderData);
        localStorage.setItem("orders", JSON.stringify(orders));

        alert(
          "Order placed successfully! We will contact you soon for confirmation."
        );
        clearCart();
        router.push("/products");
      } else if (paymentMethod === "razorpay") {
        const orderData = {
          shippingAddress: formData,
          items: items,
          selectedSample: selectedSample,
          selectedSamples: selectedSamples,
          totalPrice: finalTotal,
          appliedCoupon: appliedCoupon?.code || null,
          paymentMethod: "razorpay",
          orderDate: new Date().toISOString(),
        };

        try {
          const response = await fetch("/api/create-razorpay-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });

          if (!response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Failed to initiate payment");
            } else {
              throw new Error(`Server error: ${response.status}`);
            }
          }

          const data = await response.json();
          const { razorpayOrderId, amountInRupees } = data;

          // Load Razorpay script and open payment modal
          alert(
            `Razorpay Order ID: ${razorpayOrderId}\nAmount: ₹${amountInRupees}\n\nRazorpay integration ready - add your API keys to enable payments.`
          );
          clearCart();
          router.push("/products");
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error("[v0] Razorpay error:", errorMessage);
          alert(`Payment error: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Error processing order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-serif ml-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Form */}
            <Card className="p-6">
              <h2 className="text-xl font-serif mb-4">Shipping Address</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (10 digits) *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />

                <input
                  type="text"
                  name="street"
                  placeholder="Street Address *"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code *"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    required
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="India">India</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-serif mb-4">Add More to Your Order</h3>
                  <ProductSuggestions cartTotal={totalPrice} />
                </div>

                {/* Shipping Progress Bar */}
                <ShippingProgress cartTotal={totalPrice} />

                {/* Coupon Section */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="text-lg font-serif mb-4">Offers & Rewards</h3>
                  <CouponSection
                    onApplyCoupon={setAppliedCoupon}
                    appliedCoupon={appliedCoupon}
                    cartTotal={totalPrice}
                  />
                </div>

                {/* Payment Method Selection */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-serif mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label
                      className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
                      style={{
                        borderColor:
                          paymentMethod === "cod" ? "#D4AF37" : "#e5e7eb",
                        backgroundColor:
                          paymentMethod === "cod" ? "#D4AF37/5" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="w-4 h-4 mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay when your order arrives
                        </p>
                      </div>
                    </label>

                    <label
                      className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
                      style={{
                        borderColor:
                          paymentMethod === "razorpay" ? "#D4AF37" : "#e5e7eb",
                        backgroundColor:
                          paymentMethod === "razorpay" ? "#D4AF37/5" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="w-4 h-4 mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          Online Payment (Razorpay)
                        </p>
                        <p className="text-sm text-gray-600">
                          Credit Card, Debit Card, UPI, Wallets
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gold hover:bg-gold/90 text-white py-3 text-lg font-medium mt-6"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `${
                      paymentMethod === "razorpay" ? "Pay" : "Place Order"
                    } - ₹${finalTotal}`
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="p-6 sticky top-20">
              <h2 className="text-lg font-serif mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start text-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-500">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {selectedSample && (
                <div className="mb-4 p-3 bg-gold/10 rounded-lg border border-gold/20">
                  <p className="text-sm font-medium text-gray-900">
                    Free Sample
                  </p>
                  <p className="text-sm text-gray-600">{selectedSample}</p>
                </div>
              )}

              {selectedSamples.length > 0 && (
                <div className="mb-4 space-y-2">
                  {selectedSamples.map((sample, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-gray-900">Free Sample</p>
                      <p className="text-sm text-green-700">{sample}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{totalPrice}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Discount ({appliedCoupon?.code})
                    </span>
                    <span className="text-green-600 font-medium">
                      -₹{discountAmount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-serif text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gold font-bold">₹{finalTotal}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
