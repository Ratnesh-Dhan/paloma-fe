import Link from 'next/link'
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "'Chat and File Explorer'",
  description: "'A chat interface with document display and file explorer'",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold mb-4 sm:mb-0">
              Chat & Files
            </Link>
            <div className="space-y-2 sm:space-y-0 sm:space-x-4">
              <Link href="/" className="block sm:inline-block text-white hover:text-gray-300">
                Chat
              </Link>
              <Link href="/files" className="block sm:inline-block text-white hover:text-gray-300">
                Files
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto mt-8 px-4 sm:px-0 min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </body>
    </html>
  )
}

