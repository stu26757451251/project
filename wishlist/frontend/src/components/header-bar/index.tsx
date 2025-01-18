import Icon from '@/components/icon'
import Image from 'next/image'

export default function HeaderBar() {
  return (
    <div
      data-testid="header-bar"
      className="h-[60px] flex items-center justify-between border-b-2 border-slate-600">
      <div data-testid="header-bar-title" className="pl-7 text-xl">
        <Image
          className="inline object-center w-8 h-8"
          src={'/wishlist.png'}
          alt={'ICON'}
          width="32"
          height="32"
        />
        <span className="pl-4">Wishlist</span>
      </div>
      <div data-testid="header-bar-username" className="pr-7 text-xl">
        <span className="pr-4">Lilypop</span>
        <Image
          className="inline rounded-full w-10 h-10"
          src={`/selfie.jpg`}
          alt={'/avatar/bear.png'}
          width="40"
          height="40"
        />
      </div>
    </div>
  )
}
