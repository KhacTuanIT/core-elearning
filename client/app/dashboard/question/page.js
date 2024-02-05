'use client'
import Idle from '@/app/components/animations/idle'
import {
  adminModePage,
  handleValidateData,
  validateQuestionFields,
} from '@/app/constants/utils'
import DashedLoading from '@/app/loading/dashedLoading'
import {
  createQuestion,
  fetchQuestionAsync,
  getQuestionByIdAsync,
  updateQuestion,
} from '@/lib/redux/thunks/questionThunk'
import { fetchCategoryAsync } from '@/lib/redux/thunks/categoryThunk'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestion, setQuestion } from '@/lib/redux/reducers/questionReducer'
import {
  AddPaper,
  PenSlash,
  Restore,
  TrashCan,
  XMark,
} from '@/app/components/icons'
import _ from 'lodash'
import RingLoading from '@/app/loading/ringLoading'
import { getAnswersByQuestionIdAsync } from '@/lib/redux/thunks/answerThunk'
import { getCategory } from '@/lib/redux/reducers/categoryReducer'

export default function Question() {
  const [mode, setMode] = useState(adminModePage.view)
  const [editId, setEditId] = useState(null)
  const { categories, currentCategory } = useSelector((state) => state.category)
  const { questions, currentQuestion, isLoading } = useSelector(
    (state) => state.question,
  )
  const { answers } = useSelector((state) => state.answer)
  const [updateItem, setUpdateItem] = useState({
    categoryId: null,
    questionText: null,
    description: null,
  })
  const [errorValidation, setErrorValidation] = useState()
  const [isNeedValidate, setIsNeedValidate] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setUpdateItem({})
  }, [])

  useEffect(() => {
    setUpdateItem(currentQuestion)
  }, [currentQuestion])

  useEffect(() => {
    if (editId) {
      getQuestion(editId)
      if (
        currentQuestion === undefined ||
        currentQuestion === null ||
        currentQuestion.id !== editId
      ) {
        dispatch(getQuestionByIdAsync(editId))
      }
    }
  }, [editId])

  useEffect(() => {
    const unsubscriberFetchQuestion = () => {
      dispatch(fetchQuestionAsync())
      dispatch(fetchCategoryAsync())
    }
    return unsubscriberFetchQuestion
  }, [])

  useEffect(() => {
    if (mode === adminModePage.view || mode === adminModePage.create) {
      clearCurrentItem()
      if (categories && categories.length > 0) {
        setUpdateItem({ ...updateItem, categoryId: categories[0].id })
      }
    } else if (mode === adminModePage.viewDetail) {
      dispatch(getAnswersByQuestionIdAsync(editId))
    } else if (mode === adminModePage.edit) {
      setUpdateItem({ ...updateItem, categoryId: currentQuestion.categoryId })
    }
    getCategory(currentQuestion.categoryId)
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
        validateQuestionFields,
        setErrorValidation,
      )
    ) {
      setIsNeedValidate(false)
      dispatch(updateQuestion(updateItem))
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
        validateQuestionFields,
        setErrorValidation,
      )
    ) {
      setIsNeedValidate(false)
      dispatch(createQuestion(updateItem))
    } else {
      setIsNeedValidate(true)
    }
    return
  }

  const clearCurrentItem = () => {
    let item = {
      categoryId: null,
      questionText: null,
      description: null,
    }
    if (adminModePage.edit) {
      item.id = null
    }
    setUpdateItem(item)
    setQuestion(item)
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
                <div className="flex items-center">Category:</div>
                <div className="col-span-5 flex flex-col">
                  <select
                    name="categoryId"
                    value={updateItem.categoryId}
                    onChange={handleInputChange}
                    className={`flex-1 rounded-[6px] border border-slate-400 px-3 py-2 ${errorValidation && errorValidation['categoryId'] ? 'border-red-600' : ''}`}
                  >
                    {categories && categories.length > 0 ? (
                      categories.map((item) => {
                        return (
                          <option
                            selected={
                              updateItem.categoryId === item.id
                                ? 'selected'
                                : ''
                            }
                            key={item.id}
                            value={item.id}
                          >
                            {item.categoryName}
                          </option>
                        )
                      })
                    ) : (
                      <option>No selection</option>
                    )}
                  </select>
                  <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                    {errorValidation && errorValidation['categoryId']}
                  </div>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-6">
                <div className="flex pt-2">Question:</div>
                <div className="col-span-5 flex flex-col">
                  <input
                    name="questionText"
                    onChange={handleInputChange}
                    className={`w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none  ${errorValidation && errorValidation['questionText'] ? 'border-red-600' : ''}`}
                    value={updateItem.questionText}
                  />
                  <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                    {errorValidation && errorValidation['questionText']}
                  </div>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-6">
                <div className="flex items-center">Description:</div>
                <div className="col-span-5 flex">
                  <input
                    name="description"
                    onChange={handleInputChange}
                    className="w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none"
                    value={updateItem.description}
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
              <div className="flex pt-2">Category:</div>
              <div className="col-span-5 flex flex-col">
                <select
                  name="categoryId"
                  value={updateItem.categoryId}
                  onChange={handleInputChange}
                  className={`flex-1 rounded-[6px] border border-slate-400 px-3 py-2 ${errorValidation && errorValidation['categoryId'] ? 'border-red-600' : ''}`}
                >
                  {categories && categories.length > 0 ? (
                    categories.map((item) => {
                      return (
                        <option value={item.id}>{item.categoryName}</option>
                      )
                    })
                  ) : (
                    <option>No selection</option>
                  )}
                </select>
                <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                  {errorValidation && errorValidation['categoryId']}
                </div>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-6">
              <div className="flex pt-2">Name:</div>
              <div className="col-span-5 flex flex-col">
                <input
                  name="questionText"
                  onChange={handleInputChange}
                  className={`w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none ${errorValidation && errorValidation['questionText'] ? 'border-red-600' : ''}`}
                  value={updateItem?.questionText}
                />
                <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                  {errorValidation && errorValidation['questionText']}
                </div>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-6">
              <div className="flex pt-2">Name:</div>
              <div className="col-span-5 flex flex-col">
                <input
                  name="description"
                  onChange={handleInputChange}
                  className="w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none"
                  value={updateItem?.description}
                />
                <div className="h-[20px] min-h-[20px] text-sm text-red-600"></div>
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
    if (currentQuestion === null || currentQuestion === undefined) return <></>
    return (
      <>
        <div className="">
          <div className="mb-4 flex items-center justify-between bg-neutral-50 px-2 py-2 text-xl font-medium">
            <span>{currentQuestion.questionText}</span>
            <button className="hover:opacity-85" onClick={handleCancel}>
              <XMark size={'h-6 w-6'} />
            </button>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Description:</div>
              <div className="col-span-5 flex flex-col">
                {currentQuestion.description}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Created By:</div>
              <div className="col-span-5 flex flex-col">
                {currentQuestion.createdBy}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Created At:</div>
              <div className="col-span-5 flex flex-col">
                {currentQuestion.createdAt}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Last updated By:</div>
              <div className="col-span-5 flex flex-col">
                {currentQuestion.updatedBy}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Last updated At:</div>
              <div className="col-span-5 flex flex-col">
                {currentQuestion.updatedAt}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">State:</div>
              <div className="col-span-5 flex flex-col">
                {currentQuestion.isDeleted ? (
                  <span className="text-red-400">Deleted</span>
                ) : (
                  <span className="text-green-400">Active</span>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="mb-4">
              <div className="pt-2">Child answers:</div>
              <div>
                {answers && answers.length > 0 ? (
                  <ul>
                    {answers.map((question) => {
                      return <li>{question.questionText}</li>
                    })}
                  </ul>
                ) : (
                  'Not found any child answers'
                )}
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
        <div>Question List</div>
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
                    Question
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
                ) : questions && questions.length > 0 ? (
                  questions.map((item, index) => {
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
                            >
                              {item.questionText}
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
