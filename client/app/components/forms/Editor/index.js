import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import { quillModules, quillFormats } from '@/app/constants/quillConfig'

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false })

export default function Editor({ content, handleEditorChange }) {
  return (
    <QuillEditor
      value={content}
      onChange={handleEditorChange}
      modules={quillModules}
      formats={quillFormats}
      className="mt-5 h-[100%] w-full bg-white"
    />
  )
}
