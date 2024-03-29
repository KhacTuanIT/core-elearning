export default function SearchInput(props) {
  const { content, handleChangeContent } = props
  return (
    <main>
      <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:shadow-lg">
        <div className="grid h-full w-12 place-items-center text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none"
          type="text"
          id="search"
          placeholder="Search something.."
          value={content}
          onChange={(e) => handleChangeContent(e.target.value)}
        />
      </div>
    </main>
  )
}
