
export default function ErrorsMessage({children} : {children : React.ReactNode}) {
  return (
    <div className="text-center my-4 bg-red-100 text-red-600 uppercase font-bold p-3 text-sm">
        {children}
    </div>
  )
}
