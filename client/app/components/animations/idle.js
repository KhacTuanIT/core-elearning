import { Meteors } from './meteors'

export default function Idle({ number = 10 }) {
  return (
    <div className="flex h-80 w-full items-center justify-center rounded-md border">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-md bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="relative flex h-full flex-col items-start  justify-end overflow-hidden rounded-md border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
          <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center text-slate-50">
            Idle...
          </div>
          <Meteors number={number} />
        </div>
      </div>
    </div>
  )
}
