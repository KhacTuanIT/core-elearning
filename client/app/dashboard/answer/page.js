'use client'
import Idle from '@/app/components/animations/idle'
import { adminModePage } from '@/app/constants/utils'
import DashedLoading from '@/app/loading/dashedLoading'
import {
  createAnswer,
  fetchAnswerAsync,
  getAnswerByIdAsync,
  updateAnswer,
} from '@/lib/redux/thunks/answerThunk'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer } from '@/lib/redux/reducers/answerReducer'
import { AddPaper, PenSlash, XMark } from '@/app/components/icons'
import Editor from '@/app/components/forms/Editor'
import RingLoading from '@/app/loading/ringLoading'

export default function Answer({ item }) {
  const [mode, setMode] = useState(adminModePage.view)
  const [editId, setEditId] = useState(null)
  const { answers, currentAnswer, isLoading } = useSelector(
    (state) => state.answer,
  )
  const [updateItem, setUpdateItem] = useState(item)
  const dispatch = useDispatch()

  useEffect(() => {
    setUpdateItem({})
  }, [])

  useEffect(() => {
    setUpdateItem(currentAnswer)
  }, [currentAnswer])

  useEffect(() => {
    if (editId) dispatch(getAnswerByIdAsync(editId))
  }, [editId])

  useEffect(() => {
    const unsubscriberFetchAnswer = () => {
      dispatch(fetchAnswerAsync())
    }
    return unsubscriberFetchAnswer
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUpdateItem({
      ...updateItem,
      [name]: value,
    })
  }

  const handleEditorChange = (value) => {
    setUpdateItem({
      ...updateItem,
      answerText: value,
    })
  }

  const handleEditMode = (id) => {
    setMode(adminModePage.edit)
    setEditId(id)
  }

  const handleCancel = () => {
    setMode(adminModePage.view)
    clearCurrentItem()
  }

  const handleUpdate = () => {
    dispatch(updateAnswer(updateItem))
  }

  const handleCreateMode = () => {
    setMode(adminModePage.create)
    clearCurrentItem()
  }

  const handleAdd = () => {
    dispatch(createAnswer(updateItem))
  }

  const clearCurrentItem = () => {
    setUpdateItem({})
    setAnswer({})
  }

  const renderEditViewMode = () => {
    return (
      <>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <DashedLoading />
          </div>
        ) : updateItem ? (
          <div className="">
            <div className="mb-4 flex items-center justify-between bg-neutral-50 px-2 py-2 text-xl font-medium">
              <span>
                Editing <PenSlash size="h-5 w-5" />
              </span>
              <button className="hover:opacity-85" onClick={handleCancel}>
                <XMark size="h-6 w-6" />
              </button>
            </div>

            <div className="rounded-md bg-neutral-50 px-2 py-3">
              <div className="mb-4 grid grid-cols-6">
                <div className="flex items-center">ID:</div>
                <div className="col-span-5 flex">
                  <input
                    disabled
                    className="w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none"
                    value={updateItem.id}
                  />
                </div>
              </div>
              <div className="mb-4 grid grid-cols-6">
                <div className="flex items-center">Name:</div>
                <div className="col-span-5 flex">
                  <input
                    name="shortAnswer"
                    onChange={handleInputChange}
                    className="w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none"
                    value={updateItem.shortAnswer}
                  />
                </div>
              </div>
              <div className="mb-20 grid grid-cols-6">
                <div className="flex items-center">Name:</div>
                <div className="col-span-5 flex">
                  <Editor
                    content={updateItem.answerText}
                    handleEditorChange={handleEditorChange}
                  />
                </div>
              </div>
              <div className="mb-4 grid grid-cols-6">
                <div className="flex items-center">State:</div>
                <div className="col-span-5 flex">
                  {updateItem.isDeleted ? '' : ''}
                </div>
              </div>
              <div className="mb-4 flex justify-end">
                <button
                  onClick={handleUpdate}
                  className="rounded border bg-slate-800 px-6 py-2 text-gray-50 hover:cursor-pointer hover:bg-blue-500"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Idle number={40} />
        )}
      </>
    )
  }

  const renderCreateViewMode = () => {
    return (
      <>
        <div className="">
          <div className="mb-4 flex items-center justify-between bg-neutral-50 px-2 py-2 text-xl font-medium">
            <span>
              Create <AddPaper size="h-5 w-5" fill="fill-slate-800" />
            </span>
            <button className="hover:opacity-85" onClick={handleCancel}>
              <XMark size={'h-6 w-6'} />
            </button>
          </div>

          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="mb-4 grid grid-cols-6">
              <div className="flex items-center">Short Answer:</div>
              <div className="col-span-5 flex">
                <input
                  name="shortAnswer"
                  onChange={handleInputChange}
                  className="w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none"
                  value={updateItem.shortAnswer}
                />
              </div>
            </div>
            <div className="mb-20 grid grid-cols-6">
              <div className="flex items-center">Answer:</div>
              <div className="col-span-5 flex">
                <Editor
                  content={updateItem.answerText}
                  handleEditorChange={handleEditorChange}
                />
              </div>
            </div>
            <div className="mb-4 flex justify-end">
              <button
                onClick={handleAdd}
                className="rounded border bg-slate-800 px-6 py-2 text-gray-50 hover:cursor-pointer hover:bg-green-800"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderContentView = () => {
    switch (mode) {
      case adminModePage.edit:
        return renderEditViewMode()
      case adminModePage.create:
        return renderCreateViewMode()
      default:
        return <Idle number={40} />
    }
  }

  return (
    <main>
      <div className="mt-4 flex justify-between pr-4 text-2xl font-medium">
        <div>Answer List</div>
        <div className="text-lg">
          <button
            onClick={handleCreateMode}
            className="rounded border bg-slate-800 px-4 py-2 text-slate-100 hover:bg-green-800"
          >
            <span className="mr-2 inline-block">Create</span>
            <AddPaper size={'h-5 w-5'} fill={'fill-slate-100'} />
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3">
        <div>
          <div className="overflow-y-auto overflow-x-hidden rounded-md bg-slate-50 p-3">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-blue-gray-100 bg-blue-gray-50 border-b py-4">
                    Answer
                  </th>
                  <th className="border-blue-gray-100 bg-blue-gray-50 border-b p-4"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={2} className="p-2 text-center">
                      <RingLoading />
                    </td>
                    <td></td>
                  </tr>
                ) : answers && answers.length > 0 ? (
                  answers.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className="transition-all duration-150 even:bg-gray-200/50 hover:bg-slate-200 hover:text-slate-500"
                      >
                        <td className="p-2">{item.shortAnswer}</td>
                        <td className="w-6">
                          <button
                            className="hover:text-red-600"
                            onClick={() => handleEditMode(item.id)}
                          >
                            <PenSlash
                              size="h-4 w-4"
                              hoverEffect="hover:stroke-red-600 hover:opacity-65"
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={2} className="p-2 text-center">
                      Empty!
                    </td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg col-span-2 px-4">
          <div className="">{renderContentView()}</div>
        </div>
      </div>
    </main>
  )
}
