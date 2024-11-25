import HeaderBar from '@/components/header-bar'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: './icon.png'
  },
  title: 'Wishlist',
  description: 'This APP is for those people who want to write down their wishes.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* The height of header-bar is 60px, thus the container should -60px */}
        <HeaderBar></HeaderBar>
        <div className="flex-1 h-[calc(100%-60px)]">{children}</div>
      </body>
    </html>
  )
}
