import HeaderBar from '@/components/header-bar'
import { Metadata } from 'next'
import './globals.css'
import Content from '@/components/left-panel'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  icons: {
    icon: './icon.png'
  },
  title: 'Wishlist',
  description: 'This APP is for those people who want to write down their wishes.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">
        {/* The height of header-bar is 60px, thus the container should -60px */}
        <HeaderBar></HeaderBar>
        <div id="content" className="h-[calc(100%-60px)]">
          <Content>{children}</Content>
        </div>
      </body>
    </html>
  )
}
