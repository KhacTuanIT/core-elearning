import 'react-quill/dist/quill.bubble.css'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

export default function QuillContent({ value }) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  return <ReactQuill value={value} readOnly={true} theme="bubble" />
}
