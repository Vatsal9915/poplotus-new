"use client"

import { useRouter } from "next/navigation"

import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { Menu, X, ShoppingBag, Sparkles, Heart, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-context"
import { useWishlist } from "./wishlist-context"
import CartDropdown from "./cart-dropdown"
import WishlistDropdown from "./wishlist-dropdown"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    dropdown: [
      { name: "Our Story", href: "/about" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  },
  { name: "Products", href: "/products" },
  { name: "Blogs & Recipes", href: "/blogs" },
  { name: "Contact Us", href: "/contact" },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { totalItems } = useCart()
  const { wishlistCount } = useWishlist()
  const router = useRouter()

  const pageLinks = useMemo(() => {
    const links: Array<{ name: string; href: string; group: string }> = []
    navItems.forEach((item) => {
      if (item.dropdown?.length) {
        item.dropdown.forEach((d) => links.push({ name: d.name, href: d.href, group: item.name }))
      } else {
        links.push({ name: item.name, href: item.href, group: "Pages" })
      }
    })
    return links
  }, [])

  const contentLinks = useMemo(
    () =>
      [
        { name: "Makhana", href: "/products#flavoured-makhana-section", value: "makhana foxnut lotus seeds protein" },
        { name: "Makhana Chips", href: "/products#chips-section", value: "chips makhana chips baked crispy" },
        { name: "Makhana Cookies", href: "/products#cookies-section", value: "cookies dessert sweet healthy" },
        {/*{ name: "Chana Jor Garam", href: "/products#chana-section", value: "chana jor garam chickpeas roasted" },*/},
        { name: "Gifting", href: "/products#gifting-section", value: "gift gifting box hamper" },
        
      ] as Array<{ name: string; href: string; value: string }>,
    [],
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsSearchOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const closeNavUI = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setIsCartOpen(false)
    setIsWishlistOpen(false)
  }

  const handleNavClick = (opts?: { skipScroll?: boolean }) => {
    closeNavUI()
    if (!opts?.skipScroll) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 fixed top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group" onClick={() => handleNavClick()}>
              <span className="font-serif text-2xl font-bold text-gray-900 group-hover:text-gold transition-colors duration-300">
                PopLotus
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-6 lg:ml-10 space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="text-gray-700 hover:text-gold transition-all duration-300 relative group py-2 flex items-center gap-1">
                        {item.name}
                        <ChevronDown className="w-4 h-4" />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                      </button>

                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={() => handleNavClick()}
                              className="block px-4 py-2 text-gray-700 hover:text-gold hover:bg-gold/5 transition-all duration-300"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick()}
                      className="text-gray-700 hover:text-gold transition-all duration-300 relative group py-2"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Action buttons */}
              <div className="flex items-center space-x-3 lg:space-x-4">
                {/* Search button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-gold transition-colors duration-300"
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>
                {/* Wishlist button */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors duration-300"
                >
                  <Heart className="w-6 h-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </button>
                {/* Cart button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-gold transition-colors duration-300"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>
                {/* Shop Now */}
                <Link href="/products" onClick={() => handleNavClick()}>
                  <Button className="relative bg-gradient-to-r from-amber-800 to-yellow-900 hover:from-yellow-900 hover:to-amber-800 text-white font-bold px-6 py-2 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 overflow-hidden group border border-amber-900/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <Sparkles className="w-4 h-4 animate-pulse relative z-10" />
                    <span className="relative z-10 font-bold">Shop Now</span>
                    <ShoppingBag className="w-4 h-4 relative z-10" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative p-2 text-gray-700 hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </button>

              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors duration-300"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-gold transition-colors duration-300"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gold transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <div className="px-3 py-2 text-gray-700 font-medium">{item.name}</div>
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-6 py-2 text-gray-600 hover:text-gold hover:bg-gold/5 rounded-lg transition-all duration-300"
                            onClick={() => handleNavClick()}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-gray-700 hover:text-gold hover:bg-gold/5 rounded-lg transition-all duration-300"
                        onClick={() => handleNavClick()}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link href="/products" onClick={() => handleNavClick()}>
                  <Button className="w-full mt-2 bg-gradient-to-r from-amber-800 to-yellow-900 text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300">
                    <Sparkles className="w-4 h-4" />
                    Shop Now
                    <ShoppingBag className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} title="Search" description="Search pages">
        <CommandInput placeholder="Search pages and content… (Press ⌘K / Ctrl+K)" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {pageLinks.map((link) => (
              <CommandItem
                key={`${link.group}-${link.href}`}
                onSelect={() => {
                  setIsSearchOpen(false)
                  router.push(link.href)
                  handleNavClick()
                }}
              >
                {link.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Content">
            {contentLinks.map((link) => (
              <CommandItem
                key={link.href}
                value={link.value}
                onSelect={() => {
                  setIsSearchOpen(false)
                  try {
                    router.push(link.href, { scroll: false })
                  } catch {
                    router.push(link.href)
                  }
                  handleNavClick({ skipScroll: true })
                }}
              >
                {link.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDropdown isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  )
}
