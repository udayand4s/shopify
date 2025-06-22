
import { SignedIn } from "@clerk/nextjs"
import Navbar from "./components/navbar/page"

export default function HomePage() {
  return (
    <main className="p-6">
      <Navbar/>

      <SignedIn>
        <a href="/setup" className="px-4 py-2 bg-blue-500 text-white rounded">Get started</a>
      </SignedIn>
      
    </main>
  )
}
