import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Tomás Riera's Porfolio",
  description: 'Fullstack Developer',
  generator: 'Tomas Riera'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
