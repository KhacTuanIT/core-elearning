'use client'

import SearchInput from '@/app/components/forms/SearchInput'
import { sideAction } from '@/app/constants/sideAction'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryAsync, getAnswersByQuestionIdAsync, getQuestionsByCategoryIdAsync } from '@/lib/redux/thunks/learnThunks'

function Learn(props) {
  const { action } = props
  const [searchText, setSearchText] = useState('')
  const { categories, questions, answers, isLoading } = useSelector(
    (state) => state.learn,
  )
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

  const handleSearch = () => {
    
  }

  const handleSearchDebounce = debounce(handleSearch, 200)

  const handleLoadQuestions = (categoryId) => {
    dispatch(getQuestionsByCategoryIdAsync(categoryId))
  }

  const handleLoadAnswer = (questionId) => {
    dispatch(getAnswersByQuestionIdAsync(questionId))
  }

  const loadCategory = async () => {
    dispatch(fetchCategoryAsync())
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
                      className="mr-3 inline-block rounded-md bg-slate-300 px-6 py-2 hover:cursor-pointer hover:bg-slate-100"
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
              {questions
                ? questions.map((question, index) => {
                    return (
                      <div key={question.id} className="mr-4 rounded-md bg-slate-50 p-2">
                        <div className="text-xl font-medium">Question list</div>
                        <ul className="mt-2 list-decimal pl-6">
                          <li
                            className="text-slate-500 hover:cursor-pointer hover:text-sky-700"
                            onClick={() => handleLoadAnswer(question.id)}
                          >
                            {question.questionText}
                          </li>
                        </ul>
                      </div>
                    )
                  })
                : ''}

              <div className="col-span-2">{answers}</div>
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
