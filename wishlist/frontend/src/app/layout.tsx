import HeaderBar from '@/components/header-bar'
import { Metadata } from 'next'
import './globals.css'
import Content from '@/components/content'
import { ReactNode } from 'react'
import axios from 'axios'
import { Poppins } from 'next/font/google'

axios.defaults.baseURL = `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`

export const metadata: Metadata = {
  icons: {
    icon: '/cart.png'
  },
  title: 'Wishlist',
  description: 'This APP is for those people who want to write down their wishes.'
}

const poppins = Poppins({ subsets: ['latin'], weight: '400' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="h-screen min-w-[400px] overflow-y-hidden">
        {/* The height of header-bar is 60px, thus the container should -60px */}
        <HeaderBar></HeaderBar>
        <div className="h-[calc(100%-60px)]">
          <Content>{children}</Content>
        </div>
      </body>
    </html>
  )
}
