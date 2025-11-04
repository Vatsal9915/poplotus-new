"use client"

import { useState } from "react"
import { Tag, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CouponSectionProps {
  onApplyCoupon: (coupon: CouponCode | null) => void
  appliedCoupon: CouponCode | null
  cartTotal: number
}

export interface CouponCode {
  code: string
  discount: number
  description: string
  type: "percentage" | "fixed"
  minAmount?: number
}

const availableCoupons: CouponCode[] = [
  { code: "FESTIVE25", discount: 25, description: "25% discount on all orders", type: "percentage" },
  {
    code: "HEALTHY20",
    discount: 20,
    description: "20% discount on orders above ₹499",
    type: "percentage",
    minAmount: 499,
  },
  { code: "SAVE100", discount: 100, description: "₹100 discount on orders above ₹999", type: "fixed", minAmount: 999 },
  { code: "WELCOME15", discount: 15, description: "15% discount on first order", type: "percentage" },
]

export function CouponSection({ onApplyCoupon, appliedCoupon, cartTotal }: CouponSectionProps) {
  const [couponCode, setCouponCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setError("Please enter a coupon code")
      return
    }

    const coupon = availableCoupons.find((c) => c.code.toUpperCase() === couponCode.toUpperCase())

    if (!coupon) {
      setError("Invalid coupon code")
      setSuccess("")
      return
    }

    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      setError(`Minimum cart value of ₹${coupon.minAmount} required for this coupon`)
      setSuccess("")
      return
    }

    setError("")
    setSuccess(`Coupon "${coupon.code}" applied successfully!`)
    onApplyCoupon(coupon)
    setCouponCode("")
  }

  const handleQuickSelect = (coupon: CouponCode) => {
    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      setError(`Minimum cart value of ₹${coupon.minAmount} required for this coupon`)
      return
    }

    onApplyCoupon(coupon)
    setCouponCode(coupon.code)
    setError("")
    setSuccess(`Coupon "${coupon.code}" applied successfully!`)
    setIsOpen(false)
  }

  const getEligibleCoupons = () => {
    return availableCoupons.filter((coupon) => !coupon.minAmount || cartTotal >= coupon.minAmount)
  }

  return (
    <div className="space-y-4">
      {/* Applied Coupon Display */}
      {appliedCoupon && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-700">
              {appliedCoupon.code} - {appliedCoupon.discount}
              {appliedCoupon.type === "percentage" ? "%" : "₹"} off
            </span>
          </div>
          <button
            onClick={() => {
              onApplyCoupon(null)
              setCouponCode("")
              setSuccess("")
            }}
            className="text-green-600 hover:text-green-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Coupon Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value.toUpperCase())
            setError("")
            setSuccess("")
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-sm"
        />
        <Button
          onClick={handleApplyCoupon}
          disabled={!couponCode}
          className="bg-gold hover:bg-gold/90 text-white px-4 py-2"
          size="sm"
        >
          Apply
        </Button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Success Message */}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center text-gold hover:text-gold/80 text-sm font-medium transition-colors">
            <Tag className="w-4 h-4 mr-2" />
            View Available Coupons
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Available Coupons</DialogTitle>
            <DialogDescription>Click on any coupon to apply it to your order</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {availableCoupons.map((coupon) => {
              const isEligible = !coupon.minAmount || cartTotal >= coupon.minAmount
              return (
                <div
                  key={coupon.code}
                  className={`flex items-center justify-between p-3 rounded border transition-colors ${
                    isEligible
                      ? "bg-gold/5 border-gold/20 hover:border-gold/50"
                      : "bg-gray-100 border-gray-200 opacity-60"
                  }`}
                >
                  <div>
                    <p className="font-medium text-sm text-gray-900">{coupon.code}</p>
                    <p className="text-xs text-gray-600">{coupon.description}</p>
                    {coupon.minAmount && (
                      <p className={`text-xs mt-1 ${isEligible ? "text-green-600" : "text-red-600"}`}>
                        Min: ₹{coupon.minAmount}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-gold mt-1">
                      {coupon.discount}
                      {coupon.type === "percentage" ? "% off" : `₹ off`}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleQuickSelect(coupon)}
                    disabled={!isEligible}
                    className="bg-gold hover:bg-gold/90 text-white px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Use
                  </Button>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
