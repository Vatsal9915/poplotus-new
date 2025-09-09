import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { WishlistProvider } from "@/components/wishlist-context"
import CartNotification from "@/components/cart-notification"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PopLotus - Premium Healthy Snacks",
  description: "Premium makhana (foxnuts) and healthy snacks for a better lifestyle",
  generator: "vatsal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <WishlistProvider>
          <CartProvider>
            {children}
            <CartNotification />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
