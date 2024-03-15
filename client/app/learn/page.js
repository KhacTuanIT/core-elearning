'use client'

import SearchInput from '@/app/components/forms/SearchInput'
import { sideAction } from '@/app/constants/sideAction'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryAsync } from '@/lib/redux/thunks/categoryThunk'
import { getAnswersByQuestionIdAsync } from '@/lib/redux/thunks/answerThunk'
import { getQuestionsByCategoryIdAsync } from '@/lib/redux/thunks/questionThunk'
import QuillContent from '../components/content/quillContent'

function Learn(props) {
  const { action } = props
  const [searchText, setSearchText] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedQuestionId, setSelectedQuestionId] = useState(null)
  const { categories } = useSelector((state) => state.category)
  const { questions } = useSelector((state) => state.question)
  const { answers } = useSelector((state) => state.answer)
  const dispatch = useDispatch()

  useEffect(() => {
    handleSearchDebounce()
  }, [searchText])

  useEffect(() => {
    if (action === sideAction.category) {
      loadCategory()
    }
  }, [action])

  const handleEditorChange = (newContent) => {
    setSearchText(newContent)
  }

  const handleSearch = () => {}

  const handleSearchDebounce = debounce(handleSearch, 200)

  const handleLoadQuestions = (categoryId) => {
    refreshSelectQuestion(categoryId)
    dispatch(getQuestionsByCategoryIdAsync(categoryId))
  }

  const handleLoadAnswer = (questionId) => {
    setSelectedQuestionId(questionId)
    dispatch(getAnswersByQuestionIdAsync(questionId))
  }

  const loadCategory = async () => {
    dispatch(fetchCategoryAsync())
  }

  const refreshSelectQuestion = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setSelectedQuestionId(null)
  }

  const renderContent = () => {
    switch (action) {
      case sideAction.search:
        return (
          <>
            <SearchInput
              content={searchText}
              handleChangeContent={handleEditorChange}
            />
          </>
        )
      case sideAction.category:
        return (
          <div>
            <div className="mb-4">
              {categories ? (
                categories.map((category, index) => {
                  return (
                    <div
                      onClick={() => handleLoadQuestions(category.id)}
                      key={category.id}
                      className={`mr-3 inline-block rounded-md ${selectedCategoryId === category.id ? 'bg-slate-400' : 'bg-slate-300'}  px-6 py-2 hover:cursor-pointer hover:bg-slate-100`}
                    >
                      {category.categoryName}
                    </div>
                  )
                })
              ) : (
                <div>Category is empty</div>
              )}
            </div>
            <div className="grid grid-cols-3">
              <div className="mr-4 rounded-md bg-slate-50 p-2">
                {questions &&
                questions.filter((x) => x.categoryId === selectedCategoryId)
                  .length > 0 ? (
                  <>
                    <div className="text-xl font-medium">Question list</div>
                    <ul className="mt-2 list-decimal pl-6">
                      {questions
                        .filter((x) => x.categoryId === selectedCategoryId)
                        .map((question, index) => {
                          return (
                            <li
                              key={question.id}
                              className={`${selectedQuestionId === question.id ? 'text-sky-500' : 'text-slate-500'} text-sm hover:cursor-pointer hover:text-sky-700`}
                              onClick={() => handleLoadAnswer(question.id)}
                            >
                              {question.questionText}
                            </li>
                          )
                        })}
                    </ul>
                  </>
                ) : (
                  'Not found any questions'
                )}
              </div>
              {questions &&
                questions.filter((x) => x.categoryId === selectedCategoryId)
                  .length > 0 && (
                  <div className="col-span-2">
                    {answers &&
                      answers
                        .filter((x) => x.questionId === selectedQuestionId)
                        .map((answer, index) => {
                          return (
                            <QuillContent
                              key={answer.id}
                              value={answer.answerText}
                            />
                          )
                        })}
                  </div>
                )}
            </div>
          </div>
        )
    }
  }

  return (
    <main className="h-full">
      <div className="text-3xl font-medium">Learning Space</div>
      <div className="mt-6">{renderContent()}</div>
    </main>
  )
}

export default Learn
