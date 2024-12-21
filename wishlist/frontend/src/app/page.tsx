import MainContent from '@/components/main-content'
import Title from '@/components/main-content/title'

export default function Page() {
  return (
    <>
      <div data-testid="wish-content" className="justify-self-center">
        <Title title="Try To Go To Bed Before 12 O'Clock" />
        <MainContent />
      </div>
    </>
  )
}
