export default function Page() {
  return (
    <>
      <div className="h-full flex items-center justify-center overflow-x-auto">
        <div
          data-testid="content"
          className="mx-5 p-10 justify-items-center bg-white border rounded-md border-slate-600">
          <div className="text-xl font-bold pb-3">Welcome Wishlist</div>
          <div className="place-self-center">Record your todo list and life plans !</div>
        </div>
      </div>
    </>
  )
}
