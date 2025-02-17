import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/50">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Logo.png"
              alt="Real"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-medium text-white">Real</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Nutrition
          </Link>
          <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Lifestyle
          </Link>
        </nav>
        <Button variant="secondary" className="bg-white text-black hover:bg-gray-100">
          Login
        </Button>
      </div>
    </header>
  )
}

