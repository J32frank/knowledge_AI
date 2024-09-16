import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Logo</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <h1 className='text-2xl font-bold text-primary text-gray-900 '>Knowledge Grothe</h1>
            <h2 className='text-gray-700'>(BETA)</h2>
            
          </nav>
          <div className="hidden md:flex">
            <Button>Get Started</Button>
          </div>
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}