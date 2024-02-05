'use client'
import Idle from '@/app/components/animations/idle'
import {
  adminModePage,
  handleValidateData,
  validateCategoryFields,
} from '@/app/constants/utils'
import DashedLoading from '@/app/loading/dashedLoading'
import {
  createCategory,
  deleteCategory,
  fetchCategoryAsync,
  getCategoryByIdAsync,
  restoreCategory,
  updateCategory,
} from '@/lib/redux/thunks/categoryThunk'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, setCategory } from '@/lib/redux/reducers/categoryReducer'
import {
  AddPaper,
  PenSlash,
  TrashCan,
  XMark,
  Restore,
} from '@/app/components/icons'
import RingLoading from '@/app/loading/ringLoading'
import { getQuestionsByCategoryIdAsync } from '@/lib/redux/thunks/questionThunk'

export default function Category() {
  const [mode, setMode] = useState(adminModePage.view)
  const [editId, setEditId] = useState(null)
  const { categories, currentCategory, isLoading } = useSelector(
    (state) => state.category,
  )
  const { questions } = useSelector((state) => state.question)
  const [updateItem, setUpdateItem] = useState({
    categoryName: null,
  })
  const [errorValidation, setErrorValidation] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    setUpdateItem({})
  }, [])

  useEffect(() => {
    setUpdateItem(currentCategory)
  }, [currentCategory])

  useEffect(() => {
    if (editId) {
      getCategory(editId)
      if (
        currentCategory === undefined ||
        currentCategory === null ||
        currentCategory.id !== editId
      ) {
        dispatch(getCategoryByIdAsync(editId))
      }
    }
  }, [editId])

  useEffect(() => {
    const unsubscriberFetchCategory = () => {
      dispatch(fetchCategoryAsync())
    }
    return unsubscriberFetchCategory
  }, [])

  useEffect(() => {
    if (mode === adminModePage.view || mode === adminModePage.create) {
      clearCurrentItem()
    } else if (mode === adminModePage.viewDetail) {
      dispatch(getQuestionsByCategoryIdAsync(editId))
    }
  }, [mode])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const item = {
      ...updateItem,
      [name]: value,
    }
    setUpdateItem(item)
    handleValidateData(mode, item, validateCategoryFields, setErrorValidation)
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
        validateCategoryFields,
        setErrorValidation,
      )
    ) {
      dispatch(updateCategory(updateItem))
      setMode(adminModePage.view)
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
        validateCategoryFields,
        setErrorValidation,
      )
    ) {
      dispatch(createCategory(updateItem))
      setMode(adminModePage.view)
    }
    return
  }

  const handleRestore = (id) => {
    dispatch(restoreCategory(id))
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
  }

  const clearCurrentItem = () => {
    setUpdateItem({
      categoryName: null,
    })
    setCategory({})
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
                <div className="flex pt-2">Name:</div>
                <div className="col-span-5 flex flex-col">
                  <input
                    name="categoryName"
                    onChange={handleInputChange}
                    className={`w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none  ${errorValidation && errorValidation['categoryName'] ? 'border-red-600' : ''}`}
                    value={updateItem.categoryName}
                  />
                  <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                    {errorValidation && errorValidation['categoryName']}
                  </div>
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
              <div className="flex pt-2">Name:</div>
              <div className="col-span-5 flex flex-col">
                <input
                  name="categoryName"
                  onChange={handleInputChange}
                  className={`w-full rounded-[6px] border border-slate-400 px-3 py-2 outline-none transition-all duration-100 focus:!border-slate-600 focus:outline-none  ${errorValidation && errorValidation['categoryName'] ? 'border-red-600' : ''}`}
                  value={updateItem ? updateItem.categoryName : ''}
                />
                <div className="h-[20px] min-h-[20px] text-sm text-red-600">
                  {errorValidation && errorValidation['categoryName']}
                </div>
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
    return (
      <>
        <div className="">
          <div className="mb-4 flex items-center justify-between bg-neutral-50 px-2 py-2 text-xl font-medium">
            <span>{currentCategory.categoryName}</span>
            <button className="hover:opacity-85" onClick={handleCancel}>
              <XMark size={'h-6 w-6'} />
            </button>
          </div>

          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Created By:</div>
              <div className="col-span-5 flex flex-col">
                {currentCategory.createdBy}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Created At:</div>
              <div className="col-span-5 flex flex-col">
                {currentCategory.createdAt}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Last updated By:</div>
              <div className="col-span-5 flex flex-col">
                {currentCategory.updatedBy}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">Last updated At:</div>
              <div className="col-span-5 flex flex-col">
                {currentCategory.updatedAt}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="grid grid-cols-6">
              <div className="flex">State:</div>
              <div className="col-span-5 flex flex-col">
                {currentCategory.isDeleted ? <span className='text-red-400'>Deleted</span> : <span className='text-green-400'>Active</span>}
              </div>
            </div>
          </div>
          <div className="rounded-md bg-neutral-50 px-2 py-3">
            <div className="mb-4">
              <div className="pt-2">Child questions:</div>
              <div>
                {questions && questions.length > 0 ? (
                  <ul>
                    {questions.map((question) => {
                      return <li>{question.questionText}</li>
                    })}
                  </ul>
                ) : (
                  'Not found any child questions'
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
        <div>Category List</div>
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
                    Name
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
                ) : categories && categories.length > 0 ? (
                  categories.map((item, index) => {
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
                              {item.categoryName}
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
                        <td className="w-14">
                          <button onClick={() => handleEditMode(item.id)}>
                            <PenSlash
                              size="h-4 w-4"
                              hoverEffect="hover:stroke-blue-600 hover:opacity-65"
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
