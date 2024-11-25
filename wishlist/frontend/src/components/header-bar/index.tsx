import Icon from '@/components/icon'
// py-6 px-7
export default function HeaderBar() {
  return (
    <div
      data-testid="header-bar"
      className="h-[60px] flex items-center justify-between border-b-2 border-slate-600">
      <div data-testid="header-bar-title" className="pl-7 text-xl">
        <Icon
          classname="inline object-center"
          sizeClassName="w-8 h-8"
          src="/icon.png"
          alt="app icon"
        />
        <span className="pl-4">Wishlist</span>
      </div>
      <div data-testid="header-bar-username" className="pr-7 text-xl">
        <span className="pr-4">Lilypop</span>
        <Icon
          classname="inline rounded-full"
          sizeClassName="w-10 h-10"
          src="/hot.png"
          alt="avator"
        />
      </div>
    </div>
  )
}
