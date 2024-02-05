export default function AddPaper({ size, fill, stroke, hoverEffect }) {
  return (
    <svg
      className={`inline-block ${size} ${fill} ${hoverEffect}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      // fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <rect x="0" fill="none" width="24" height="24"></rect>{' '}
        <g>
          {' '}
          <path d="M21 14v5c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h5v2H5v14h14v-5h2z"></path>{' '}
          <path d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4"></path>{' '}
        </g>{' '}
      </g>
    </svg>
  )
}
