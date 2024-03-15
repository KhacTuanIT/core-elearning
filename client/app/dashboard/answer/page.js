'use client'
import Idle from '@/app/components/animations/idle'
import {
  adminModePage,
  handleValidateData,
  validateAnswerFields,
} from '@/app/constants/utils'
import DashedLoading from '@/app/loading/dashedLoading'
import {
  createAnswer,
  deleteAnswer,
  fetchAnswerAsync,
  getAnswerByIdAsync,
  restoreAnswer,
  updateAnswer,
} from '@/lib/redux/thunks/answerThunk'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAnswer,
  setAnswer,
  setAnswerById,
} from '@/lib/redux/reducers/answerReducer'
import {
  AddPaper,
  PenSlash,
  Restore,
  TrashCan,
  XMark,
} from '@/app/components/icons'
import Editor from '@/app/components/forms/Editor'
import RingLoading from '@/app/loading/ringLoading'
import {
  setQuestion,
  setQuestionById,
} from '@/lib/redux/reducers/questionReducer'
import { fetchQuestionAsync } from '@/lib/redux/thunks/questionThunk'
import QuillContent from '@/app/components/content/quillContent'

export default function Answer({ item }) {
  const [mode, setMode] = useState(adminModePage.view)
  const [editId, setEditId] = useState(null)
  const { questions, currentQuestion } = useSelector((state) => state.question)
  const { answers, currentAnswer, isLoading } = useSelector(
    (state) => state.answer,
  )
  const [updateItem, setUpdateItem] = useState(null)
  const [errorValidation, setErrorValidation] = useState()
  const [isNeedValidate, setIsNeedValidate] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setUpdateItem(currentAnswer)
  }, [currentAnswer])

  useEffect(() => {
    if (editId) {
      setAnswerById(editId)
      if (
        currentAnswer === undefined ||
        currentAnswer === null ||
        currentAnswer.id !== editId
      ) {
        dispatch(getAnswerByIdAsync(editId))
      }
      setUpdateItem(currentAnswer)
      setQuestionById(currentAnswer?.questionId)
    }
  }, [editId])

  useEffect(() => {
    const unsubscriberFetchAnswer = () => {
      dispatch(fetchAnswerAsync())
      dispatch(fetchQuestionAsync())
    }
    return unsubscriberFetchAnswer
  }, [])

  useEffect(() => {
    if (mode === adminModePage.view || mode === adminModePage.create) {
      clearCurrentItem()
      setQuestion(questions[0])
    } else {
    }
  }, [mode])

  const handleInputChange = (e) => {
    console.log(e)
    const { name, value } = e.target
    const item = {
      ...updateItem,
      [name]: value,
    }
    setUpdateItem(item)
    isNeedValidate &&
      handleValidateData(mode, item, validateQuestionFields, setErrorValidation)
  }

  const handleViewDetail = (id) => {
    setMode(adminModePage.viewDetail)
    setEditId(id)
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
  }

  const handleUpdate = () => {
    if (
      handleValidateData(
        mode,
        updateItem,
        validateAnswerFields,
        setErrorValidation,
      )
    ) {
      setIsNeedValidate(false)
      dispatch(updateAnswer(updateItem))
    } else {
      setIsNeedValidate(true)
    }
    return
  }

  const handleCreateMode = () => {
    setMode(adminModePage.create)
  }

  const handleAdd = () => {
    if (
      handleValidateData(
        mode,
        updateItem,
        validateAnswerFields,
        setErrorValidation,
      )
    ) {
      setIsNeedValidate(false)
      dispatch(createAnswer(updateItem))
    } else {
      setIsNeedValidate(true)
    }
    return
  }

  const handleRestore = (id) => {
    dispatch(restoreAnswer(id))
  }

  const handleDelete = (id) => {
    dispatch(deleteAnswer(id))
  }

  const clearCurrentItem = () => {
    let item = {
      questionId: null,
      answerText: null,
      shortAnswer: null,
    }
    setAnswer({ ...updateItem, questionId: currentQuestion?.id })
    setUpdateItem({ ...updateItem, questionId: currentQuestion?.id })
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
                <div className="flex items-center">Question:</div>
                <div className="col-span-5 flex flex-col">
                  <select
                    name="questionId"
                    value={updateItem.questionId}
                    onChange={handleInputChange}
                    className={`flex-1 rounded-[6px] border border-slate-400 px-3 py-2 ${errorValidation && errorValidation['categoryId'] ? 'border-red-600' : ''}`}
                  >
                    {questions && questions.length > 0 ? (
                      questions.map((item) => {
                        return (
                          <option
                            selected={
                              updateItem.questionId === item.id
                                ? 'selected'
                                : ''
                            }
                            key={item.id}
                            value={item.id}
                          >
                            {item.questionText}
                          </option>
                        )
                      })
                    ) : (
                      <option>No selection</option>
                    )}
                  </select>
                  <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                    {errorValidation && errorValidation['questionId']}
                  </div>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-6">
                <div className="flex items-center">Short answer:</div>
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
          <div className="mb-4 grid grid-cols-6">
            <div className="flex items-center">Question:</div>
            <div className="col-span-5 flex flex-col">
              <select
                name="questionId"
                value={updateItem?.questionId}
                onChange={handleInputChange}
                className={`flex-1 rounded-[6px] border border-slate-400 px-3 py-2 ${errorValidation && errorValidation['categoryId'] ? 'border-red-600' : ''}`}
              >
                {questions && questions.length > 0 ? (
                  questions.map((item) => {
                    return (
                      <option
                        selected={
                          updateItem?.questionId === item.id ? 'selected' : ''
                        }
                        key={item.id}
                        value={item.id}
                      >
                        {item.questionText}
                      </option>
                    )
                  })
                ) : (
                  <option>No selection</option>
                )}
              </select>
              <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                {errorValidation && errorValidation['questionId']}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="mb-4 grid grid-cols-6">
              <div className="flex items-center">Short Answer:</div>
              <div className="col-span-5 flex">
                <input
                  name="shortAnswer"
                  onChange={handleInputChange}
                  className="w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none"
                  value={updateItem?.shortAnswer}
                />
              </div>
            </div>
            <div className="mb-20 grid grid-cols-6">
              <div className="flex items-center">Answer:</div>
              <div className="col-span-5 flex">
                <Editor
                  content={updateItem?.answerText}
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

  const renderViewDetail = () => {
    if (currentAnswer === null || currentAnswer === undefined) return <></>
    return (
      <>
        <div className="">
          <div className="mb-4 flex items-center justify-between bg-neutral-50 px-2 py-2 text-xl font-medium">
            <span>{currentAnswer.shortAnswer}</span>
            <button className="hover:opacity-85" onClick={handleCancel}>
              <XMark size={'h-6 w-6'} />
            </button>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 pb-3">
            <div className="grid grid-cols-6">
              <div className="flex">Created By:</div>
              <div className="col-span-5 flex flex-col">
                {currentAnswer.createdBy}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 pb-3">
            <div className="grid grid-cols-6">
              <div className="flex">Created At:</div>
              <div className="col-span-5 flex flex-col">
                {currentAnswer.createdAt}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 pb-3">
            <div className="grid grid-cols-6">
              <div className="flex">Last updated By:</div>
              <div className="col-span-5 flex flex-col">
                {currentAnswer.updatedBy}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 pb-3">
            <div className="grid grid-cols-6">
              <div className="flex">Last updated At:</div>
              <div className="col-span-5 flex flex-col">
                {currentAnswer.updatedAt}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 pb-3">
            <div className="grid grid-cols-6">
              <div className="flex">State:</div>
              <div className="col-span-5 flex flex-col">
                {currentAnswer.isDeleted ? (
                  <span className="text-red-400">Deleted</span>
                ) : (
                  <span className="text-green-400">Active</span>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 pb-3">
            <div className="mb-1">
              <div className="pt-2">Question:</div>
              <div>{currentQuestion?.questionText}</div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 pb-3">
            <div className="mb-1">
              <div className="pt-2">Answer:</div>
              {/* <div
                dangerouslySetInnerHTML={{ __html: currentAnswer?.answerText }}
              /> */}
              <div>
                <QuillContent value={currentAnswer?.answerText} />
              </div>
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
      case adminModePage.viewDetail:
        return renderViewDetail()
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
          <div className="flex overflow-y-auto overflow-x-hidden rounded-md bg-slate-50 p-3">
            <table className="w-full max-w-full flex-1 table-fixed text-left">
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
                        <td className="truncate p-2">
                          <span className="flex">
                            <span
                              className="inline-block truncate pr-2 hover:cursor-pointer"
                              onClick={() => handleViewDetail(item.id)}
                              title={item.shortAnswer}
                            >
                              {item.shortAnswer}
                            </span>
                            {item.isDeleted ? (
                              <span class="relative flex h-2 w-2">
                                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                              </span>
                            ) : (
                              <span class="relative flex h-2 w-2">
                                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="w-14 max-w-14 text-right">
                          <button
                            className="hover:text-red-600"
                            onClick={() => handleEditMode(item.id)}
                          >
                            <PenSlash
                              size="h-4 w-4"
                              hoverEffect="hover:stroke-red-600 hover:opacity-65"
                            />
                          </button>
                          <button
                            onClick={() =>
                              item.isDeleted
                                ? handleRestore(item.id)
                                : handleDelete(item.id)
                            }
                          >
                            {item.isDeleted ? (
                              <Restore
                                size={'h-4 w-4'}
                                hoverEffect={'hover:stroke-green-400'}
                              />
                            ) : (
                              <TrashCan
                                size={'h-4 w-4'}
                                hoverEffect={'hover:opacity-65'}
                              />
                            )}
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
