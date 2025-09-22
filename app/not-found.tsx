import Link from "next/link";
import { Button } from "@/components/ui/button"; // if you’re using shadcn/ui

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-amber-50 to-orange-100">
      <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Looks like this page has been eaten by our lotus snacks 🍿. Don’t worry,
        let’s get you back to something delicious.
      </p>

      <Link href="/">
        <Button className="rounded-2xl px-6 py-3 text-lg bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
