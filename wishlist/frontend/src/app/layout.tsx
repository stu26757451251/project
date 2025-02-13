import { Metadata } from 'next'
import '@/styles/globals.css'
import { ReactNode } from 'react'
import axios from 'axios'
import { Poppins } from 'next/font/google'
import HeaderBar from '@/components/layout/HeaderBar'
import LeftPanelContainer from '@/components/layout/LeftPanelContainer'

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
        <HeaderBar />
        <div className="h-[calc(100%-var(--header-height))]">
          <LeftPanelContainer>{children}</LeftPanelContainer>
        </div>
      </body>
    </html>
  )
}
