"use client"

import { Button } from "@/components/ui/button"

interface BlogFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function BlogFilters({ activeFilter, onFilterChange }: BlogFiltersProps) {
  const filters = [
    { id: "all", label: "All Posts" },
    { id: "recipes", label: "Recipes" },
    { id: "articles", label: "Articles" },
  ]

  return (
    <div className="flex justify-center mb-12">
      <div className="flex gap-2 bg-white rounded-full p-2 shadow-lg">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeFilter === filter.id
                ? "bg-gold text-white shadow-md"
                : "bg-transparent text-gray-600 hover:bg-gold/10 hover:text-gold"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
